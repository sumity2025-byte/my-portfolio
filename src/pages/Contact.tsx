import { DOCS, SITE } from '../data'
import { Footer } from '../components/Chrome'
import { WeightHover } from '../fx/Hover'
import { BlockReveal, LineRise, Scramble } from '../fx/Text'

export default function Contact() {
  return (
    <>
      <section className="contact wrap">
        <Scramble><p className="eyebrow">Contact</p></Scramble>
        <WeightHover><h1 className="contact-title">Let's build something <span className="o" data-weight="thin">that ships.</span></h1></WeightHover>
        <LineRise onScroll={false} delay={0.2}><p className="lede">Open to strategy and ops, growth and product roles. Email is fastest.</p></LineRise>
        <div className="cta">
          <a className="btn" href={`mailto:${SITE.email}`}>Email me</a>
          <a className="btn btn-ghost" href={SITE.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
        <Scramble><p className="mono big-mail">{SITE.email}</p></Scramble>
      </section>
      <section className="wrap docs">
        <BlockReveal><h2 className="display-sm">Documents</h2></BlockReveal>
        <ul>{DOCS.map(d => <li key={d.href}><a href={d.href} target="_blank" rel="noreferrer">{d.label}<span aria-hidden>↗</span></a></li>)}</ul>
      </section>
      <Footer />
    </>
  )
}
