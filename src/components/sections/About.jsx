import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Download } from 'lucide-react'
import MagneticButton from '@/components/common/MagneticButton'
import RevealText from '@/components/common/RevealText'

const whatIDo = ['Brand Identity', 'UI / UX', 'Motion Design', 'Print & Editorial', 'Packaging', 'Art Direction']

const About = () => {
  const imgRef = useRef(null)
  const imgInView = useInView(imgRef, { once: true, margin: '0px 0px -80px 0px' })

  return (
    <section id="about" className="section-padding bg-bg-primary">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left — image with mask reveal */}
          <div ref={imgRef} className="relative">
            <motion.div
              className="relative overflow-hidden aspect-[3/4]"
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={imgInView ? { clipPath: 'inset(0 0% 0 0)' } : {}}
              transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            >
              <img
                src="https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?w=900&q=80"
                alt="Diksha Jain — Designer"
                className="w-full h-full object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/60 via-transparent to-transparent" />
            </motion.div>

            {/* Decorative accent */}
            <motion.div
              className="absolute -bottom-6 -right-6 w-32 h-32 border border-accent-yellow/30"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={imgInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
            />
            <motion.div
              className="absolute -top-6 -left-6 w-20 h-20 border border-border"
              initial={{ opacity: 0 }}
              animate={imgInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.6 }}
            />

            {/* Floating badge */}
            <motion.div
              className="absolute bottom-8 left-8 bg-bg-card border border-border p-4 flex flex-col gap-1"
              initial={{ opacity: 0, y: 20 }}
              animate={imgInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <span className="font-display font-bold text-2xl text-accent-yellow">4+</span>
              <span className="font-mono-custom text-[0.6rem] tracking-[0.1em] uppercase text-text-muted">
                Years of craft
              </span>
            </motion.div>
          </div>

          {/* Right — bio */}
          <div className="flex flex-col gap-8">
            <div>
              <div className="label-line mb-4">About Me</div>
              <RevealText as="h2" className="text-fluid-h2 font-display font-bold text-text-primary">
                Design that
                <br />
                <span className="text-stroke-accent">breathes.</span>
              </RevealText>
            </div>

            <div className="flex flex-col gap-4">
              <RevealText
                as="p"
                delay={0.1}
                className="font-mono-custom text-[0.75rem] leading-loose text-text-secondary"
              >
                I'm Diksha — a graphic designer based in Mumbai with a deep obsession for the intersection of ideas and aesthetics. I believe every element on a surface should earn its place.
              </RevealText>
              <RevealText
                as="p"
                delay={0.2}
                className="font-mono-custom text-[0.75rem] leading-loose text-text-secondary"
              >
                My work spans brand identities, digital interfaces, motion pieces, and print projects — all unified by a commitment to intention, craft, and a slightly unreasonable attention to detail.
              </RevealText>
            </div>

            {/* What I do — pill tags */}
            <div>
              <div className="label-line mb-5">What I do</div>
              <div className="flex flex-wrap gap-2">
                {whatIDo.map((item, i) => (
                  <motion.span
                    key={item}
                    className="font-mono-custom text-[0.65rem] tracking-[0.12em] uppercase px-3 py-2 border border-border text-text-muted hover:border-accent-yellow hover:text-text-primary transition-all duration-200"
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Resume CTA */}
            <MagneticButton strength={0.3} className="self-start mt-2">
              <a
                id="download-resume"
                href="/resume.pdf"
                download
                className="group flex items-center gap-3 border border-border-light px-6 py-3 font-mono-custom text-[0.65rem] tracking-[0.15em] uppercase text-text-secondary hover:border-accent-yellow hover:text-accent-yellow transition-all duration-300"
              >
                <Download size={13} className="group-hover:translate-y-0.5 transition-transform" />
                Download Resume
              </a>
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
