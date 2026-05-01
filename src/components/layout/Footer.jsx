import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import MagneticButton from '@/components/common/MagneticButton'
import { ArrowUp } from 'lucide-react'

const SOCIAL_LINKS = [
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/diksha-jain-b30457334?utm_source=share_via&utm_content=profile&utm_medium=member_android' },
]

const NAV_LINKS = [
  { label: 'Work',    path: '/work' },
  { label: 'About',   path: '/about' },
  { label: 'Contact', path: '/contact' },
]

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-bg-primary">
      {/* Upper section */}
      <div className="container-site py-16 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 bg-accent-yellow rounded-sm flex items-center justify-center">
              <span className="font-display font-black text-bg-primary text-sm leading-none">D</span>
            </span>
            <span className="font-mono-custom text-[0.7rem] tracking-[0.2em] uppercase text-text-secondary">
              Diksha Jain
            </span>
          </div>
          <p className="font-mono-custom text-[0.72rem] leading-relaxed text-text-muted max-w-[220px]">
            Graphic designer crafting bold visual identities and digital experiences.
          </p>
          {/* Availability */}
          <div className="flex items-center gap-2 mt-1">
            <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
            <span className="font-mono-custom text-[0.65rem] tracking-[0.1em] uppercase text-accent-green">
              Available for work
            </span>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-4">
          <div className="label-line text-text-muted">Pages</div>
          <nav className="flex flex-col gap-3">
            {[{ label: 'Home', path: '/' }, ...NAV_LINKS].map(({ label, path }) => (
              <NavLink
                key={path}
                to={path}
                className="font-mono-custom text-[0.75rem] tracking-[0.1em] uppercase text-text-muted hover:text-text-primary transition-colors duration-200 w-fit"
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Social + Contact */}
        <div className="flex flex-col gap-4">
          <div className="label-line text-text-muted">Connect</div>
          <div className="flex flex-col gap-3">
            {SOCIAL_LINKS.map(({ label, url }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono-custom text-[0.75rem] tracking-[0.1em] uppercase text-text-muted hover:text-accent-yellow transition-colors duration-200 group flex items-center gap-2 w-fit"
              >
                <span className="w-3 h-px bg-text-muted group-hover:bg-accent-yellow group-hover:w-5 transition-all duration-200" />
                {label}
              </a>
            ))}
          </div>
          <a
            href="mailto:dikshajain2026@gmail.com"
            className="mt-2 font-mono-custom text-[0.7rem] text-text-secondary hover:text-text-primary transition-colors"
          >
           dikshajain2026@gmail.com
          </a>
        </div>
      </div>

      {/* Lower bar */}
      <div className="container-site border-t border-border py-6 flex items-center justify-between">
        <p className="font-mono-custom text-[0.65rem] tracking-[0.1em] text-text-muted">
          © {year} Diksha Jain. All rights reserved.
        </p>

        {/* Back to top */}
        <MagneticButton strength={0.5}>
          <button
            id="back-to-top"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="group flex items-center gap-2 font-mono-custom text-[0.65rem] tracking-[0.15em] uppercase text-text-muted hover:text-text-primary transition-colors"
          >
            Back to top
            <span className="w-7 h-7 border border-border group-hover:border-accent-yellow flex items-center justify-center transition-colors">
              <ArrowUp size={12} />
            </span>
          </button>
        </MagneticButton>
      </div>
    </footer>
  )
}

export default Footer
