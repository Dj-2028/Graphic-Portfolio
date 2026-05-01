import { useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { projects, categories, getByCategory, marketingPosters } from '@/data/projects'
import RevealText from '@/components/common/RevealText'

/* ─── Bento layout map for project cards ───────────────────────────────
   12-column grid. Each entry = [colSpan, rowSpan] cycling per project.
   Odd-indexed rows get a 7+5 split; even get 5+7 for editorial rhythm.
────────────────────────────────────────────────────────────────────────*/
const BENTO_SPANS = [
  'md:col-span-7',  // 0 — wide feature
  'md:col-span-5',  // 1 — narrow
  'md:col-span-5',  // 2 — narrow
  'md:col-span-7',  // 3 — wide feature
  'md:col-span-6',  // 4 — half
  'md:col-span-6',  // 5 — half
  'md:col-span-8',  // 6 — large
  'md:col-span-4',  // 7 — small
  'md:col-span-4',  // 8 — small
  'md:col-span-8',  // 9 — large
  'md:col-span-6',  // 10 — half
  'md:col-span-6',  // 11 — half
]

/* ─── Project Bento Card ───────────────────────────────────────────── */
const ProjectCard = ({ project, index }) => {
  const [hovered, setHovered] = useState(false)
  const colSpan = BENTO_SPANS[index % BENTO_SPANS.length]

  return (
    <motion.div
      layout
      className={`col-span-12 ${colSpan}`}
      initial={{ opacity: 0, y: 48 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.33, 1, 0.68, 1] }}
    >
      <Link
        to={`/work/${project.slug}`}
        id={`project-card-${project.id}`}
        className="group relative block overflow-hidden bg-bg-card h-full"
        style={{ minHeight: colSpan.includes('7') || colSpan.includes('8') ? '420px' : '320px' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        data-cursor="link"
      >
        {/* Image */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover"
            animate={{ scale: hovered ? 1.06 : 1 }}
            transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
            loading="lazy"
          />
        </div>

        {/* Gradient overlay */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-end p-6"
          style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.3) 50%, transparent 100%)' }}
          animate={{ opacity: hovered ? 1 : 0.75 }}
          transition={{ duration: 0.35 }}
        >
          {/* Category tag */}
          <motion.div className="overflow-clip mb-2" initial={false}>
            <motion.span
              className="inline-block font-mono-custom text-[0.6rem] tracking-[0.2em] uppercase px-2 py-1"
              style={{ backgroundColor: project.color, color: '#0A0A0A' }}
              animate={{ y: hovered ? 0 : 12, opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {project.category}
            </motion.span>
          </motion.div>

          <h3 className="font-display font-bold text-2xl text-text-primary leading-tight mb-2">
            {project.title}
          </h3>

          <motion.p
            className="font-mono-custom text-[0.68rem] leading-relaxed text-text-secondary mb-3 max-w-xs"
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
            transition={{ duration: 0.3, delay: 0.05 }}
          >
            {project.description?.slice(0, 80)}...
          </motion.p>

          <motion.div
            className="flex items-center gap-2 font-mono-custom text-[0.65rem] tracking-[0.15em] uppercase text-text-secondary"
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
            transition={{ duration: 0.3, delay: 0.08 }}
          >
            View Project <ArrowRight size={11} />
          </motion.div>
        </motion.div>

        {/* Accent border on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ boxShadow: `inset 0 0 0 1.5px ${project.color}` }}
          animate={{ opacity: hovered ? 0.5 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Number badge */}
        <div className="absolute top-4 right-4 font-mono-custom text-[0.65rem] tracking-widest text-text-muted bg-bg-primary/60 px-2 py-1">
          {project.id}
        </div>
      </Link>
    </motion.div>
  )
}

/* ─── Marketing Poster Card (animated on scroll) ───────────────────── */
const POSTER_SPANS = [
  { col: 'col-span-4', row: 'row-span-2' },
  { col: 'col-span-4', row: 'row-span-1' },
  { col: 'col-span-4', row: 'row-span-1' },
  { col: 'col-span-3', row: 'row-span-2' },
  { col: 'col-span-6', row: 'row-span-1' },
  { col: 'col-span-3', row: 'row-span-1' },
  { col: 'col-span-5', row: 'row-span-2' },
  { col: 'col-span-4', row: 'row-span-1' },
  { col: 'col-span-3', row: 'row-span-1' },
  { col: 'col-span-4', row: 'row-span-2' },
  { col: 'col-span-8', row: 'row-span-1' },
  { col: 'col-span-4', row: 'row-span-1' },
]

const PosterCard = ({ poster, index, onClick }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' })
  const [hovered, setHovered] = useState(false)
  const pattern = POSTER_SPANS[index % POSTER_SPANS.length]

  return (
    <motion.div
      ref={ref}
      className={`${pattern.col} ${pattern.row} relative overflow-hidden cursor-pointer`}
      style={{ minHeight: pattern.row === 'row-span-2' ? '300px' : '150px' }}
      initial={{ opacity: 0, scale: 0.94, y: 20 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: (index % 6) * 0.06, ease: [0.33, 1, 0.68, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(poster)}
    >
      <motion.img
        src={poster.src}
        alt={poster.alt}
        className="w-full h-full object-cover"
        animate={{ scale: hovered ? 1.07 : 1 }}
        transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
        loading="lazy"
      />

      {/* Shimmer on enter */}
      {inView && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,214,10,0.15) 50%, transparent 60%)' }}
          initial={{ x: '-100%' }}
          animate={{ x: '200%' }}
          transition={{ duration: 0.7, delay: (index % 6) * 0.06 + 0.2, ease: 'easeOut' }}
        />
      )}

      {/* Hover overlay */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ background: 'rgba(10,10,10,0.55)' }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.22 }}
      >
        <div className="flex flex-col items-center gap-2">
          <ExternalLink size={20} className="text-white" />
          <span className="font-mono-custom text-[0.6rem] tracking-[0.2em] uppercase text-white">
            #{poster.id}
          </span>
        </div>
      </motion.div>

      {/* Yellow border on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 0 2px #FFD60A' }}
        animate={{ opacity: hovered ? 0.7 : 0 }}
        transition={{ duration: 0.22 }}
      />
    </motion.div>
  )
}

/* ─── Lightbox ─────────────────────────────────────────────────────── */
const Lightbox = ({ poster, onClose }) => {
  if (!poster) return null
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10"
      style={{ background: 'rgba(10,10,10,0.92)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative max-w-4xl w-full"
        initial={{ scale: 0.88, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.88, y: 30 }}
        transition={{ duration: 0.38, ease: [0.33, 1, 0.68, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={poster.src}
          alt={poster.alt}
          className="w-full h-auto max-h-[85vh] object-contain"
        />
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-bg-primary text-text-primary font-mono-custom text-xs hover:bg-accent-yellow hover:text-bg-primary transition-colors"
        >
          ✕
        </button>
        <p className="mt-3 font-mono-custom text-[0.6rem] tracking-[0.2em] uppercase text-text-muted text-center">
          Marketing Poster — #{poster.id}
        </p>
      </motion.div>
    </motion.div>
  )
}

/* ─── Main WorkGrid ─────────────────────────────────────────────────── */
const WorkGrid = () => {
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightbox, setLightbox] = useState(null)
  const [showAll, setShowAll] = useState(false)

  const filtered = getByCategory(activeCategory)
  const INITIAL_COUNT = 18
  const visiblePosters = showAll ? marketingPosters : marketingPosters.slice(0, INITIAL_COUNT)

  return (
    <>
      <section id="work" className="section-padding bg-bg-primary">
        <div className="container-site">

          {/* ── Header ── */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <div className="label-line mb-4">Selected Work</div>
              <RevealText as="h2" className="text-fluid-h2 font-display font-bold text-text-primary">
                Projects
              </RevealText>
            </div>

            {/* Filter tabs */}
            <div
              className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none -mr-4 md:mr-0 md:flex-wrap"
              role="tablist"
              aria-label="Project categories"
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  id={`filter-${cat.toLowerCase().replace(/[\s&]+/g, '-')}`}
                  role="tab"
                  aria-selected={activeCategory === cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative flex-shrink-0 font-mono-custom text-[0.6rem] tracking-[0.12em] uppercase px-3 py-2 transition-colors duration-200 whitespace-nowrap ${
                    activeCategory === cat ? 'text-bg-primary' : 'text-text-muted hover:text-text-primary'
                  }`}
                >
                  {activeCategory === cat && (
                    <motion.span
                      layoutId="filter-active"
                      className="absolute inset-0 bg-accent-yellow"
                      transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              ))}
            </div>
          </div>

          {/* ── Bento Project Grid ── */}
          <motion.div
            layout
            className="grid grid-cols-12 gap-3 md:gap-4 mb-28"
          >
            <AnimatePresence mode="sync">
              {filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* ── Marketing Gallery ── */}
          <div className="mb-8">
            <div className="label-line mb-4">Marketing Gallery</div>
            <RevealText as="h3" className="text-fluid-h3 font-display font-bold text-text-primary mb-10">
              All Marketing Posters
            </RevealText>

            <div
              className="grid gap-2 md:gap-3"
              style={{ gridTemplateColumns: 'repeat(12, 1fr)', gridAutoRows: '150px' }}
            >
              <AnimatePresence>
                {visiblePosters.map((poster, i) => (
                  <PosterCard key={poster.id} poster={poster} index={i} onClick={setLightbox} />
                ))}
              </AnimatePresence>
            </div>

            {marketingPosters.length > INITIAL_COUNT && (
              <div className="flex justify-center mt-10">
                <button
                  id="toggle-more-posters"
                  onClick={() => setShowAll((v) => !v)}
                  className="group flex items-center gap-3 font-mono-custom text-[0.7rem] tracking-[0.2em] uppercase text-text-secondary hover:text-text-primary transition-colors border-b border-border hover:border-text-primary pb-1"
                >
                  {showAll ? 'Show Less' : `View All ${marketingPosters.length} Posters`}
                  <ArrowRight
                    size={12}
                    className={`group-hover:translate-x-1 transition-transform ${showAll ? 'rotate-180' : ''}`}
                  />
                </button>
              </div>
            )}
          </div>

          {/* ── CTA ── */}
          <div className="flex justify-center mt-16">
            <Link
              to="/work"
              id="work-see-all"
              className="group flex items-center gap-3 font-mono-custom text-[0.7rem] tracking-[0.2em] uppercase text-text-secondary hover:text-text-primary transition-colors border-b border-border hover:border-text-primary pb-1"
            >
              See all projects
              <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && <Lightbox poster={lightbox} onClose={() => setLightbox(null)} />}
      </AnimatePresence>
    </>
  )
}

export default WorkGrid
