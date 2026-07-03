import { useEffect, useMemo, useRef, useState } from 'react'
import { motion as Motion } from 'framer-motion'
import { developer, projects, skills } from '../data/site'
import { Button } from './ui/button'

function TypedLine({ text }) {
  const [visible, setVisible] = useState('')

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      i += 1
      setVisible(text.slice(0, i))
      if (i >= text.length) {
        clearInterval(timer)
      }
    }, 9)

    return () => clearInterval(timer)
  }, [text])

  return <>{visible}</>
}

export function Terminal({ open, onClose }) {
  const [input, setInput] = useState('')
  const [lines, setLines] = useState(['devshell 1.0.0', 'Type `help` to list commands.'])
  const [history, setHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const logRef = useRef(null)
  const [isHacked, setIsHacked] = useState(false)

  useEffect(() => {
    if (isHacked) {
      const body = document.body
      const originalStyle = body.getAttribute('style') || ''
      
      body.style.transition = 'all 0.05s ease-in-out'
      
      const glitchInterval = setInterval(() => {
        const x = (Math.random() - 0.5) * 40
        const y = (Math.random() - 0.5) * 40
        const skew = (Math.random() - 0.5) * 20
        const rotate = (Math.random() - 0.5) * 10
        const invert = Math.random() > 0.85 ? 1 : 0
        
        body.style.transform = `translate(${x}px, ${y}px) rotate(${rotate}deg) skewX(${skew}deg) scale(1.05)`
        body.style.filter = `invert(${invert}) contrast(200%) saturate(150%) hue-rotate(${Math.random() * 360}deg)`
      }, 50)

      const recoveryTimeout = setTimeout(() => {
        setIsHacked(false)
        setLines(['Recovery successful.', 'Type `help` to list commands.'])
      }, 5000)

      return () => {
        clearInterval(glitchInterval)
        clearTimeout(recoveryTimeout)
        body.setAttribute('style', originalStyle)
        body.style.transform = ''
        body.style.filter = ''
      }
    }
  }, [isHacked])

  useEffect(() => {
    if (!open) {
      return
    }
    setTimeout(() => {
      if (logRef.current) {
        logRef.current.scrollTop = logRef.current.scrollHeight
      }
    }, 20)
  }, [open, lines])

  const commands = useMemo(
    () => {
      const jokes = [
        "Why do programmers prefer dark mode? Because light attracts bugs.",
        "I'd tell you a UDP joke, but you might not get it.",
        "There are 10 types of people in the world: those who understand binary, and those who don't.",
        "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
        "A SQL query goes into a bar, walks up to two tables and asks... 'Can I join you?'"
      ];

      return {
        help: () => ['Available commands:', '  help     - Show this help message', '  about    - About the developer', '  skills   - List technical skills', '  projects - List projects', '  contact  - Show contact info', '  clear    - Clear terminal output', '  whoami   - Print current user', '  date     - Show current date/time', '  sudo     - Execute a command as superuser', '  pwd      - Print working directory', '  echo     - Print text to terminal', '  joke     - Tell a programming joke', '  cowsay   - Make the cow say something', '  roll     - Roll a dice (e.g. roll, roll 20)', '  coinflip - Flip a coin', '  hack     - Initiate mainframe bypass'],
        about: () => [developer.bio],
        skills: () => [skills.join(' | ')],
        projects: () => projects.map((project, index) => `${index + 1}. ${project.name}`),
        contact: () => [developer.email, developer.socials.github, developer.socials.linkedin],
        clear: () => {
          setLines([])
          return []
        },
        whoami: () => [developer.name, developer.role],
        date: () => [new Date().toString()],
        sudo: () => ['Permission denied: you are not in the sudoers file. This incident will be reported.'],
        pwd: () => ['/home/visitor/notvenu'],
        echo: (...args) => [args.join(' ') || ''],
        joke: () => [jokes[Math.floor(Math.random() * jokes.length)]],
        cowsay: (...args) => {
          const text = args.length ? args.join(' ') : 'Moo';
          const border = '-'.repeat(text.length + 2);
          return [
            `  ${border} `,
            ` < ${text} >`,
            `  ${border} `,
            `         \\   ^__^`,
            `          \\  (oo)\\_______`,
            `             (__)\\       )\\/\\`,
            `                 ||----w |`,
            `                 ||     ||`
          ];
        },
        roll: (...args) => {
          const max = parseInt(args[0]) || 6;
          const result = Math.floor(Math.random() * max) + 1;
          return [`Rolling a d${max}...`, `Result: ${result}`];
        },
        coinflip: () => {
          const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
          return ['Flipping coin...', `Result: ${result}`];
        },
        hack: () => {
          setTimeout(() => setIsHacked(true), 3500);
          return [
            'sudo: overriding security protocols...',
            '[████████░░] Exploit in progress...',
            'Accessing shadow registry...',
            'Bypassing mainframe firewall...',
            'Downloading root credentials...',
            'WARNING: THREAT DETECTED. CONTAINMENT FAILED.',
            'SYSTEM INTEGRITY COMPROMISED. KERNEL PANIC IMMINENT.'
          ];
        },
      }
    },
    [],
  )

  const appendLines = (nextLines) => {
    setLines((prev) => [...prev, ...nextLines])
  }

  const run = () => {
    const value = input.trim()
    if (!value) {
      appendLines(['> '])
      setInput('')
      return
    }

    appendLines([`> ${value}`])
    setHistory((prev) => [...prev, value])
    setHistoryIndex(-1)

    const [cmd, ...args] = value.split(' ')
    const commandName = cmd.toLowerCase()

    const handler = commands[commandName]
    if (!handler) {
      appendLines([`Command not found: ${commandName}`])
      setInput('')
      return
    }

    const output = handler(...args)
    if (output && output.length) {
      appendLines(output)
    }
    setInput('')
  }

  const onKeyDown = (event) => {
    if (event.key === 'Enter') {
      run()
      return
    }

    if (event.key === 'Tab') {
      event.preventDefault()
      const value = input.trim().toLowerCase()
      if (!value) return
      
      const cmds = Object.keys(commands)
      const matches = cmds.filter((c) => c.startsWith(value))
      
      if (matches.length === 1) {
        setInput(matches[0])
      } else if (matches.length > 1) {
        appendLines([`> ${input}`, matches.join('  ')])
      }
      return
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      if (!history.length) {
        return
      }
      const next = Math.min(historyIndex + 1, history.length - 1)
      setHistoryIndex(next)
      setInput(history[history.length - 1 - next])
      return
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      if (historyIndex <= 0) {
        setHistoryIndex(-1)
        setInput('')
        return
      }
      const next = historyIndex - 1
      setHistoryIndex(next)
      setInput(history[history.length - 1 - next])
    }
  }

  return (
    <>
      {/* ponytail: no AnimatePresence — StrictMode + framer eats the exit unmount */}
      {open && (
          <Motion.div
            initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-background/60 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <Motion.section
            drag
            dragConstraints={{ top: -300, bottom: 300, left: -400, right: 400 }}
            dragElastic={0.1}
            initial={{ y: 36, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(event) => event.stopPropagation()}
            className="flex h-[75vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-border/50 bg-background/95 shadow-2xl backdrop-blur-md supports-[backdrop-filter]:bg-background/80 cursor-default"
          >
            <header className="flex cursor-move items-center justify-between border-b border-border/50 bg-muted/30 px-4 py-3 active:cursor-grabbing">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors cursor-pointer" onClick={onClose} />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors" />
                  <div className="h-3 w-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors" />
                </div>
                <p className="ml-4 font-mono text-xs font-medium text-muted-foreground/80">bash — visitor@notvenu: ~</p>
              </div>
              <Button size="sm" variant="ghost" className="h-7 cursor-pointer text-xs text-muted-foreground hover:text-foreground" onClick={onClose}>
                Esc
              </Button>
            </header>

            <div ref={logRef} className="scrollbar-none flex-1 space-y-2 overflow-auto p-4 font-mono text-sm text-foreground/80 cursor-text">
              {lines.map((line, index) => (
                <p key={`${line}-${index}`} className="whitespace-pre-wrap">
                  {line.startsWith('>') ? (
                    <span className="text-primary font-semibold">{line}</span>
                  ) : (
                    <TypedLine text={line} />
                  )}
                </p>
              ))}
            </div>

            <label className="flex items-center gap-2 border-t border-border bg-muted/20 px-4 py-4 font-mono text-sm">
              <span className="text-primary font-semibold mt-[2px]">&gt;</span>
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={onKeyDown}
                className="w-full bg-transparent text-foreground placeholder-muted-foreground/50 outline-none"
                placeholder="Type a command..."
                autoFocus
                spellCheck={false}
              />
              <span className="h-4 w-2 animate-pulse bg-primary/70" />
            </label>
          </Motion.section>
        </Motion.div>
      )}

      {isHacked && (
        <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm p-4">
          <div className="text-center font-mono space-y-6 p-8 border-2 border-red-600 bg-black/50 shadow-[0_0_100px_rgba(220,38,38,0.7)] rounded-xl pointer-events-auto max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-bold text-red-500 uppercase animate-pulse">
              SYSTEM CONFLICT
            </h1>
            <p className="text-red-400 text-lg md:text-xl max-w-2xl mx-auto">
              FATAL ERROR 0x0000007B. CRITICAL SUBSYSTEM PROCESS TERMINATED UNEXPECTEDLY. MAIN MENU OVERRIDE DETECTED.
            </p>
            <div className="pt-8 flex flex-col items-center gap-4">
              <Button
                variant="destructive"
                size="lg"
                className="px-12 py-6 text-xl tracking-widest uppercase font-bold animate-bounce"
                onClick={() => {
                  setIsHacked(false)
                  setLines(['Recovery successful.', 'Type `help` to list commands.'])
                }}
              >
                REBOOT SYSTEM
              </Button>
              <p className="text-red-500/80 text-sm animate-pulse">Auto-recovering in 5 seconds...</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
