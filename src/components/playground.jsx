import { useEffect, useRef, useState } from 'react'
import { motion as Motion } from 'framer-motion'
import { Bug, Hash, Play, Puzzle, RotateCcw, Trophy, Zap } from 'lucide-react'
import { developer } from '../data/site'

/* ---------------------------------- bug squash ---------------------------------- */

const GAME_SECONDS = 20
const BUG_EMOJIS = ['🐛', '🪲', '🐞', '🦗']

function rank(score) {
  if (score >= 24) return 'Merge Conflict Slayer'
  if (score >= 16) return 'Senior Bug Exterminator'
  if (score >= 8) return 'Bug Bounty Hunter'
  if (score >= 1) return 'Junior Debugger'
  return 'Rubber Duck'
}

function BugSquash() {
  const [state, setState] = useState('idle')
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(GAME_SECONDS)
  const [bugs, setBugs] = useState([])
  const [best, setBest] = useState(() => Number(localStorage.getItem('bug-squash-best') || 0))

  const start = () => {
    setScore(0)
    setTimeLeft(GAME_SECONDS)
    setBugs([])
    setState('playing')
  }

  useEffect(() => {
    if (state !== 'playing') return
    const timer = setInterval(() => setTimeLeft((current) => current - 1), 1000)
    return () => clearInterval(timer)
  }, [state])

  useEffect(() => {
    if (state !== 'playing') return
    const spawner = setInterval(() => {
      const bug = {
        id: Math.random(),
        x: 6 + Math.random() * 82,
        y: 10 + Math.random() * 74,
        emoji: BUG_EMOJIS[Math.floor(Math.random() * BUG_EMOJIS.length)],
      }
      setBugs((current) => [...current.slice(-5), bug])
      setTimeout(() => setBugs((current) => current.filter((b) => b.id !== bug.id)), 1400)
    }, 520)
    return () => clearInterval(spawner)
  }, [state])

  useEffect(() => {
    if (state === 'playing' && timeLeft <= 0) {
      setState('done')
      setBugs([])
      setBest((currentBest) => {
        const next = Math.max(currentBest, score)
        localStorage.setItem('bug-squash-best', String(next))
        return next
      })
    }
  }, [timeLeft, state, score])

  const squash = (id) => {
    setBugs((current) => current.filter((b) => b.id !== id))
    setScore((current) => current + 1)
  }

  return (
    <>
      <div className="flex items-center justify-end gap-5 border-b border-border/60 px-5 py-2 font-mono text-xs text-muted-foreground">
        <span>⏱ {state === 'playing' ? `${timeLeft}s` : `${GAME_SECONDS}s`}</span>
        <span className="text-primary">score {score}</span>
        <span className="inline-flex items-center gap-1.5">
          <Trophy size={12} /> best {best}
        </span>
      </div>
      <div className="relative h-64 select-none sm:h-72">
        {state === 'idle' && (
          <div className="absolute inset-0 grid place-items-center">
            <button
              type="button"
              onClick={start}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground transition-transform hover:scale-105 active:scale-95"
            >
              <Play size={16} /> Start debugging
            </button>
          </div>
        )}

        {state === 'done' && (
          <div className="absolute inset-0 grid place-items-center">
            <div className="text-center">
              <p className="text-3xl font-bold text-foreground sm:text-4xl">{score} bugs squashed</p>
              <p className="mt-2 font-mono text-sm text-primary">rank: {rank(score)}</p>
              <button
                type="button"
                onClick={start}
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-5 py-2.5 text-sm font-medium text-foreground transition-transform hover:scale-105 active:scale-95"
              >
                <RotateCcw size={14} /> Run again
              </button>
            </div>
          </div>
        )}

        {bugs.map((bug) => (
          <Motion.button
            key={bug.id}
            type="button"
            aria-label="Squash bug"
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            whileHover={{ scale: 1.25 }}
            onPointerDown={() => squash(bug.id)}
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-crosshair text-3xl"
            style={{ left: `${bug.x}%`, top: `${bug.y}%` }}
          >
            {bug.emoji}
          </Motion.button>
        ))}
      </div>
    </>
  )
}

/* -------------------------------- reaction test --------------------------------- */

