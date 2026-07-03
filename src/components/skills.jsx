import { motion as Motion } from 'framer-motion'
import { Atom, Box, Braces, Cloud, Code2, Cpu, Database, Globe, Wind, Wrench } from 'lucide-react'
import { skills, developer } from '../data/site'

const SKILL_ICONS = {
  React: Atom,
  TypeScript: Braces,
  'Node.js': Box,
  'Next.js': Globe,
  Python: Cpu,
  PostgreSQL: Database,
  Docker: Wrench,
  AWS: Cloud,
  TailwindCSS: Wind,
  'Framer Motion': Code2,
}

const SKILL_ICON_TONE = {
  React: 'text-sky-400',
  TypeScript: 'text-blue-400',
  'Node.js': 'text-emerald-400',
  'Next.js': 'text-zinc-100',
  Python: 'text-lime-400',
  PostgreSQL: 'text-cyan-400',
  Docker: 'text-blue-400',
  AWS: 'text-amber-300',
  TailwindCSS: 'text-cyan-300',
  'Framer Motion': 'text-fuchsia-300',
}

export function Skills() {
  return (
    <section id="skills" className="section-wrap px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="section-title">Skills</h2>
        <p className="section-subtitle">{developer.subtitles.skills}</p>

        <div className="mt-6 flex flex-wrap gap-2.5">
          {skills.map((skill, index) => {
            const Icon = SKILL_ICONS[skill] ?? Code2
            const iconTone = SKILL_ICON_TONE[skill] ?? 'text-muted-foreground'
            return (
              <Motion.div
                key={skill}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03 }}
                whileHover={{ y: -6, scale: 1.08, rotate: index % 2 ? 2 : -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/90 px-4 py-2 text-[1.05rem] font-medium text-muted-foreground shadow-[0_10px_28px_-22px_rgba(0,0,0,0.5)]"
              >
                <Icon size={16} className={iconTone} />
                <span className="text-muted-foreground">{skill}</span>
              </Motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
