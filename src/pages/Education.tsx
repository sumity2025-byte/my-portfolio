import { ACHIEVE, EDU } from '../data'
import { Footer, NextPage, PageHead } from '../components/Chrome'
import { BlockReveal, LineRise } from '../fx/Text'

export default function Education() {
  return (
    <>
      <PageHead eyebrow="Education" title={<>Learning, <span className="o">on the record.</span></>} />
      <section className="wrap edu">
        {EDU.map((e, i) => (
          <article className="edu-row" key={e.school}>
            <span className="edu-yr">{e.years}</span>
            <div>
              <BlockReveal color={i % 2 ? 'var(--blue)' : 'var(--orange)'}><h2>{e.school}</h2></BlockReveal>
              <p className="edu-deg">{e.degree}</p>
              <LineRise><p>{e.note}</p></LineRise>
            </div>
          </article>
        ))}
        <ul className="ach">{ACHIEVE.map(a => <li key={a}>{a}</li>)}</ul>
      </section>
      <NextPage to="/contact" label="Contact" />
      <Footer />
    </>
  )
}
