import { useEffect, useRef, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'
import { useMousePosition } from '@/hooks/useMousePosition'

const CustomCursor = () => {
  const [cursorType, setCursorType] = useState('default') // 'default' | 'link' | 'drag' | 'hidden'
  const { x: mouseX, y: mouseY } = useMousePosition()

  // Spring configs for main cursor and trailing dot
  const springConfig = { damping: 28, stiffness: 300, mass: 0.5 }
  const dotConfig   = { damping: 20, stiffness: 400, mass: 0.3 }

  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)
  const dotX    = useSpring(mouseX, dotConfig)
  const dotY    = useSpring(mouseY, dotConfig)

  useEffect(() => {
    cursorX.set(mouseX)
    cursorY.set(mouseY)
    dotX.set(mouseX)
    dotY.set(mouseY)
  }, [mouseX, mouseY])

  useEffect(() => {
    const handleOver = (e) => {
      const target = e.target.closest('a, button, [data-cursor]')
      if (!target) {
        setCursorType('default')
        return
      }
      const type = target.getAttribute('data-cursor')
      if (type === 'drag') setCursorType('drag')
      else setCursorType('link')
    }

    window.addEventListener('mouseover', handleOver)
    return () => window.removeEventListener('mouseover', handleOver)
  }, [])

  const cursorSize = cursorType === 'link' ? 70 : cursorType === 'drag' ? 80 : 36
  const cursorOpacity = cursorType === 'hidden' ? 0 : 1

  return (
    <>
      {/* Main cursor ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] flex items-center justify-center mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: '#F5F0E8',
        }}
        animate={{
          width: cursorSize,
          height: cursorSize,
          opacity: cursorOpacity,
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        {cursorType === 'drag' && (
          <span className="font-mono-custom text-[0.55rem] tracking-widest uppercase text-bg-primary font-medium">
            DRAG
          </span>
        )}
      </motion.div>

      {/* Trailing dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9997] bg-accent-yellow"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{ opacity: cursorType === 'drag' ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />
    </>
  )
}

export default CustomCursor
