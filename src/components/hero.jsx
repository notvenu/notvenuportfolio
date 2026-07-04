import { useEffect, useState } from 'react'
import { ArrowRight, TerminalSquare } from 'lucide-react'
import { motion as Motion } from 'framer-motion'
import { Button } from './ui/button'
import { developer } from '../data/site'

const ROLES = developer.roles

function Particles() {
  const dots = new Array(28).fill(0).map((_, index) => ({
    id: index,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 5 + Math.random() * 7,
  }))

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((dot) => (
        <Motion.span
          key={dot.id}
          className="absolute h-1 w-1 rounded-full bg-primary/75"
          style={{ left: `${dot.x}%`, top: `${dot.y}%` }}
          animate={{ y: [0, -26, 0], opacity: [0.15, 0.9, 0.15] }}
          transition={{ delay: dot.delay, duration: dot.duration, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
      <div className="spotlight absolute left-1/2 top-0 h-[320px] w-[560px] -translate-x-1/2" />
    </div>
  )
}

export function Hero({ onOpenTerminal }) {
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length)
    }, 2200)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="home" className="relative flex min-h-screen items-center px-4 pt-24 sm:px-6">
      <Particles />
      <div className="mx-auto w-full max-w-6xl">
        <Motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-4 inline-flex rounded-full border border-border bg-secondary px-3 py-1 text-xs uppercase tracking-wide text-secondary-foreground"
        >
          {developer.location}
        </Motion.p>

        <Motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="max-w-4xl text-4xl font-semibold leading-tight text-foreground sm:text-6xl"
        >
          {developer.heroHeading}
          <span className="ml-2 box-decoration-clone rounded-lg bg-foreground px-2 text-background">
            {developer.heroHighlight.split(' ').map((word, wordIndex, words) => (
              <span key={wordIndex} className="inline-block whitespace-nowrap">
                {word.split('').map((char, index) => (
              <span
                key={index}
                className="inline-block transition-transform duration-200 ease-out hover:-translate-y-1.5 hover:rotate-6"
              >
                {char === ' ' ? ' ' : char}
              </span>
                ))}
                {wordIndex < words.length - 1 && ' '}
              </span>
            ))}
          </span>
        </Motion.h1>
        <Motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="mt-6 text-lg text-muted-foreground"
        >
         {developer.name} <span className="inline-block" style={{ perspective: '400px' }}>
          <Motion.span
            key={ROLES[roleIndex]}
            className="inline-block"
            initial={{ opacity: 0, rotateX: 90, y: 8 }}
            animate={{ opacity: 1, rotateX: 0, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            · {ROLES[roleIndex]}
          </Motion.span>
        </span>
        </Motion.p>
        
        <Motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.24 }}
          className="mt-4 max-w-2xl text-muted-foreground/90"
        >
          {developer.bio}
        </Motion.p>

        <Motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <Button asChild>
            <a href="#projects" className="group gap-2">
              View Projects <ArrowRight size={16} className="transition group-hover:translate-x-1" />
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="#contact">Contact</a>
          </Button>
          <Button variant="secondary" onClick={onOpenTerminal} className="gap-2">
            <TerminalSquare size={16} /> Open Terminal
          </Button>
        </Motion.div>
      </div>
    </section>
  )
}
