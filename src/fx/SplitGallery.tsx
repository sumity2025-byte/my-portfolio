import { useEffect, useRef } from 'react'
import type { KeyboardEvent } from 'react'
import './pack-effects.css'

export type SplitGalleryItem = { src: string; alt: string; title: string; caption: string; href: string }
const documents: [SplitGalleryItem, SplitGalleryItem] = [
  { src: '/work/campaign-settings.webp', alt: 'Annotated conversion campaign settings in the Shopdeck handbook', title: 'The campaign handbook', caption: 'A 25-step setup guide for growth consultants.', href: '/docs/Campaign_Handbook__2_.pdf#page=3' },
  { src: '/work/growth-plan.webp', alt: 'Eight-week growth plan from the Shopdeck launch deck', title: 'The merchant launch plan', caption: 'An eight-week view of merchant onboarding and growth.', href: '/docs/Pre-Live__PPT_Final__1_.pdf#page=15' },
]

export default function SplitGallery({ items = documents, reversed = false }: {
  items?: readonly [SplitGalleryItem, SplitGalleryItem]
  reversed?: boolean
}) {
  const row = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const host = row.current
    if (!host) return
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let target = reversed ? 100 : 0
    let current = target
    function paint() {
      // From code (2).zip: interpolate towards the pointer, then share the row 2:1 to 1:2.
      current = motion.matches ? target : current + (target - current) * .15
      if (Math.abs(current-target)<.1) current=target
      host!.style.setProperty('--gallery-left', (66.66-current*.33)+'fr')
      host!.style.setProperty('--gallery-right', (33.33+current*.33)+'fr')
      frame = current === target ? 0 : requestAnimationFrame(paint)
    }
    function select(value: number) {
      target = Math.min(100, Math.max(0, value))
      if (!frame) paint()
    }
    function pointer(e: PointerEvent) {
      if (e.pointerType === 'touch') return
      const rect = host!.getBoundingClientRect()
      select((e.clientX-rect.left) / rect.width * 100)
    }
    function focus(e: FocusEvent) {
      select(e.target === host!.querySelector('a') ? 0 : 100)
    }
    function reset() {
      if (!host!.contains(document.activeElement)) select(reversed ? 100 : 0)
    }
    paint()
    host.addEventListener('pointermove', pointer)
    host.addEventListener('pointerleave', reset)
    host.addEventListener('focusin', focus)
    return () => {
      cancelAnimationFrame(frame)
      host.removeEventListener('pointermove', pointer)
      host.removeEventListener('pointerleave', reset)
      host.removeEventListener('focusin', focus)
    }
  }, [reversed])
  function arrow(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
    event.preventDefault()
    row.current?.querySelectorAll('a')[event.key === 'ArrowLeft' ? 0 : 1]?.focus()
  }
  return <div className="pack-gallery" ref={row} onKeyDown={arrow} data-reversed={reversed}>
    {items.map(item => <a key={item.href+item.src} href={item.href} target="_blank" rel="noreferrer" className="pack-gallery-item">
      <div className="pack-gallery-print"><img src={item.src} alt={item.alt} loading="lazy" /></div>
      <div className="pack-gallery-copy"><h3>{item.title}</h3><span aria-hidden="true">↗</span><p>{item.caption}</p></div>
    </a>)}
  </div>
}
