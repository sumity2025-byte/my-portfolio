// Hover effects from the Awwwards Pack:
//  - WeightHover: Hover Effects #23 (variable font weight follows the cursor)
//  - MarqueeMenu: Hover Effects #4  (a marquee band slides in from the edge the cursor entered)
import { cloneElement, useRef, type ReactElement, type ReactNode } from 'react'
import { FINE_POINTER, gsap, REDUCED, SplitText, useGSAP } from '../lib/gsap'
import { TLink } from './PageTransition'

const W_THIN = 100, W_BLACK = 900, W_MID = 500

export function WeightHover({ children, radius = 300, smoothing = 0.1 }: { children: ReactElement<{ ref?: React.Ref<HTMLElement> }>; radius?: number; smoothing?: number }) {
  const ref = useRef<HTMLElement>(null)
  useGSAP(() => {
    const title = ref.current
    if (!title || REDUCED || !FINE_POINTER) return
    let split: SplitText | null = null
    let cleanup = () => {}
    document.fonts.ready.then(() => {
      if (!ref.current) return
      split = SplitText.create(title, { type: 'words,chars', charsClass: 'wh-char' })
      const chars = (split.chars as HTMLElement[]).map(el => {
        const base = parseFloat(getComputedStyle(el).fontWeight) || W_BLACK
        return { el, base, hover: base > W_MID ? W_THIN : W_BLACK, cur: base, target: base, shown: base, cx: 0, cy: 0 }
      })
      const cache = () => chars.forEach(c => { const r = c.el.getBoundingClientRect(); c.cx = r.left + r.width / 2; c.cy = r.top + r.height / 2 })
      const move = (e: MouseEvent) => {
        cache()
        chars.forEach(c => {
          const p = gsap.utils.clamp(0, 1, 1 - Math.hypot(e.clientX - c.cx, e.clientY - c.cy) / radius)
          c.target = Math.round(gsap.utils.interpolate(c.base, c.hover, p))
        })
      }
      const reset = () => chars.forEach(c => (c.target = c.base))
      const tick = () => {
        const f = 1 - Math.pow(1 - smoothing, gsap.ticker.deltaRatio())
        chars.forEach(c => {
          const d = c.target - c.cur
          if (d === 0) return
          c.cur = Math.abs(d) < 0.5 ? c.target : c.cur + d * f
          const r = Math.round(c.cur)
          if (r !== c.shown) { c.shown = r; c.el.style.fontWeight = String(r) }
        })
      }
      const zone = title.parentElement ?? title
      gsap.ticker.add(tick)
      zone.addEventListener('mousemove', move)
      zone.addEventListener('mouseleave', reset)
      cleanup = () => { gsap.ticker.remove(tick); zone.removeEventListener('mousemove', move); zone.removeEventListener('mouseleave', reset) }
    })
    return () => { cleanup(); split?.revert() }
  }, { scope: ref })
  return cloneElement(children, { ref })
}

export type MarqueeItem = { to: string; label: string; tags: string[]; index: string }

function MarqueeRow({ item }: { item: MarqueeItem }) {
  const row = useRef<HTMLDivElement>(null)
  const band = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)
  const edge = (e: React.MouseEvent) => {
    const r = row.current!.getBoundingClientRect()
    return e.clientY - r.top < r.height / 2 ? 'top' : 'bottom'
  }
  const enter = (e: React.MouseEvent) => {
    if (REDUCED) return
    const top = edge(e) === 'top'
    gsap.timeline({ defaults: { duration: 0.6, ease: 'expo.out' } })
      .set(band.current, { y: top ? '-101%' : '101%' }, 0)
      .set(inner.current, { y: top ? '101%' : '-101%' }, 0)
      .to([band.current, inner.current], { y: '0%' }, 0)
  }
  const leave = (e: React.MouseEvent) => {
    if (REDUCED) return
    const top = edge(e) === 'top'
    gsap.timeline({ defaults: { duration: 0.6, ease: 'expo.out' } })
      .to(band.current, { y: top ? '-101%' : '101%' }, 0)
      .to(inner.current, { y: top ? '101%' : '-101%' }, 0)
  }
  const run: ReactNode[] = []
  for (let k = 0; k < 2; k++) item.tags.forEach((t, i) => {
    run.push(<span key={`${k}-${i}`}>{t}</span>)
    run.push(<i key={`${k}-${i}-dot`} className="mq-dot" aria-hidden />)
  })
  return (
    <div className="mq-item" ref={row}>
      <TLink to={item.to} className="mq-link" onMouseEnter={enter} onMouseLeave={leave}>
        <span className="mq-index">{item.index}</span>{item.label}
      </TLink>
      <div className="mq-band" ref={band} aria-hidden>
        <div className="mq-inner-wrap" ref={inner}><div className="mq-inner">{run}</div></div>
      </div>
    </div>
  )
}

export function MarqueeMenu({ items }: { items: MarqueeItem[] }) {
  return <nav className="mq-menu">{items.map(i => <MarqueeRow key={i.to} item={i} />)}</nav>
}
