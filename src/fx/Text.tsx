// Text animations from the Awwwards Pack:
//  - BlockReveal: Text Animations #15 (a colour block wipes across each line, then uncovers it)
//  - LineRise:    Text Animations #17 (masked lines slide up)
//  - CharRise:    Page Transitions #13 Copy (masked characters slide up)
//  - Scramble:    Text Animations #4  (characters scramble as the cursor passes)
import { cloneElement, useRef, type ReactElement } from 'react'
import { gsap, REDUCED, SplitText, useGSAP } from '../lib/gsap'
import { afterReveal } from './PageTransition'

type El = ReactElement<{ ref?: React.Ref<HTMLElement> }>

export function BlockReveal({ children, color = 'var(--orange)', delay = 0, stagger = 0.15, duration = 0.75, onScroll = true }:
  { children: El; color?: string; delay?: number; stagger?: number; duration?: number; onScroll?: boolean }) {
  const ref = useRef<HTMLElement>(null)
  useGSAP(() => {
    const el = ref.current
    if (!el || REDUCED) return
    let split: SplitText | null = null
    let cancel = () => {}
    const wrappers: HTMLElement[] = []
    document.fonts.ready.then(() => {
      if (!ref.current) return
      split = SplitText.create(el, { type: 'lines', linesClass: 'block-line', lineThreshold: 0.1 })
      const lines = split.lines as HTMLElement[]
      const blocks = lines.map(line => {
        const w = document.createElement('div')
        w.className = 'block-line-wrapper'
        line.parentNode!.insertBefore(w, line)
        w.appendChild(line)
        const b = document.createElement('div')
        b.className = 'block-revealer'
        b.style.backgroundColor = color
        w.appendChild(b)
        wrappers.push(w)
        return b
      })
      gsap.set(lines, { opacity: 0 })
      gsap.set(blocks, { scaleX: 0, transformOrigin: 'left center' })
      const tls = blocks.map((b, i) => {
        const tl = gsap.timeline({ delay: delay + i * stagger, paused: true })
        tl.to(b, { scaleX: 1, duration, ease: 'power4.inOut' })
          .set(lines[i], { opacity: 1 })
          .set(b, { transformOrigin: 'right center' })
          .to(b, { scaleX: 0, duration, ease: 'power4.inOut' })
        return tl
      })
      cancel = afterReveal(() => {
        if (onScroll) gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 90%', once: true, onEnter: () => tls.forEach(t => t.play()) } })
        else tls.forEach(t => t.play())
      })
    })
    return () => {
      cancel()
      wrappers.forEach(w => { if (w.parentNode && w.firstChild) { w.parentNode.insertBefore(w.firstChild, w); w.remove() } })
      split?.revert()
    }
  }, { scope: ref })
  return cloneElement(children, { ref })
}

function useMaskedRise(ref: React.RefObject<HTMLElement | null>, type: 'lines' | 'chars', opts: { delay: number; onScroll: boolean; stagger: number }) {
  useGSAP(() => {
    const el = ref.current
    if (!el || REDUCED) return
    let split: SplitText | null = null
    let cancel = () => {}
    document.fonts.ready.then(() => {
      if (!ref.current) return
      split = SplitText.create(el, type === 'lines'
        ? { type: 'lines', mask: 'lines', linesClass: 'line', lineThreshold: 0.1 }
        : { type: 'words,chars', mask: 'chars', charsClass: 'char' })
      const targets = type === 'lines' ? split.lines : split.chars
      gsap.set(targets, { y: '100%' })
      cancel = afterReveal(() => gsap.to(targets, {
        y: '0%', duration: 1, stagger: opts.stagger, ease: 'power4.out', delay: opts.delay,
        scrollTrigger: opts.onScroll ? { trigger: el, start: 'top 85%', once: true } : undefined,
      }))
    })
    return () => { cancel(); split?.revert() }
  }, { scope: ref })
}

export function LineRise({ children, delay = 0, onScroll = true }: { children: El; delay?: number; onScroll?: boolean }) {
  const ref = useRef<HTMLElement>(null)
  useMaskedRise(ref, 'lines', { delay, onScroll, stagger: 0.1 })
  return cloneElement(children, { ref })
}

export function CharRise({ children, delay = 0, onScroll = true }: { children: El; delay?: number; onScroll?: boolean }) {
  const ref = useRef<HTMLElement>(null)
  useMaskedRise(ref, 'chars', { delay, onScroll, stagger: 0.03 })
  return cloneElement(children, { ref })
}

export function Scramble({ children, radius = 90, duration = 1.2, chars = '.:' }: { children: El; radius?: number; duration?: number; chars?: string }) {
  const ref = useRef<HTMLElement>(null)
  useGSAP(() => {
    const root = ref.current
    if (!root || REDUCED) return
    const split = SplitText.create(root, { type: 'chars', charsClass: 'scr-char' })
    const els = split.chars as HTMLElement[]
    els.forEach(c => (c.dataset.content = c.innerHTML))
    let centers: { x: number; y: number }[] = []
    let dirty = true, mx = 0, my = 0, inside = false, last = 0
    const kicks = new Float32Array(els.length)
    const recalc = () => {
      const rr = root.getBoundingClientRect()
      centers = els.map(c => { const r = c.getBoundingClientRect(); return { x: r.left - rr.left + r.width / 2, y: r.top - rr.top + r.height / 2 } })
      dirty = false
    }
    const move = (e: PointerEvent) => {
      const rr = root.getBoundingClientRect()
      mx = e.clientX - rr.left; my = e.clientY - rr.top
      inside = mx >= 0 && my >= 0 && mx <= rr.width && my <= rr.height
    }
    const leave = () => (inside = false)
    const mark = () => (dirty = true)
    const tick = () => {
      const now = performance.now()
      if (now - last < 1000 / 30 || !inside) return
      last = now
      if (dirty) recalc()
      for (let i = 0; i < els.length; i++) {
        const dx = mx - centers[i].x, dy = my - centers[i].y, d2 = dx * dx + dy * dy
        if (d2 >= radius * radius || now - kicks[i] < 70) continue
        kicks[i] = now
        gsap.to(els[i], { overwrite: true, duration: duration * (1 - Math.sqrt(d2) / radius), ease: 'none',
          scrambleText: { text: els[i].dataset.content || '', chars, speed: 0.5 } })
      }
    }
    root.addEventListener('pointermove', move); root.addEventListener('pointerenter', move); root.addEventListener('pointerleave', leave)
    window.addEventListener('resize', mark); window.addEventListener('scroll', mark, { passive: true })
    gsap.ticker.add(tick)
    return () => {
      gsap.ticker.remove(tick)
      root.removeEventListener('pointermove', move); root.removeEventListener('pointerenter', move); root.removeEventListener('pointerleave', leave)
      window.removeEventListener('resize', mark); window.removeEventListener('scroll', mark)
      split.revert()
    }
  }, { scope: ref })
  return cloneElement(children, { ref })
}
