import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { PenTool, Monitor, Smartphone, FileText } from 'lucide-react'
import { services, processSteps } from '@/data/services'
import RevealText from '@/components/common/RevealText'

const iconMap = {
  'pen-tool':    PenTool,
  'monitor':     Monitor,
  'smartphone':  Smartphone,
  'file-text':   FileText,
}

const ServiceCard = ({ service, index }) => {
  const ref   = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' })
  const Icon   = iconMap[service.icon] || PenTool

  return (
    <motion.div
      ref={ref}
      className="border border-border p-8 flex flex-col gap-5 group hover:border-border-light transition-colors duration-300 relative overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.33, 1, 0.68, 1] }}
    >
      {/* Hover BG */}
      <motion.div
        className="absolute inset-0 bg-bg-card pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative z-10 flex items-start justify-between">
        <div className="w-10 h-10 border border-border flex items-center justify-center group-hover:border-accent-yellow transition-colors">
          <Icon size={16} className="text-text-muted group-hover:text-accent-yellow transition-colors" />
        </div>
        <span className="font-mono-custom text-[0.65rem] tracking-[0.15em] text-text-muted">
          {service.id}
        </span>
      </div>

      <h3 className="relative z-10 font-display font-bold text-xl text-text-primary group-hover:text-accent-yellow transition-colors">
        {service.title}
      </h3>

      <p className="relative z-10 font-mono-custom text-[0.72rem] leading-relaxed text-text-secondary">
        {service.description}
      </p>

      <div className="relative z-10 flex flex-wrap gap-2 mt-auto">
        {service.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono-custom text-[0.58rem] tracking-[0.12em] uppercase px-2 py-1 border border-border text-text-muted"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

const Services = () => {
  return (
    <section id="services" className="section-padding bg-bg-primary">
      <div className="container-site">
        {/* Header */}
        <div className="mb-14">
          <div className="label-line mb-4">What I offer</div>
          <RevealText as="h2" className="text-fluid-h2 font-display font-bold text-text-primary">
            Services
          </RevealText>
        </div>

        {/* Service cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-20">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        {/* Process timeline (horizontal scroll on mobile) */}
        <div>
          <div className="label-line mb-10">Design Process</div>
          <div className="flex gap-0 overflow-x-auto pb-4 scrollbar-none -mx-4 px-4 md:mx-0 md:px-0">
            {processSteps.map((step, i) => (
              <ProcessStep key={step.step} step={step} index={i} total={processSteps.length} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const ProcessStep = ({ step, index, total }) => {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      className="flex-shrink-0 w-56 md:flex-1 relative pr-4 md:pr-0"
      initial={{ opacity: 0, x: 20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.33, 1, 0.68, 1] }}
    >
      {/* Connector line */}
      {index < total - 1 && (
        <div className="hidden md:block absolute top-4 left-1/2 right-0 h-px bg-border z-0" />
      )}

      <div className="relative z-10 flex flex-col gap-4">
        {/* Step number circle */}
        <div className="w-8 h-8 rounded-full border border-accent-yellow flex items-center justify-center bg-bg-primary">
          <span className="font-mono-custom text-[0.6rem] text-accent-yellow">{step.step}</span>
        </div>

        <h4 className="font-display font-bold text-lg text-text-primary">{step.title}</h4>
        <p className="font-mono-custom text-[0.68rem] leading-relaxed text-text-muted">{step.description}</p>
      </div>
    </motion.div>
  )
}

export default Services
