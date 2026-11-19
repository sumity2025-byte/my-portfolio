import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom'
import { Nav } from './components/Chrome'
import { TransitionProvider } from './fx/PageTransition'
import { Preloader } from './fx/Preloader'
import { REDUCED, startLenis } from './lib/gsap'
import Contact from './pages/Contact'
import Education from './pages/Education'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Skills from './pages/Skills'
import Work from './pages/Work'
import HomePointer from './fx/HomePointer'

const Proof = lazy(() => import('./pages/Proof'))

function Shell() {
  const loc = useLocation()
  const [playIntro, setPlayIntro] = useState(() => loc.pathname === '/' && !loc.hash && !REDUCED)
  const done = useCallback(() => setPlayIntro(false), [])
  useEffect(() => { if (!playIntro) startLenis() }, [playIntro])
  return (
    <>
      {playIntro && <Preloader onDone={done} />}
      <div inert={playIntro}>
        <Nav />
        <main key={loc.pathname}>
          <Routes location={loc}>
            <Route path="/work" element={<Work />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/proof" element={<Suspense fallback={<p className="page-head wrap" role="status">Loading results…</p>}><Proof /></Suspense>} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/education" element={<Education />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Home ready={!playIntro} />} />
          </Routes>
        </main>
      </div>
      {!playIntro && <HomePointer />}
    </>
  )
}

export default function App() {
  return <HashRouter><TransitionProvider><Shell /></TransitionProvider></HashRouter>
}
