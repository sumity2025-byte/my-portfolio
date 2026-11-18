// 3D Animation #22 from the Awwwards Pack: cards drop in, gather, then spread out and flip in 3D to show their backs.
import { useRef } from 'react'
import { gsap, REDUCED, ScrollTrigger, useGSAP } from '../lib/gsap'

export type Skill = { name: string; items: string[]; tone: 'orange' | 'blue' | 'yellow' }
const smooth = (p: number) => p * p * (3 - 2 * p)

export function SkillCards({ title, skills }: { title: React.ReactNode; skills: Skill[] }) {
  const sec = useRef<HTMLElement>(null)
  useGSAP(() => {
    const root = sec.current!
    const cards = Array.from(root.querySelectorAll<HTMLElement>('.sk-card'))
    const inners = cards.map(c => c.querySelector('.sk-inner'))
    const header = root.querySelector('.sk-header')
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1000px)', () => {
      if (REDUCED) { gsap.set(inners, { rotationY: 180 }); return }
      const startX = (i: number) => (i === 0 ? '100%' : i === cards.length - 1 ? '-100%' : '0%')
      const startR = (i: number) => (i === 0 ? -5 : i === cards.length - 1 ? 5 : 0)
      ScrollTrigger.create({
        trigger: root, start: 'top top', end: () => `+=${window.innerHeight * 3}`, pin: true, scrub: 1,
        onUpdate: ({ progress }) => {
          gsap.set(header, { y: gsap.utils.interpolate('300%', '0%', smooth(gsap.utils.clamp(0, 1, progress / 0.5))) })
          cards.forEach((card, i) => {
            const d = i * 0.5
            const cp = gsap.utils.clamp(0, 1, (progress - d * 0.1) / (0.9 - d * 0.1))
            let y = '0%', scale = 1, x = '0%', rot = 0, ry = 180
            if (cp < 0.4) { const n = smooth(cp / 0.4); y = gsap.utils.interpolate('-100%', '50%', n); scale = gsap.utils.interpolate(0.25, 0.75, n) }
            else if (cp < 0.6) { const n = smooth((cp - 0.4) / 0.2); y = gsap.utils.interpolate('50%', '0%', n); scale = gsap.utils.interpolate(0.75, 1, n) }
            const opacity = cp < 0.2 ? smooth(cp / 0.2) : 1
            if (cp < 0.6) { x = startX(i); rot = startR(i); ry = 0 }
            else if (cp < 1) { const n = smooth((cp - 0.6) / 0.4); x = gsap.utils.interpolate(startX(i), '0%', n); rot = gsap.utils.interpolate(startR(i), 0, n); ry = n * 180 }
            gsap.set(card, { opacity, y, x, rotate: rot, scale })
            gsap.set(inners[i], { rotationY: ry })
          })
        },
      })
    })
    mm.add('(max-width: 999px)', () => { gsap.set(inners, { rotationY: 180 }) })
    return () => mm.revert()
  }, { scope: sec })
  return (
    <section className="sk" ref={sec}>
      <div className="sk-header">{title}</div>
      <div className="sk-cards">
        {skills.map((s, i) => (
          <div className={`sk-card tone-${s.tone}`} key={s.name}>
            <div className="sk-inner">
              <div className="sk-face sk-front">
                <div className="sk-row"><span>{s.name}</span><span>0{i + 1}</span></div>
                <div className="sk-big">{s.name}</div>
                <div className="sk-row"><span>0{i + 1}</span><span>{s.name}</span></div>
              </div>
              <div className="sk-face sk-back">
                <div className="sk-row"><span>{s.name}</span><span>0{i + 1}</span></div>
                <ul>{s.items.map(it => <li key={it}>{it}</li>)}</ul>
                <div className="sk-row"><span>0{i + 1}</span><span>{s.name}</span></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
