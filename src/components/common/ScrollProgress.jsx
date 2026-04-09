import { useScrollProgress } from '@/hooks/useScrollProgress'
import { motion } from 'framer-motion'

const ScrollProgress = () => {
  const progress = useScrollProgress()

  return (
    <motion.div
      className="fixed top-0 left-0 h-[2px] bg-accent-yellow z-[9990] origin-left"
      style={{ scaleX: progress / 100 }}
    />
  )
}

export default ScrollProgress
