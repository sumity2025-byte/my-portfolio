import { PROJECTS } from '../data'
import { Footer, NextPage, PageHead } from '../components/Chrome'
import { Showcase } from '../fx/Showcase'

export default function Projects() {
  return (
    <>
      <PageHead eyebrow="Case studies · 6 projects" title={<>Selected <span className="o">projects.</span></>}
        lede="One project per screen. Scroll down to move through them." />
      <Showcase items={PROJECTS} />
      <NextPage to="/proof" label="Proof" />
      <Footer />
    </>
  )
}
