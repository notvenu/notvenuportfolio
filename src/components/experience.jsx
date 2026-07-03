import { motion as Motion } from 'framer-motion'
import { experience, developer } from '../data/site'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { TiltCard } from './ui/tilt-card'

export function Experience() {
  return (
    <section id="experience" className="section-wrap px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <h2 className="section-title">Experience</h2>
        <p className="section-subtitle">{developer.subtitles.experience}</p>

        <div className="relative mt-10 space-y-5 pl-10">
          <div className="absolute bottom-0 left-4 top-0 w-px -translate-x-1/2 bg-gradient-to-b from-primary/70 via-primary/25 to-transparent" />
          {experience.map((item, index) => (
            <Motion.div
              key={`${item.company}-${item.role}`}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: index * 0.12 }}
              className="relative"
              style={{ perspective: '1200px' }}
            >
              <span className="absolute left-4 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/45 bg-primary shadow-[0_0_16px] shadow-primary/45" />
              <TiltCard max={3}>
              <Card className="card-hover">
                <CardHeader>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <CardTitle>{item.role}</CardTitle>
                    <span className="text-xs uppercase tracking-wide text-muted-foreground">{item.duration}</span>
                  </div>
                  <p className="text-sm text-foreground">{item.company}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
              </TiltCard>
            </Motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
