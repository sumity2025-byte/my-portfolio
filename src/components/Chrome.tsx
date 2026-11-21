import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Check, Copy, Download, Mail, Menu, MessageCircle, Phone, X } from 'lucide-react'
import './navigation.css'
import { chapterIds, chapterTitles } from '../chapters'
import { SITE } from '../data'
import { TLink } from '../fx/PageTransition'
import { lockScroll } from '../lib/gsap'

const PORTFOLIO_LINKS = [
  { to: '/work', label: 'Work experience' },
  { to: '/#cases', label: 'Cases' },
  { to: '/projects', label: 'Projects' },
  { to: '/proof', label: 'Proof & results' },
  { to: '/skills', label: 'Skills' },
  { to: '/education', label: 'Education' },
  { to: '/story', label: 'My story' },
  { to: '/contact', label: 'Contact' },
]
const ACTIVITY_LINKS = chapterIds.map(id => ({ to: '/' + id, label: chapterTitles[id] }))

function MenuLinks({ links }: { links: { to: string; label: string }[] }) {
  const { pathname } = useLocation()
  return <ul>{links.map(link =>
    <li key={link.to}><TLink to={link.to} aria-current={link.to === pathname ? 'page' : undefined}>{link.label}<span aria-hidden="true">→</span></TLink></li>
  )}</ul>
}

export function Nav() {
  const { pathname, hash } = useLocation()
  const header = useRef<HTMLElement>(null)
  const button = useRef<HTMLButtonElement>(null)
  const panel = useRef<HTMLElement>(null)
  const [open, setOpen] = useState(false)

  useLayoutEffect(() => {
    const node = header.current!
    const measure = () => document.documentElement.style.setProperty('--portfolio-header-height', node.offsetHeight + 'px')
    measure()
    const resize = new ResizeObserver(measure)
    resize.observe(node)
    return () => { resize.disconnect(); document.documentElement.style.removeProperty('--portfolio-header-height') }
  }, [])

  useEffect(() => { setOpen(false) }, [pathname, hash])

  useEffect(() => {
    if (!open) return
    lockScroll(true)
    panel.current?.querySelector<HTMLElement>('a')?.focus({ preventScroll: true })
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setOpen(false)
      button.current?.focus()
    }
    document.addEventListener('keydown', onKey)
    return () => { lockScroll(false); document.removeEventListener('keydown', onKey) }
  }, [open])

  return <header className="site-header" ref={header}>
    <TLink to="/" className="brand">
      <span className="brand-name">Sumit Yadav</span>
      <span className="brand-school">IIM Calcutta</span>
    </TLink>
    <nav className="primary-nav" aria-label="Primary">
      <TLink to="/work" aria-current={pathname === '/work' ? 'page' : undefined}>Work</TLink>
      <TLink to="/#cases">Cases</TLink>
      <a className="wide-only" href={SITE.resume} target="_blank" rel="noreferrer">Strategy CV</a>
      <TLink className="wide-only nav-contact" to="/contact" aria-current={pathname === '/contact' ? 'page' : undefined}>Contact</TLink>
      <button ref={button} className="menu-button" type="button" aria-expanded={open} aria-controls="site-menu"
        aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(value => !value)}>
        {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
      </button>
    </nav>
    <nav id="site-menu" className="site-menu" aria-label="All pages" ref={panel} hidden={!open} data-lenis-prevent
      onClick={event => { if ((event.target as HTMLElement).closest('a')) setOpen(false) }}>
      <div className="site-menu-inner">
        <section><h2>Portfolio</h2><MenuLinks links={PORTFOLIO_LINKS} /></section>
        <section><h2>Activities &amp; recognition</h2><MenuLinks links={ACTIVITY_LINKS} /></section>
        <section><h2>Résumés</h2>
          <div className="menu-cvs">
            <a className="menu-cv-primary" href={SITE.resume} target="_blank" rel="noreferrer">Strategy CV</a>
            <a href={SITE.productCv} target="_blank" rel="noreferrer">Product &amp; Growth CV</a>
          </div>
        </section>
      </div>
    </nav>
  </header>
}

/** Always-visible contact actions at the bottom of the screen on phones and tablets. */
export function ContactBar() {
  return <nav className="contact-bar" aria-label="Quick contact">
    <a className="contact-bar-cv" href={SITE.resume} target="_blank" rel="noreferrer"><Download size={18} aria-hidden="true" />CV<span className="sr-only"> (Strategy, PDF)</span></a>
    <a href={'tel:' + SITE.phone}><Phone size={20} aria-hidden="true" />Call</a>
    <a href={SITE.whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={20} aria-hidden="true" />WhatsApp</a>
    <a href={'mailto:' + SITE.email}><Mail size={20} aria-hidden="true" />Email</a>
  </nav>
}

function CopyEmail() {
  const [copied, setCopied] = useState(false)
  useEffect(() => {
    if (!copied) return
    const timer = window.setTimeout(() => setCopied(false), 2000)
    return () => window.clearTimeout(timer)
  }, [copied])
  return <>
    <button className="copy-email" type="button" aria-label="Copy email address" onClick={() => {
      navigator.clipboard?.writeText(SITE.email).then(() => setCopied(true), () => {})
    }}>{copied ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}</button>
    <span className="sr-only" aria-live="polite">{copied ? 'Email address copied' : ''}</span>
  </>
}

export function PageHead({ eyebrow, title, lede }: { eyebrow: string; title: React.ReactNode; lede?: string }) {
  return <header className="page-head wrap">
    <p className="eyebrow">{eyebrow}</p>
    <h1 className="display">{title}</h1>
    {lede && <p className="lede">{lede}</p>}
  </header>
}

export function Footer() {
  return <footer className="site-footer">
    <div className="wrap">
      <h2 className="footer-title">Let’s talk<span className="o">.</span></h2>
      <p className="footer-note">Open to strategy, consulting, product and growth roles.</p>
      <div className="footer-email"><a href={'mailto:' + SITE.email}>{SITE.email}</a><CopyEmail /></div>
      <p className="footer-phone"><a href={'tel:' + SITE.phone}>{SITE.phoneLabel}</a> · <a href={SITE.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a></p>
      <div className="footer-actions">
        <a className="footer-cv" href={SITE.resume} target="_blank" rel="noreferrer">Strategy CV</a>
        <a href={SITE.productCv} target="_blank" rel="noreferrer">Product &amp; Growth CV</a>
        <a href={SITE.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
      </div>
      <nav className="footer-links" aria-label="Portfolio directory">
        {[...PORTFOLIO_LINKS, ...ACTIVITY_LINKS].map(link => <TLink key={link.to} to={link.to}>{link.label}</TLink>)}
      </nav>
      <p className="footer-signature">© 2026 Sumit Yadav</p>
    </div>
  </footer>
}
