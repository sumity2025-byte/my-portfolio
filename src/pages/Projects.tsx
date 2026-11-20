import { PROJECTS } from '../data'
import { Footer, NextPage, PageHead } from '../components/Chrome'
import SplitGallery from '../fx/SplitGallery'
import { BlockReveal } from '../fx/Text'
import { Showcase } from '../fx/Showcase'

export default function Projects() {
  return (
    <>
      <PageHead eyebrow="Case studies · 6 projects" title={<>Selected <span className="o">projects.</span></>}
        lede="One project per screen. Scroll down to move through them." />
      <Showcase items={PROJECTS} />
      <section className="document-shelf wrap" aria-labelledby="document-shelf-title">
        <BlockReveal><h2 id="document-shelf-title" className="display-sm">From my Shopdeck archive</h2></BlockReveal>
        <SplitGallery />
      </section>
      <NextPage to="/proof" label="Proof" />
      <Footer />
    </>
  )
}
