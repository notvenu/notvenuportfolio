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

function computeCurrentStreak(events) {
  const activeDays = new Set(
    events
      .map((event) => event?.created_at?.slice(0, 10))
      .filter(Boolean),
  )

  const today = new Date()
  const utcToday = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()))

  let cursor = utcToday
  let streak = 0

  const toYmd = (date) => date.toISOString().slice(0, 10)

  if (!activeDays.has(toYmd(cursor))) {
    cursor = new Date(cursor)
    cursor.setUTCDate(cursor.getUTCDate() - 1)
  }

  while (activeDays.has(toYmd(cursor))) {
    streak += 1
    cursor = new Date(cursor)
    cursor.setUTCDate(cursor.getUTCDate() - 1)
  }

  return streak
}

function computeRecentContributions(events) {
  return events.reduce((total, event) => {
    if (event?.type === 'PushEvent') {
      return total + (event?.payload?.size ?? 1)
    }
    return total + 1
  }, 0)
}

export function About() {
  const [liveStats, setLiveStats] = useState(githubStats)
  const username = useMemo(() => getGitHubUsername(developer.socials.github), [])

  useEffect(() => {
    if (!username) {
      return
    }

    const fetchStats = async () => {
      try {
        const userResponse = await fetch(`https://api.github.com/users/${username}`)
        if (!userResponse.ok) {
          return
        }
        const user = await userResponse.json()

        let page = 1
        let hasMore = true
        let stars = 0

        while (hasMore) {
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

        const eventPages = [1, 2, 3]
        const eventBatches = await Promise.all(
          eventPages.map(async (eventPage) => {
            const response = await fetch(`https://api.github.com/users/${username}/events/public?per_page=100&page=${eventPage}`)
            if (!response.ok) {
              return []
            }
            return response.json()
          }),
        )

        const streakDays = computeCurrentStreak(eventBatches.flat())
        const contributions = computeRecentContributions(eventBatches.flat())

        setLiveStats([
          { label: 'Public Repos', value: formatCompact(user.public_repos ?? 0) },
          { label: 'OSS Stars', value: formatCompact(stars) },
          { label: 'Current Streak', value: `${streakDays} days` },
          { label: 'Contributions', value: formatCompact(contributions) },
        ])
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
