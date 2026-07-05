import { useEffect, useMemo, useState } from 'react'
import { motion as Motion } from 'framer-motion'
import { achievements, developer, githubStats } from '../data/site'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { TiltCard } from './ui/tilt-card'

function formatCompact(value) {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value)
}

function getGitHubUsername(url) {
  const match = url.match(/github\.com\/([^/?#]+)/i)
  return match?.[1] ?? ''
}

// Streak from the real contribution calendar (ascending daily counts)
function computeStreak(days) {
  let i = days.length - 1
  if (i >= 0 && days[i].count === 0) i -= 1 // today may have no commits yet
  let streak = 0
  while (i >= 0 && days[i].count > 0) {
    streak += 1
    i -= 1
  }
  return streak
}

const CACHE_KEY = 'gh-stats-v2'
const CACHE_TTL = 60 * 60 * 1000 // 1h — dodges the 60/hr anonymous API limit

export function About() {
  const [liveStats, setLiveStats] = useState(githubStats)
  const username = useMemo(() => getGitHubUsername(developer.socials.github), [])

  useEffect(() => {
    if (!username) {
      return
    }

    const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null')
    if (cached && Date.now() - cached.at < CACHE_TTL) {
      setLiveStats(cached.stats)
      return
    }

    const fetchStats = async () => {
      try {
        const [user, contrib] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`).then((r) => (r.ok ? r.json() : Promise.reject(new Error('user fetch failed')))),
          // real contribution calendar (public mirror of the profile graph)
          fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
            .then((r) => (r.ok ? r.json() : null))
            .catch(() => null),
        ])

        let page = 1
        let hasMore = true
        let stars = 0

        while (hasMore && page <= 5) {
          const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&page=${page}`)
          if (!reposResponse.ok) {
            break
          }
          const repos = await reposResponse.json()
          for (const repo of repos) {
            stars += repo.stargazers_count ?? 0
          }
          hasMore = repos.length === 100
          page += 1
        }

        const days = contrib?.contributions ?? []
        const contributions = contrib?.total?.lastYear ?? days.reduce((total, day) => total + day.count, 0)

        const stats = [
          { label: 'Public Repos', value: formatCompact(user.public_repos ?? 0) },
          { label: 'OSS Stars', value: formatCompact(stars) },
          { label: 'Contributions', value: formatCompact(contributions) },
          { label: 'Current Streak', value: `${computeStreak(days)} days` },
        ]

        setLiveStats(stats)
        localStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), stats }))
      } catch {
        // Fall back to static stats when API is unavailable.
      }
    }

    fetchStats()
  }, [username])

  return (
    <section id="about" className="section-wrap px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="section-title">About</h2>
        <Motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-6 max-w-5xl text-[1.05rem] leading-relaxed text-muted-foreground sm:text-[1.1rem]"
        >
          {developer.about.split(developer.aboutHighlights[0])[0]}
          <span className="font-semibold text-foreground underline decoration-border underline-offset-4">{developer.aboutHighlights[0]}</span>
          {developer.about.split(developer.aboutHighlights[0])[1].split(developer.aboutHighlights[1])[0]}
          <span className="font-semibold text-foreground underline decoration-border underline-offset-4">{developer.aboutHighlights[1]}</span>
          {developer.about.split(developer.aboutHighlights[1])[1].split(developer.aboutHighlights[2])[0]}
          <span className="font-semibold text-foreground underline decoration-border underline-offset-4">{developer.aboutHighlights[2]}</span>
          {developer.about.split(developer.aboutHighlights[2])[1]}
        </Motion.p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ perspective: '1000px' }}>
            <TiltCard max={5} className="h-full">
            <Card className="card-hover h-full bg-card/80">
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
                <CardDescription>Milestones across product, engineering, and mentoring</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                {achievements.map((item) => (
                  <p key={item} className="rounded-lg border border-border bg-secondary/55 px-3 py-2">• {item}</p>
                ))}
              </CardContent>
            </Card>
            </TiltCard>
          </Motion.div>

          <Motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }} style={{ perspective: '1000px' }}>
            <TiltCard max={5} className="h-full">
            <Card className="card-hover h-full bg-card/80">
              <CardHeader>
                <CardTitle>GitHub Stats</CardTitle>
                <CardDescription>Live profile metrics from github.com/{username || 'profile'}</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-3">
                {liveStats.map((stat) => (
                  <div key={stat.label} className="rounded-xl border border-border bg-secondary/70 p-3">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">{stat.label}</p>
                    <p className="mt-1 text-lg font-semibold text-foreground">{stat.value}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
            </TiltCard>
          </Motion.div>
        </div>
      </div>
    </section>
  )
}
