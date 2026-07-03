import { useEffect, useRef, useState } from 'react'
import { motion as Motion } from 'framer-motion'
import { Music, Pause, Play, SkipForward, X } from 'lucide-react'

// ponytail: swap in your own tracks — drop mp3s in public/music and point src there
const TRACKS = [
  { title: 'Ambient Focus', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { title: 'Late Night Build', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' },
  { title: 'Ship It', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
]

function EqBars({ playing }) {
  return (
    <div className="flex h-4 items-end gap-[3px]">
      {[0.6, 1, 0.75, 0.9].map((peak, index) => (
        <Motion.span
          key={index}
          className="w-[3px] rounded-full bg-primary"
          animate={playing ? { height: [4, 16 * peak, 6, 14 * peak, 4] } : { height: 4 }}
          transition={playing ? { duration: 0.9 + index * 0.15, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.3 }}
        />
      ))}
    </div>
  )
}

export function MusicPlayer() {
  const audioRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [trackIndex, setTrackIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  const track = TRACKS[trackIndex]

  useEffect(() => {
    if (playing) audioRef.current.play().catch(() => setPlaying(false))
    else audioRef.current.pause()
  }, [playing, trackIndex])

  const nextTrack = () => {
    setProgress(0)
    setTrackIndex((current) => (current + 1) % TRACKS.length)
  }

  const onTimeUpdate = () => {
    const audio = audioRef.current
    if (audio.duration) setProgress(audio.currentTime / audio.duration)
  }

  const seek = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const ratio = (event.clientX - rect.left) / rect.width
    const audio = audioRef.current
    if (audio.duration) audio.currentTime = ratio * audio.duration
  }

  return (
    <Motion.div drag dragMomentum={false} whileDrag={{ scale: 1.05 }} className="fixed bottom-4 left-4 z-40 cursor-grab active:cursor-grabbing">
      <audio ref={audioRef} src={track.src} onTimeUpdate={onTimeUpdate} onEnded={nextTrack} preload="none" />

      {/* ponytail: no AnimatePresence — StrictMode + framer eats the exit unmount */}
      {open ? (
          <Motion.div
            key="player"
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className="w-64 rounded-2xl border border-border/60 bg-card/90 p-4 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">{track.title}</p>
                <p className="font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground">
                  focus radio · {trackIndex + 1}/{TRACKS.length}
                </p>
              </div>
              <EqBars playing={playing} />
            </div>

            <button
              type="button"
              aria-label="Seek"
              onClick={seek}
              className="mt-3 block h-1.5 w-full cursor-pointer overflow-hidden rounded-full bg-secondary"
            >
              <div className="h-full rounded-full bg-primary transition-[width] duration-300" style={{ width: `${progress * 100}%` }} />
            </button>

            <div className="mt-3 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPlaying((current) => !current)}
                aria-label={playing ? 'Pause' : 'Play'}
                className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-110"
              >
                {playing ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
              </button>
              <button
                type="button"
                onClick={nextTrack}
                aria-label="Next track"
                className="grid h-9 w-9 place-items-center rounded-full border border-border bg-secondary text-muted-foreground transition-all hover:scale-110 hover:text-foreground"
              >
                <SkipForward size={15} />
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Minimize player"
                className="ml-auto grid h-9 w-9 place-items-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
              >
                <X size={15} />
              </button>
            </div>
          </Motion.div>
        ) : (
          <Motion.button
            key="fab"
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open music player"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="grid h-12 w-12 place-items-center rounded-full border border-border/60 bg-card/90 text-muted-foreground shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)] backdrop-blur-2xl hover:text-foreground"
          >
            {playing ? <EqBars playing /> : <Music size={18} />}
          </Motion.button>
        )}
    </Motion.div>
  )
}
