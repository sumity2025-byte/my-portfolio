// Awwwards Pack, Hero Animations #5: rotating greetings and a curved lifting curtain.
import { useLayoutEffect, useRef } from 'react'
import { gsap, lenis } from '../lib/gsap'

const greetings = ['Hello', 'नमस्ते', 'Hola', 'Bonjour', 'Ciao', 'Olá', 'こんにちは', 'Hallo']

export function Preloader({ onDone }: { onDone: () => void }) {
  const curtain = useRef<HTMLDivElement>(null)
  const word = useRef<HTMLSpanElement>(null)
  const path = useRef<SVGPathElement>(null)

  useLayoutEffect(() => {
    const oldOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    lenis?.stop()
    const timeline = gsap.timeline({ onComplete: onDone })
    const curved = 'M0 0H1000V500Q500 700 0 500Z'
    const flat = 'M0 0H1000V500Q500 500 0 500Z'
    greetings.forEach((greeting, index) => timeline.call(() => {
      if (word.current) word.current.textContent = greeting
    }, [], index ? .45 + .19 * (index - 1) : 0))
    timeline.to(word.current, { opacity: 0, y: -16, duration: .22 }, 1.85)
      .to(curtain.current, { yPercent: -130, duration: .78, ease: 'power4.inOut' }, 1.89)
      .fromTo(path.current, { attr: { d: curved } }, { attr: { d: flat }, duration: .67, ease: 'power3.inOut' }, 1.96)
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') onDone() }
    window.addEventListener('keydown', escape)
    return () => {
      timeline.kill()
      window.removeEventListener('keydown', escape)
      document.body.style.overflow = oldOverflow
      lenis?.start()
    }
  }, [onDone])

  return <div className="preloader" ref={curtain} role="dialog" aria-modal="true" aria-label="Welcome">
    <svg className="greeting-curve" viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden><path ref={path} d="M0 0H1000V500Q500 700 0 500Z" /></svg>
    <p className="greeting-word" aria-hidden><span className="greeting-dot" /><span ref={word}>Hello</span></p>
    <button type="button" className="greeting-skip" onClick={onDone}>Skip intro <span aria-hidden>↗</span></button>
  </div>
}
