import type { ChapterId } from '../chapters'
import './evidence.css'

type Excerpt = { file: string; title: string; description: string; alt: string }
type Collection = { heading: string; records: Excerpt[] }

const evidence: Partial<Record<ChapterId, Collection>> = {
  'social-impact': {
    heading: 'Four years with Shiksha',
    records: [{ file: 'shiksha-service', title: 'Certificate of Excellence · March 2021',
      description: 'The Students’ Club for Social Action at NIT Kurukshetra recognised my four years of service with Shiksha–Ek Abhiyan.',
      alt: 'Excerpt from the Shiksha–Ek Abhiyan certificate recognising four years of service' }],
  },
  leadership: {
    heading: 'The festival budget',
    records: [{ file: 'techspardha-budget', title: 'Techspardha ’21 · Mechanical Society',
      description: 'My proposed festival budget put the ten events on one sheet. It also covered the less visible work of feeding guests, printing 180 souvenirs and arranging audiovisual support. The estimate came to just over ₹4 lakh.',
      alt: 'Techspardha 2021 budget showing proposed prizes for ten events and committee costs, prepared by Sumit Yadav as secretary' }],
  },
  awards: {
    heading: 'GATE 2021 results',
    records: [
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
  certifications: {
    heading: 'Selected credentials',
    records: [
      { file: 'product-discovery', title: 'Product Discovery Micro-Certification', description: 'Issued by Product School.', alt: 'Product School credential naming Sumit Yadav and the Product Discovery Micro-Certification' },
      { file: 'mobile-product', title: 'Mobile App Product Management Certification', description: 'Issued by UXCam Academy.', alt: 'UXCam Academy credential for Mobile App Product Management awarded to Sumit Yadav' },
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
        <a className="source-print" href={'/work/evidence/' + item.file + '.webp'} target="_blank" rel="noreferrer" aria-label={'Enlarge ' + item.title}><img src={'/work/evidence/' + item.file + '.webp'} alt={item.alt} loading="lazy" /></a>
        <figcaption><h3>{item.title}</h3><p>{item.description}</p></figcaption>
      </figure>)}
    </div>
  </section>
}
