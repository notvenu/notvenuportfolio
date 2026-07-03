import { useEffect, useState } from 'react'
import { motion as Motion } from 'framer-motion'
import { About } from '../components/about'
import { Hackathons } from '../components/hackathons'
import { Contact } from '../components/contact'
import { Experience } from '../components/experience'
import { Hero } from '../components/hero'
import { Navbar } from '../components/navbar'
import { Projects } from '../components/projects'
import { Skills } from '../components/skills'
import { Terminal } from '../components/terminal'

function Loader() {
  return (
    <Motion.div
      className="loader-screen pointer-events-none fixed inset-0 z-[120] grid place-items-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center gap-3">
        <span className="loader-dot h-2.5 w-2.5 animate-pulse rounded-full" />
        <p className="font-mono text-sm text-muted-foreground">Booting Developer OS...</p>
      </div>
    </Motion.div>
  )
}

export function HomePage({ themeColor, onPickColor }) {
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 950)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const onMove = (event) => setCursor({ x: event.clientX, y: event.clientY })
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="app-background pointer-events-none fixed inset-0 -z-10" />
      <div className="pointer-events-none fixed inset-0 -z-10 grid-pattern opacity-50" />
      <div className="pointer-events-none fixed inset-0 -z-10 beam-lines opacity-40" />

      <Motion.div
        className="cursor-glow pointer-events-none fixed -z-[5] h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        animate={{ x: cursor.x, y: cursor.y }}
        transition={{ type: 'spring', stiffness: 150, damping: 24, mass: 0.45 }}
      />

      <Navbar onOpenTerminal={() => setTerminalOpen(true)} themeColor={themeColor} onPickColor={onPickColor} />
      <main>
        <Hero onOpenTerminal={() => setTerminalOpen(true)} />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Hackathons />
        <Contact />
      </main>

      <Terminal open={terminalOpen} onClose={() => setTerminalOpen(false)} />

      {/* ponytail: no AnimatePresence — StrictMode + framer eats the exit unmount */}
      {loading && <Loader />}
    </div>
  )
}
