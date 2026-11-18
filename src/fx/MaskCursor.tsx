// Mouse Effects #3: an orange circle follows the cursor and reveals a second line of copy underneath.
import { useRef } from 'react'
import { FINE_POINTER, gsap, REDUCED, useGSAP } from '../lib/gsap'

const MASK = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='50' fill='white'/></svg>\")"

export function MaskCursor({ front, hidden }: { front: React.ReactNode; hidden: React.ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null)
  const mask = useRef<HTMLDivElement>(null)
  const target = useRef<HTMLParagraphElement>(null)
  useGSAP(() => {
    const m = mask.current!, w = wrap.current!
    if (REDUCED || !FINE_POINTER) return
    let size = 0, x = -200, y = -200, cx = -1, cy = -1
    const pos = () => `${x - size / 2}px ${y - size / 2}px`
    const place = (d: number) => {
      if (cx < 0) return
      const r = w.getBoundingClientRect()
      x = cx - r.left; y = cy - r.top
      gsap.to(m, { webkitMaskPosition: pos(), maskPosition: pos(), duration: d, ease: 'power2.out', overwrite: 'auto' })
    }
    gsap.set(m, { webkitMaskImage: MASK, maskImage: MASK, webkitMaskSize: '0px', maskSize: '0px' })
    const move = (e: MouseEvent) => { cx = e.clientX; cy = e.clientY; place(0.18) }
    const onScroll = () => place(0)
    const grow = (to: number, ease: string, d: number) => () => {
      size = to
      gsap.to(m, { webkitMaskSize: `${to}px`, maskSize: `${to}px`, webkitMaskPosition: pos(), maskPosition: pos(), duration: d, ease })
    }
    const enterZone = grow(40, 'power3.out', 0.3), leaveZone = grow(0, 'power3.out', 0.3)
    const enterText = grow(400, 'back.out(1.7)', 0.5), leaveText = grow(40, 'power3.out', 0.4)
    const t = target.current!
    w.addEventListener('mousemove', move); window.addEventListener('scroll', onScroll, { passive: true }); w.addEventListener('mouseenter', enterZone); w.addEventListener('mouseleave', leaveZone)
    t.addEventListener('mouseenter', enterText); t.addEventListener('mouseleave', leaveText)
    return () => {
      w.removeEventListener('mousemove', move); window.removeEventListener('scroll', onScroll); w.removeEventListener('mouseenter', enterZone); w.removeEventListener('mouseleave', leaveZone)
      t.removeEventListener('mouseenter', enterText); t.removeEventListener('mouseleave', leaveText)
    }
  }, { scope: wrap })
  return (
    <div className="mask-zone" ref={wrap}>
      <div className="mask-body"><p ref={target}>{front}</p></div>
      <div className="mask-layer" ref={mask} aria-hidden><p>{hidden}</p></div>
    </div>
  )
}
