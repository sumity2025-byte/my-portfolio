import BlinkitStudy from '../components/BlinkitStudy'
import { ROLES } from '../data'
import { Footer, NextPage, PageHead } from '../components/Chrome'
import { PathTimeline } from '../fx/Scroll'
import { BlockReveal, LineRise } from '../fx/Text'

export default function Work() {
  return (
    <>
      <PageHead eyebrow="Industry experience" title={<>On the job<span className="o">.</span></>}
        lede="At Blinkit I lead product work for store operations. Here’s a closer look at a workflow my team designed, followed by the roles in manufacturing, growth and strategy that brought me to it." />
      <BlinkitStudy />
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
