import { motion } from 'framer-motion'

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0,
    },
  },
}

const wordContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0,
    },
  },
}

const charVariant = {
  hidden: { y: '110%', opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.33, 1, 0.68, 1],
    },
  },
}

/**
 * SplitText — splits text into individual characters or words with staggered entrance.
 *
 * @param {string}  text      - The text to animate
 * @param {string}  className - Wrapper class
 * @param {string}  splitBy   - 'chars' (default) | 'words'
 * @param {number}  delay     - Delay before animation starts (seconds)
 * @param {boolean} animate   - Control whether animation plays
 */
const SplitText = ({
  text,
  className = '',
  splitBy = 'chars',
  delay = 0,
  animate: shouldAnimate = true,
}) => {
  if (splitBy === 'words') {
    const words = text.split(' ')
    return (
      <motion.span
        className={`inline-flex flex-wrap gap-x-[0.25em] ${className}`}
        variants={{
          ...wordContainer,
          visible: {
            ...wordContainer.visible,
            transition: {
              ...wordContainer.visible.transition,
              delayChildren: delay,
            },
          },
        }}
        initial="hidden"
        animate={shouldAnimate ? 'visible' : 'hidden'}
      >
        {words.map((word, wi) => (
          <span key={wi} className="overflow-clip inline-block">
            <motion.span className="inline-block" variants={charVariant}>
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    )
  }

  // Split by characters
  const chars = text.split('')
  return (
    <motion.span
      className={`inline-flex flex-wrap ${className}`}
      variants={{
        ...container,
        visible: {
          ...container.visible,
          transition: {
            ...container.visible.transition,
            delayChildren: delay,
          },
        },
      }}
      initial="hidden"
      animate={shouldAnimate ? 'visible' : 'hidden'}
    >
      {chars.map((char, i) => (
        <span key={i} className="overflow-clip inline-block">
          <motion.span
            className="inline-block"
            variants={charVariant}
            style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

export default SplitText
