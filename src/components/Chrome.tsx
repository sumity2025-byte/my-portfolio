import { useLocation } from 'react-router-dom'
import { SITE } from '../data'
import { TLink } from '../fx/PageTransition'
import { BlockReveal, LineRise, Scramble } from '../fx/Text'

export const PAGES = [
  { to: '/work', label: 'Work', tags: ['Blinkit', '2,300+ dark stores', 'Shopdeck', '₹100 Cr+ a year', 'Adani', '₹235 Cr+ capex', 'Accenture'] },
  { to: '/projects', label: 'Projects', tags: ['Dark store digitization', 'D2C growth engine', 'Should-cost model', 'Market entry'] },
  { to: '/proof', label: 'Proof', tags: ['43% → 92% adherence', '−43% variance', '−23% complaints', '+118% profitability'] },
  { to: '/skills', label: 'Skills', tags: ['Strategy', 'Growth', 'Operations', 'SQL', 'Superset', 'Tableau'] },
  { to: '/education', label: 'Education', tags: ['IIM Calcutta', 'CAT 99.64%ile', 'NIT Kurukshetra', 'GATE AIR 2070'] },
]

export function Nav() {
  const { pathname } = useLocation()
  return (
    <header className="nav">
      <TLink to="/" className="brand">Sumit Yadav<i aria-hidden>●</i></TLink>
      <nav aria-label="Main">
        {PAGES.map(p => <TLink key={p.to} to={p.to} className={pathname === p.to ? 'active' : undefined}>{p.label}</TLink>)}
      </nav>
      <TLink className="btn btn-sm" to="/contact">Get in touch</TLink>
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
