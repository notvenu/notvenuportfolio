import { motion as Motion } from 'framer-motion'
import { ArrowUpRight, Trophy } from 'lucide-react'
import { hackathons, developer } from '../data/site'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { TiltCard } from './ui/tilt-card'

export function Hackathons() {
  return (
    <section id="hackathons" className="section-wrap px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="section-title">Hackathons</h2>
        <p className="section-subtitle">{developer.subtitles.hackathons}</p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {hackathons.map((hackathon, index) => (
            <Motion.a
              key={hackathon.name}
              href={hackathon.link}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.07 }}
              whileHover={{ y: -4 }}
              style={{ perspective: '900px' }}
              className="h-full"
            >
              <TiltCard max={7} className="h-full">
              <Card className="card-hover h-full transition hover:border-foreground/25">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">{hackathon.date}</p>
                    {hackathon.award && (
                      <span className="inline-flex items-center gap-1 rounded bg-primary/10 px-2 py-1 text-[10px] font-medium text-primary">
                        <Trophy size={11} /> {hackathon.award}
                      </span>
                    )}
                  </div>
                  <CardTitle>{hackathon.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-2 text-sm font-medium text-foreground">{hackathon.project}</p>
                  <p className="mb-4 text-sm text-muted-foreground">{hackathon.description}</p>
                  <p className="inline-flex items-center gap-1 text-sm text-foreground">
                    View Project <ArrowUpRight size={14} />
                  </p>
                </CardContent>
              </Card>
              </TiltCard>
            </Motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
