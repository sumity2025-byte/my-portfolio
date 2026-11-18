import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'
import { useGSAP } from '@gsap/react'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin, useGSAP)

export const REDUCED = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches
export const FINE_POINTER = typeof matchMedia !== 'undefined' && matchMedia('(hover: hover) and (pointer: fine)').matches

/** Smooth scroll (Lenis), synced with ScrollTrigger the way the pack demos do it. */
export let lenis: Lenis | null = null
export function startLenis() {
  if (REDUCED || lenis) return
  lenis = new Lenis()
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add(t => lenis!.raf(t * 1000))
  gsap.ticker.lagSmoothing(0)
}
export function scrollTop() {
  if (lenis) lenis.scrollTo(0, { immediate: true, force: true })
  else window.scrollTo(0, 0)
}

export { gsap, ScrollTrigger, SplitText, useGSAP }
