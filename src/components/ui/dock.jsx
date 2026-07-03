import * as React from 'react'
import { motion as Motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { cn } from '../../lib/utils'

const DEFAULT_MAGNIFICATION = 60
const DEFAULT_DISTANCE = 100
const BASE_SIZE = 40
const BASE_ICON_SIZE = 20
const ICON_SIZE_RATIO = 0.5
const SPRING = { mass: 0.1, stiffness: 150, damping: 12 }

const DockContext = React.createContext(null)

export const Dock = ({ className, children, magnification = DEFAULT_MAGNIFICATION, distance = DEFAULT_DISTANCE }) => {
  const mouseX = useMotionValue(Infinity)

  return (
    <DockContext.Provider value={{ mouseX, magnification, distance }}>
      <Motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className={cn("mx-auto w-max h-full flex items-end justify-center overflow-visible rounded-full", className)}
      >
        {children}
      </Motion.div>
    </DockContext.Provider>
  )
}

export const DockIcon = ({ className, children }) => {
  const ref = React.useRef(null)
  const context = React.useContext(DockContext)

  if (!context) {
    throw new Error("DockIcon must be used within a Dock component")
  }

  const { mouseX, magnification, distance } = context

  const distanceCalc = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })

  const containerSize = useSpring(
    useTransform(distanceCalc, [-distance, 0, distance], [BASE_SIZE, magnification, BASE_SIZE]),
    SPRING
  )
  const iconSize = useSpring(
    useTransform(distanceCalc, [-distance, 0, distance], [BASE_ICON_SIZE, magnification * ICON_SIZE_RATIO, BASE_ICON_SIZE]),
    SPRING
  )

  return (
    <Motion.div
      ref={ref}
      style={{ width: containerSize, height: containerSize }}
      className={cn("relative flex aspect-square items-center justify-center rounded-full shrink-0", className)}
    >
      <Motion.div
        style={{ width: iconSize, height: iconSize }}
        className="flex items-center justify-center"
      >
        {children}
      </Motion.div>
    </Motion.div>
  )
}
