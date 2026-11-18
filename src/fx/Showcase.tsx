// Scroll Animation #29 from the Awwwards Pack ("pinned image mask reveal"): project text scrolls
// normally on the left while a sticky panel on the right wipes from one project to the next and
// the section's background tint follows along. Scrubbed to the scrollbar, so it never runs ahead of you.
import { useRef } from 'react'
import { gsap, REDUCED, useGSAP } from '../lib/gsap'

export type ShowcaseItem = { tag: string; title: string; body: string; metrics: string[][]; tone: 'orange' | 'blue' | 'yellow' | 'ink' }
const TINT = { orange: '#fff0e8', blue: '#eaf0ff', yellow: '#fff6dc', ink: '#ecebe6' }

export function Showcase({ items }: { items: ShowcaseItem[] }) {
  const root = useRef<HTMLElement>(null)
  const n = items.length
  const pad = (k: number) => String(k).padStart(2, '0')

  useGSAP(() => {
    const sec = root.current!
    const panels = gsap.utils.toArray<HTMLElement>('.sc-panel', sec)
    const inners = panels.map(p => p.querySelector('.sc-inner'))
    const infos = gsap.utils.toArray<HTMLElement>('.sc-info', sec)
    const mm = gsap.matchMedia()
    gsap.set(sec, { backgroundColor: TINT[items[0].tone] })

    mm.add('(min-width: 861px)', () => {
      gsap.set(panels, { clipPath: 'inset(0% 0% 0% 0%)' })
      if (REDUCED) return
      // One step per project. Each step holds, wipes the current panel up, then holds again,
      // so the swap lands while the text between two projects is passing the middle of the screen.
      const tl = gsap.timeline({ scrollTrigger: { trigger: sec, start: 'top top', end: 'bottom bottom', scrub: 0.6 } })
      panels.forEach((panel, i) => {
        const next = panels[i + 1]
        if (!next) return
        const at = i
        tl.to(sec, { backgroundColor: TINT[items[i + 1].tone], duration: 0.5, ease: 'power1.inOut' }, at + 0.25)
          .to(panel, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.5, ease: 'power2.inOut' }, at + 0.25)
          .to(inners[i], { yPercent: -12, duration: 0.5, ease: 'none' }, at + 0.25)
          .fromTo(inners[i + 1], { yPercent: 12 }, { yPercent: 0, duration: 0.5, ease: 'none' }, at + 0.25)
      })
      tl.to({}, { duration: 0.25 }) // tail hold on the last project

      // dim the project text that isn't centred, so it's always clear which one you're on
      infos.forEach(info => gsap.timeline({ scrollTrigger: { trigger: info, start: 'top bottom', end: 'bottom top', scrub: true } })
        .fromTo(info.firstElementChild, { opacity: 0.18 }, { opacity: 1, duration: 0.4, ease: 'none' })
        .to(info.firstElementChild, { opacity: 1, duration: 0.2 })
        .to(info.firstElementChild, { opacity: 0.18, duration: 0.4, ease: 'none' }))
    })
    return () => mm.revert()
  }, { scope: root })

  return (
    <section className="sc" ref={root}>
      <div className="sc-grid wrap">
        <div className="sc-left">
          {items.map((it, i) => (
            <article className="sc-info" key={it.title} style={{ order: i * 2 }}>
              <div>
                <p className="eyebrow">{pad(i + 1)} / {pad(n)} · {it.tag}</p>
                <h2>{it.title}</h2>
                <p className="sc-desc">{it.body}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="sc-right">
          {items.map((it, i) => (
            <div className={`sc-panel tone-${it.tone}`} key={it.title} style={{ zIndex: n - i, order: i * 2 + 1 }}>
              <div className="sc-inner">
                <div className="sc-top"><span>{it.tag}</span><span>{pad(i + 1)} / {pad(n)}</span></div>
                <div className="sc-stat"><b>{it.metrics[0][0]}</b><span>{it.metrics[0][1]}</span></div>
                <ul className="sc-metrics">{it.metrics.slice(1).map(([v, l]) => <li key={l}><b>{v}</b><span>{l}</span></li>)}</ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
