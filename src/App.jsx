import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import { HomePage } from './pages/home'
import { WorkPage } from './pages/work'
import { MusicPlayer } from './components/music-player'
import { ClickSparks } from './components/click-sparks'
import { applyThemeColor, clearThemeColor } from './lib/theme'

function App() {
  // One picked color drives the entire theme: hue tints every surface,
  // lightness decides dark vs light. null = system default.
  const [themeColor, setThemeColor] = useState(() => localStorage.getItem('themeColor'))

  useEffect(() => {
    if (themeColor) {
      applyThemeColor(themeColor)
      localStorage.setItem('themeColor', themeColor)
    } else {
      clearThemeColor()
      localStorage.removeItem('themeColor')
    }
  }, [themeColor])

  useEffect(() => {
    // Lenis smooth scrolling initialization
    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    })

    return () => {
      lenis.destroy()
    }
  }, [])

  // ponytail: hash routing — two pages don't need react-router
  const [route, setRoute] = useState(window.location.hash)

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash)
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const isWork = route.startsWith('#/work')

  useEffect(() => {
    if (isWork) window.scrollTo(0, 0)
  }, [isWork])

  // ponytail: plain scroll listener — framer useScroll drops its listener under StrictMode
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(max > 0 ? window.scrollY / max : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <div
        className="fixed inset-x-0 top-0 z-[110] h-[2.5px] origin-left bg-primary transition-transform duration-150 ease-out"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />
      {isWork ? (
        <WorkPage themeColor={themeColor} onPickColor={setThemeColor} />
      ) : (
        <HomePage themeColor={themeColor} onPickColor={setThemeColor} />
      )}
      <MusicPlayer />
      <ClickSparks />
    </>
  )
}

export default App
