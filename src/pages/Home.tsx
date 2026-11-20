import { Component, lazy, Suspense, useEffect, useRef, useState, type ReactNode } from 'react'
import { DOCS, SITE, STATS } from '../data'
import AboutStory from '../components/AboutStory'
import { PAGES } from '../components/Chrome'
import WorkFilm from '../components/WorkFilm'
import { MarqueeMenu, WeightHover } from '../fx/Hover'
import { MaskCursor } from '../fx/MaskCursor'
import { TLink } from '../fx/PageTransition'
import { Bands, Count } from '../fx/Scroll'
import { BlockReveal, CharRise, LineRise, Scramble } from '../fx/Text'
import { REDUCED } from '../lib/gsap'
import './home.css'

const Warehouse = lazy(() => import('../fx/Warehouse'))

class WarehouseFallback extends Component<{ children: ReactNode }, { unavailable: boolean }> {
  state = { unavailable: false }
  static getDerivedStateFromError() { return { unavailable: true } }
  render() { return this.state.unavailable ? null : this.props.children }
}

export default function Home({ ready }: { ready: boolean }) {
  const hero = useRef<HTMLElement>(null)
  const routeProgress = useRef(0)
  const [visible, setVisible] = useState(false)
  const [loadScene, setLoadScene] = useState(false)
  useEffect(() => {
    const el = hero.current
    if (!el || REDUCED) return
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting)
      if (entry.isIntersecting) setLoadScene(true)
    })
    observer.observe(el)
    const follow = () => { routeProgress.current = Math.max(0, Math.min(1, -el.getBoundingClientRect().top / (el.offsetHeight * .85))) }
    follow()
    window.addEventListener('scroll', follow, { passive: true })
    return () => { observer.disconnect(); window.removeEventListener('scroll', follow) }
  }, [])
  return <>
    <section ref={hero} className="hero warehouse-hero" aria-labelledby="home-title">
      <div className="hero-3d" aria-hidden="true">
        {ready && loadScene && <WarehouseFallback><Suspense fallback={null}><Warehouse running={visible} progressRef={routeProgress} /></Suspense></WarehouseFallback>}
      </div>
      <div className="wrap hero-copy">
        <Scramble><p className="eyebrow">Sumit Yadav · IIM Calcutta MBA</p></Scramble>
        {ready ? <WeightHover><h1 className="hero-title" id="home-title" aria-label="I fix the way work gets done.">
          <CharRise onScroll={false}><span className="ht-line">I fix <span data-weight="thin">the way</span></span></CharRise>
          <CharRise onScroll={false} delay={.25}><span className="ht-line">work gets <span className="o">done.</span></span></CharRise>
        </h1></WeightHover> : <h1 className="hero-title" id="home-title"><span className="ht-line">I fix the way</span><span className="ht-line">work gets <span className="o">done.</span></span></h1>}
        {ready && <LineRise onScroll={false} delay={.6}><p className="lede">I’m a mechanical engineer working in product at Blinkit. At Shopdeck, I followed orders from an ad click to a customer’s doorstep. Today I work on the other half of that journey, designing how store teams receive stock, organise shelves and pick an order.</p></LineRise>}
        <div className="cta"><TLink to="/work" className="btn">Explore my experience <span aria-hidden="true">↗</span></TLink><TLink to="/#about" className="btn btn-ghost">About me <span aria-hidden="true">↓</span></TLink></div>
      </div>
      <p className="hero-hint">Scroll to trace the orange pick route through the warehouse.</p>
    </section>
    <section className="stats wrap" aria-label="Career in numbers">{STATS.map(s => <div className="stat" key={s.label}><b><Count to={s.n} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} /></b><span>{s.label}</span></div>)}</section>
    <MaskCursor
      front={<>Before I changed a pick list at Blinkit, I visited <em>more than 50 stores</em> to see how people used it.</>}
      hidden={<>Following the new route, pickers spent 10% less time per item.</>}
    />
    <Bands a={['Engineering','Product','Growth','Operations']} b={['NIT Kurukshetra','Shiksha','IIM Calcutta','Blinkit']} />
    <AboutStory />
    <section className="working-files wrap" aria-labelledby="working-files-title">
      <header><div><p className="eyebrow">Working documents</p><h2 id="working-files-title">Inside the work<span className="o">.</span></h2></div><a className="btn btn-ghost" href={SITE.resume} target="_blank" rel="noreferrer">Read my CV ↗</a></header>
      <WorkFilm ready={ready} />
      <div className="bio-links">{[
        ['Returns decision tree', '/docs/WhatsApp_Image_2026-04-14_at_5_21_03_AM.jpeg'],
        ['Marketing whiteboard', '/docs/WhatsApp_Image_2026-04-14_at_5_21_04_AM.jpeg'],
        ['Campaign handbook', DOCS[2].href + '#page=3'], ['Pre-live checklist', DOCS[3].href + '#page=14'],
      ].map(([title, href]) => <a key={title} href={href} target="_blank" rel="noreferrer">{title} ↗</a>)}</div>
    </section>
    <section className="explore" aria-labelledby="explore-title">
      <div className="wrap"><BlockReveal><h2 id="explore-title" className="display-sm">Pick a route.</h2></BlockReveal></div>
      <MarqueeMenu items={PAGES.map((page, index) => ({ ...page, index: String(index + 1).padStart(2, '0') }))} />
    </section>
  </>
}
