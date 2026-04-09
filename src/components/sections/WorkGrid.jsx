import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { projects, categories, getByCategory } from '@/data/projects'
import RevealText from '@/components/common/RevealText'

const ProjectCard = ({ project, index }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.33, 1, 0.68, 1] }}
    >
      <Link
        to={`/work/${project.slug}`}
        id={`project-card-${project.id}`}
        className="group relative block overflow-hidden bg-bg-card"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        data-cursor="link"
      >
        {/* Image */}
        <div className="aspect-project overflow-hidden">
          <motion.img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover"
            animate={{ scale: hovered ? 1.07 : 1 }}
            transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
            loading="lazy"
          />
        </div>

        {/* Overlay */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-end p-6"
          style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.92) 0%, transparent 55%)' }}
          animate={{ opacity: hovered ? 1 : 0.6 }}
          transition={{ duration: 0.3 }}
        >
          {/* Category tag slides up */}
          <motion.div
            className="overflow-clip mb-2"
            initial={false}
          >
            <motion.span
              className="inline-block font-mono-custom text-[0.6rem] tracking-[0.2em] uppercase px-2 py-1"
              style={{ backgroundColor: project.color, color: '#0A0A0A' }}
              animate={{ y: hovered ? 0 : 10, opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {project.category}
            </motion.span>
          </motion.div>

          <h3 className="font-display font-bold text-xl text-text-primary leading-tight mb-1">
            {project.title}
          </h3>

          <motion.div
            className="flex items-center gap-2 font-mono-custom text-[0.65rem] tracking-[0.15em] uppercase text-text-secondary"
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
            transition={{ duration: 0.3, delay: 0.05 }}
          >
            View Project <ArrowRight size={11} />
          </motion.div>
        </motion.div>

        {/* Accent border on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ boxShadow: `inset 0 0 0 1px ${project.color}` }}
          animate={{ opacity: hovered ? 0.4 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Project number */}
        <div className="absolute top-4 right-4 font-mono-custom text-[0.65rem] tracking-widest text-text-muted">
          {project.id}
        </div>
      </Link>
    </motion.div>
  )
}

const WorkGrid = () => {
  const [activeCategory, setActiveCategory] = useState('All')
  const filtered = getByCategory(activeCategory)

  return (
    <section id="work" className="section-padding bg-bg-primary">
      <div className="container-site">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="label-line mb-4">Selected Work</div>
            <RevealText as="h2" className="text-fluid-h2 font-display font-bold text-text-primary">
              Projects
            </RevealText>
          </div>

          {/* Filter tabs — horizontal scroll on mobile */}
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
                  activeCategory === cat
                    ? 'text-bg-primary'
                    : 'text-text-muted hover:text-text-primary'
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

        {/* Editorial grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <div
                key={project.id}
                className={project.featured && i === 0 ? 'sm:col-span-2' : ''}
              >
                <ProjectCard project={project} index={i} />
              </div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
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
  )
}

export default WorkGrid
