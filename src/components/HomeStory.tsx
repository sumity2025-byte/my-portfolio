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

const experience = [
  ...career.map(([index, copy]) => ({ ...ROLES[index], copy })),
  {
    company: 'Honda Motorcycles India',
    title: 'Summer Trainee',
    period: 'Jan – Jun 2020',
    copy: 'I investigated a recurring leak on the production line. Fixing its cause brought line stoppage down from 42 minutes to zero.',
  },
]

export function HomeStory() {
  return <div className="home-story">
    <section className="story-about wrap" aria-labelledby="story-about-title">
      <h2 id="story-about-title">About me</h2>
      <div>
        <p className="story-intro">At Honda, I counted the minutes a production line stood still. At Blinkit, I count the seconds it takes a picker to find an item on a shelf.</p>
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
      <ol>{experience.map(role => <li key={role.company}><small>{role.period}</small><div><h3>{role.company}</h3><p className="story-role">{role.title}</p><p>{role.copy}</p></div></li>
      )}</ol>
    </section>
    <section className="story-skills" aria-labelledby="story-skills-title"><div className="wrap">
      <h2 id="story-skills-title">Skills</h2>
      <dl>{[...SKILLS, {name: 'Tools', items: TOOLS}].map(group => <div key={group.name}><dt>{group.name}</dt><dd>{group.items.join(' · ')}</dd></div>)}</dl>
    </div></section>
    <div className="story-record wrap">
      <section><h2>Awards &amp; recognition</h2><p>My team’s quadricycle took first place against more than 20 national teams at NIT Kurukshetra’s Junkyard War in 2018. The year before, I won first place for an energy-conversion contraption and second for a roller-coaster prototype. In X-Culture’s international consulting programme, my teammates rated me 4.9/5, placing me in the top 5% of over 6,500 participants.</p></section>
      <section><h2>Positions of responsibility</h2><p>As secretary of the Mechanical Society at NIT Kurukshetra, I led more than 100 members across five teams and managed over ₹4 lakh for ten events. I also chaired the mess committee, representing more than 400 students.</p></section>
      <section><h2>Extracurricular &amp; social activities</h2><p>With Shiksha, I spent over 1,000 hours mentoring more than 100 children. We organised 15+ workshops with five schools and NGOs. I led donation campaigns that raised over ₹60,000 and helped build a community library with more than 500 books in its first year.</p><p>On campus, I led a team of more than 15 students to organise two cultural festival events.</p></section>
      <section><h2>Certifications</h2><dl>{CERTS.map(cert => <div key={cert.title}><dt>{cert.title}</dt><dd>{cert.by}</dd></div>)}</dl></section>
    </div>
  </div>
}
export default HomeStory
