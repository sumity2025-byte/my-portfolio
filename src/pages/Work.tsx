import { ROLES } from '../data'
import { PageHead } from '../components/Chrome'
import WorkSamples from '../components/WorkSamples'
import { TLink } from '../fx/PageTransition'
import './work.css'

export default function Work() {
  return <>
    <PageHead eyebrow="Career history" title={<>Work experience<span className="o">.</span></>} />
    <div className="work-layout wrap">
      <nav className="role-index" aria-label="Jump to a role">
        <p className="eyebrow">Jump to a role</p>
        <ul>{ROLES.map(r => <li key={r.id}><TLink to={'/work#' + r.id}>{r.company}<span aria-hidden="true">↘</span></TLink></li>)}</ul>
      </nav>
      <div className="role-list">{ROLES.map(r =>
        <article className="work-role" id={r.id} key={r.id} aria-labelledby={r.id + '-heading'}>
          <header>
            <p className="role-period">{r.period}</p>
            <h2 id={r.id + '-heading'}>{r.company}</h2>
            <p className="role-title">{r.title}</p>
          </header>
          <ul className="role-points">{r.points.map(point => <li key={point}>{point}</li>)}</ul>
          <WorkSamples role={r.id} />
        </article>
      )}</div>
    </div>
  </>
}
