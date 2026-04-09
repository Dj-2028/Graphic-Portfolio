import { lazy, Suspense, useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CustomCursor from '@/components/common/CustomCursor'
import Loader from '@/components/common/Loader'
import ScrollProgress from '@/components/common/ScrollProgress'
import { useLenis } from '@/hooks/useLenis'

// Lazy-loaded pages for code splitting
const Home = lazy(() => import('@/pages/Home'))
const Work = lazy(() => import('@/pages/Work'))
const ProjectDetail = lazy(() => import('@/pages/ProjectDetail'))
const About = lazy(() => import('@/pages/About'))
const Contact = lazy(() => import('@/pages/Contact'))

// Page-level loading fallback
const PageFallback = () => (
  <div className="fixed inset-0 bg-bg-primary flex items-center justify-center">
    <div className="w-8 h-8 border border-accent-yellow border-t-transparent rounded-full animate-spin" />
  </div>
)

function App() {
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(true)
  const [showCursor, setShowCursor] = useState(false)

  // Initialise Lenis smooth scroll
  useLenis()

  const handleLoaderComplete = () => {
    setIsLoading(false)
    setShowCursor(true)
  }

  // Check if loader already played this session
  useEffect(() => {
    if (sessionStorage.getItem('loaderPlayed')) {
      setIsLoading(false)
      setShowCursor(true)
    }
  }, [])

  return (
    <div className="grain relative bg-bg-primary min-h-screen">
      {/* Custom cursor - only on non-touch devices */}
      {showCursor && <CustomCursor />}

      {/* Scroll progress bar */}
      {!isLoading && <ScrollProgress />}

      {/* Intro loader */}
      <AnimatePresence>
        {isLoading && (
          <Loader onComplete={handleLoaderComplete} />
        )}
      </AnimatePresence>

      {/* Main layout (hidden while loader plays) */}
      {!isLoading && (
        <>
          <Navbar />
          <main>
            <Suspense fallback={<PageFallback />}>
              <AnimatePresence mode="wait" initial={false}>
                <Routes location={location} key={location.pathname}>
                  <Route path="/" element={<Home />} />
                  <Route path="/work" element={<Work />} />
                  <Route path="/work/:slug" element={<ProjectDetail />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </AnimatePresence>
            </Suspense>
          </main>
          <Footer />
        </>
      )}
    </div>
  )
}

export default App
