import { lazy, Suspense, useEffect, useRef } from 'react'
import { SITE, STATS } from '../data'
import { Footer, PAGES } from '../components/Chrome'
import { MarqueeMenu, WeightHover } from '../fx/Hover'
import { MaskCursor } from '../fx/MaskCursor'
import { TLink } from '../fx/PageTransition'
import { Bands, Count } from '../fx/Scroll'
import { CharRise, LineRise, Scramble, BlockReveal } from '../fx/Text'

const Warehouse = lazy(() => import('../fx/Warehouse'))

export default function Home({ ready }: { ready: boolean }) {
  const progress = useRef(0)
  useEffect(() => {
    const on = () => (progress.current = Math.min(1, window.scrollY / (window.innerHeight * 1.1)))
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <>
      <section className="hero">
        <div className="hero-3d" aria-hidden><Suspense fallback={null}><Warehouse progressRef={progress} /></Suspense></div>
        <div className="wrap hero-copy">
          <Scramble><p className="eyebrow">IIM Calcutta MBA · Strategy · Growth · Product</p></Scramble>
          {ready ? (
            <WeightHover>
              <h1 className="hero-title">
                <CharRise onScroll={false}><span className="ht-line">I fix <span data-weight="thin">the way</span></span></CharRise>
                <CharRise onScroll={false} delay={0.25}><span className="ht-line">work gets <span className="o">done.</span></span></CharRise>
              </h1>
            </WeightHover>
          ) : <h1 className="hero-title" style={{ visibility: 'hidden' }}><span className="ht-line">I fix the way</span><span className="ht-line">work gets done.</span></h1>}
          {ready && <LineRise onScroll={false} delay={0.6}><p className="lede">Mechanical engineer turned operator. I build the systems inside India's fastest-moving companies: 2,300+ Blinkit dark stores, ₹100 Cr+ of D2C revenue, ₹235 Cr+ of capex.</p></LineRise>}
          <div className="cta">
            <TLink className="btn" to="/work">See the work</TLink>
            <a className="btn btn-ghost" href={SITE.resume} target="_blank" rel="noreferrer">Resume (PDF)</a>
          </div>
        </div>
        <p className="hero-hint">Scroll — the grey route is the old pick path. The orange one is what we built.</p>
      </section>

      <section className="stats wrap">
        {STATS.map(s => (
          <div className="stat" key={s.label}><b><Count to={s.n} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} /></b><span>{s.label}</span></div>
        ))}
      </section>

      <MaskCursor
        front={<>I turn <em>messy operating problems</em> into systems that scale — equal parts analyst, operator and builder.</>}
        hidden={<>The best strategy is the one that survives contact with the store floor.</>}
      />

      <Bands a={['Strategy', 'Growth', 'Operations', 'Product']} b={['2,300+ stores', '₹100 Cr+ a year', '₹235 Cr+ capex', '15+ pilots']} />

      <section className="explore">
        <div className="wrap"><BlockReveal><h2 className="display-sm">Pick a route.</h2></BlockReveal></div>
        <MarqueeMenu items={PAGES.map((p, i) => ({ to: p.to, label: p.label, tags: p.tags, index: `0${i + 1}` }))} />
      </section>
      <Footer />
    </>
  )
}
