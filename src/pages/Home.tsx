import { useLayoutEffect, useRef } from 'react'
import { SITE } from '../data'
import { Footer } from '../components/Chrome'
import { TLink } from '../fx/PageTransition'
import { TrailText, TrailImage } from '../fx/intro-trail/trail'
import { gsap, REDUCED } from '../lib/gsap'
import HomeStory from '../components/HomeStory'
import HomePointer from '../fx/HomePointer'
import './home.css'

const photograph = '/docs/WhatsApp_Image_2026-04-14_at_5_21_03_AM.jpeg'

export default function Home() {
  const root = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    if (REDUCED || !root.current) return
    const trails = Array.from(root.current.querySelectorAll<HTMLElement>('.intro-name'), el =>
      new TrailText(el, { perspective: 1000, totalTrailElements: 3 }))
    const picture = new TrailImage(root.current.querySelector<HTMLElement>('.intro-photo')!, { totalTrailElements: 8 })
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { duration: 1.4, ease: 'power4.out' } })
      trails.forEach((trail, i) => tl.from(trail.DOM.trailElems,
        { rotateY: i ? 0 : 160, yPercent: i ? 90 : 0, opacity: 0, stagger: -0.08 }, i * 0.1))
      tl.from(picture.DOM.trailElems, { xPercent: 65, yPercent: 20, rotate: 11, opacity: 0, stagger: -0.03 }, 0)
    }, root)
    return () => { ctx.revert(); trails.forEach(trail => trail.reset()); picture.reset() }
  }, [])
  return <>
    <HomePointer />
    <section className="intro-cover" ref={root}>
      <div className="intro-grid wrap">
        <div className="intro-bio">
          <p className="intro-role">Product, strategy &amp; operations</p>
          <h1 aria-label="Sumit Yadav"><span className="intro-name" aria-hidden>Sumit</span><span className="intro-name" aria-hidden>Yadav</span></h1>
          <p className="intro-line">I start on the store floor.</p>
          <p className="intro-summary">I’m a mechanical engineer and IIM Calcutta graduate. At Blinkit, I turn what I learn in the aisles into better ways to pick, stock and replenish across 2,300+ dark stores.</p>
          <div className="intro-links"><TLink to="/work">Explore my work <span aria-hidden>↗</span></TLink><a href={SITE.resume} target="_blank" rel="noreferrer">Résumé (PDF)</a></div>
        </div>
        <figure className="intro-figure">
          <div className="intro-print"><div className="intro-photo" role="img" aria-label="Working notes with handwritten tables and calculations" style={{backgroundImage: 'url(' + photograph + ')'}} /></div>
          <figcaption><span>From my working notes</span><span>Field archive</span></figcaption>
        </figure>
      </div>
    </section>
    <HomeStory />
    <Footer />
  </>
}
