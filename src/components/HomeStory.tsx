import { useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { ACHIEVE, CERTS, DOCS, EDU, LIVE_PROJECTS, ROLES, TOOLS } from '../data'
import { TLink } from '../fx/PageTransition'
import SnapshotDissolve from '../fx/SnapshotDissolve'
import '../home-story.css'

const note = '/docs/WhatsApp_Image_2026-04-14_at_5_21_03_AM.jpeg'
const whiteboard = '/docs/WhatsApp_Image_2026-04-14_at_5_21_04_AM.jpeg'

const archive = [
  { name: 'The returns diagnostic', kind: 'Field notes', body: 'A sudden spike in undelivered orders needs a different investigation from a persistently high return rate. I drew this decision tree to help consultants find where the two paths diverge.', image: note, second: whiteboard, alt: 'My handwritten return-to-origin decision tree and diagnostic matrix', secondAlt: 'Whiteboard notes mapping changes in marketing performance', href: note, action: 'Read the original notes', caption: 'Return-to-origin decision tree', source: 'Shopdeck · Growth operations' },
  { name: 'The campaign handbook', kind: 'Playbook', body: 'I translated the setup for a new seller’s advertising campaign into a 25-step process. Consultants could follow the same decisions on audience, placement and creative each time a brand went live.', image: '/work/campaign-settings.webp', second: '/work/ad-creative.webp', alt: 'Campaign handbook page three showing conversion campaign settings', secondAlt: 'Handbook page six with annotated ad creative settings', href: DOCS[2].href + '#page=3', action: 'Open the handbook', caption: 'Campaign settings and ad creative', source: 'Shopdeck · Consultant enablement' },
  { name: 'The launch checklist', kind: 'Launch deck', body: 'Before the first order, a seller needs pricing, fulfilment and a working storefront. I turned those dependencies into a 100-point checklist used by 80 consultants across more than 500 launches.', image: '/work/growth-plan.webp', second: '/work/launch-checklist.webp', alt: 'Eight-week plan for a new seller launch, from learning through growth', secondAlt: 'Shopdeck’s pre-live checklist showing tasks and status', href: DOCS[3].href + '#page=14', action: 'See the launch deck', caption: 'The first eight weeks after launch', source: 'Shopdeck · Merchant onboarding' },
]

const roles = [
  { ...ROLES[0], summary: 'Field research in 50+ stores informed digital layouts, bin IDs and a new picking workflow.' },
  { ...ROLES[5], summary: 'Market entry, pricing and positioning for an international consumer goods client.' },
  { ...ROLES[4], summary: 'A should-cost model across 15+ cost drivers identified a 10% procurement saving.' },
  { ...ROLES[1], summary: 'Growth operations for 80+ D2C brands generating over ₹100 crore a year.' },
  { ...ROLES[2], summary: 'Evaluated industrial equipment bids for ₹235 crore in planned capital expenditure.' },
  { ...ROLES[3], period: 'Jul 2021 – Jan 2022', summary: 'Cut machine setup time from 12 hours to four while managing aerospace customer accounts.' },
  { ...ROLES[6], summary: 'Traced a recurring leak on the production line and helped reduce stoppage from 42 minutes to zero.' },
]

function WorkArchive() {
  const [index, setIndex] = useState(0)
  const tabs = useRef<HTMLDivElement>(null)
  const work = archive[index]

  function moveTab(event: KeyboardEvent<HTMLButtonElement>, i: number) {
    const keys: Record<string, number> = { ArrowDown: (i + 1) % archive.length, ArrowUp: (i + archive.length - 1) % archive.length, ArrowRight: (i + 1) % archive.length, ArrowLeft: (i + archive.length - 1) % archive.length, Home: 0, End: archive.length - 1 }
    if (!(event.key in keys)) return
    event.preventDefault()
    const next = keys[event.key]
    setIndex(next)
    tabs.current?.querySelectorAll('button')[next]?.focus()
  }

  return <section className="archive-section cv-band" id="projects" aria-labelledby="archive-title">
    <div className="wrap">
      <header className="archive-head"><div><span className="cv-kicker">Projects &amp; papers</span><h2 id="archive-title" className="cv-display">Inside the work<span>.</span></h2></div><TLink to="/projects" className="cv-textlink">All projects <span aria-hidden>↗</span></TLink></header>
      <div className="archive-layout">
        <div className="archive-menu" ref={tabs} aria-label="Work snapshots" role="tablist" aria-orientation="vertical">
          {archive.map((item, i) => <button type="button" key={item.name} role="tab" id={'work-tab-' + i} aria-controls="work-document" aria-selected={index === i} tabIndex={index === i ? 0 : -1} onKeyDown={e => moveTab(e, i)} onClick={() => setIndex(i)}><span className="archive-kind">{item.kind}</span><span className="archive-name">{item.name}</span><span className="archive-arrow" aria-hidden>↗</span></button>)}
        </div>
        <div role="tabpanel" aria-labelledby={'work-tab-' + index} id="work-document" className="archive-document">
          <div className={'archive-spread archive-spread-' + index} key={work.image}>
            <a href={work.href} target="_blank" rel="noreferrer" aria-label={work.action}>
              <img className="spread-back" src={work.second} alt={work.secondAlt} loading="lazy" />
              <img className="spread-front" src={work.image} alt={work.alt} loading="lazy" />
              <span className="spread-open" aria-hidden>↗</span>
            </a>
            <SnapshotDissolve color="#f3f0e9" />
          </div>
          <div className="archive-source"><span>{work.caption}</span><span>{work.source}</span></div>
          <p key={work.name} className="archive-copy">{work.body}</p>
          <div className="archive-links"><a className="cv-textlink" href={work.href} target="_blank" rel="noreferrer">{work.action} <span aria-hidden>↗</span></a>
            {index === 0 && <a className="cv-textlink" href={whiteboard} target="_blank" rel="noreferrer">View whiteboard <span aria-hidden>↗</span></a>}
          </div>
        </div>
      </div>
    </div>
  </section>
}

export function HomeStory() {
  return <div className="home-story">
    <WorkArchive />
    <section id="about" className="story-letter cv-band"><div className="wrap letter-grid">
      <div><span className="cv-kicker">About Sumit</span><h2>From the<br/>shop floor<span>.</span></h2></div>
      <div><p className="letter-lede">At Honda, I counted the minutes a production line stood still. At Blinkit, I count the seconds it takes a picker to find an item on a shelf.</p>
        <p>Between those two floors, I sold aerospace components, evaluated industrial equipment in Mundra, and helped online merchants grow. An MBA at IIM Calcutta gave me the finance and strategy to put numbers behind what I saw in the field.</p>
        <TLink className="cv-textlink" to="/proof">See the results <span aria-hidden>↗</span></TLink>
      </div>
    </div></section>
    <section className="cv-band career-index" id="experience"><div className="wrap">
      <header className="archive-head"><div><span className="cv-kicker">Industry experience</span><h2 className="cv-display">Experience<span>.</span></h2></div><TLink to="/work" className="cv-textlink">Work history <span aria-hidden>↗</span></TLink></header>
      <p className="career-context">The CV records 37 months of full-time industry experience. This timeline also includes internships and international consulting work.</p>
      <ol>{roles.map(role => <li key={role.company}><time>{role.period}</time><div><h3>{role.company}</h3><span>{role.title}</span></div><div className="career-contribution"><p>{role.summary}</p><details><summary>Role details</summary><ul>{role.points.map(point => <li key={point}>{point}</li>)}</ul></details></div></li>)}</ol>
    </div></section>
    <section id="skills" className="skills-ledger cv-band"><div className="wrap ledger-grid"><div><span className="cv-kicker">Capabilities</span><h2 className="cv-display">Skills<span>.</span></h2><TLink className="cv-textlink" to="/skills">Explore skills <span aria-hidden>↗</span></TLink></div>
      <dl>{[
        ['Product & operations', 'Field discovery, product requirements, pilot design, inventory flows and spatial analytics.'],
        ['Growth & strategy', 'Funnel diagnosis, unit economics, pricing, market entry and bottom-up cost models.'],
        ['Tools', TOOLS.join(' · ')],
      ].map(([name, skills]) => <div key={name}><dt>{name}</dt><dd>{skills}</dd></div>)}</dl>
    </div></section>
    <div className="wrap cv-band personal-record">
      <section id="education" className="school-record"><span className="cv-kicker">Academic qualifications</span><h2 className="cv-display">Education<span>.</span></h2>
        <dl>{EDU.map(item => <div key={item.school}><dt>{item.school}</dt><dd>{item.degree} · {item.years}</dd><dd>{item.note}</dd></div>)}</dl><TLink to="/education" className="cv-textlink">Academic record <span aria-hidden>↗</span></TLink>
      </section>
      <div className="cv-chapters">
        <section id="awards"><h2>Academic distinctions &amp; co-curricular achievements</h2><p>My team’s quadricycle took first place at Junkyard War. Building it followed two national competition finishes for energy conversion and roller-coaster design.</p>
          <details><summary>Competition results, awards and exam ranks</summary><ul>{ACHIEVE.map(item => <li key={item}>{item}</li>)}</ul></details>
        </section>
        <section id="leadership"><h2>Positions of responsibility</h2><p>As secretary of the Mechanical Society at NIT Kurukshetra in 2021, I led 100+ members across five teams, including audiovisual events. We ran a technical festival with a footfall of over 4,000.</p>
          <details><summary>Budgets, committees and events</summary><ul>
            <li>Managed over ₹4 lakh across ten events, prepared the festival’s statement of bills and cut expenses by 25% through prioritisation.</li>
            <li>Oversaw seven or more technical events, organised 10+ workshops for 80+ society members and arranged an LPS Bossard industrial visit for 50+ members.</li>
            <li>Led a 15+ member catering committee for 1,000+ guests and the souvenir committee that designed 180+ copies.</li>
          </ul></details>
        </section>
        <section id="extracurricular"><h2>Extracurricular achievements</h2><p>As head of the mess committee from 2018 to 2021, I represented 400+ students and achieved over 90% student satisfaction.</p>
          <details><summary>School and campus activities</summary><ul>
            <li>Chosen as head boy from among 1,000+ students and awarded Student of the Year in 2016.</li>
            <li>Led a 15+ person team for two cultural festival events at NIT Kurukshetra in 2020–2021 and served on the sponsorship committee.</li>
            <li>As technical festival convener in 2020, increased social media outreach by 25% through Instagram.</li>
          </ul></details>
        </section>
        <section id="non-profit"><h2>Entrepreneurial &amp; non-profit venture</h2><p>With Shiksha, I led multichannel donation campaigns raising over ₹60,000 and helped build a community library with 500+ books in its first year. Our fundraising for the children’s three wishes raised over ₹3 lakh and reached more than 200 children.</p></section>
        <section id="social-impact"><h2>Social initiatives</h2><p>From 2017 to 2021, I spent over 1,000 hours mentoring more than 100 children through Shiksha. We ran 15+ workshops with five schools and NGOs for over 200 students. Footfall increased by 24% year over year.</p></section>
        <section id="live-projects"><h2>Live projects</h2><p>In 2024, I worked on learning platforms, pricing and mentorship. The tailored mentorship programme raised student participation by 40%.</p><details><summary>Project outcomes</summary><ul>{LIVE_PROJECTS.map(point => <li key={point}>{point}</li>)}</ul></details></section>
        <section id="certifications"><h2>Certifications</h2><p>In 2024, I completed 5+ product management certifications with a 93%+ average score and 5+ business management certifications, including two from Oxford.</p><dl>{CERTS.map(cert => <div key={cert.title}><dt>{cert.title}</dt><dd>{cert.by}</dd></div>)}</dl></section>
      </div>
    </div>
  </div>
}
export default HomeStory
