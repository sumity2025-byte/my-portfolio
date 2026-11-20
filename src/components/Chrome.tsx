import { useLayoutEffect, useRef } from 'react'
import './navigation.css'
import { useLocation } from 'react-router-dom'
import { chapterIds, chapterTitles } from '../chapters'
import { SITE } from '../data'
import { TLink } from '../fx/PageTransition'
import { BlockReveal, LineRise, Scramble } from '../fx/Text'

export const PAGES = [
  { to: '/work', label: 'Experience', tags: ['Blinkit', '2,300+ dark stores', 'Shopdeck', '₹100 Cr+ a year', 'Adani', '₹235 Cr+ capex', 'Accenture'] },
  { to: '/projects', label: 'Projects', tags: ['Dark store digitization', 'D2C growth engine', 'Should-cost model', 'Market entry'] },
  { to: '/proof', label: 'Proof', tags: ['43% → 92% adherence', '−43% variance', '−23% complaints', '+118% profitability'] },
  { to: '/skills', label: 'Skills', tags: ['Strategy', 'Growth', 'Operations', 'SQL', 'Superset', 'Tableau'] },
  { to: '/education', label: 'Education', tags: ['IIM Calcutta', 'CAT 99.14%ile', 'NIT Kurukshetra', 'GATE AIR 2070'] },
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

  return <header className="nav cv-header" ref={header}>
    <TLink to="/" className="brand" aria-label="Sumit Yadav, home">Sumit Yadav<i aria-hidden="true">●</i></TLink>
    <nav aria-label="Primary">
      <TLink to="/#about" className={pathname === '/' ? 'active' : undefined} aria-current={pathname === '/' ? 'location' : undefined}>About</TLink>
      {chapterIds.map(id =>
        <TLink key={id} to={'/' + id} className={pathname === '/' + id ? 'active' : undefined} aria-current={pathname === '/' + id ? 'page' : undefined}>{chapterTitles[id]}</TLink>
      )}
    </nav>
    <div className="header-actions">
      <a className="mono" href={SITE.resume} target="_blank" rel="noreferrer" aria-label="Open CV as PDF">CV ↗</a>
      <TLink className="btn btn-sm" to="/contact">Get in touch</TLink>
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
  return <footer className="foot wrap">
    <a href={'mailto:' + SITE.email}><Scramble><span>{SITE.email}</span></Scramble></a>
    <nav aria-label="Portfolio archive">
      {PAGES.map(page => <TLink key={page.to} to={page.to}>{page.label}</TLink>)}
    </nav>
    <span>© 2026 Sumit Yadav · IIM Calcutta</span>
    <a href={SITE.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
  </footer>
}
