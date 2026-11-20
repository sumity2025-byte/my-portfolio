import { Footer } from '../components/Chrome'
import { ACHIEVE, CERTS, DOCS, LIVE_PROJECTS, SITE } from '../data'
import { TLink } from '../fx/PageTransition'
import { chapterIds, chapterTitles, type ChapterId } from '../chapters'
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
  about: {
    lead: 'I’m Sumit Yadav. I started out fixing a leak on a motorcycle production line. Today, I work on how someone finds the right item on a shelf at Blinkit.',
    measure: '50+', caption: 'Dark stores visited for field research', context: 'Sumit Yadav · Product, strategy & operations', section: 'From the shop floor',
    entries: [
      { title: 'Learning in the factory', paragraphs: ['At Honda, I traced a recurring leak to its cause and helped cut line stoppage from 42 minutes to zero. I graduated in mechanical engineering from NIT Kurukshetra in 2021, then worked with aerospace customers at UPS Lakshmi and industrial equipment suppliers at Adani.'] },
      { title: 'Learning from merchants', paragraphs: ['At Shopdeck, I worked with more than 80 online brands. When returns rose, my first question was whether they had always been high or whether something had just changed. That distinction became a decision tree consultants could use on their next call.'] },
      { title: 'Learning in the aisles', paragraphs: ['An MBA at IIM Calcutta gave me a grounding in finance and strategy. At Blinkit, visits to more than 50 dark stores shaped the layout and bin-identification work I led across 2,300+ locations.'] },
    ],
  },
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
    lead: 'Through Shiksha, I mentored children and worked with local schools and NGOs to bring more students into the programme.',
    measure: '1,000+', caption: 'Hours spent mentoring children', context: 'Shiksha · 2017–2021', section: 'Mentoring & outreach',
    entries: [
      { title: 'Mentoring', paragraphs: ['Over four years, I spent more than 1,000 hours mentoring over 100 children.'] },
      { title: 'School partnerships', paragraphs: ['We organised 15+ workshops with five schools and NGOs for more than 200 students. Attendance grew 24% year over year.'] },
    ],
  },
  'non-profit': {
    lead: 'With Shiksha, I helped turn donations into a community library and raised funds to fulfil children’s wishes.',
    measure: '500+', caption: 'Books in the library’s first year', context: 'Shiksha · 2017–2021', section: 'Community fundraising',
    entries: [
      { title: 'A community library', paragraphs: ['I led multichannel donation campaigns that raised over ₹60,000 and helped build a community library. In its first year, the library held more than 500 books.'] },
      { title: 'Three wishes', paragraphs: ['Our fundraising raised over ₹3 lakh to fulfil three wishes for more than 200 children.'] },
    ],
  },
  'live-projects': {
    lead: 'My 2024 projects covered learning platforms and mentorship, from how a student first enrols to how a programme measures career readiness.',
    measure: '+40%', caption: 'Participation in a tailored mentorship programme', context: 'Product & business management · 2024', section: 'Project outcomes',
    entries: [
      { title: 'Learning platforms', paragraphs: LIVE_PROJECTS.slice(0, 3) },
      { title: 'Pricing & delivery', paragraphs: LIVE_PROJECTS.slice(3, 4) },
      { title: 'Mentorship & readiness', paragraphs: LIVE_PROJECTS.slice(4) },
    ],
  },
  certifications: {
    lead: 'In 2024, I completed more than five product management certifications and more than five business management certifications, including two from Oxford.',
    measure: '93%+', caption: 'Average score in product management certifications', context: 'Management education · 2024', section: 'Programmes & providers',
    entries: CERTS.map(cert => ({ title: cert.title, paragraphs: [cert.by] })),
  },
  extracurricular: {
    lead: 'In school and at NIT Kurukshetra, I represented classmates, organised cultural events and helped students have a say in the services they used every day.',
    measure: '400+', caption: 'Students represented on the mess committee', context: 'School & campus life · 2016–2021', section: 'Student life',
    entries: [
      { title: 'Mess committee', paragraphs: ['As committee head from 2018 to 2021, I represented more than 400 students and achieved over 90% student satisfaction.'] },
      { title: 'Cultural festival', paragraphs: ['In 2020–2021, I led a team of more than 15 students to organise two cultural festival events at NIT Kurukshetra. I also served on the sponsorship committee.'] },
      { title: 'Technical festival', paragraphs: ['As festival convener in 2020, I grew social media outreach by 25% through Instagram.'] },
      { title: 'Head boy', paragraphs: ['In 2016, I was selected as head boy from among more than 1,000 students and received the Student of the Year award.'] },
    ],
  },
}

function WorkDocuments() {
  return <section className="chapter-documents">
    <div className="wrap"><h2>Working documents</h2>
      <p>At Shopdeck, a page of handwritten notes became a decision tree for returns. A whiteboard mapped changes in marketing performance. I also wrote a campaign handbook and a pre-live checklist for the teams launching sellers.</p>
    </div>
    <div className="wrap chapter-source-list">{[
      ['Returns decision tree', '/docs/WhatsApp_Image_2026-04-14_at_5_21_03_AM.jpeg'],
      ['Marketing whiteboard', '/docs/WhatsApp_Image_2026-04-14_at_5_21_04_AM.jpeg'],
      ['Campaign handbook', DOCS[2].href + '#page=3'],
      ['Pre-live checklist', DOCS[3].href + '#page=14'],
    ].map(([title, href]) => <a key={title} href={href} target="_blank" rel="noreferrer">{title}<span aria-hidden>↗</span></a>)}</div>
  </section>
}

export default function Chapter({ id }: { id: ChapterId }) {
  const page = chapters[id]
  const next = chapterIds[(chapterIds.indexOf(id) + 1) % chapterIds.length]
  return <>
    <article className="cv-chapter-page">
      <header className="chapter-opening wrap">
        <p className="chapter-context">{page.context}</p>
        <div className="chapter-masthead">
          <div><h1>{chapterTitles[id]}</h1><p className="chapter-lead">{page.lead}</p></div>
          <figure className="chapter-figure"><strong>{page.measure}</strong><figcaption>{page.caption}</figcaption></figure>
        </div>
      </header>
      <section className="chapter-evidence wrap">
        <h2>{page.section}</h2>
        <div className="chapter-entries">{page.entries.map(entry => <section key={entry.title}>
          <h3>{entry.title}</h3>
          {entry.paragraphs.map(body => <p key={body}>{body}</p>)}
        </section>)}</div>
      </section>
      {id === 'about' && <WorkDocuments />}
      <nav className="chapter-continue wrap" aria-label="Related material"><a href={SITE.resume} target="_blank" rel="noreferrer">Full résumé (PDF) <span aria-hidden>↗</span></a>
        <TLink to={'/' + next}>{chapterTitles[next]} <span aria-hidden>→</span></TLink>
      </nav>
    </article>
    <Footer />
  </>
}
