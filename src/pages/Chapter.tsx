import { PageHead } from '../components/Chrome'
import { ACHIEVE, LIVE_PROJECTS, SITE } from '../data'
import { TLink } from '../fx/PageTransition'
import { BlockReveal } from '../fx/Text'
import { chapterTitles, type ChapterId } from '../chapters'
import { ChapterEvidence } from '../components/ChapterEvidence'
import CertificationArchive from '../components/CertificationArchive'
import './chapter.css'

type Entry = { title: string; paragraphs: string[] }
type ChapterCopy = {
  lead: string
  measure: string
  caption: string
  context: string
  section: string
  entries: Entry[]
}

const chapters: Record<ChapterId, ChapterCopy> = {
  awards: {
    lead: 'Building a quadricycle, designing a roller coaster and taking the engineering entrance exams each tested a different part of my engineering education.',
    measure: '1st', caption: 'Junkyard War quadricycle design, 2018', context: 'Academic distinctions & co-curricular achievements', section: 'The record',
    entries: ACHIEVE.map(item => { const [title, body] = item.split(' · '); return { title, paragraphs: [body] } }),
  },
  leadership: {
    lead: 'As secretary of the Mechanical Society at NIT Kurukshetra, I coordinated the people, budget and logistics behind a technical festival attended by more than 4,000.',
    measure: '100+', caption: 'Society members across five teams', context: 'Mechanical Society · NIT Kurukshetra · 2021', section: 'The technical festival',
    entries: [
      { title: 'Budget & operations', paragraphs: ['I managed over ₹4 lakh across ten events and prepared the festival’s statement of bills. By prioritising spending, we cut expenses by 25%.'] },
      { title: 'Workshops & industry', paragraphs: ['I oversaw seven or more technical events across five teams, including audiovisual events. We organised 10+ workshops for 80+ society members and arranged a visit to LPS Bossard for more than 50 members.'] },
      { title: 'Guests & publications', paragraphs: ['I headed a catering committee of 15+ for more than 1,000 guests. I also led the souvenir committee, which designed 180+ copies for the festival.'] },
    ],
  },
  'social-impact': {
    lead: 'Over four years with Shiksha, I mentored children, organised workshops with local schools and NGOs, and helped raise the money for a community library. On campus, I represented students and organised cultural and technical events.',
    measure: '1,000+', caption: 'Hours spent mentoring children', context: 'Community & campus life', section: 'Teaching & fundraising',
    entries: [
      { title: 'Mentoring', paragraphs: ['Over four years, I spent more than 1,000 hours mentoring over 100 children.'] },
      { title: 'School partnerships', paragraphs: ['We organised 15+ workshops with five schools and NGOs for more than 200 students. Attendance grew 24% year over year.'] },
      { title: 'A community library', paragraphs: ['I led multichannel donation campaigns that raised over ₹60,000 and helped build a community library. In its first year, the library held more than 500 books.'] },
      { title: 'Three wishes', paragraphs: ['Our fundraising raised over ₹3 lakh to fulfil three wishes for more than 200 children.'] },
    ],
  },
  'live-projects': {
    lead: 'At Skilled Sapiens I worked on learning platforms, pricing and mentorship. My coursework alongside those projects covered consulting, strategic planning and product management.',
    measure: '+40%', caption: 'Participation in a tailored mentorship programme', context: 'Product & business management · 2024', section: 'Project outcomes',
    entries: [
      { title: 'Learning platforms', paragraphs: LIVE_PROJECTS.slice(0, 3) },
      { title: 'Pricing & delivery', paragraphs: LIVE_PROJECTS.slice(3, 4) },
      { title: 'Mentorship & readiness', paragraphs: LIVE_PROJECTS.slice(4) },
    ],
  },
}

const campusEntries: Entry[] = [
  { title: 'Mess committee', paragraphs: ['As committee head from 2018 to 2021, I represented more than 400 students and achieved over 90% student satisfaction.'] },
  { title: 'Cultural festival', paragraphs: ['In 2020–2021, I led a team of more than 15 students to organise two cultural festival events at NIT Kurukshetra. I also served on the sponsorship committee.'] },
  { title: 'Technical festival', paragraphs: ['As festival convener in 2020, I grew social media outreach by 25% through Instagram.'] },
  { title: 'Head boy', paragraphs: ['In 2016, I was selected as head boy from among more than 1,000 students and received the Student of the Year award.'] },
]

export default function Chapter({ id }: { id: ChapterId }) {
  const page = chapters[id]
  return <>
    <article className="cv-chapter-page">
      <PageHead eyebrow={page.context} title={chapterTitles[id]} lede={page.lead} />
      {(id === 'live-projects' || id === 'social-impact') && <nav className="chapter-jumps wrap" aria-label="On this page">
        {id === 'live-projects' ? <><TLink to="/live-projects#project-outcomes">Live projects ↓</TLink><TLink to="/live-projects#certifications">Certifications &amp; CVs ↓</TLink></>
          : <><TLink to="/social-impact#shiksha">Shiksha ↓</TLink><TLink to="/social-impact#extracurricular">Extracurricular activities ↓</TLink></>}
      </nav>}
      <figure className="chapter-figure wrap">
        <strong>{page.measure}</strong><figcaption>{page.caption}</figcaption>
      </figure>
      <section className="chapter-evidence wrap" id={id === 'live-projects' ? 'project-outcomes' : id === 'social-impact' ? 'shiksha' : undefined}>
        <BlockReveal><h2 className="display-sm">{page.section}</h2></BlockReveal>
        <div className="chapter-entries">{page.entries.map(entry => <section key={entry.title}>
          <h3>{entry.title}</h3>
          {entry.paragraphs.map(body => <p key={body}>{body}</p>)}
        </section>)}</div>
      </section>
      <ChapterEvidence id={id} />
      {id === 'social-impact' && <section className="chapter-evidence wrap" id="extracurricular">
        <h2 className="display-sm">Extracurricular activities</h2>
        <div className="chapter-entries">{campusEntries.map(item => <section key={item.title}><h3>{item.title}</h3><p>{item.paragraphs[0]}</p></section>)}</div>
      </section>}
      {id === 'live-projects' ? <CertificationArchive /> : <div className="wrap"><a className="btn btn-ghost" href={SITE.resume} target="_blank" rel="noreferrer">Strategy CV (PDF) ↗</a></div>}
    </article>
  </>
}
