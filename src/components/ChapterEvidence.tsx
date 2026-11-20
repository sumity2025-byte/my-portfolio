import type { ChapterId } from '../chapters'
import './evidence.css'

type Excerpt = { file: string; title: string; description: string; alt: string; href?: string }
type Collection = { heading: string; records: Excerpt[] }

const evidence: Partial<Record<ChapterId, Collection>> = {
  'social-impact': {
    heading: 'Four years with Shiksha',
    records: [{ file: 'shiksha-service', title: 'Certificate of Excellence · March 2021',
      description: 'The Students’ Club for Social Action at NIT Kurukshetra recognised my four years of service with Shiksha–Ek Abhiyan.',
      alt: 'Excerpt from the Shiksha–Ek Abhiyan certificate recognising four years of service' }],
  },
  leadership: {
    heading: 'Inside Techspardha ’21',
    records: [{ file: 'techspardha-budget', title: 'Techspardha ’21 · Mechanical Society',
      description: 'My proposed festival budget put the ten events on one sheet. It also covered the less visible work of feeding guests, printing 180 souvenirs and arranging audiovisual support. The estimate came to just over ₹4 lakh.',
      alt: 'Techspardha 2021 budget showing proposed prizes for ten events and committee costs, prepared by Sumit Yadav as secretary', href: '/work/evidence/techspardha-planning.pdf#page=1' },

      { file: 'festival-programme', title: 'The event programme', description: 'The Mechanical Society’s planning deck brought ten events into one programme, from Junkyard Wars to 3-D Integration.', alt: 'Techspardha slide listing the ten Mechanical Society events', href: '/work/evidence/techspardha-planning.pdf#page=3' },
      { file: 'festival-coaster', title: 'Roll-a-Coaster', description: 'Teams had to design a track with loops and a lifting mechanism. The event brief set out the materials and progression between rounds.', alt: 'Roll-a-Coaster event brief and a photograph of a track', href: '/work/evidence/techspardha-planning.pdf#page=4' },
      { file: 'festival-cad', title: 'From sketch to CAD', description: 'The 3-D Integration competition moved from a pen-and-paper elimination round to a timed design session in the CAD lab.', alt: 'CAD lab photo beside the 3-D Integration event brief', href: '/work/evidence/techspardha-planning.pdf#page=5' },
      { file: 'festival-souvenir', title: 'Behind the festival', description: 'The committee sheet specifies 180 printed souvenirs, audiovisual support and catering quantities for the inauguration.', alt: 'Operating sheet with souvenir, audio, video and catering requirements', href: '/work/evidence/techspardha-planning.pdf#page=6' },
    ],
  },
  awards: {
    heading: 'Competition archive & GATE results',
    records: [
      { file: 'competition-team', title: 'The Junkyard War team', description: 'Our NIT Kurukshetra team with the vehicle we built for the competition.', alt: 'Student team standing beside the competition vehicle' },
      { file: 'competition-prototype', title: 'The workshop prototype', description: 'A photograph from the build archive shows the frame, track and mechanical components assembled in the workshop.', alt: 'Student-built mechanical prototype on a workshop table' },
      { file: 'competition-trophies', title: 'After the competitions', description: 'A photograph from my national competition records at NIT Kurukshetra.', alt: 'Sumit with trophies from the engineering competitions' },
      { file: 'gate-me', title: 'Mechanical Engineering', description: 'All India Rank 2,070, with 66.15 marks out of 100.', alt: 'Mechanical Engineering result excerpt showing 66.15 marks and rank 2070' },
      { file: 'gate-xe', title: 'Engineering Sciences', description: 'All India Rank 2,184, with 43.67 marks out of 100.', alt: 'Engineering Sciences result excerpt showing 43.67 marks and rank 2184' },
    ],
  },
  'live-projects': {
    heading: 'Live projects at Skilled Sapiens',
    records: [
      { file: 'product-brand-project', title: 'Product and Brand Manager Intern', description: 'Completed a live project in product and brand management from 20 October to 20 November 2024.', alt: 'Skilled Sapiens completion certificate excerpt naming Sumit Yadav as Product and Brand Manager Intern' },
      { file: 'business-strategy-project', title: 'Business Strategy & Growth Partner', description: 'Completed a second live project in business strategy and growth during the same October–November 2024 period.', alt: 'Skilled Sapiens completion certificate excerpt for the Business Strategy and Growth Partner project' },
    ],
  },

}

export function ChapterEvidence({ id }: { id: ChapterId }) {
  const collection = evidence[id]
  if (!collection) return null
  return <section className={'source-collection wrap source-' + id} aria-labelledby="source-heading">
    <h2 id="source-heading">{collection.heading}</h2>
    <div className={'source-grid' + (collection.records.length === 1 ? ' source-solo' : '')}>
      {collection.records.map(item => <figure key={item.file}>
        <a className="source-print" href={item.href ?? '/work/evidence/' + item.file + '.webp'} target="_blank" rel="noreferrer" aria-label={'Open ' + item.title}><img src={'/work/evidence/' + item.file + '.webp'} alt={item.alt} loading="lazy" /></a>
        <figcaption><h3>{item.title}</h3><p>{item.description}</p></figcaption>
      </figure>)}
    </div>
  </section>
}
