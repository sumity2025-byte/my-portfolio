import { TLink } from '../fx/PageTransition'
import { BlockReveal } from '../fx/Text'

const milestones = [
  {
    period: 'School & NIT Kurukshetra · through 2021',
    title: 'Engineering outside the classroom',
    paragraphs: [
      'I was head boy at school. At NIT Kurukshetra, where I studied mechanical engineering, I found a different way to lead. Our team designed a quadricycle for Junkyard War and finished first among more than twenty teams. Later, as Mechanical Society secretary, I helped put on the festival itself, bringing five teams together to run ten events.',
      'Some of my most meaningful work at NIT happened away from the workshop. Over four years with Shiksha, I spent more than 1,000 hours mentoring children. We worked with local schools and NGOs, raised donations and built a community library that held more than 500 books in its first year.',
    ],
    links: [['/leadership', 'Mechanical Society'], ['/social-impact', 'Shiksha'], ['/awards', 'Competitions']],
  },
  {
    period: 'Honda, UPS Lakshmi & Adani · 2020–2022',
    title: 'What a lost hour costs',
    paragraphs: [
      'At Honda, I investigated a recurring defect that stopped the motorcycle assembly line for repairs. Removing its cause brought the associated line stoppage from 42 minutes to zero. At UPS Lakshmi, I saw the same problem from a customer’s side. While managing aerospace accounts including Honeywell and Boeing, I worked on a machine changeover that cut setup time from twelve hours to four.',
      'At Adani, the decisions came before the machinery arrived. I evaluated proposals from international suppliers for ₹235 crore of material-handling and drying equipment. A cheap quotation meant little until we understood what the plant would actually receive.',
    ],
    links: [['/work', 'Industry experience']],
  },
  {
    period: 'Shopdeck · 2022–2023',
    title: 'Following an order past checkout',
    paragraphs: [
      'At Shopdeck I worked with more than 80 online brands. A merchant could show healthy sales and still lose money on orders that came back. I drew a decision tree to distinguish a sudden spike in returns from a persistent problem. Consultants could use it to decide what to investigate on their next call.',
      'That work grew into a campaign handbook and a 100-point launch checklist. Eighty consultants used the process across more than 500 launches. The original pages appear below, including the handwritten notes behind the returns diagnostic.',
    ],
    links: [['/projects', 'Merchant growth projects']],
  },
  {
    period: 'IIM Calcutta · MBA, 2025',
    title: 'Learning to price a decision',
    paragraphs: [
      'After scoring in the 99.14th percentile in CAT, I joined IIM Calcutta. At Accenture Strategy & Consulting, I compared five international bids and built a model of what the purchase should cost. Breaking the price into more than fifteen drivers helped us identify a potential 10% saving.',
      'I also worked with an international X-Culture team on market entry for a consumer goods client. Two live projects with Skilled Sapiens gave me a chance to work on product and brand management as well as business strategy and growth.',
    ],
    links: [['/education', 'Education'], ['/live-projects', 'Live projects']],
  },
  {
    period: 'Blinkit · May 2025 onward',
    title: 'Designing for the store floor',
    paragraphs: [
      'I visited more than 50 dark stores to understand how teams located inventory, moved stock and followed a pick list. A floor plan was only useful if a person standing at a rack could match it to the right bin. I worked with product, engineering and operations to give those locations a common address across 2,300+ stores.',
      'One pilot changed the order in which items appeared on a pick list. Adherence to the intended route rose from 43% to 92%, and time per item fell 10%. On the Experience page, you can watch the related location-migration workflow from aisle selection to confirmation.',
    ],
    links: [['/work', 'See the prototype'], ['/proof', 'Operating results']],
  },
]

export default function AboutStory() {
  return <section className="bio wrap" id="about" aria-labelledby="bio-title">
    <header><p className="eyebrow">About Sumit</p><BlockReveal><h2 id="bio-title">How I got here<span className="o">.</span></h2></BlockReveal></header>
    <div className="bio-timeline">{milestones.map(m => <article key={m.title}>
      <p className="bio-period">{m.period}</p><div><h3>{m.title}</h3>
        {m.paragraphs.map(p => <p key={p}>{p}</p>)}
        <div className="bio-links">{m.links.map(([path,label]) => <TLink key={path} to={path}>{label} <span aria-hidden="true">↗</span></TLink>)}</div>
      </div></article>)}</div>
  </section>
}
