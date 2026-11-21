import { PROJECTS } from '../data'
import { PageHead } from '../components/Chrome'
import SplitGallery from '../fx/SplitGallery'
import { BlockReveal } from '../fx/Text'
import { Showcase } from '../fx/Showcase'

export default function Projects() {
  return (
    <>
      <PageHead eyebrow={PROJECTS.length + ' case studies'} title={<>Selected <span className="o">projects.</span></>}
        lede="What should a client pay? Where is a brand losing margin? Which product change merits a wider rollout? These cases show how I approached each decision and what followed." />
      <Showcase items={PROJECTS} />
      <section className="document-shelf wrap" aria-labelledby="document-shelf-title">
        <BlockReveal><h2 id="document-shelf-title" className="display-sm">From my Shopdeck archive</h2></BlockReveal>
        <SplitGallery />
      </section>
    </>
  )
}
