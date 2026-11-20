import { ArrowUpRight } from 'lucide-react'
import { DOCS } from '../data'

type Sample = {
  title: string
  src: string
  alt: string
  href?: string
}

const samples: Record<string, Sample[]> = {
  blinkit: [
    { title: 'Store floor plan', src: '/work/evidence/layout-detail.webp', alt: 'Desktop floor plan showing the arrangement of racks within an aisle' },
    { title: 'Rack editor', src: '/work/evidence/rack-editor.webp', alt: 'Controls for adding, rotating and sequencing racks in a store layout' },
    { title: 'Diagnostic heatmaps', src: '/work/evidence/heatmap-menu.webp', alt: 'Map layers for storage utilisation, pick time, fast-selling items and category centres' },
  ],
  shopdeck: [
    { title: 'Returns RCA decision tree', src: '/docs/WhatsApp_Image_2026-04-14_at_5_21_03_AM.jpeg', alt: 'Handwritten decision tree for investigating spikes in return-to-origin orders' },
    { title: 'Marketing RCA board', src: '/docs/WhatsApp_Image_2026-04-14_at_5_21_04_AM.jpeg', alt: 'Whiteboard mapping possible causes of changes in campaign performance' },
    { title: 'Campaign setup SOP', src: '/work/campaign-settings.webp', alt: 'Annotated conversion settings from the 25-step advertising playbook', href: DOCS[2].href + '#page=3' },
    { title: 'Go-live checklist', src: '/work/launch-checklist.webp', alt: 'The 100-point checklist used before launching a merchant storefront', href: DOCS[3].href + '#page=14' },
  ],
  accenture: [
    { title: 'Internship completion certificate', src: '/work/evidence/accenture-internship.webp', alt: 'Accenture confirms Sumit’s April–May 2024 internship in procurement of drilling services' },
  ],
  'x-culture': [
    { title: 'International Business Certificate', src: '/work/evidence/x-culture-certificate.webp', alt: 'X-Culture certificate issued to Sumit Yadav on 28 December 2024 for international business consulting' },
    { title: 'Reference letter · 3 pages', src: '/work/evidence/x-culture-reference.webp', alt: 'First page of the X-Culture reference covering the consulting project, peer evaluation and recommendation', href: '/work/evidence/x-culture-reference.pdf' },
  ],
}

export default function WorkSamples({ role }: { role: string }) {
  const items = samples[role]
  if (!items) return null
  return <div className="role-samples">
    <h3 className="sample-heading">{role === 'accenture' || role === 'x-culture' ? 'Credentials' : 'Work samples'}</h3>
    <div className="sample-grid">
      {role === 'blinkit' && <figure id="location-migration" className="prototype-sample">
        <video controls playsInline preload="none" poster="/work/evidence/location-migration.webp" src="/work/evidence/location-migration.mp4"
          aria-label="Silent Figma walkthrough of a bin transfer" aria-describedby="migration-caption" />
        <figcaption id="migration-caption">Location migration <span>Figma walkthrough</span></figcaption>
      </figure>}
      {items.map(item => <a className="sample-link" key={item.src} href={item.href ?? item.src} target="_blank" rel="noreferrer">
        <div className="sample-preview"><img loading="lazy" src={item.src} alt={item.alt} /></div>
        <span className="sample-caption">{item.title}<ArrowUpRight size={17} aria-hidden="true" /></span>
      </a>)}
    </div>
  </div>
}
