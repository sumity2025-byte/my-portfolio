import { useLayoutEffect, useRef, useState } from 'react'
import { ArrowDownRight, ArrowUpRight, BookOpen, ChartNoAxesColumnIncreasing, Cog, Compass } from 'lucide-react'
import { SITE } from '../data'
import { Footer } from '../components/Chrome'
import HomeStory from '../components/HomeStory'
import CareerOrbit from '../fx/CareerOrbit'
import { TLink } from '../fx/PageTransition'
import { TrailText } from '../fx/intro-trail/trail'
import { gsap, REDUCED } from '../lib/gsap'
import './home.css'

const chapters = [
  { title: 'Engineering', icon: Cog, source: 'Honda · UPS Lakshmi · Adani', story: 'From tracing a leak on a motorcycle line to evaluating ₹235 crore in industrial equipment.' },
  { title: 'Growth', icon: ChartNoAxesColumnIncreasing, source: 'Shopdeck', story: 'Working with 80+ merchants, I traced the journey from an ad click to a delivered order.' },
  { title: 'Strategy & product', icon: Compass, source: 'Accenture · IIM Calcutta · Blinkit', story: 'I built a procurement cost model at Accenture and turned store visits into product requirements at Blinkit.' },
  { title: 'Community', icon: BookOpen, source: 'Shiksha · NIT Kurukshetra', story: 'I mentored more than 100 children and helped build a community library with 500+ books in its first year.' },
]

function CareerExhibit({ ready }: { ready: boolean }) {
  const [chapter, setChapter] = useState(0)
  const active = chapters[chapter]
  return <figure className="career-exhibit">
    <div className="orbit-window">{ready && <CareerOrbit chapter={chapter} />}</div>
    <div className="chapter-controls" role="group" aria-label="Explore career chapters">
      {chapters.map(({ title, icon: Icon }, index) =>
        <button key={title} type="button" aria-pressed={chapter === index} onClick={() => setChapter(index)}>
          <span className="chapter-glass" aria-hidden="true"><Icon size={19} strokeWidth={1.65} /></span><span>{title}</span>
        </button>)}
    </div>
    <figcaption className="orbit-caption" aria-live="polite" aria-atomic="true">
      <span key={active.source}>{active.source}</span><p key={active.title}>{active.story}</p>
    </figcaption>
  </figure>
}

export default function Home({ ready }: { ready: boolean }) {
  const cover = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    const el = cover.current
    if (!ready || REDUCED || !el) return
    // Typographic trails from the Drive pack's IntroTrailEffect.
    const lines = Array.from(el.querySelectorAll<HTMLElement>('.cover-word'), word =>
      new TrailText(word, { perspective: 1000, totalTrailElements: 3 }))
    const ctx = gsap.context(() => {
      const enter = gsap.timeline({ defaults: { ease: 'power4.out' } })
      lines.forEach((line, index) => enter.from(line.DOM.trailElems,
        { yPercent: 40, rotateX: -50, opacity: 0, stagger: -0.06, duration: 0.95 }, 0.08 * index))
      enter.from('.cover-byline, .cover-copy, .cover-actions', { y: 12, autoAlpha: 0, stagger: 0.06, duration: 0.65 }, 0.05)
    }, el)
    return () => { ctx.revert(); lines.forEach(line => line.reset()) }
  }, [ready])

  return <>
    <section className="field-cover" ref={cover} aria-labelledby="cover-heading">
      <div className="cover-inner">
        <div className="cover-spread">
          <div className="cover-text">
            <p className="cover-byline"><span aria-hidden="true" />Mechanical engineer <i>/</i> IIM Calcutta MBA</p>
            <h1 id="cover-heading" aria-label="Sumit Yadav">
              <span className="cover-word" aria-hidden="true">Sumit</span>
              <span className="cover-word cover-script" aria-hidden="true">Yadav.</span>
            </h1>
            <p className="cover-copy">I’ve worked on Honda’s assembly line, helped D2C founders grow at Shopdeck, and built a library with Shiksha. Today I build products for the people running <strong>Blinkit’s dark stores.</strong></p>
            <div className="cover-actions">
              <TLink className="work-jump" to="/#projects">Explore my work <ArrowDownRight size={19} aria-hidden /></TLink>
              <a className="resume-jump" href={SITE.resume} target="_blank" rel="noreferrer">Read my CV <ArrowUpRight size={16} aria-hidden /></a>
            </div>
          </div>
          <CareerExhibit ready={ready} />
        </div>
        <dl className="cover-evidence">
          <div><dt>Operations <span>/</span> Blinkit</dt><dd>2,300<span>+</span></dd><dd className="evidence-caption">Dark stores digitized</dd></div>
          <div><dt>Growth <span>/</span> Shopdeck</dt><dd>₹100<small> Cr+</small></dd><dd className="evidence-caption">Annual D2C revenue managed</dd></div>
          <div><dt>Education <span>/</span> Shiksha</dt><dd>1,000<span>+</span></dd><dd className="evidence-caption">Hours mentoring children</dd></div>
        </dl>
      </div>
    </section>
    <HomeStory />
    <Footer />
  </>
}
