import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import PageWrapper from '@/components/layout/PageWrapper'
import MagneticButton from '@/components/common/MagneticButton'
import RevealText from '@/components/common/RevealText'
import { getBySlug, getAdjacentProjects } from '@/data/projects'

const ProjectDetail = () => {
  const { slug } = useParams()
  const project = getBySlug(slug)
  const heroRef = useRef(null)

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  if (!project) {
    return (
      <PageWrapper>
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-bg-primary">
          <h1 className="font-display text-4xl text-text-primary">Project not found</h1>
          <Link to="/work" className="font-mono-custom text-[0.7rem] tracking-widest uppercase text-accent-yellow hover:underline">
            ← Back to work
          </Link>
        </div>
      </PageWrapper>
    )
  }

  const { prev, next } = getAdjacentProjects(slug)

  return (
    <PageWrapper>
      <Helmet>
        <title>{project.title} — Diksha Jain</title>
        <meta name="description" content={project.description} />
      </Helmet>

      {/* Full-bleed hero with parallax */}
      <div ref={heroRef} className="relative h-[70vh] overflow-hidden">
        <motion.img
          src={project.heroImage}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ y: heroY }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/30 to-transparent" />

        {/* Back button */}
        <div className="absolute top-24 left-0 container-site">
          <MagneticButton strength={0.3}>
            <Link
              to="/work"
              id="back-to-work"
              className="flex items-center gap-2 font-mono-custom text-[0.65rem] tracking-[0.15em] uppercase text-text-secondary hover:text-text-primary transition-colors"
            >
              <ArrowLeft size={12} /> Back to Work
            </Link>
          </MagneticButton>
        </div>

        {/* Project title overlay */}
        <div className="absolute bottom-0 left-0 right-0 container-site pb-12">
          <span
            className="inline-block font-mono-custom text-[0.65rem] tracking-[0.2em] uppercase px-3 py-1.5 mb-4"
            style={{ background: project.color, color: '#0A0A0A' }}
          >
            {project.category}
          </span>
          <h1 className="text-fluid-h2 font-display font-bold text-text-primary leading-tight">
            {project.title}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="bg-bg-primary">
        <div className="container-site py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">

            {/* Sidebar meta — sticky on desktop */}
            <aside className="lg:sticky lg:top-28 lg:self-start flex flex-col gap-8 order-2 lg:order-1">
              {[
                { label: 'Client',  value: project.client },
                { label: 'Year',    value: project.year },
                { label: 'Role',    value: project.role },
                { label: 'Tools',   value: project.tools.join(', ') },
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col gap-1 border-b border-border pb-6">
                  <span className="font-mono-custom text-[0.6rem] tracking-[0.15em] uppercase text-text-muted">{label}</span>
                  <span className="font-mono-custom text-[0.75rem] text-text-secondary">{value}</span>
                </div>
              ))}

              {/* Tags */}
              <div className="flex flex-col gap-3">
                <span className="font-mono-custom text-[0.6rem] tracking-[0.15em] uppercase text-text-muted">Tags</span>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono-custom text-[0.58rem] tracking-[0.1em] uppercase px-2 py-1 border border-border text-text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </aside>

            {/* Main case study content */}
            <div className="lg:col-span-2 order-1 lg:order-2 flex flex-col gap-12">
              <div>
                <RevealText as="p" className="font-mono-custom text-[0.8rem] leading-loose text-text-secondary">
                  {project.description}
                </RevealText>
              </div>

              <div>
                <div className="label-line mb-6">Case Study</div>
                <RevealText as="p" delay={0.1} className="font-mono-custom text-[0.78rem] leading-loose text-text-muted">
                  {project.caseStudy}
                </RevealText>
              </div>

              {/* Gallery */}
              <div className="flex flex-col gap-4">
                <div className="label-line mb-2">Gallery</div>
                {project.gallery.map((file, i) => {
                  const isVideo = file.toLowerCase().endsWith('.mp4') || file.toLowerCase().endsWith('.webm')
                  const isPdf = file.toLowerCase().endsWith('.pdf')
                  
                  return (
                    <motion.div
                      key={i}
                      className="overflow-hidden"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
                      transition={{ duration: 0.7, delay: i * 0.1, ease: [0.33, 1, 0.68, 1] }}
                    >
                      {isVideo ? (
                        <video src={file} autoPlay loop muted playsInline className="w-full h-auto" />
                      ) : isPdf ? (
                        <iframe src={file} className="w-full h-[80vh] border-none bg-white" title={`${project.title} — document ${i + 1}`} />
                      ) : (
                        <motion.img
                          src={file}
                          alt={`${project.title} — gallery item ${i + 1}`}
                          className="w-full h-auto object-cover"
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.5 }}
                          loading="lazy"
                        />
                      )}
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Prev / Next navigation */}
        <div className="border-t border-border">
          <div className="container-site grid grid-cols-2">
            <Link
              to={`/work/${prev.slug}`}
              id="prev-project"
              className="group flex flex-col gap-3 py-10 pr-8 border-r border-border hover:bg-bg-secondary transition-colors"
            >
              <span className="flex items-center gap-2 font-mono-custom text-[0.6rem] tracking-[0.15em] uppercase text-text-muted group-hover:text-text-secondary transition-colors">
                <ArrowLeft size={11} /> Previous
              </span>
              <span className="font-display font-bold text-lg text-text-primary group-hover:text-accent-yellow transition-colors leading-tight">
                {prev.title}
              </span>
            </Link>
            <Link
              to={`/work/${next.slug}`}
              id="next-project"
              className="group flex flex-col gap-3 py-10 pl-8 items-end text-right hover:bg-bg-secondary transition-colors"
            >
              <span className="flex items-center gap-2 font-mono-custom text-[0.6rem] tracking-[0.15em] uppercase text-text-muted group-hover:text-text-secondary transition-colors">
                Next <ArrowRight size={11} />
              </span>
              <span className="font-display font-bold text-lg text-text-primary group-hover:text-accent-yellow transition-colors leading-tight">
                {next.title}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}

export default ProjectDetail
