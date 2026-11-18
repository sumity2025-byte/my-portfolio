// Hero Animations #5 from the Awwwards Pack: greetings cycle, then the curtain lifts with a curved edge.
import { useLayoutEffect, useRef, useState } from 'react'
import { gsap, REDUCED } from '../lib/gsap'

const WORDS = ['Hello', 'नमस्ते', 'Bonjour', 'Hola', 'Ciao', 'Olá', 'こんにちは', 'Hallo']

// Plays once per browser session; reloads skip straight to the page.
const shouldPlay = () => !REDUCED && !sessionStorage.getItem('seen-intro')

export function Preloader({ onDone }: { onDone: () => void }) {
  const [play] = useState(shouldPlay)
  const root = useRef<HTMLDivElement>(null)
  const word = useRef<HTMLParagraphElement>(null)
  const text = useRef<HTMLSpanElement>(null)
  const path = useRef<SVGPathElement>(null)

  useLayoutEffect(() => {
    if (!play) { onDone(); return }
    sessionStorage.setItem('seen-intro', '1')
    document.body.style.overflow = 'hidden'
    const w = window.innerWidth, h = window.innerHeight
    const curved = `M0 0 L${w} 0 L${w} ${h} Q${w / 2} ${h + 300} 0 ${h} L0 0`
    const flat = `M0 0 L${w} 0 L${w} ${h} Q${w / 2} ${h} 0 ${h} L0 0`
    path.current!.setAttribute('d', curved)
    let i = 0
    text.current!.textContent = WORDS[0]
    gsap.to(word.current, { opacity: 0.85, duration: 1, delay: 0.2 })
    const calls: gsap.core.Tween[] = []
    const cycle = () => {
      if (i === WORDS.length - 1) return
      calls.push(gsap.delayedCall(i === 0 ? 1 : 0.15, () => { i++; text.current!.textContent = WORDS[i]; cycle() }))
    }
    cycle()
    const tl = gsap.timeline({ delay: WORDS.length * 0.15 + 1.5, defaults: { ease: 'power3.inOut' },
      onComplete: () => { root.current!.style.display = 'none'; document.body.style.overflow = ''; } })
    tl.to(word.current, { opacity: 0, duration: 0.3 }, 0)
      .to(root.current, { y: '-100vh', duration: 0.8, delay: 0.2, ease: 'power4.inOut' }, 0)
      .fromTo(path.current, { attr: { d: curved } }, { attr: { d: flat }, duration: 0.7, delay: 0.3, ease: 'power4.inOut' }, 0)
      .add(onDone, 0.55)
    return () => { tl.kill(); calls.forEach(c => c.kill()); document.body.style.overflow = '' }
  }, [onDone, play])

  if (!play) return null
  return (
    <div className="preloader" ref={root} aria-hidden>
      <p className="preloader-word" ref={word}><span className="preloader-dot" /><span ref={text} /></p>
      <svg className="preloader-svg" preserveAspectRatio="none"><path ref={path} /></svg>
    </div>
  )
}
