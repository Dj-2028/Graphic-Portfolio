import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import PageWrapper from '@/components/layout/PageWrapper'
import WorkGrid from '@/components/sections/WorkGrid'

const Work = () => {
  return (
    <PageWrapper>
      <Helmet>
        <title>Work — Diksha Jain</title>
        <meta name="description" content="Selected design projects by Diksha Jain — branding, UI/UX, motion design, and editorial print." />
      </Helmet>

      {/* Page header */}
      <div className="pt-36 pb-4 bg-bg-primary">
        <div className="container-site">
          <div className="label-line mb-4 text-text-muted">Portfolio</div>
          <h1 className="text-fluid-hero font-display font-bold text-text-primary uppercase leading-[0.9]">
            All Work
          </h1>
        </div>
      </div>

      <WorkGrid />
    </PageWrapper>
  )
}

export default Work
