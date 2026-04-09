import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import SplitText from '@/components/common/SplitText'
import MagneticButton from '@/components/common/MagneticButton'

const tagline = ['Brand', 'UI/UX', 'Social', 'Print']

const Hero = () => {
  const [ready, setReady] = useState(false)

  // Mouse tracking setup
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 400 })
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 400 })

  // Transform vectors for parallax
  const titleX = useTransform(smoothX, [-0.5, 0.5], [-25, 25])
  const titleY = useTransform(smoothY, [-0.5, 0.5], [-25, 25])
  const blob1X = useTransform(smoothX, [-0.5, 0.5], [-60, 60])
  const blob1Y = useTransform(smoothY, [-0.5, 0.5], [-60, 60])
  const blob2X = useTransform(smoothX, [-0.5, 0.5], [60, -60])
  const blob2Y = useTransform(smoothY, [-0.5, 0.5], [60, -60])
  const stampX = useTransform(smoothX, [-0.5, 0.5], [15, -15])
  const stampY = useTransform(smoothY, [-0.5, 0.5], [15, -15])

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 100)
    
    // Mouse move listener for parallax
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5)
      mouseY.set(e.clientY / window.innerHeight - 0.5)
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      clearTimeout(t)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [mouseX, mouseY])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-bg-primary"
    >
      {/* Animated parallax mesh background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div style={{ x: blob1X, y: blob1Y }} className="absolute -top-1/4 -left-1/4 w-[80vw] h-[80vw]">
          <motion.div
            className="w-full h-full rounded-full opacity-[0.04]"
            style={{ background: 'radial-gradient(circle, #FFD60A 0%, transparent 70%)' }}
            animate={{ scale: [1, 1.05, 1], opacity: [0.03, 0.05, 0.03] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        <motion.div style={{ x: blob2X, y: blob2Y }} className="absolute -bottom-1/4 -right-1/4 w-[70vw] h-[70vw]">
          <motion.div
            className="w-full h-full rounded-full opacity-[0.035]"
            style={{ background: 'radial-gradient(circle, #FF4D1C 0%, transparent 70%)' }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.03, 0.04, 0.03] }}
            transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />
        </motion.div>
      </div>

      <div className="container-site relative z-10 pt-32 pb-20">
        {/* Top row — availability + scroll hint */}
        <div className="flex items-center justify-between mb-16">
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
            <span className="font-mono-custom text-[0.65rem] tracking-[0.2em] uppercase text-accent-green">
              Available for work
            </span>
          </motion.div>

          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span className="font-mono-custom text-[0.65rem] tracking-[0.2em] uppercase text-text-muted">
              Scroll
            </span>
            <motion.div
              className="w-px h-8 bg-text-muted origin-top"
              animate={{ scaleY: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </div>

        {/* Hero headline with Mouse Parallax */}
        <motion.div className="mb-10 relative" style={{ x: titleX, y: titleY }}>
          <h1 className="text-fluid-hero font-display font-bold leading-[0.88] tracking-tight text-text-primary uppercase relative z-10 w-fit">
            <SplitText text="Diksha" delay={0.3} animate={ready} />
            <br />
            <span className="flex items-end gap-4 flex-wrap">
              <SplitText text="Jain" delay={0.5} animate={ready} />
              <motion.span
                className="text-stroke font-display font-bold leading-none"
                style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)' }}
                initial={{ opacity: 0 }}
                animate={ready ? { opacity: 1 } : {}}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                .
              </motion.span>
            </span>
          </h1>

          {/* Animated Spinning Stamp */}
          <motion.div 
            className="absolute -right-8 -top-8 md:-right-16 md:-top-16 w-32 h-32 md:w-40 md:h-40 rounded-full border border-border/30 hidden sm:flex items-center justify-center opacity-40 mix-blend-difference pointer-events-none"
            style={{ x: stampX, y: stampY }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={ready ? { opacity: 0.5, scale: 1 } : {}}
            transition={{ delay: 1, duration: 1 }}
          >
            <motion.div 
              className="w-full h-full relative"
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
                <text>
                  <textPath href="#circlePath" className="font-mono-custom text-[0.45rem] tracking-[0.25em] fill-text-primary uppercase">
                    · Diksha Jain · Graphic Portfolio · 2024
                  </textPath>
                </text>
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Subtitle row */}
        <motion.div
          className="overflow-clip mb-12"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <motion.div
            className="flex items-center gap-4 flex-wrap"
            initial={{ x: -40 }}
            animate={ready ? { x: 0 } : {}}
            transition={{ delay: 0.9, duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
          >
            <div className="w-12 h-px bg-accent-yellow flex-shrink-0" />
            <div className="flex items-center gap-3 flex-wrap">
              {tagline.map((t, i) => (
                <span key={t} className="flex items-center gap-3">
                  <span className="font-mono-custom text-[0.7rem] tracking-[0.15em] uppercase text-text-secondary">
                    {t}
                  </span>
                  {i < tagline.length - 1 && (
                    <span className="w-1 h-1 rounded-full bg-text-muted" />
                  )}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom CTA row */}
        <motion.div
          className="flex items-center justify-between flex-wrap gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.1, duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
        >
          <MagneticButton strength={0.4}>
            <Link
              to="/work"
              id="hero-view-work"
              className="group flex items-center gap-4 bg-accent-yellow text-bg-primary px-8 py-4 font-mono-custom text-[0.7rem] tracking-[0.2em] uppercase font-medium hover:bg-text-primary transition-colors duration-300"
            >
              View Work
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </MagneticButton>

          <div className="font-mono-custom text-[0.65rem] tracking-[0.2em] uppercase text-text-muted">
            2024 Portfolio
          </div>
        </motion.div>
      </div>

      {/* Bottom marquee */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-border py-3 overflow-hidden">
        <motion.div
          className="flex gap-12 whitespace-nowrap"
          animate={{ x: [0, '-50%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          {Array(8).fill(null).map((_, i) => (
            <span key={i} className="font-mono-custom text-[0.6rem] tracking-[0.3em] uppercase text-text-muted flex-shrink-0">
              Brand Identity · UI/UX Design · Social Media · Editorial · Packaging ·
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
