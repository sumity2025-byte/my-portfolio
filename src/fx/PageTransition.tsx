// Page Transitions #13 from the Awwwards Pack: 20 vertical blocks sweep shut left-to-right,
// the destination's name rises in with a hand-drawn stroke, then the blocks open right-to-left.
import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useRef, type ReactNode } from 'react'
import { Link, useLocation, useNavigate, type LinkProps } from 'react-router-dom'
import { gsap, REDUCED, ScrollTrigger, scrollTop } from '../lib/gsap'

export const TITLES: Record<string, string> = {
  '/': 'Home', '/work': 'Work', '/projects': 'Projects', '/proof': 'Proof',
  '/skills': 'Skills', '/education': 'Education', '/contact': 'Contact',
}
const BLOCKS = 20
const Ctx = createContext<(to: string) => void>(() => {})

// Pages mount while the screen is still covered. Effects call afterReveal() so their
// entrance animations start as the blocks open, not behind them.
let revealAt = 0
export function afterReveal(cb: () => void) {
  const wait = Math.max(0, revealAt - performance.now())
  if (!wait) { cb(); return () => {} }
  const id = window.setTimeout(cb, wait)
  return () => window.clearTimeout(id)
}

export function TransitionProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const current = useRef(pathname)
  const busy = useRef(false)
  const overlay = useRef<HTMLDivElement>(null)
  const label = useRef<HTMLDivElement>(null)
  const word = useRef<HTMLDivElement>(null)
  const stroke = useRef<SVGPathElement>(null)

  // back/forward buttons: no wipe, just start at the top
  useEffect(() => {
    if (current.current !== pathname && !busy.current) scrollTop()
    current.current = pathname
  }, [pathname])

  useLayoutEffect(() => {
    gsap.set(overlay.current!.children, { scaleX: 0, transformOrigin: 'left' })
    gsap.set(label.current, { opacity: 0 })
  }, [])

  const go = useCallback((to: string) => {
    if (busy.current || to === current.current) return
    if (REDUCED) { navigate(to); scrollTop(); return }
    busy.current = true
    const blocks = Array.from(overlay.current!.children)
    overlay.current!.style.pointerEvents = 'auto'
    const name = TITLES[to] ?? ''
    word.current!.innerHTML = [...name].map(c => `<span class="tc"><span>${c}</span></span>`).join('')
    const chars = word.current!.querySelectorAll('.tc > span')
    const len = stroke.current!.getTotalLength()

    gsap.timeline()
      .set(blocks, { transformOrigin: 'left' })
      .to(blocks, { scaleX: 1, duration: 0.35, stagger: 0.012, ease: 'power2.out' })
      .set(label.current, { opacity: 1 }, '-=0.15')
      .fromTo(chars, { y: '110%' }, { y: '0%', duration: 0.5, stagger: 0.025, ease: 'power4.out' }, '<')
      .fromTo(stroke.current, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 0.5, ease: 'power2.inOut' }, '<0.05')
      .add(() => { current.current = to; revealAt = performance.now() + 380; navigate(to); scrollTop() })
      .to(label.current, { opacity: 0, duration: 0.2, ease: 'power2.out' }, '+=0.1')
      .set(blocks, { transformOrigin: 'right' })
      .to(blocks, {
        scaleX: 0, duration: 0.35, stagger: 0.012, ease: 'power2.inOut',
        onComplete: () => { busy.current = false; overlay.current!.style.pointerEvents = 'none'; ScrollTrigger.refresh() },
      }, '<0.05')
  }, [navigate])

  return (
    <Ctx.Provider value={go}>
      {children}
      <div className="pt-overlay" ref={overlay} aria-hidden>{Array.from({ length: BLOCKS }, (_, i) => <div key={i} className="pt-block" />)}</div>
      <div className="pt-label" ref={label} aria-hidden>
        <div className="pt-word" ref={word} />
        <svg className="pt-stroke" viewBox="0 0 420 40" fill="none" preserveAspectRatio="none">
          <path ref={stroke} d="M6 26 C 70 10, 140 34, 210 20 S 350 8, 414 22" stroke="var(--orange)" strokeWidth="7" strokeLinecap="round" />
        </svg>
      </div>
    </Ctx.Provider>
  )
}

/** Link that plays the transition. Modifier-clicks behave normally. */
export function TLink({ to, onClick, ...rest }: Omit<LinkProps, 'to'> & { to: string }) {
  const go = useContext(Ctx)
  return <Link to={to} {...rest} onClick={e => {
    onClick?.(e)
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    e.preventDefault()
    go(to)
  }} />
}
