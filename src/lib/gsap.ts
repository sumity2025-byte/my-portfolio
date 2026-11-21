import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'
import { useGSAP } from '@gsap/react'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin, useGSAP)

export const REDUCED = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches
export const FINE_POINTER = typeof matchMedia !== 'undefined' && matchMedia('(hover: hover) and (pointer: fine)').matches

/**
 * Smooth scroll (Lenis), synced with ScrollTrigger. Only for mouse and trackpad users:
 * phones keep their native scrolling, which is faster and what people expect.
 */
export let lenis: Lenis | null = null
export function startLenis() {
  if (REDUCED || !FINE_POINTER || lenis) return
  lenis = new Lenis()
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add(t => lenis!.raf(t * 1000))
  gsap.ticker.lagSmoothing(0)
}
export function scrollTop() {
  if (lenis) lenis.scrollTo(0, { immediate: true, force: true })
  else window.scrollTo(0, 0)
}

/** Stops the page behind an open menu or case from scrolling. Calls may nest. */
let locks = 0
export function lockScroll(locked: boolean) {
  locks = Math.max(0, locks + (locked ? 1 : -1))
  const on = locks > 0
  document.documentElement.classList.toggle('scroll-locked', on)
  if (on) lenis?.stop()
  else lenis?.start()
}

export { gsap, ScrollTrigger, SplitText, useGSAP }
