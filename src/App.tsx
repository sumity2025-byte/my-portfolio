import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Footer, Nav } from './components/Chrome'
import { TransitionProvider } from './fx/PageTransition'
import { Preloader, shouldPlayIntro } from './fx/Preloader'
import { startLenis } from './lib/gsap'
import Contact from './pages/Contact'
import Education from './pages/Education'
import Home from './pages/Home'
import Chapter from './pages/Chapter'
import { chapterIds, pageTitles } from './chapters'
import Projects from './pages/Projects'
import Skills from './pages/Skills'
import Work from './pages/Work'

const Proof = lazy(() => import('./pages/Proof'))

const oldSections: Record<string, string> = {
  ...Object.fromEntries(chapterIds.map(id => [id, '/' + id])),
  extracurricular: '/social-impact#extracurricular', certifications: '/live-projects#certifications',
  'non-profit': '/social-impact', experience: '/work', work: '/work', projects: '/projects', skills: '/skills', education: '/education',
}

function Shell() {
  const loc = useLocation()
  const [playIntro, setPlayIntro] = useState(() => !loc.hash && loc.pathname !== '/about' && shouldPlayIntro())
  const replayButton = useRef<HTMLElement | null>(null)
  const replayIntro = () => {
    replayButton.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    setPlayIntro(true)
  }
  const previousSection = loc.pathname === '/' ? oldSections[loc.hash.slice(1)] : undefined
  useEffect(() => {
    const title = pageTitles[loc.pathname + loc.hash] ?? pageTitles[loc.pathname]
    document.title = title && title !== 'Home' ? title + ' · Sumit Yadav' : 'Sumit Yadav · Product, strategy & operations'
  }, [loc.pathname, loc.hash])
  const done = useCallback(() => setPlayIntro(false), [])
  useEffect(() => {
    if (!playIntro) {
      startLenis()
      replayButton.current?.focus({ preventScroll: true })
      replayButton.current = null
    }
  }, [playIntro])
  return (
    <>
      {playIntro && <Preloader onDone={done} />}
      <div inert={playIntro}>
        <a className="skip-content" href="#portfolio-content" onClick={event => { event.preventDefault(); document.getElementById('portfolio-content')?.focus() }}>Skip to content</a>
        <Nav />
        <main key={loc.pathname} id="portfolio-content" tabIndex={-1}>

          <Routes location={loc}>
            {chapterIds.map(id => <Route key={id} path={'/' + id} element={<Chapter id={id} />} />)}
            <Route path="/extracurricular" element={<Navigate replace to="/social-impact#extracurricular" />} />
            <Route path="/certifications" element={<Navigate replace to="/live-projects#certifications" />} />
            <Route path="/non-profit" element={<Navigate replace to="/social-impact" />} />
            <Route path="/about" element={<Navigate replace to="/#about" />} />
            <Route path="/" element={previousSection ? <Navigate replace to={previousSection} /> : <Home ready={!playIntro} replayIntro={replayIntro} />} />
            <Route path="/work" element={<Work />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/proof" element={<Suspense fallback={<p className="page-head wrap" role="status">Loading results…</p>}><Proof /></Suspense>} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/education" element={<Education />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default function App() {
  return <HashRouter><TransitionProvider><Shell /></TransitionProvider></HashRouter>
}
