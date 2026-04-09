import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/**
 * RevealText — reveals a block of text (line by line) when scrolled into view.
 *
 * @param {string|ReactNode} children
 * @param {string}           className
 * @param {number}           delay      - Stagger delay per line in seconds
 * @param {string}           as         - HTML tag to render ('p', 'h2', 'span', etc.)
 */
const RevealText = ({
  children,
  className = '',
  delay = 0,
  duration = 0.7,
  as: Tag = 'p',
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' })

  return (
    <div ref={ref} className="overflow-clip">
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: '100%', opacity: 0 }}
        transition={{ duration, delay, ease: [0.33, 1, 0.68, 1] }}
      >
        <Tag className={className}>{children}</Tag>
      </motion.div>
    </div>
  )
}

export default RevealText
