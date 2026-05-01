import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Send, CheckCircle } from 'lucide-react'
import MagneticButton from '@/components/common/MagneticButton'
import RevealText from '@/components/common/RevealText'

const SOCIAL_LINKS = [
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/diksha-jain-b30457334?utm_source=share_via&utm_content=profile&utm_medium=member_android' },
]


const FloatingField = ({ id, label, type = 'text', as = 'input', required, value, onChange }) => {
  const filled = value?.length > 0

  return (
    <div className="form-field group">
      {as === 'input' ? (
        <input
          id={id}
          type={type}
          placeholder=" "
          required={required}
          value={value}
          onChange={onChange}
          className="pt-6 pb-2 text-sm"
          aria-label={label}
        />
      ) : (
        <textarea
          id={id}
          placeholder=" "
          rows={5}
          required={required}
          value={value}
          onChange={onChange}
          className="pt-6 pb-2 text-sm"
          aria-label={label}
        />
      )}
      <label htmlFor={id} className={filled ? 'top-0 text-[0.65rem] text-accent-yellow' : ''}>
        {label}
      </label>
    </div>
  )
}

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // 'idle' | 'sending' | 'done'

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')

    const subject = encodeURIComponent(`Portfolio Enquiry from ${form.name}`)
    const body = encodeURIComponent(
      `Hi Diksha,\n\nMy name is ${form.name}.\n\n${form.message}\n\nReply to: ${form.email}`
    )
    const mailtoUrl = `mailto:dikshajain2026@gmail.com?subject=${subject}&body=${body}`

    // Open the email client
    window.location.href = mailtoUrl

    // Mark as done after short delay
    setTimeout(() => setStatus('done'), 800)
  }

  return (
    <section id="contact" className="section-padding bg-bg-secondary">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left — headline + info */}
          <div className="flex flex-col gap-8">
            <div>
              <div className="label-line mb-4">Get in touch</div>
              <h2 className="text-fluid-h2 font-display font-bold text-text-primary leading-[0.95]">
                Let's Work
                <br />
                <span className="text-stroke-accent">Together.</span>
              </h2>
            </div>

            <p className="font-mono-custom text-[0.75rem] leading-relaxed text-text-secondary max-w-md">
              Got a project in mind? Whether you need a full brand identity, a UI redesign, or a motion piece — let's make it happen.
            </p>

            {/* Location & availability */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="font-mono-custom text-[0.65rem] tracking-[0.15em] uppercase text-text-muted w-24">
                  Location
                </span>
                <span className="font-mono-custom text-[0.7rem] text-text-secondary">Indore, India</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono-custom text-[0.65rem] tracking-[0.15em] uppercase text-text-muted w-24">
                  Email
                </span>
                <a
                  href="mailto:dikshajain2026@gmail.com"
                  className="font-mono-custom text-[0.7rem] text-text-secondary hover:text-accent-yellow transition-colors"
                >
                 dikshajain2026@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono-custom text-[0.65rem] tracking-[0.15em] uppercase text-text-muted w-24">
                  Status
                </span>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
                  <span className="font-mono-custom text-[0.7rem] text-accent-green">Available — Q2 2025</span>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-5 mt-2">
              {SOCIAL_LINKS.map(({ label, url }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  id={`social-${label.toLowerCase()}`}
                  className="font-mono-custom text-[0.65rem] tracking-[0.12em] uppercase text-text-muted hover:text-text-primary transition-colors hover:underline underline-offset-4 decoration-accent-yellow"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div>
            {status === 'done' ? (
              <motion.div
                className="flex flex-col items-center gap-4 py-20 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <CheckCircle size={40} className="text-accent-green" />
                <h3 className="font-display font-bold text-2xl text-text-primary">Message sent!</h3>
                <p className="font-mono-custom text-[0.72rem] text-text-secondary">
                  I'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => { setStatus('idle'); setForm({ name: '', email: '', message: '' }) }}
                  className="font-mono-custom text-[0.65rem] tracking-[0.15em] uppercase text-text-muted hover:text-text-primary transition-colors underline underline-offset-4 mt-4"
                >
                  Send another
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-8"
                aria-label="Contact form"
              >
                <FloatingField
                  id="contact-name"
                  label="Name"
                  value={form.name}
                  onChange={handleChange('name')}
                  required
                />
                <FloatingField
                  id="contact-email"
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={handleChange('email')}
                  required
                />
                <FloatingField
                  id="contact-message"
                  label="Message"
                  as="textarea"
                  value={form.message}
                  onChange={handleChange('message')}
                  required
                />

                <div className="flex justify-end">
                  <MagneticButton strength={0.4}>
                    <button
                      id="contact-submit"
                      type="submit"
                      disabled={status === 'sending'}
                      className="group flex items-center gap-4 bg-accent-yellow text-bg-primary px-8 py-4 font-mono-custom text-[0.7rem] tracking-[0.2em] uppercase font-medium hover:bg-text-primary transition-colors duration-300 disabled:opacity-50"
                    >
                      {status === 'sending' ? (
                        <>
                          Sending
                          <motion.div
                            className="w-4 h-4 border-2 border-bg-primary border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                          />
                        </>
                      ) : (
                        <>
                          Send It
                          <Send size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </>
                      )}
                    </button>
                  </MagneticButton>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
