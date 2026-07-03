import { useEffect } from 'react'

// Global click burst — spawns primary-colored sparks at every pointer press.
export function ClickSparks() {
  useEffect(() => {
    const onPointerDown = (event) => {
      for (let i = 0; i < 8; i++) {
        const spark = document.createElement('span')
        spark.className = 'click-spark'
        const angle = (Math.PI * 2 * i) / 8 + Math.random() * 0.6
        const radius = 22 + Math.random() * 26
        spark.style.left = `${event.clientX}px`
        spark.style.top = `${event.clientY}px`
        spark.style.setProperty('--dx', `${Math.cos(angle) * radius}px`)
        spark.style.setProperty('--dy', `${Math.sin(angle) * radius}px`)
        document.body.appendChild(spark)
        setTimeout(() => spark.remove(), 600)
      }
    }
    window.addEventListener('pointerdown', onPointerDown)
    return () => window.removeEventListener('pointerdown', onPointerDown)
  }, [])

  return null
}
