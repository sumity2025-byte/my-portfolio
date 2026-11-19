import { useEffect, useRef, useState } from 'react'
import './navigation.css'
import { useLocation } from 'react-router-dom'
import { SITE } from '../data'
import { TLink } from '../fx/PageTransition'
import { BlockReveal, LineRise, Scramble } from '../fx/Text'

const sections = [
  ['about', 'About Sumit'],
  ['experience', 'Industry experience'],
  ['projects', 'Projects & work samples'],
  ['skills', 'Skills'],
  ['education', 'Academic qualifications'],
  ['awards', 'Distinctions & competitions'],
  ['certifications', 'Live projects & certifications'],
  ['leadership', 'Positions of responsibility'],
  ['extracurricular', 'Extracurricular activities'],
  ['social-impact', 'Social impact & non-profit work'],
]

const detailPages = [
  ['/work', 'Experience'], ['/projects', 'Projects'], ['/proof', 'Results'],
  ['/skills', 'Skills'], ['/education', 'Education'],
]

export function Nav() {
  const { pathname, hash } = useLocation()
  const header = useRef<HTMLElement>(null)
  const toggle = useRef<HTMLButtonElement>(null)
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  useEffect(close, [pathname, hash])
  useEffect(() => {
    if (!open) return
    function dismissOutside(event: PointerEvent | FocusEvent) {
      if (event.target instanceof Node && !header.current?.contains(event.target)) close()
    }
    function escape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        close()
        toggle.current?.focus()
      }
    }
    document.addEventListener('pointerdown', dismissOutside)
    document.addEventListener('focusin', dismissOutside)
    document.addEventListener('keydown', escape)
    return () => {
      document.removeEventListener('pointerdown', dismissOutside)
      document.removeEventListener('focusin', dismissOutside)
      document.removeEventListener('keydown', escape)
    }
  }, [open])

  return (
    <header className="cv-header" ref={header}>
      <div className="cv-bar">
        <TLink to="/" className="cv-brand" onClick={close}>
          <span className="cv-monogram" aria-hidden="true">SY</span>
          Sumit Yadav
        </TLink>
        <nav className="cv-primary" aria-label="Primary">
          {detailPages.filter(([path]) => ['/work', '/projects', '/education'].includes(path)).map(([path, label]) =>
            <TLink key={path} to={path} onClick={close} aria-current={pathname === path ? 'page' : undefined}>{label}</TLink>
          )}
        </nav>
        <div className="cv-index">
          <button type="button" ref={toggle} className="cv-toggle" aria-expanded={open} aria-controls="cv-contents"
            onClick={() => setOpen(value => !value)}>CV index <span className="cv-cross" aria-hidden="true" /></button>
          <div className="cv-dropdown" id="cv-contents" hidden={!open} data-lenis-prevent>
            <nav aria-label="CV sections">
              <h2>Explore the CV</h2>
              <ul>{sections.map(([id, label]) => <li key={id}>
                <TLink to={'/#' + id} onClick={close} aria-current={pathname === '/' && hash === '#' + id ? 'location' : undefined}>
                  {label}<span aria-hidden="true">↘</span>
                </TLink>
              </li>)}</ul>
            </nav>
            <nav className="cv-detail-links" aria-label="Portfolio detail pages">
              <h3>Detail pages</h3>
              {detailPages.map(([path, label]) => <TLink key={path} to={path} onClick={close}>{label}</TLink>)}
            </nav>
          </div>
        </div>
        <TLink to="/contact" onClick={close} className="cv-contact">Contact <span aria-hidden="true">↗</span></TLink>
      </div>
    </header>
  )
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
