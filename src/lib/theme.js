// Full-page theme derived from a single picked color.
// The hue tints every surface; the lightness decides dark vs light mode.

function hexToHsl(hex) {
  const n = parseInt(hex.slice(1), 16)
  const r = ((n >> 16) & 255) / 255
  const g = ((n >> 8) & 255) / 255
  const b = (n & 255) / 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const d = max - min
  const l = (max + min) / 2
  let h = 0
  let s = 0
  if (d) {
    s = d / (1 - Math.abs(2 * l - 1))
    if (max === r) h = ((g - b) / d) % 6
    else if (max === g) h = (b - r) / d + 2
    else h = (r - g) / d + 4
    h *= 60
    if (h < 0) h += 360
  }
  return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) }
}

const THEME_VARS = [
  '--background', '--foreground', '--card', '--card-foreground',
  '--primary', '--primary-foreground', '--secondary', '--secondary-foreground',
  '--muted', '--muted-foreground', '--accent', '--accent-foreground',
  '--border', '--input', '--ring',
  '--grid-line', '--beam-line', '--spotlight', '--aura-1', '--aura-2',
  '--app-start', '--app-mid', '--app-end', '--hover-border', '--hover-shadow',
]

let animFrame = null
let animTimeout = null
let currentHsl = null

// Smoothly interpolate from the current theme to the picked color.
export function applyThemeColor(hex) {
  const target = hexToHsl(hex)
  cancelAnimationFrame(animFrame)
  clearTimeout(animTimeout)

  if (!currentHsl) {
    // first paint (page load) — no animation
    setThemeVars(target)
    currentHsl = target
    return
  }

  const from = { ...currentHsl }
  let dh = target.h - from.h // shortest way around the hue wheel
  if (dh > 180) dh -= 360
  if (dh < -180) dh += 360

  const start = performance.now()
  const duration = 500
  const step = (now) => {
    const t = Math.min((now - start) / duration, 1)
    const e = 1 - Math.pow(1 - t, 3)
    setThemeVars({
      h: (from.h + dh * e + 360) % 360,
      s: from.s + (target.s - from.s) * e,
      l: from.l + (target.l - from.l) * e,
    })
    if (t < 1) animFrame = requestAnimationFrame(step)
    else currentHsl = target
  }
  animFrame = requestAnimationFrame(step)

  // rAF is paused in hidden/occluded tabs — guarantee the final state lands regardless
  animTimeout = setTimeout(() => {
    cancelAnimationFrame(animFrame)
    setThemeVars(target)
    currentHsl = target
  }, duration + 50)
}

function setThemeVars({ h, s, l }) {
  const dark = l < 55
  const root = document.documentElement
  root.classList.toggle('dark', dark)
  root.classList.toggle('light', !dark)

  const sat = Math.min(s, 28) // surface saturation stays subtle even for neon picks
  const c = (ss, ll, a) => (a != null ? `hsl(${h} ${ss}% ${ll}% / ${a})` : `hsl(${h} ${ss}% ${ll}%)`)

  const vars = dark
    ? {
        '--background': c(sat, 9),
        '--foreground': c(12, 96),
        '--card': c(sat, 12),
        '--card-foreground': c(12, 96),
        '--primary': c(s, Math.max(l, 65)),
        '--primary-foreground': c(sat, 12),
        '--secondary': c(sat, 19),
        '--secondary-foreground': c(12, 96),
        '--muted': c(sat, 19),
        '--muted-foreground': c(10, 70),
        '--accent': c(sat, 23),
        '--accent-foreground': c(12, 96),
        '--border': c(30, 90, 0.12),
        '--input': c(30, 90, 0.16),
        '--ring': c(s, 60),
        '--grid-line': c(30, 78, 0.09),
        '--beam-line': c(40, 90, 0.06),
        '--spotlight': c(50, 90, 0.1),
        '--aura-1': c(60, 70, 0.08),
        '--aura-2': c(60, 50, 0.08),
        '--app-start': c(sat, 5),
        '--app-mid': c(sat, 8),
        '--app-end': c(sat, 11),
        '--hover-border': c(40, 90, 0.18),
        '--hover-shadow': c(50, 5, 0.3),
      }
    : {
        '--background': c(sat, 99),
        '--foreground': c(sat, 12),
        '--card': c(sat, 98),
        '--card-foreground': c(sat, 12),
        '--primary': c(s, Math.min(l, 42)),
        '--primary-foreground': c(10, 98),
        '--secondary': c(sat, 94),
        '--secondary-foreground': c(sat, 16),
        '--muted': c(sat, 94),
        '--muted-foreground': c(12, 45),
        '--accent': c(sat, 92),
        '--accent-foreground': c(sat, 16),
        '--border': c(sat, 85),
        '--input': c(sat, 85),
        '--ring': c(s, 55),
        '--grid-line': c(30, 25, 0.08),
        '--beam-line': c(30, 25, 0.08),
        '--spotlight': c(40, 30, 0.08),
        '--aura-1': c(50, 45, 0.07),
        '--aura-2': c(50, 35, 0.05),
        '--app-start': c(sat, 98),
        '--app-mid': c(sat, 96),
        '--app-end': c(sat, 92),
        '--hover-border': c(40, 20, 0.2),
        '--hover-shadow': c(40, 20, 0.12),
      }

  for (const [key, value] of Object.entries(vars)) root.style.setProperty(key, value)
}

export function clearThemeColor() {
  cancelAnimationFrame(animFrame)
  clearTimeout(animTimeout)
  currentHsl = null
  const root = document.documentElement
  for (const key of THEME_VARS) root.style.removeProperty(key)
  const dark = window.matchMedia('(prefers-color-scheme: dark)').matches
  root.classList.toggle('dark', dark)
  root.classList.toggle('light', !dark)
}
