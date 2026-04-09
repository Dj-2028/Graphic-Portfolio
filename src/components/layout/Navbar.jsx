import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import MagneticButton from '@/components/common/MagneticButton'

const NAV_LINKS = [
  { label: 'Work',    path: '/work' },
  { label: 'About',   path: '/about' },
  { label: 'Contact', path: '/contact' },
]

const navItemVariants = {
  closed: { y: '110%', opacity: 0 },
  open: (i) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, delay: i * 0.07, ease: [0.33, 1, 0.68, 1] },
  }),
}

const Navbar = () => {
  const [scrolled, setScrolled]  = useState(false)
  const [menuOpen, setMenuOpen]  = useState(false)
  const location = useLocation()

  // Close menu on route change
  useEffect(() => { setMenuOpen(false) }, [location])

  // Detect scroll for backdrop
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-500 ${
          scrolled ? 'py-4 bg-bg-primary/80 backdrop-blur-md border-b border-border' : 'py-7'
        }`}
      >
        <nav className="container-site flex items-center justify-between">
          {/* Logo / wordmark */}
          <MagneticButton strength={0.3}>
            <NavLink
              to="/"
              className="flex items-center gap-2 group"
              aria-label="Home"
            >
              <span className="w-7 h-7 bg-accent-yellow rounded-sm flex items-center justify-center">
                <span className="font-display font-black text-bg-primary text-sm leading-none">D</span>
              </span>
              <span className="font-mono-custom text-[0.7rem] tracking-[0.2em] uppercase text-text-secondary group-hover:text-text-primary transition-colors">
                Diksha Jain
              </span>
            </NavLink>
          </MagneticButton>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map(({ label, path }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `relative font-mono-custom text-[0.7rem] tracking-[0.15em] uppercase transition-colors duration-200 group ${
                    isActive ? 'text-text-primary' : 'text-text-muted hover:text-text-primary'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {label}
                    <motion.span
                      className="absolute -bottom-0.5 left-0 h-px bg-accent-yellow"
                      animate={{ width: isActive ? '100%' : '0%' }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    />
                  </>
                )}
              </NavLink>
            ))}

            {/* CTA */}
            <MagneticButton strength={0.3}>
              <a
                href="mailto:hello@dikshajain.com"
                className="font-mono-custom text-[0.65rem] tracking-[0.15em] uppercase px-5 py-2.5 border border-border-light text-text-secondary hover:border-accent-yellow hover:text-accent-yellow transition-all duration-300"
              >
                Hire Me
              </a>
            </MagneticButton>
          </div>

          {/* Mobile menu toggle */}
          <button
            id="menu-toggle"
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <motion.span
              className="block w-6 h-px bg-text-primary origin-center"
              animate={menuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block w-4 h-px bg-text-primary"
              animate={menuOpen ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block w-6 h-px bg-text-primary origin-center"
              animate={menuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </nav>
      </header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            className="fixed inset-0 z-[190] bg-bg-primary flex flex-col justify-center px-8"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Decorative label */}
            <div className="label-line mb-12 text-text-muted">
              Navigation
            </div>

            <nav className="flex flex-col gap-6">
              {[{ label: 'Home', path: '/' }, ...NAV_LINKS].map(({ label, path }, i) => (
                <div key={path} className="overflow-clip">
                  <motion.div
                    custom={i}
                    variants={navItemVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                  >
                    <NavLink
                      to={path}
                      className={({ isActive }) =>
                        `font-display text-fluid-h2 font-bold leading-none transition-colors ${
                          isActive ? 'text-accent-yellow' : 'text-text-primary hover:text-accent-yellow'
                        }`
                      }
                    >
                      {label}
                    </NavLink>
                  </motion.div>
                </div>
              ))}
            </nav>

            {/* Social row */}
            <motion.div
              className="absolute bottom-12 left-8 flex gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {['Instagram', 'Dribbble', 'Behance', 'LinkedIn'].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="font-mono-custom text-[0.65rem] tracking-[0.15em] uppercase text-text-muted hover:text-text-primary transition-colors"
                >
                  {s}
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
