import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom'
import { Nav } from './components/Chrome'
import { TransitionProvider } from './fx/PageTransition'
import { Preloader } from './fx/Preloader'
import { startLenis } from './lib/gsap'
import Contact from './pages/Contact'
import Education from './pages/Education'
import Home from './pages/Home'
import Projects from './pages/Projects'
const Proof = lazy(() => import('./pages/Proof'))
import Skills from './pages/Skills'
import Work from './pages/Work'

function Shell() {
  const loc = useLocation()
  const [playIntro] = useState(() => loc.pathname !== '/')
  const [, setReady] = useState(false)
  const done = useCallback(() => setReady(true), [])
  useEffect(() => { startLenis() }, [])
  return (
    <>
      {playIntro && <Preloader onDone={done} />}
      <Nav />
      <main key={loc.pathname}>
        <Routes location={loc}>
          <Route path="/work" element={<Work />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/proof" element={<Suspense fallback={<p className="page-head wrap" role="status">Loading results…</p>}><Proof /></Suspense>} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/education" element={<Education />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </>
  )
}

export default function App() {
  return <HashRouter><TransitionProvider><Shell /></TransitionProvider></HashRouter>
}
