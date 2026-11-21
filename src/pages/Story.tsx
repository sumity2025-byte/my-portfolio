import AboutStory from '../components/AboutStory'
import WorkFilm from '../components/WorkFilm'
import { DOCS, SITE } from '../data'
import './story.css'

const WORKING_FILES = [
  ['Returns decision tree', '/docs/WhatsApp_Image_2026-04-14_at_5_21_03_AM.jpeg'],
  ['Marketing whiteboard', '/docs/WhatsApp_Image_2026-04-14_at_5_21_04_AM.jpeg'],
  ['Campaign handbook', DOCS[2].href + '#page=3'],
  ['Pre-live checklist', DOCS[3].href + '#page=14'],
]

export default function Story() {
  return <>
    <AboutStory />
    <section className="working-files wrap" aria-labelledby="working-files-title">
      <header>
        <div><p className="eyebrow">Working documents</p><h2 id="working-files-title">Inside the work<span className="o">.</span></h2></div>
        <a className="btn btn-ghost" href={SITE.productCv} target="_blank" rel="noreferrer">Product &amp; Growth CV ↗</a>
      </header>
      <WorkFilm ready />
      <div className="bio-links">{WORKING_FILES.map(([title, href]) =>
        <a key={title} href={href} target="_blank" rel="noreferrer">{title} ↗</a>
      )}</div>
    </section>
  </>
}
