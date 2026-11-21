import { ChevronDown } from 'lucide-react'
import { EMPLOYERS, HERO_STATS, ROLES } from '../data'
import CaseCarousel from '../components/CaseCarousel'
import { TLink } from '../fx/PageTransition'
import './home.css'

export default function Home() {
  return <>
    <section className="home-hero wrap" aria-labelledby="home-title">
      <div className="home-intro">
        <p className="home-eyebrow">Strategy · Consulting · Product · Growth</p>
        <h1 className="display home-name" id="home-title"><span>Sumit</span> <span>Yadav<span className="o">.</span></span></h1>
        <p className="home-lede">Generalist, Strategy &amp; Ops at <b>Blinkit</b>. MBA, <b>IIM Calcutta</b> ’25. B.Tech, NIT Kurukshetra.</p>
        <ul className="employers" aria-label="Organisations I have worked with">{EMPLOYERS.map(employer =>
          <li key={employer.name}>{employer.src
            ? <img src={employer.src} alt={employer.name} width={employer.width} height={employer.height} />
            : <span className="employer-wordmark">{employer.name.toLowerCase()}</span>}</li>
        )}</ul>
      </div>
      <dl className="home-stats">{HERO_STATS.map(([value, label]) =>
        <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
      )}</dl>
    </section>

    <CaseCarousel />

    <section className="home-experience wrap" aria-labelledby="experience-title">
      <div className="home-section-head">
        <h2 id="experience-title">Experience</h2>
        <TLink to="/work">39 months full-time · Details</TLink>
      </div>
      <div className="role-rows">{ROLES.map(role =>
        <details key={role.id}>
          <summary>
            <span className="role-main">
              <b>{role.short ?? role.company}</b>
              <span className="role-period">{role.period}</span>
              <span className="role-name">{role.title}</span>
            </span>
            <span className="role-key"><b>{role.key}</b><small>{role.keyLabel}</small></span>
            <ChevronDown className="role-chevron" size={18} aria-hidden="true" />
          </summary>
          <ul>{role.points.slice(0, 3).map(point => <li key={point}>{point}</li>)}</ul>
          <TLink className="role-more" to={'/work#' + role.id}>Full role details →</TLink>
        </details>
      )}</div>
    </section>

    <section className="home-education wrap" aria-labelledby="education-title">
      <div className="home-section-head">
        <h2 id="education-title">Education</h2>
        <TLink to="/education">All results</TLink>
      </div>
      <div className="education-cards">
        <div><b>IIM Calcutta</b><span>MBA · 2023–25</span></div>
        <div><b>NIT Kurukshetra</b><span>B.Tech, Mechanical · 8.36 CGPA</span></div>
      </div>
      <p className="education-also"><b>Also:</b> GATE AIR 2,070 (top 2%) · 1st of 20+ teams, Junkyard War · 1,000+ hours mentoring with Shiksha</p>
    </section>
  </>
}
