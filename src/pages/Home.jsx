import { Helmet } from 'react-helmet-async'
import PageWrapper from '@/components/layout/PageWrapper'
import Hero from '@/components/sections/Hero'
import WorkGrid from '@/components/sections/WorkGrid'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Services from '@/components/sections/Services'
import Contact from '@/components/sections/Contact'

const Home = () => {
  return (
    <PageWrapper>
      <Helmet>
        <title>Diksha Jain — Graphic Designer</title>
        <meta name="description" content="Portfolio of Diksha Jain — graphic designer specialising in brand identity, UI/UX, motion design, and editorial print work. Based in Indore." />
      </Helmet>

      <Hero />
      <WorkGrid />
      <About />
      <Skills />
      <Services />
      <Contact />
    </PageWrapper>
  )
}

export default Home
