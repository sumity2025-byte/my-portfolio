// Hover effects from the Awwwards Pack:
//  - WeightHover: Hover Effects #23 (variable font weight follows the cursor)
import { cloneElement, useRef, type ReactElement } from 'react'
import { FINE_POINTER, gsap, REDUCED, SplitText, useGSAP } from '../lib/gsap'

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
