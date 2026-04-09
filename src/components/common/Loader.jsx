import { useEffect, useState, useRef } from 'react'
import { motion, useSpring, useMotionValue, animate } from 'framer-motion'

const Loader = ({ onComplete }) => {
  const [count, setCount] = useState(0)
  const counterRef = useRef(null)

  useEffect(() => {
    // Animated counter 0 → 100
    const controls = animate(0, 100, {
      duration: 2,
      ease: [0.33, 1, 0.68, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => {
        // Short pause, then exit
        setTimeout(() => {
          sessionStorage.setItem('loaderPlayed', 'true')
          onComplete()
        }, 400)
      },
    })

    return () => controls.stop()
  }, [onComplete])

  return (
    <motion.div
      key="loader"
      className="fixed inset-0 z-[9999] bg-bg-primary flex flex-col items-center justify-center overflow-hidden"
      exit={{
        clipPath: ['inset(0 0 0 0)', 'inset(0 0 100% 0)'],
        transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
      }}
    >
      {/* Accent line top */}
      <motion.div
        className="absolute top-0 left-0 h-[2px] bg-accent-yellow"
        initial={{ width: '0%' }}
        animate={{ width: `${count}%` }}
        transition={{ duration: 0.1 }}
      />

      {/* Counter */}
      <div className="relative">
        <motion.span
          ref={counterRef}
          className="loader-counter font-display select-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          {String(count).padStart(2, '0')}
        </motion.span>

        {/* Label */}
        <motion.span
          className="absolute -bottom-6 left-0 font-mono-custom text-[0.65rem] tracking-[0.25em] uppercase text-text-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Loading
        </motion.span>
      </div>

      {/* Brand name - appears at ~80% */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: count > 60 ? 1 : 0, y: count > 60 ? 0 : 10 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-6 h-[1px] bg-accent-yellow" />
        <span className="font-mono-custom text-[0.65rem] tracking-[0.3em] uppercase text-text-secondary">
          Diksha Jain
        </span>
        <div className="w-6 h-[1px] bg-accent-yellow" />
      </motion.div>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 w-8 h-8 border-t border-l border-border" />
      <div className="absolute top-8 right-8 w-8 h-8 border-t border-r border-border" />
      <div className="absolute bottom-8 left-8 w-8 h-8 border-b border-l border-border" />
      <div className="absolute bottom-8 right-8 w-8 h-8 border-b border-r border-border" />
    </motion.div>
  )
}

export default Loader
