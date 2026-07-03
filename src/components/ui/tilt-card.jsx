import { useRef } from 'react'
import { motion as Motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

// Mouse-tracking 3D tilt wrapper. Wrap any card to give it perspective depth.
export function TiltCard({ children, className, max = 8 }) {
  const ref = useRef(null)
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)
  const spring = { stiffness: 220, damping: 22 }
  const rotateX = useSpring(useTransform(y, [0, 1], [max, -max]), spring)
  const rotateY = useSpring(useTransform(x, [0, 1], [-max, max]), spring)

  const onMouseMove = (event) => {
    const rect = ref.current.getBoundingClientRect()
    x.set((event.clientX - rect.left) / rect.width)
    y.set((event.clientY - rect.top) / rect.height)
  }

  const onMouseLeave = () => {
    x.set(0.5)
    y.set(0.5)
  }

  return (
    <Motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', transformPerspective: 900 }}
      className={className}
    >
      {children}
    </Motion.div>
  )
}
