import { Helmet } from 'react-helmet-async'
import PageWrapper from '@/components/layout/PageWrapper'
import AboutSection from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Services from '@/components/sections/Services'

const About = () => {
  return (
    <PageWrapper>
      <Helmet>
        <title>About — Diksha Jain</title>
        <meta name="description" content="Learn about Diksha Jain — Mumbai-based graphic designer with 4+ years of experience in branding, UI/UX, motion, and print design." />
      </Helmet>

      {/* Page header */}
      <div className="pt-36 pb-4 bg-bg-primary">
        <div className="container-site">
          <div className="label-line mb-4 text-text-muted">The Designer</div>
          <h1 className="text-fluid-hero font-display font-bold text-text-primary uppercase leading-[0.9]">
            About
          </h1>
        </div>
      </div>

      <AboutSection />
      <Skills />
      <Services />
    </PageWrapper>
  )
}

export default About
