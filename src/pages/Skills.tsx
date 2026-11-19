import { CERTS, SKILLS, TOOLS } from '../data'
import { Footer, NextPage, PageHead } from '../components/Chrome'
import { WeightHover } from '../fx/Hover'
import { SkillCards } from '../fx/SkillCards'
import { BlockReveal, Scramble } from '../fx/Text'

export default function Skills() {
  return (
    <>
      <PageHead eyebrow="Capabilities" title={<>Built in the field. <span className="o">Used daily.</span></>}
        lede="Three toolkits I reach for most. Scroll and the cards turn over." />
      <SkillCards title={<h2 className="display-sm">What I bring</h2>} skills={SKILLS} />
      <section className="wrap tools">
        <BlockReveal><h2 className="display-sm">Tools</h2></BlockReveal>
        <WeightHover><p className="tool-line">{TOOLS.map((t, i) => <span key={t} data-weight={i % 2 ? 'thin' : undefined}>{t}{i < TOOLS.length - 1 ? ' / ' : ''}</span>)}</p></WeightHover>
      </section>
      <section className="wrap certs">
        <BlockReveal><h2 className="display-sm">Product and business management certifications</h2></BlockReveal>
        <ul>{CERTS.map(c => <li key={c.title}><Scramble><span className="mono">{c.by}</span></Scramble><b>{c.title}</b></li>)}</ul>
      </section>
      <NextPage to="/education" label="Education" />
      <Footer />
    </>
  )
}