function ReactionTest() {
  const [state, setState] = useState('idle') // idle | waiting | go | result | early
  const [ms, setMs] = useState(0)
  const [best, setBest] = useState(() => Number(localStorage.getItem('reaction-best') || 0))
  const goAtRef = useRef(0)
  const timeoutRef = useRef(null)

  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  const arm = () => {
    setState('waiting')
    timeoutRef.current = setTimeout(() => {
      goAtRef.current = performance.now()
      setState('go')
    }, 1000 + Math.random() * 3000)
  }

  const click = () => {
    if (state === 'idle' || state === 'result' || state === 'early') return arm()
    if (state === 'waiting') {
      clearTimeout(timeoutRef.current)
      return setState('early')
    }
    // go
    const elapsed = Math.round(performance.now() - goAtRef.current)
    setMs(elapsed)
    setState('result')
    setBest((currentBest) => {
      const next = currentBest === 0 ? elapsed : Math.min(currentBest, elapsed)
      localStorage.setItem('reaction-best', String(next))
      return next
    })
  }

  const face =
    state === 'go' ? 'bg-primary text-primary-foreground' : 'bg-card/40 text-foreground'

  return (
    <>
      <div className="flex items-center justify-end gap-5 border-b border-border/60 px-5 py-2 font-mono text-xs text-muted-foreground">
        <span>avg human ≈ 250ms</span>
        <span className="inline-flex items-center gap-1.5">
          <Trophy size={12} /> best {best ? `${best}ms` : '—'}
        </span>
      </div>
      <button type="button" onClick={click} className={`grid h-64 w-full cursor-pointer select-none place-items-center transition-colors duration-200 sm:h-72 ${face}`}>
        <div className="text-center">
          {state === 'idle' && (
            <p className="text-xl font-semibold">Tap to start, then tap the instant it lights up</p>
          )}
          {state === 'waiting' && <p className="animate-pulse font-mono text-lg">wait for it…</p>}
          {state === 'go' && <p className="text-4xl font-bold">NOW!</p>}
          {state === 'early' && (
            <p className="text-xl font-semibold">Too soon, cowboy 🤠 — tap to retry</p>
          )}
          {state === 'result' && (
            <>
              <p className="text-5xl font-bold">{ms}ms</p>
              <p className="mt-2 font-mono text-sm text-muted-foreground">
                {ms < 200 ? 'superhuman ⚡' : ms < 280 ? 'sharp!' : ms < 400 ? 'respectable' : 'coffee first? ☕'} · tap to go again
              </p>
            </>
          )}
        </div>
      </button>
    </>
  )
}

/* -------------------------------- memory match ---------------------------------- */

const MEMO_EMOJIS = ['⚛️', '🐍', '🐳', '☁️', '🔥', '🎨']

