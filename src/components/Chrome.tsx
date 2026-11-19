import { useLayoutEffect, useRef } from 'react'
import './navigation.css'
import { useLocation } from 'react-router-dom'
import { SITE } from '../data'
import { TLink } from '../fx/PageTransition'
import { BlockReveal, LineRise, Scramble } from '../fx/Text'

const pages = [
  ['/work', 'Industry experience'],
  ['/projects', 'Projects & papers'],
  ['/proof', 'Proof'],
  ['/skills', 'Skills'],
  ['/education', 'Education'],
]

const cvSections = [
  ['/#about', 'About'],
  ['/#awards', 'Awards & competitions'],
  ['/#leadership', 'Positions of responsibility'],
  ['/#social-impact', 'Social initiatives'],
  ['/#non-profit', 'Entrepreneurial & non-profit'],
  ['/#live-projects', 'Live projects'],
  ['/#certifications', 'Certifications'],
  ['/#extracurricular', 'Extracurricular activities'],
]

export function Nav() {
  const { pathname, hash } = useLocation()
  const header = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    const node = header.current!
    const measure = () => document.documentElement.style.setProperty('--portfolio-header-height', node.offsetHeight + 'px')
    measure()
    const resize = new ResizeObserver(measure)
    resize.observe(node)
    return () => { resize.disconnect(); document.documentElement.style.removeProperty('--portfolio-header-height') }
  }, [])

  const compactLabels: Record<string, string> = {
    '/work': 'Experience', '/projects': 'Projects', '/#leadership': 'POR', '/#awards': 'Awards',
    '/#non-profit': 'Non-profit', '/#extracurricular': 'Extracurricular',
  }
  const link = ([path, label]: string[], compactOnly = false) =>
    <TLink key={path} to={path} className={compactOnly ? 'cv-compact-only' : undefined} aria-label={label}
      aria-current={pathname + hash === path ? (hash ? 'location' : 'page') : undefined}>
      <span className="cv-long-label">{label}</span><span className="cv-short-label">{compactLabels[path] ?? label}</span>
    </TLink>

  return <header className="cv-header" ref={header}>
    <div className="cv-bar">
      <TLink to="/" className="cv-brand">
        <span className="cv-monogram" aria-hidden="true">SY</span>Sumit Yadav
      </TLink>
      <nav className="cv-primary" aria-label="Portfolio pages">
        {pages.map(item => link(item))}
      </nav>
      <TLink to="/contact" className="cv-contact" aria-current={pathname === '/contact' ? 'page' : undefined}>
        Contact <span aria-hidden="true">↗</span>
      </TLink>
    </div>
    <div className="cv-shelf"><div className="cv-rail-frame">
      <nav className="cv-rail" id="cv-section-links" aria-label="CV sections">
        {pages.map(item => link(item, true))}
        {cvSections.map(item => link(item))}
      </nav>
    </div></div>
  </header>
}

export function PageHead({ eyebrow, title, lede }: { eyebrow: string; title: React.ReactNode; lede?: string }) {
  return (
    <header className="page-head wrap">
      <Scramble><p className="eyebrow">{eyebrow}</p></Scramble>
      <BlockReveal onScroll={false} delay={0.15}><h1 className="display">{title}</h1></BlockReveal>
      {lede && <LineRise onScroll={false} delay={0.5}><p className="lede">{lede}</p></LineRise>}
    </header>
  )
}

export function NextPage({ to, label }: { to: string; label: string }) {
  return (
    <section className="next wrap">
      <p className="eyebrow">Next</p>
      <TLink to={to} className="next-link">{label}<span aria-hidden>→</span></TLink>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="foot wrap">
      <Scramble><span>{SITE.email}</span></Scramble>
      <span>© 2026 Sumit Yadav · IIM Calcutta</span>
      <a href={SITE.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
    </footer>
  )
}
