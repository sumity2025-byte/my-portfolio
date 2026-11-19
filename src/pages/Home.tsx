import { useLayoutEffect, useRef, useState } from 'react'
import { TLink } from '../fx/PageTransition'
import { SITE } from '../data'
import { Footer } from '../components/Chrome'
import HomeStory from '../components/HomeStory'
import HomePointer from '../fx/HomePointer'
import { TrailText } from '../fx/intro-trail/trail'
import { gsap, REDUCED } from '../lib/gsap'
import './home.css'

import StoreModel from '../fx/StoreModel'

function StoreExhibit() {
  const [view, setView] = useState<'perspective' | 'plan'>('perspective')
  return <figure className="store-exhibit">
    <div className="store-frame">
      <div className="store-tools">
        <span className="store-legend">Dark-store study</span>
        <div className="view-switch" role="group" aria-label="Store model view">
          <button type="button" aria-pressed={view === 'perspective'} onClick={() => setView('perspective')}>3D view</button>
          <button type="button" aria-pressed={view === 'plan'} onClick={() => setView('plan')}>Plan</button>
        </div>
      </div>
      <div className="model-window">
        <StoreModel view={view} />
      </div>
      <figcaption className="store-caption"><span className="route-key" aria-hidden="true"/><span>Illustrative pick route</span>{view === 'perspective' && <span className="orbit-hint">Drag to rotate ↔</span>}</figcaption>
    </div>
  </figure>
}

export default function Home() {
  const cover = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    const el = cover.current
    if (REDUCED || !el) return
    // The text layers and stagger come from the Drive pack's IntroTrailEffect.
    const lines = Array.from(el.querySelectorAll<HTMLElement>('.cover-word'), word =>
      new TrailText(word, { perspective: 1000, totalTrailElements: 3 }))
    const ctx = gsap.context(() => {
      const enter = gsap.timeline({ defaults: { ease: 'power4.out' } })
      lines.forEach((line, index) => enter.from(line.DOM.trailElems,
        { yPercent: index ? 62 : 38, rotateX: -54, opacity: 0, stagger: -0.07, duration: 1 }, 0.1 * index))
      enter.from('.cover-byline, .cover-copy, .cover-actions', { y: 12, autoAlpha: 0, stagger: 0.07, duration: 0.7 }, 0.08)
    }, el)
    return () => { ctx.revert(); lines.forEach(line => line.reset()) }
  }, [])

  return <>
    <HomePointer />
    <section className="field-cover" ref={cover} aria-labelledby="cover-heading">
      <div className="cover-inner">
        <div className="cover-spread">
          <div className="cover-text">
            <p className="cover-byline"><span aria-hidden="true" />IIM Calcutta MBA <i>/</i> Product &amp; operations</p>
            <h1 id="cover-heading" aria-label="Fieldwork, at scale.">
              <span className="cover-word" aria-hidden="true">Fieldwork,</span>
              <span className="cover-word cover-script" aria-hidden="true">at scale.</span>
            </h1>
            <p className="cover-copy">I walked 50+ dark stores to understand how pickers find a product. At Blinkit, I turned those observations into tools used across <strong>2,300+ stores.</strong></p>
            <div className="cover-actions">
              <TLink className="work-jump" to="/#projects">Explore the work <span aria-hidden="true">↓</span></TLink>
              <a className="resume-jump" href={SITE.resume} target="_blank" rel="noreferrer">View résumé <span aria-hidden="true">↗</span></a>
            </div>
          </div>
          <StoreExhibit />
        </div>
        <dl className="cover-evidence">
          <div><dt>Blinkit <span>/</span> Store network</dt><dd>2,300<span>+</span></dd><dd className="evidence-caption">Dark stores digitized</dd></div>
          <div><dt>Blinkit <span>/</span> Picking</dt><dd>43<small>%</small><b aria-label="to">→</b>92<small>%</small></dd><dd className="evidence-caption">Pick-path adherence</dd></div>
          <div><dt>Shopdeck <span>/</span> Growth</dt><dd>₹100<small> Cr+</small></dd><dd className="evidence-caption">Annual D2C revenue managed</dd></div>
        </dl>
      </div>
    </section>
    <HomeStory />
    <Footer />
  </>
}
