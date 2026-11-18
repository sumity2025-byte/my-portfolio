// Scroll animations from the Awwwards Pack:
//  - PathTimeline: Scroll Animation #33 (a thick orange path draws itself behind the content as you scroll)
//  - Bands:        Scroll Animation #49 (crossing marquee bands that scale with scroll)
import { useRef, useState, type ReactNode } from 'react'
import { gsap, REDUCED, useGSAP } from '../lib/gsap'

export function PathTimeline({ children }: { children: ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null)
  const path = useRef<SVGPathElement>(null)
  useGSAP(() => {
    const p = path.current!
    const len = p.getTotalLength()
    p.style.strokeDasharray = `${len}`
    p.style.strokeDashoffset = REDUCED ? '0' : `${len}`
    if (REDUCED) return
    gsap.to(p, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: wrap.current, start: 'top center', end: 'bottom bottom', scrub: true } })
  }, { scope: wrap })
  return (
    <div className="path-wrap" ref={wrap}>
      <div className="path-svg" aria-hidden>
        <svg viewBox="0 0 1378 2760" fill="none" preserveAspectRatio="none">
          <path ref={path} d="M639.668 100C639.668 100 105.669 100 199.669 601.503C293.669 1103.01 1277.17 691.502 1277.17 1399.5C1277.17 2107.5 -155.332 1968 140.168 1438.5C435.669 909.002 1442.66 2093.5 713.168 2659.5"
            stroke="var(--orange)" strokeWidth="140" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
      {children}
    </div>
  )
}

export function Bands({ a, b }: { a: string[]; b: string[] }) {
  const sec = useRef<HTMLElement>(null)
  useGSAP(() => {
    if (REDUCED) return
    const [r1, r2] = sec.current!.querySelectorAll('.band-track')
    const st = { trigger: sec.current, start: 'top bottom', end: 'bottom top', scrub: true }
    gsap.fromTo(r1, { xPercent: 0 }, { xPercent: -25, ease: 'none', scrollTrigger: st })
    gsap.fromTo(r2, { xPercent: -25 }, { xPercent: 0, ease: 'none', scrollTrigger: st })
    gsap.fromTo(sec.current!.querySelectorAll('.band'), { scale: 1.25 }, { scale: 0.9, ease: 'none', scrollTrigger: st })
  }, { scope: sec })
  const row = (words: string[]) => Array.from({ length: 4 }, (_, k) => words.map((w, i) => <span key={`${k}${i}`}>{w}<i aria-hidden>✺</i></span>))
  return (
    <section className="bands" ref={sec} aria-label={a.join(', ')}>
      <div className="band band-1"><div className="band-track">{row(a)}</div></div>
      <div className="band band-2"><div className="band-track">{row(b)}</div></div>
    </section>
  )
}

export function Count({ to, prefix = '', suffix = '', decimals = 0, from = 0, duration = 1.6 }: { to: number; prefix?: string; suffix?: string; decimals?: number; from?: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [v, setV] = useState(REDUCED ? to : from)
  useGSAP(() => {
    if (REDUCED) return
    const o = { v: from }
    gsap.to(o, { v: to, duration, ease: 'power3.out', onUpdate: () => setV(o.v), scrollTrigger: { trigger: ref.current, start: 'top 90%', once: true } })
  }, { scope: ref })
  return <span ref={ref}>{prefix}{decimals ? v.toFixed(decimals) : Math.round(v).toLocaleString('en-IN')}{suffix}</span>
}
