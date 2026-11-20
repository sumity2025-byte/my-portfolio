import { useLayoutEffect, useRef } from 'react'
import { gsap, REDUCED } from '../lib/gsap'

const greetings = ['Hello', 'नमस्ते', 'Bonjour', 'Hola', 'Ciao', 'Olá', 'こんにちは', 'Hallo']

export function shouldPlayIntro() {
  if (REDUCED) return false
  try { return !sessionStorage.getItem('seen-intro') } catch { return true }
}

export function Preloader({ onDone }: { onDone: () => void }) {
  const curtain = useRef<HTMLDivElement>(null)
  const line = useRef<HTMLParagraphElement>(null)
  const word = useRef<HTMLSpanElement>(null)
  const path = useRef<SVGPathElement>(null)
  useLayoutEffect(() => {
    try { sessionStorage.setItem('seen-intro', '1') } catch { /* Storage is optional. */ }
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const width = window.innerWidth, height = window.innerHeight
    const curved = 'M0 0H' + width + 'V' + height + 'Q' + width / 2 + ' ' + (height + 300) + ' 0 ' + height + 'Z'
    const flat = 'M0 0H' + width + 'V' + height + 'Q' + width / 2 + ' ' + height + ' 0 ' + height + 'Z'
    path.current!.setAttribute('d', curved)
    const tl = gsap.timeline({ onComplete: onDone })
    tl.to(line.current, { opacity: .85, duration: 1 }, .2)
    greetings.slice(1).forEach((greeting, i) => tl.call(() => { word.current!.textContent = greeting }, [], 1 + i * .15))
    tl.to(line.current, { opacity: 0, duration: .3 }, 2.7)
      .to(curtain.current, { y: '-100vh', duration: .8, ease: 'power4.inOut' }, 2.9)
      .to(path.current, { attr: { d: flat }, duration: .7, ease: 'power4.inOut' }, 3)
    const skip = (e: KeyboardEvent) => { if (e.key === 'Escape') onDone() }
    window.addEventListener('keydown', skip)
    return () => { tl.kill(); window.removeEventListener('keydown', skip); document.body.style.overflow = originalOverflow }
  }, [onDone])

  return <div className="preloader" ref={curtain} role="dialog" aria-modal="true" aria-label="Welcome">
    <p className="preloader-word" ref={line} aria-hidden="true"><span className="preloader-dot" /><span ref={word}>Hello</span></p>
    <svg className="preloader-svg" preserveAspectRatio="none" aria-hidden="true"><path ref={path} /></svg>
    <button className="intro-skip" onClick={onDone} type="button">Skip intro ↗</button>
  </div>
}
