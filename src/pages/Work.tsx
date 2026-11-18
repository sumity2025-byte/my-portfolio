import { ROLES } from '../data'
import { Footer, NextPage, PageHead } from '../components/Chrome'
import { PathTimeline } from '../fx/Scroll'
import { BlockReveal, LineRise } from '../fx/Text'

export default function Work() {
  return (
    <>
      <PageHead eyebrow="Experience · 35 months" title={<>Where I've <span className="o">shipped.</span></>}
        lede="Six roles across quick commerce, D2C, capex, B2B sales and consulting. Scroll and follow the route." />
      <PathTimeline>
        <div className="tl wrap">
          {ROLES.map((r, i) => (
            <article className={`tl-row ${i % 2 ? 'flip' : ''}`} key={r.company}>
              <div className="tl-key">
                <BlockReveal color={i % 2 ? 'var(--blue)' : 'var(--ink)'}><b>{r.key}</b></BlockReveal>
                <span>{r.keyLabel}</span>
              </div>
              <div className="tl-card">
                <p className="eyebrow">{r.period} · {r.months}</p>
                <h2>{r.company}</h2>
                <p className="tl-title">{r.title}</p>
                <ul>{r.points.map(p => <LineRise key={p}><li>{p}</li></LineRise>)}</ul>
              </div>
            </article>
          ))}
        </div>
      </PathTimeline>
      <NextPage to="/projects" label="Projects" />
      <Footer />
    </>
  )
}
