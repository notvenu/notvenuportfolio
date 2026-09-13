import { leetcode, site } from "@/data/site";

export type Stats = {
  repos: number;
  stars: number;
  solved: number;
  /** True when every upstream answered. The page never says so, but it keeps
   *  the failure visible in the API response. */
  live: boolean;
};

/** Resume numbers. Used whenever an upstream is down or rate limited, so the
 *  page degrades to "slightly stale" instead of "broken". */
const FALLBACK: Stats = {
  repos: 0,
  stars: 0,
  solved: leetcode.easy + leetcode.medium + leetcode.hard,
  live: false,
};

const USER = site.handle;
const TIMEOUT = 6000;
/** One hour. GitHub allows 60 unauthenticated requests an hour per IP. */
const REVALIDATE = 3600;

async function githubStats() {
  const res = await fetch(`https://api.github.com/users/${USER}/repos?per_page=100`, {
    headers: { Accept: "application/vnd.github+json" },
    signal: AbortSignal.timeout(TIMEOUT),
    next: { revalidate: REVALIDATE },
  });
  if (!res.ok) throw new Error(`github ${res.status}`);

  const repos: { stargazers_count: number; fork: boolean }[] = await res.json();
  const own = repos.filter((r) => !r.fork);
  return {
    repos: own.length,
    stars: own.reduce((sum, r) => sum + r.stargazers_count, 0),
  };
}

async function leetcodeSolved() {
  const res = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json", Referer: "https://leetcode.com" },
    body: JSON.stringify({
      query: `query($username: String!) {
        matchedUser(username: $username) {
          submitStatsGlobal { acSubmissionNum { difficulty count } }
        }
      }`,
      variables: { username: USER },
    }),
    signal: AbortSignal.timeout(TIMEOUT),
    next: { revalidate: REVALIDATE },
  });
  if (!res.ok) throw new Error(`leetcode ${res.status}`);

  const json = await res.json();
  const buckets: { difficulty: string; count: number }[] =
    json?.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum ?? [];
  const all = buckets.find((b) => b.difficulty === "All");
  if (!all) throw new Error("leetcode: unexpected shape");
  return all.count;
}

/** Never throws. A portfolio that renders an error page because GitHub had a
 *  bad minute is worse than one showing last month's number. */
export async function getStats(): Promise<Stats> {
  const [gh, lc] = await Promise.allSettled([githubStats(), leetcodeSolved()]);

  return {
    repos: gh.status === "fulfilled" ? gh.value.repos : FALLBACK.repos,
    stars: gh.status === "fulfilled" ? gh.value.stars : FALLBACK.stars,
    solved: lc.status === "fulfilled" ? lc.value : FALLBACK.solved,
    live: gh.status === "fulfilled" && lc.status === "fulfilled",
  };
}
