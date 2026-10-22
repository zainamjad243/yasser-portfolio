import { useCallback, useRef, useState } from 'react'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import { CustomCursor } from './components/ui.jsx'
import {
  Contact,
  Experience,
  Footer,
  Hero,
  ProjectDetail,
  Services,
  Work,
} from './components/sections.jsx'

export default function App() {
  const [selected, setSelected] = useState(null)
  const openerRef = useRef(null)

  const openProject = useCallback((project, opener) => {
    openerRef.current = opener
    setSelected(project)
  }, [])

  // Close the detail view and hand focus back to the card that opened it
  const closeProject = useCallback(() => {
    setSelected(null)
    requestAnimationFrame(() => openerRef.current?.focus({ preventScroll: true }))
  }, [])

  // Close the detail view, then scroll to a section underneath it
  const goToSection = useCallback((id) => {
    setSelected(null)
    window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 450)
  }, [])

  return (
    // reducedMotion="user" turns off transform/layout motion for people who prefer less movement
    <MotionConfig reducedMotion="user">
      <div aria-hidden="true" className="sky-bg fixed inset-0 -z-10" />
      <CustomCursor />
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:text-[#111111]"
      >
        Skip to content
      </a>

      <div className="overflow-x-clip">
        <main id="main" className="mx-auto flex max-w-[1320px] flex-col gap-5 px-4 py-4 md:gap-7 md:px-6 md:py-6">
          <Hero />
          <Work onOpen={openProject} />
          <Services />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>

      <AnimatePresence>
        {selected && (
          <ProjectDetail key={selected.id} project={selected} onClose={closeProject} onNavigate={goToSection} />
        )}
      </AnimatePresence>
    </MotionConfig>
  )
}