function shuffled(array) {
  const copy = [...array]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function MemoryMatch() {
  const [cards, setCards] = useState(() => shuffled([...MEMO_EMOJIS, ...MEMO_EMOJIS]))
  const [flipped, setFlipped] = useState([])
  const [matched, setMatched] = useState([])
  const [moves, setMoves] = useState(0)
  const [best, setBest] = useState(() => Number(localStorage.getItem('memory-best') || 0))

  const won = matched.length === cards.length

  useEffect(() => {
    if (!won || moves === 0) return
    setBest((currentBest) => {
      const next = currentBest === 0 ? moves : Math.min(currentBest, moves)
      localStorage.setItem('memory-best', String(next))
      return next
    })
  }, [won, moves])

  const reset = () => {
    setCards(shuffled([...MEMO_EMOJIS, ...MEMO_EMOJIS]))
    setFlipped([])
    setMatched([])
    setMoves(0)
  }

  const flip = (index) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return
    const next = [...flipped, index]
    setFlipped(next)
    if (next.length === 2) {
      setMoves((m) => m + 1)
      if (cards[next[0]] === cards[next[1]]) {
        setMatched((m) => [...m, ...next])
        setFlipped([])
      } else {
        setTimeout(() => setFlipped([]), 700)
      }
    }
  }

  return (
    <>
      <div className="flex items-center justify-end gap-5 border-b border-border/60 px-5 py-2 font-mono text-xs text-muted-foreground">
        <span className="text-primary">moves {moves}</span>
        <span className="inline-flex items-center gap-1.5">
          <Trophy size={12} /> best {best || '—'}
        </span>
        <button type="button" onClick={reset} aria-label="Restart memory game" className="transition-colors hover:text-foreground">
          <RotateCcw size={13} />
        </button>
      </div>
      <div className="relative grid grid-cols-4 gap-2 p-4 sm:gap-3 sm:p-6">
        {cards.map((emoji, index) => {
          const faceUp = flipped.includes(index) || matched.includes(index)
          return (
            <Motion.button
              key={index}
              type="button"
              aria-label={faceUp ? emoji : 'Hidden card'}
              onClick={() => flip(index)}
              whileTap={{ scale: 0.92 }}
              animate={{ rotateY: faceUp ? 0 : 180 }}
              transition={{ duration: 0.25 }}
              className={`grid aspect-square place-items-center rounded-xl border text-2xl transition-colors sm:text-3xl ${
                matched.includes(index)
                  ? 'border-primary/50 bg-primary/10'
                  : 'border-border bg-secondary/60 hover:bg-secondary'
              }`}
            >
              {faceUp ? emoji : <span className="font-mono text-base text-muted-foreground">?</span>}
            </Motion.button>
          )
        })}
        {won && (
          <div className="absolute inset-0 grid place-items-center rounded-b-2xl bg-background/85 backdrop-blur-sm">
            <div className="text-center">
              <p className="text-3xl font-bold">Solved in {moves} moves 🧠</p>
              <button
                type="button"
                onClick={reset}
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-5 py-2.5 text-sm font-medium transition-transform hover:scale-105 active:scale-95"
              >
                <RotateCcw size={14} /> Shuffle again
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

/* -------------------------------- tic tac toe ----------------------------------- */

const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
]

function winnerOf(board) {
  for (const [a, b, c] of LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a]
  }
  return board.every(Boolean) ? 'draw' : null
}

// ponytail: greedy bot (win > block > center > corner), not minimax — beatable on purpose
function botMove(board) {
  const empty = board.map((v, i) => (v ? null : i)).filter((v) => v !== null)
  const winningSpot = (mark) =>
    empty.find((i) => {
      const copy = [...board]
      copy[i] = mark
      return winnerOf(copy) === mark
    })
  return (
    winningSpot('O') ??
    winningSpot('X') ??
    (board[4] ? undefined : 4) ??
    [0, 2, 6, 8].find((i) => !board[i]) ??
    empty[Math.floor(Math.random() * empty.length)]
  )
}

function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState('X')
  const [tally, setTally] = useState({ X: 0, O: 0, draw: 0 })
  const result = winnerOf(board)

  useEffect(() => {
    if (turn !== 'O' || result) return
    const timer = setTimeout(() => {
      setBoard((current) => {
        if (winnerOf(current)) return current
        const copy = [...current]
        copy[botMove(current)] = 'O'
        return copy
      })
      setTurn('X')
    }, 350)
    return () => clearTimeout(timer)
  }, [turn, result])

  useEffect(() => {
    if (result) setTally((t) => ({ ...t, [result]: t[result] + 1 }))
  }, [result])

  const play = (index) => {
    if (board[index] || result || turn !== 'X') return
    setBoard((current) => {
      const copy = [...current]
      copy[index] = 'X'
      return copy
    })
    setTurn('O')
  }

  const newRound = () => {
    setBoard(Array(9).fill(null))
    setTurn('X')
  }

  const status = result
    ? result === 'draw'
      ? "It's a draw 🤝"
      : result === 'X'
        ? 'You win! 🏆'
        : 'The bot wins 🤖'
    : turn === 'X'
      ? 'Your move — you are ✕'
      : 'Bot is thinking…'

  return (
    <>
      <div className="flex items-center justify-between gap-3 border-b border-border/60 px-5 py-2 font-mono text-xs text-muted-foreground">
        <span className="truncate">{status}</span>
        <span className="shrink-0">
          you {tally.X} · bot {tally.O} · draws {tally.draw}
        </span>
      </div>
      <div className="relative flex flex-col items-center gap-4 p-5">
        <div className="grid grid-cols-3 gap-2">
          {board.map((cell, index) => (
            <Motion.button
              key={index}
              type="button"
              aria-label={`Cell ${index + 1}${cell ? `: ${cell}` : ''}`}
              onClick={() => play(index)}
              whileTap={{ scale: 0.9 }}
              className={`grid h-16 w-16 place-items-center rounded-xl border text-2xl font-bold transition-colors sm:h-20 sm:w-20 sm:text-3xl ${
                cell === 'X'
                  ? 'border-primary/50 bg-primary/10 text-primary'
                  : cell === 'O'
                    ? 'border-border bg-secondary text-muted-foreground'
                    : 'border-border bg-secondary/50 hover:bg-secondary'
              }`}
            >
              {cell === 'X' ? '✕' : cell === 'O' ? '◯' : ''}
            </Motion.button>
          ))}
        </div>
        {result && (
          <button
            type="button"
            onClick={newRound}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-105 active:scale-95"
          >
            <RotateCcw size={14} /> New round
          </button>
        )}
      </div>
    </>
  )
}

/* ---------------------------------- section ------------------------------------- */

const TABS = [
  { id: 'bugs', label: 'bug-squash', icon: Bug, component: BugSquash },
  { id: 'react', label: 'reaction', icon: Zap, component: ReactionTest },
  { id: 'memory', label: 'memory', icon: Puzzle, component: MemoryMatch },
  { id: 'ttt', label: 'tic-tac-toe', icon: Hash, component: TicTacToe },
]

export function Playground() {
  const [tab, setTab] = useState('bugs')
  const Active = TABS.find((t) => t.id === tab).component

  return (
    <section id="playground" className="section-wrap px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="section-title">Playground</h2>
        <p className="section-subtitle">{developer.subtitles.playground}</p>

        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 overflow-hidden rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm"
        >
          {/* window bar with tabs */}
          <div className="flex items-center gap-2 overflow-x-auto border-b border-border/60 bg-secondary/40 px-4 py-2">
            <div className="mr-2 flex shrink-0 gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-400/80" />
              <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
              <span className="h-3 w-3 rounded-full bg-green-400/80" />
            </div>
            {TABS.map((t) => {
              const Icon = t.icon
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-xs transition-colors ${
                    tab === t.id
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon size={13} /> {t.label}
                </button>
              )
            })}
          </div>

          <Active key={tab} />
        </Motion.div>
      </div>
    </section>
  )
}
