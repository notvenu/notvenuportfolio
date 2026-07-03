import { motion as Motion, useDragControls } from 'framer-motion'
import { ArrowUpRight, Github, Globe, Mail, Maximize2, Minus, RotateCcw, X } from 'lucide-react'
import { developer, projects } from '../data/site'
import { Navbar } from '../components/navbar'
import { Terminal } from '../components/terminal'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { useEffect, useState } from 'react'

function BrowserFrame({ project, index, onExpand, onClose }) {
  const host = project.demo ? new URL(project.demo).host : null
  const dragControls = useDragControls()
  const [minimized, setMinimized] = useState(false)

  return (
    <Motion.div
      drag
      dragListener={false}
      dragControls={dragControls}
      dragMomentum={false}
      whileDrag={{ scale: 1.02 }}
      className="relative focus-within:z-20 hover:z-20"
    >
      <Motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.12, ease: 'easeOut' }}
        className="group h-full"
      >
        {/* ponytail: no tilt on windows — it moves the traffic-light buttons away from the cursor */}
        <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/60 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.5)] backdrop-blur-sm transition-colors duration-500 hover:border-primary/30">
          {/* Browser chrome — drag handle */}
          <div
            onPointerDown={(event) => dragControls.start(event)}
            className="flex cursor-move touch-none select-none items-center gap-3 border-b border-border/60 bg-secondary/40 px-4 py-2.5 active:cursor-grabbing"
          >
            {/* macOS traffic lights: icons appear when hovering the cluster */}
            <div className="group/dots flex items-center gap-2" onPointerDown={(event) => event.stopPropagation()}>
              <button
                type="button"
                title="Close window"
                aria-label={`Close ${project.name}`}
                onClick={() => onClose(project.name)}
                className="grid h-3.5 w-3.5 place-items-center rounded-full bg-red-400/90 text-red-950 transition-transform hover:scale-110"
              >
                <X size={9} strokeWidth={3} className="opacity-0 transition-opacity group-hover/dots:opacity-100" />
              </button>
              <button
                type="button"
                title={minimized ? 'Restore window' : 'Minimize window'}
                aria-label={`Minimize ${project.name}`}
                onClick={() => setMinimized((current) => !current)}
                className="grid h-3.5 w-3.5 place-items-center rounded-full bg-yellow-400/90 text-yellow-950 transition-transform hover:scale-110"
              >
                <Minus size={9} strokeWidth={3} className="opacity-0 transition-opacity group-hover/dots:opacity-100" />
              </button>
              <button
                type="button"
                title="Maximize — use full screen"
                aria-label={`Maximize ${project.name}`}
                onClick={() => project.demo && onExpand(project)}
                disabled={!project.demo}
                className="grid h-3.5 w-3.5 place-items-center rounded-full bg-green-400/90 text-green-950 transition-transform hover:scale-110 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Maximize2 size={8} strokeWidth={3} className="opacity-0 transition-opacity group-hover/dots:opacity-100" />
              </button>
            </div>
            <div className="flex min-w-0 flex-1 items-center gap-2 rounded-md border border-border/50 bg-background/60 px-3 py-1 font-mono text-xs text-muted-foreground">
              <Globe size={12} className="shrink-0" />
              <span className="truncate">{host ?? 'no live demo'}</span>
            </div>
            <div className="flex items-center gap-3" onPointerDown={(event) => event.stopPropagation()}>
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Repository"
                className="inline-flex items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
              >
                <Github size={16} />
              </a>
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open live site"
                  className="inline-flex items-center justify-center text-muted-foreground transition-colors hover:text-primary"
                >
                  <ArrowUpRight size={16} />
                </a>
              )}
            </div>
          </div>

          {/* Live embed + meta (hidden when minimized to just the title bar) */}
          {!minimized && (
          <>
          {project.demo ? (
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-background/40">
              <iframe src={project.demo} title={project.name} loading="lazy" className="h-full w-full border-0" />
            </div>
          ) : (
            <div className="grid aspect-[16/10] w-full place-items-center bg-background/40 font-mono text-sm text-muted-foreground">
              source only — see GitHub
            </div>
          )}

          {/* Meta */}
          <div className="flex flex-1 flex-col gap-3 p-5">
            <h3 className="text-lg font-semibold tracking-tight transition-colors group-hover:text-primary">
              {project.name}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{project.description}</p>
            <div className="mt-auto flex flex-wrap gap-2 pt-1">
              {project.stack.map((item) => (
                <Badge key={item} variant="secondary" className="bg-secondary/50 font-mono text-xs">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
          </>
          )}
        </div>
      </Motion.div>
    </Motion.div>
  )
}

function FocusOverlay({ project, onClose }) {
  useEffect(() => {
    const onKey = (event) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <Motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="fixed inset-0 z-[100] flex flex-col bg-background"
    >
      <div className="flex items-center gap-3 border-b border-border/60 bg-card/80 px-4 py-2.5 backdrop-blur-xl">
        <div className="group/dots flex items-center gap-2">
          <button
            type="button"
            title="Close"
            aria-label="Close focus mode"
            onClick={onClose}
            className="grid h-3.5 w-3.5 place-items-center rounded-full bg-red-400/90 text-red-950 transition-transform hover:scale-110"
          >
            <X size={9} strokeWidth={3} className="opacity-0 transition-opacity group-hover/dots:opacity-100" />
          </button>
          <span className="h-3.5 w-3.5 rounded-full bg-yellow-400/40" />
          <button
            type="button"
            title="Restore window"
            aria-label="Restore window"
            onClick={onClose}
            className="grid h-3.5 w-3.5 place-items-center rounded-full bg-green-400/90 text-green-950 transition-transform hover:scale-110"
          >
            <Minus size={9} strokeWidth={3} className="opacity-0 transition-opacity group-hover/dots:opacity-100" />
          </button>
        </div>
        <div className="flex min-w-0 flex-1 items-center gap-2 rounded-md border border-border/50 bg-background/60 px-3 py-1 font-mono text-xs text-muted-foreground">
          <Globe size={12} className="shrink-0" />
          <span className="truncate">{new URL(project.demo).host}</span>
        </div>
        <span className="hidden text-sm font-medium sm:block">{project.name}</span>
        <a
          href={project.demo}
          target="_blank"
          rel="noreferrer"
          aria-label="Open live site"
          className="inline-flex items-center justify-center text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowUpRight size={18} />
        </a>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close focus mode"
          className="grid h-8 w-8 place-items-center rounded-full border border-border/60 bg-secondary/60 text-muted-foreground transition-colors hover:text-foreground"
        >
          <X size={16} />
        </button>
      </div>
      <iframe src={project.demo} title={project.name} className="w-full flex-1 border-0 bg-white" />
    </Motion.div>
  )
}

export function WorkPage({ themeColor, onPickColor }) {
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [focused, setFocused] = useState(null)
  const [closed, setClosed] = useState([])

  const visibleProjects = projects.filter((project) => !closed.includes(project.name))

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="app-background pointer-events-none fixed inset-0 -z-10" />
      <div className="pointer-events-none fixed inset-0 -z-10 grid-pattern opacity-50" />
      <div className="pointer-events-none fixed inset-0 -z-10 beam-lines opacity-40" />

      <Navbar onOpenTerminal={() => setTerminalOpen(true)} themeColor={themeColor} onPickColor={onPickColor} />

      <main className="mx-auto max-w-6xl px-4 pb-32 pt-24 sm:px-6">
        <Motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="font-mono text-sm text-muted-foreground">~/showcase</p>
          <h1 className="section-title mt-2">Live Showcase</h1>
          <p className="section-subtitle">
            Real, deployed products — running live inside this page. Interact with them directly, no
            pop-ups, no screenshots.
          </p>
        </Motion.div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {visibleProjects.map((project, index) => (
            <BrowserFrame
              key={project.name}
              project={project}
              index={index}
              onExpand={setFocused}
              onClose={(name) => setClosed((current) => [...current, name])}
            />
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <p className="font-mono text-xs text-muted-foreground/70">
            * Drag windows around by their title bar. 🔴 close · 🟡 minimize · 🟢 full screen. If a
            preview stays blank, that site blocks embedding — use ↗ to open it directly.
          </p>
          {closed.length > 0 && (
            <button
              type="button"
              onClick={() => setClosed([])}
              className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-secondary/50 px-3 py-1 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <RotateCcw size={12} /> Reopen closed windows ({closed.length})
            </button>
          )}
        </div>

        {/* Hire CTA */}
        <Motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mt-24 rounded-2xl border border-border/60 bg-card/50 p-8 text-center backdrop-blur-sm sm:p-12"
        >
          <h2 className="section-title">Like what you see?</h2>
          <p className="section-subtitle mx-auto">
            I build products like these end to end — design, architecture, and shipping. Let&apos;s
            talk about yours.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg">
              <a href={`mailto:${developer.email}`} className="gap-2">
                <Mail size={16} /> Hire me
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={developer.socials.github} target="_blank" rel="noreferrer" className="gap-2">
                <Github size={16} /> GitHub
              </a>
            </Button>
          </div>
        </Motion.section>
      </main>

      <Terminal open={terminalOpen} onClose={() => setTerminalOpen(false)} />

      {/* ponytail: no AnimatePresence — StrictMode + framer eats the exit unmount; instant close is fine */}
      {focused && <FocusOverlay project={focused} onClose={() => setFocused(null)} />}
    </div>
  )
}
