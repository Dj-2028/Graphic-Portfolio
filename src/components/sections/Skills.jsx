import { useRef, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import { useEffect } from 'react'
import RevealText from '@/components/common/RevealText'
import { skillGroups, tools } from '@/data/skills'

/* ── Individual animated skill bar ── */
const SkillBar = ({ name, level, index }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '0px 0px -50px 0px' })
  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const controls = animate(0, level, {
      duration: 1.2,
      delay: index * 0.08,
      ease: [0.33, 1, 0.68, 1],
      onUpdate: (v) => setWidth(v),
    })
    return () => controls.stop()
  }, [isInView, level, index])

  return (
    <div ref={ref} className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="font-mono-custom text-[0.72rem] tracking-[0.1em] uppercase text-text-secondary">
          {name}
        </span>
        <span className="font-mono-custom text-[0.65rem] text-text-muted">
          {Math.round(width)}%
        </span>
      </div>
      <div className="h-px bg-border-light relative overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full bg-accent-yellow"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  )
}

/* ── Tool logo card ── */
const ToolCard = ({ tool }) => {
  const [hovered, setHovered] = useState(false)
  const initials = tool.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()

  return (
    <motion.div
      className="relative flex flex-col items-center gap-2 p-4 border border-border rounded-sm cursor-default group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{
        borderColor: hovered ? tool.color : 'rgba(245,240,232,0.08)',
        y: hovered ? -4 : 0,
      }}
      transition={{ duration: 0.25 }}
    >
      {/* Glow */}
      <motion.div
        className="absolute inset-0 rounded-sm pointer-events-none"
        animate={{ opacity: hovered ? 0.06 : 0 }}
        style={{ background: tool.color }}
        transition={{ duration: 0.25 }}
      />

      {/* Icon placeholder (initials / color badge) */}
      <div
        className="w-10 h-10 rounded-sm flex items-center justify-center font-mono-custom font-medium text-sm transition-all duration-300"
        style={{
          background: hovered ? tool.color + '22' : 'rgba(245,240,232,0.04)',
          color: hovered ? tool.color : 'var(--text-muted)',
        }}
      >
        {initials}
      </div>

      <span className="font-mono-custom text-[0.6rem] tracking-[0.12em] uppercase text-text-muted group-hover:text-text-secondary transition-colors text-center leading-tight">
        {tool.name}
      </span>

      {/* Tooltip  */}
      <motion.div
        className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono-custom text-[0.58rem] tracking-widest uppercase text-bg-primary bg-text-primary px-2 py-1 pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 4 }}
        transition={{ duration: 0.2 }}
      >
        {tool.name}
      </motion.div>
    </motion.div>
  )
}

const Skills = () => {
  return (
    <section id="skills" className="section-padding bg-bg-secondary">
      <div className="container-site">
        {/* Header */}
        <div className="mb-14">
          <div className="label-line mb-4">Capabilities</div>
          <RevealText as="h2" className="text-fluid-h2 font-display font-bold text-text-primary">
            Skills & Tools
          </RevealText>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Skill bars */}
          <div className="flex flex-col gap-12">
            {skillGroups.map((group) => (
              <div key={group.label}>
                <div className="label-line mb-6">{group.label}</div>
                <div className="flex flex-col gap-5">
                  {group.skills.map((skill, i) => (
                    <SkillBar key={skill.name} {...skill} index={i} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Tools grid */}
          <div>
            <div className="label-line mb-6">Design Stack</div>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {tools.map((tool) => (
                <ToolCard key={tool.name} tool={tool} />
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-12">
              {[
                { value: '4+', label: 'Years Experience' },
                { value: '40+', label: 'Projects Delivered' },
                { value: '20+', label: 'Happy Clients' },
              ].map(({ value, label }) => (
                <div key={label} className="text-center border border-border p-5 rounded-sm">
                  <div className="font-display font-bold text-3xl text-accent-yellow mb-1">{value}</div>
                  <div className="font-mono-custom text-[0.6rem] tracking-[0.1em] uppercase text-text-muted leading-snug">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
