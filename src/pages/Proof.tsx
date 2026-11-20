import { useRef } from 'react'
import { Footer, NextPage } from '../components/Chrome'
import { DotGrid } from '../fx/DotGrid'
import { Count } from '../fx/Scroll'
import { BlockReveal, LineRise, Scramble } from '../fx/Text'
import { gsap, REDUCED, useGSAP } from '../lib/gsap'

const DELTAS = [
  ['−23%', 'Complaints', 'Four diagnostic heatmaps on the spatial engine; placement accuracy up 22%.'],
  ['−43%', 'Inventory variance', 'Prioritization engine and execution dashboard across 2,300+ stores.'],
  ['+118%', 'Profitability', 'Across 42 firms from a portfolio of 80+ D2C clients.'],
]

export default function Proof() {
  const bars = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    const els = bars.current!.querySelectorAll<HTMLElement>('.bar i')
    if (REDUCED) { els.forEach(e => (e.style.width = e.dataset.w!)); return }
    els.forEach((e, i) => gsap.fromTo(e, { width: 0 }, { width: e.dataset.w, duration: 1.4, delay: i * 0.35, ease: 'power3.out', scrollTrigger: { trigger: bars.current, start: 'top 80%', once: true } }))
  }, { scope: bars })
  return (
    <>
      <DotGrid className="proof-hero">
        <div className="wrap">
          <Scramble><p className="eyebrow">Operating results</p></Scramble>
          <BlockReveal onScroll={false} delay={0.15}><h1 className="display">One pilot.<br /><span className="o">Doubled adherence.</span></h1></BlockReveal>
          <LineRise onScroll={false} delay={0.5}><p className="lede">One pilot became a chain-wide system. Here's what the work moved, across 2,300+ dark stores and 80+ D2C brands.</p></LineRise>
        </div>
      </DotGrid>
      <section className="wrap proof-bars" ref={bars}>
        <div className="bar-row">
          <div className="bar-lab"><span>Before</span><b><Count to={43} suffix="%" /></b></div>
          <div className="bar"><i className="b-before" data-w="43%" /></div>
        </div>
        <div className="bar-row">
          <div className="bar-lab"><span>After</span><b className="o"><Count from={43} to={92} suffix="%" duration={2} /></b></div>
          <div className="bar"><i className="b-after" data-w="92%" /></div>
        </div>
        <p className="cap">Pick-path adherence, pan-India, after picklist suppression. Pick-per-item time fell 10% and throughput rose 7.5%.</p>
      </section>
      <section className="wrap deltas">
        {DELTAS.map(([v, t, d]) => (
          <div className="delta" key={t}>
            <BlockReveal color="var(--blue)"><b>{v}</b></BlockReveal>
            <h3>{t}</h3>
            <LineRise><p>{d}</p></LineRise>
          </div>
        ))}
      </section>
      <NextPage to="/skills" label="Skills" />
      <Footer />
    </>
  )
}
