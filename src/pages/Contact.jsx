import { Helmet } from 'react-helmet-async'
import PageWrapper from '@/components/layout/PageWrapper'
import ContactSection from '@/components/sections/Contact'

const Contact = () => {
  return (
    <PageWrapper>
      <Helmet>
        <title>Contact — Diksha Jain</title>
        <meta name="description" content="Start a project with Diksha Jain. Get in touch for branding, UI/UX, motion design, or editorial work." />
      </Helmet>

      {/* Page header */}
      <div className="pt-36 pb-4 bg-bg-secondary">
        <div className="container-site">
          <div className="label-line mb-4 text-text-muted">Reach Out</div>
          <h1 className="text-fluid-hero font-display font-bold text-text-primary uppercase leading-[0.9]">
            Contact
          </h1>
        </div>
      </div>

      <ContactSection />
    </PageWrapper>
  )
}

export default Contact
