import { useState } from 'react'
import { Dices, Github, Home, Instagram, Linkedin, MonitorPlay, Palette, RotateCcw, SquareTerminal, Twitter } from 'lucide-react'
import { Tooltip, TooltipArrow, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { developer } from '../data/site'
import { Dock, DockIcon } from './ui/dock'

const NAV_ITEMS = [
  { label: 'Home', href: '#home', icon: Home },
  { label: 'Showcase', href: '#/work', icon: MonitorPlay },
]

// Preset theme colors — dark picks give a dark theme, light picks a light one
const PRESETS = ['#18181b', '#1e3a8a', '#4c1d95', '#064e3b', '#7c2d12', '#fafafa', '#dbeafe', '#fce7f3']

const SOCIAL_ITEMS = [
  { label: 'GitHub', href: developer.socials.github, icon: Github },
  { label: 'LinkedIn', href: developer.socials.linkedin, icon: Linkedin },
  { label: 'X', href: developer.socials.twitter, icon: Twitter },
  { label: 'Instagram', href: developer.socials.instagram, icon: Instagram },
]

export function Navbar({ onOpenTerminal, themeColor, onPickColor }) {
  const [paletteOpen, setPaletteOpen] = useState(false)
  // MagicUI exact semantic styles
  const iconClass = 'rounded-full flex items-center justify-center cursor-pointer size-full bg-secondary p-0 text-muted-foreground hover:text-foreground hover:bg-accent backdrop-blur-3xl border border-border transition-colors'
  const tooltipClass = 'rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]'

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40">
      {paletteOpen && (
        <div className="pointer-events-auto absolute bottom-full left-1/2 mb-3 flex max-w-[92vw] -translate-x-1/2 flex-wrap items-center justify-center gap-2 rounded-2xl border border-border/50 bg-card/90 p-2 shadow-[0_14px_28px_-20px_rgba(0,0,0,0.5)] backdrop-blur-3xl">
          {PRESETS.map((hex) => (
            <button
              key={hex}
              type="button"
              aria-label={`Theme ${hex}`}
              onClick={() => onPickColor(hex)}
              className={`h-6 w-6 rounded-full border-2 transition-transform hover:scale-125 ${themeColor === hex ? 'scale-110 border-foreground' : 'border-border/60'}`}
              style={{ background: hex }}
            />
          ))}
          <div className="mx-1 h-5 w-px bg-border" />
          <label
            title="Pick any color — it becomes the whole theme"
            className="relative h-6 w-6 cursor-pointer overflow-hidden rounded-full border border-border/60 transition-transform hover:scale-125"
            style={{ background: 'conic-gradient(#f43f5e, #f59e0b, #10b981, #3b82f6, #8b5cf6, #f43f5e)' }}
          >
            <input
              type="color"
              aria-label="Pick theme color"
              value={themeColor || '#18181b'}
              onChange={(event) => onPickColor(event.target.value)}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            />
          </label>
          <button
            type="button"
            aria-label="Random theme"
            title="Surprise me"
            onClick={() => onPickColor(`#${Math.floor(Math.random() * 0x1000000).toString(16).padStart(6, '0')}`)}
            className="grid h-6 w-6 place-items-center rounded-full text-muted-foreground transition-all hover:rotate-180 hover:text-foreground"
          >
            <Dices size={14} />
          </button>
          <button
            type="button"
            aria-label="Reset theme"
            title="Back to system theme"
            onClick={() => {
              onPickColor(null)
              setPaletteOpen(false)
            }}
            className="grid h-6 w-6 place-items-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
          >
            <RotateCcw size={13} />
          </button>
        </div>
      )}
      <TooltipProvider delayDuration={120}>
        <Dock className="z-50 pointer-events-auto relative p-2 h-14 w-fit mx-auto flex gap-2 border border-border/50 bg-card/90 backdrop-blur-3xl shadow-[0_0_10px_3px] shadow-primary/5">
          {NAV_ITEMS.map((link) => {
            const Icon = link.icon
            return (
              <Tooltip key={link.href}>
                <TooltipTrigger asChild>
                  <a href={link.href} aria-label={link.label} onPointerDown={(e) => e.preventDefault()}>
                    <DockIcon className={iconClass}>
                      <Icon className="size-full rounded-sm overflow-hidden object-contain" />
                    </DockIcon>
                  </a>
                </TooltipTrigger>
                <TooltipContent side="top" sideOffset={8} className={tooltipClass}>
                  <p>{link.label}</p>
                  <TooltipArrow className="fill-primary" />
                </TooltipContent>
              </Tooltip>
            )
          })}

          <Tooltip>
            <TooltipTrigger asChild>
              <button type="button" onClick={onOpenTerminal} onPointerDown={(e) => e.preventDefault()} aria-label="Open Terminal">
                <DockIcon className={iconClass}>
                  <SquareTerminal className="size-full rounded-sm overflow-hidden object-contain" />
                </DockIcon>
              </button>
            </TooltipTrigger>
            <TooltipContent side="top" sideOffset={8} className={tooltipClass}>
              <p>Terminal</p>
              <TooltipArrow className="fill-primary" />
            </TooltipContent>
          </Tooltip>

          <div className="hidden h-2/3 m-auto w-[1px] bg-border sm:block" />

          {SOCIAL_ITEMS.map((social) => {
            const Icon = social.icon
            return (
              <Tooltip key={social.label}>
                <TooltipTrigger asChild>
                  {/* socials hide on phones — the dock overflows otherwise; they're all in Contact anyway */}
                  <a href={social.href} target="_blank" rel="noreferrer" aria-label={social.label} onPointerDown={(e) => e.preventDefault()} className="hidden sm:block">
                    <DockIcon className={iconClass}>
                      <Icon className="size-full rounded-sm overflow-hidden object-contain" />
                    </DockIcon>
                  </a>
                </TooltipTrigger>
                <TooltipContent side="top" sideOffset={8} className={tooltipClass}>
                  <p>{social.label}</p>
                  <TooltipArrow className="fill-primary" />
                </TooltipContent>
              </Tooltip>
            )
          })}

          <div className="h-2/3 m-auto w-[1px] bg-border" />

          <Tooltip>
            <TooltipTrigger asChild>
              <button type="button" onClick={() => setPaletteOpen((current) => !current)} onPointerDown={(e) => e.preventDefault()} aria-label="Theme Color">
                <DockIcon className={iconClass}>
                  <Palette className="size-full rounded-sm overflow-hidden object-contain" />
                </DockIcon>
              </button>
            </TooltipTrigger>
            <TooltipContent side="top" sideOffset={8} className={tooltipClass}>
              <p>Theme</p>
              <TooltipArrow className="fill-primary" />
            </TooltipContent>
          </Tooltip>
        </Dock>
      </TooltipProvider>
    </div>
  )
}
