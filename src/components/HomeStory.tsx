import SnapshotDissolve from '../fx/SnapshotDissolve'
import { CERTS, DOCS, ROLES, SKILLS, TOOLS } from '../data'
import { TLink } from '../fx/PageTransition'
import '../home-story.css'

const career = [
  [0, 'I visited more than 50 dark stores to understand how people found inventory. That fieldwork shaped a digital layout system used in 2,300+ stores.'],
  [5, 'I worked with an international team on pricing, positioning and market entry for a consumer goods company.'],
  [4, 'I compared five international vendor bids and modelled the cost of each proposal from the ground up.'],
  [1, 'I worked with 80+ D2C brands on the journey from an ad click to a delivered order.'],
  [2, 'In Mundra, I evaluated industrial equipment bids and replanned the fleet that moved over 1,000 employees.'],
  [3, 'My first role took me from the machine setup line to customer accounts for Honeywell and Boeing.'],
] as const

export function HomeStory() {
  return <div className="home-story">
    <section className="story-about wrap" aria-labelledby="story-about-title">
      <h2 id="story-about-title">About me</h2>
      <div>
        <p className="story-intro">My first engineering problem was measured in hours at a machine. Today, I think about the seconds it takes someone to find an item on a shelf.</p>
        <p>I studied mechanical engineering at NIT Kurukshetra, worked in manufacturing and D2C growth, then earned my MBA at IIM Calcutta. At Blinkit, I bring those experiences together on the dark store floor.</p>
      </div>
    </section>
    <section className="story-workbench" aria-labelledby="story-work-title">
      <div className="wrap">
        <h2 id="story-work-title">Inside the work</h2>
        <div className="story-prints">
          {[
            { doc: DOCS[2], img: 'campaign-handbook', heading: 'The campaign handbook', summary: 'The 25-step campaign process I wrote for Shopdeck’s growth consultants.' },
            { doc: DOCS[3], img: 'pre-live', heading: 'Before a store goes live', summary: 'A 100-point checklist that helped 80 consultants standardise more than 500 launches.' },
          ].map(({doc, img, heading, summary}) => <a key={img} className="story-print" href={doc.href} target="_blank" rel="noreferrer">
            <div className="story-frame">
              <img src={'/work/' + img + '.jpg'} loading="lazy" alt="" />
              {img === 'campaign-handbook' && <SnapshotDissolve color="#20241f" />}
            </div>
            <div className="story-print-caption"><h3>{heading}</h3><span aria-hidden="true">↗</span></div>
            <p>{summary}</p><small>Open PDF</small>
          </a>)}
        </div>
      </div>
    </section>
    <section className="story-career wrap" aria-labelledby="story-career-title">
      <header><h2 id="story-career-title">Work experience</h2><TLink to="/work">Full work history ↗</TLink></header>
      <ol>{career.map(([index, copy]) => {
        const role = ROLES[index]
        return <li key={role.company}><small>{role.period}</small><div><h3>{role.company}</h3><p className="story-role">{role.title}</p><p>{copy}</p></div></li>
      })}</ol>
    </section>
    <section className="story-skills" aria-labelledby="story-skills-title"><div className="wrap">
      <h2 id="story-skills-title">Skills</h2>
      <dl>{[...SKILLS, {name: 'Tools', items: TOOLS}].map(group => <div key={group.name}><dt>{group.name}</dt><dd>{group.items.join(' · ')}</dd></div>)}</dl>
    </div></section>
    <div className="story-record wrap">
      <section><h2>Awards &amp; recognition</h2><p>I received the Academic Excellence Award at NIT Kurukshetra. In X-Culture’s international consulting programme, my teammates rated me 4.9/5, placing me in the top 5% of over 6,500 participants.</p></section>
      <section><h2>Positions of responsibility</h2><p>I served as head boy at school and later became secretary of the Mechanical Society at NIT Kurukshetra, where I managed a budget of over ₹4 lakh.</p></section>
      <section><h2>Extracurricular &amp; social activities</h2><p>Outside the classroom, I helped organise Mechanical Society events at NIT Kurukshetra with a combined footfall of more than 4,000. At IIM Calcutta, I joined X-Culture to work with students across countries.</p></section>
      <section><h2>Certifications</h2><dl>{CERTS.map(cert => <div key={cert.title}><dt>{cert.title}</dt><dd>{cert.by}</dd></div>)}</dl></section>
    </div>
  </div>
}
export default HomeStory
