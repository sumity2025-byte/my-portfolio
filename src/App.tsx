import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Nav } from './components/Chrome'
import { TransitionProvider } from './fx/PageTransition'
import { Preloader } from './fx/Preloader'
import { REDUCED, startLenis } from './lib/gsap'
import Contact from './pages/Contact'
import Education from './pages/Education'
import Home from './pages/Home'
import Chapter from './pages/Chapter'
import { chapterIds, chapterTitles } from './chapters'
import Projects from './pages/Projects'
import Skills from './pages/Skills'
import Work from './pages/Work'
import HomePointer from './fx/HomePointer'

const Proof = lazy(() => import('./pages/Proof'))

const oldSections: Record<string, string> = {
  ...Object.fromEntries(chapterIds.map(id => [id, '/' + id])),
  experience: '/work', work: '/work', projects: '/projects', skills: '/skills', education: '/education',
}

function Shell() {
  const loc = useLocation()
  const [playIntro, setPlayIntro] = useState(() => loc.pathname === '/' && !loc.hash && !REDUCED)
  const previousSection = loc.pathname === '/' ? oldSections[loc.hash.slice(1)] : undefined
  useEffect(() => {
    const chapter = chapterIds.find(id => '/' + id === loc.pathname)
    const names: Record<string, string> = { '/work': 'Industry experience', '/projects': 'Projects & papers', '/proof': 'Proof', '/skills': 'Skills', '/education': 'Education', '/contact': 'Contact' }
    const heading = chapter ? chapterTitles[chapter] : names[loc.pathname]
    document.title = heading ? heading + ' · Sumit Yadav' : 'Sumit Yadav · Product, strategy & operations'
  }, [loc.pathname])
  const done = useCallback(() => setPlayIntro(false), [])
  useEffect(() => { if (!playIntro) startLenis() }, [playIntro])
  return (
    <>
      {playIntro && <Preloader onDone={done} />}
      <div inert={playIntro}>
        <a className="skip-content" href="#portfolio-content" onClick={event => { event.preventDefault(); document.getElementById('portfolio-content')?.focus() }}>Skip to content</a>
        <Nav />
        <main key={loc.pathname} id="portfolio-content" tabIndex={-1}>

          <Routes location={loc}>
            {chapterIds.map(id => <Route key={id} path={'/' + id} element={<Chapter id={id} />} />)}
            <Route path="/about" element={<Navigate replace to="/#about" />} />
            <Route path="/" element={previousSection ? <Navigate replace to={previousSection} /> : <Home ready={!playIntro} />} />
            <Route path="/work" element={<Work />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/proof" element={<Suspense fallback={<p className="page-head wrap" role="status">Loading results…</p>}><Proof /></Suspense>} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/education" element={<Education />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate replace to="/" />} />
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
