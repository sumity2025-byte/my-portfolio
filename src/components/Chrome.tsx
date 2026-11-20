import { useLayoutEffect, useRef } from 'react'
import './navigation.css'
import { useLocation } from 'react-router-dom'
import { chapterIds, chapterTitles } from '../chapters'
import SplitGallery from '../fx/SplitGallery'
import { SITE } from '../data'
import { TLink } from '../fx/PageTransition'
import { BlockReveal, LineRise, Scramble } from '../fx/Text'

const archive = [
  ['/work', 'Work'], ['/projects', 'Projects'], ['/proof', 'Proof'],
  ['/skills', 'Skills'], ['/education', 'Education'],
]

export function Nav() {
  const { pathname } = useLocation()
  const header = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    const node = header.current!
    const measure = () => document.documentElement.style.setProperty('--portfolio-header-height', node.offsetHeight + 'px')
    measure()
    const resize = new ResizeObserver(measure)
    resize.observe(node)
    return () => { resize.disconnect(); document.documentElement.style.removeProperty('--portfolio-header-height') }
  }, [])

  return <header className="cv-header" ref={header}>
    <div className="cv-masthead">
      <TLink to="/" className="cv-brand" aria-label="Sumit Yadav, home">Sumit Yadav<span aria-hidden="true">.</span></TLink>
      <nav className="cv-chapters" aria-label="Primary">
        {chapterIds.map(id =>
          <TLink key={id} to={'/' + id} aria-current={pathname === '/' + id ? 'page' : undefined}>{chapterTitles[id]}</TLink>
        )}
      </nav>
      <div className="cv-utilities">
        <a href={SITE.resume} target="_blank" rel="noreferrer" aria-label="Open CV as PDF">CV <span aria-hidden="true">↗</span></a>
        <TLink to="/contact" className="cv-contact" aria-current={pathname === '/contact' ? 'page' : undefined}>Contact</TLink>
      </div>
    </div>
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
  return <><section className="document-shelf wrap" aria-labelledby="document-shelf-title">
    <div className="shelf-title"><h2 id="document-shelf-title">From my Shopdeck archive</h2><TLink to="/projects">All projects <span aria-hidden="true">↗</span></TLink></div>
    <SplitGallery />
  </section><footer className="portfolio-colophon"><div className="colophon-inner">
    <div className="colophon-identity">
      <TLink to="/" className="cv-brand">Sumit Yadav<span aria-hidden="true">.</span></TLink>
      <a className="colophon-email" href={'mailto:' + SITE.email}>{SITE.email}</a>
    </div>
    <nav aria-label="Portfolio archive" className="colophon-archive">
      {archive.map(([path, label]) => <TLink key={path} to={path}>{label}</TLink>)}
    </nav>
    <div className="colophon-end">
      <span>© 2026 Sumit Yadav</span>
      <a href={SITE.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
    </div>
  </div></footer></>
}
