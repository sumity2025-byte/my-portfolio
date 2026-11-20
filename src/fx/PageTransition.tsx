import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useRef, type ReactNode } from 'react'
import { Link, useLocation, useNavigate, type LinkProps } from 'react-router-dom'
import { pageTitles } from '../chapters'
import { gsap, lenis, REDUCED, ScrollTrigger, scrollTop } from '../lib/gsap'

const Ctx = createContext<(to: string) => void>(() => {})
let revealAt = 0

export function afterReveal(cb: () => void) {
  const wait = Math.max(0, revealAt - performance.now())
  if (!wait) { cb(); return () => {} }
  const timer = window.setTimeout(cb, wait)
  return () => window.clearTimeout(timer)
}

function showSection(hash: string, immediate: boolean) {
  const section = document.getElementById(hash.slice(1))
  if (!section) return
  const top = section.getBoundingClientRect().top + window.scrollY - (document.querySelector('header.cv-header')?.clientHeight ?? 70) - 12
  const heading = section.querySelector<HTMLElement>('h1,h2,h3') ?? section
  heading.tabIndex = -1
  heading.focus({ preventScroll: true })
  if (lenis) lenis.scrollTo(top, { immediate, duration: .7, force: true })
  else window.scrollTo({ top, behavior: REDUCED || immediate ? 'instant' : 'smooth' })
}

export function TransitionProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const { pathname, hash } = useLocation()
  const address = pathname + hash
  const previous = useRef(address)
  const destination = useRef<string | null>(null)
  const overlay = useRef<HTMLDivElement>(null)
  const label = useRef<HTMLDivElement>(null)
  const word = useRef<HTMLDivElement>(null)
  const stroke = useRef<SVGPathElement>(null)
  const animation = useRef<gsap.core.Timeline | null>(null)

  useLayoutEffect(() => {
    const from = previous.current
    previous.current = address
    // A history navigation may interrupt a wipe before the destination mounts.
    if (destination.current && destination.current !== address) {
      animation.current?.kill()
      destination.current = null
      revealAt = 0
      gsap.set(overlay.current!.children, { scaleX: 0 })
      gsap.set(label.current, { opacity: 0 })
      overlay.current!.style.pointerEvents = 'none'
    }
    if (hash) showSection(hash, REDUCED || from === address || from.split('#')[0] !== pathname)
    else if (from !== address) {
      scrollTop()
      const heading = document.querySelector<HTMLElement>('main h1') ?? document.getElementById('portfolio-content')
      if (heading) { heading.tabIndex = -1; heading.focus({ preventScroll: true }) }
    }
  }, [address, hash, pathname])
  useEffect(() => () => { animation.current?.kill(); revealAt = 0 }, [])

  const go = useCallback((to: string) => {
    if (destination.current) return
    const [path, section] = to.split('#')
    if (to === previous.current) {
      if (section) showSection('#' + section, REDUCED)
      else scrollTop()
      return
    }
    if (REDUCED || path === previous.current.split('#')[0]) { navigate(to); return }
    destination.current = to
    const blocks = Array.from(overlay.current!.children)
    overlay.current!.style.pointerEvents = 'auto'
    const name = pageTitles[to] ?? pageTitles[path] ?? 'Home'
    // Keep each word together when longer CV titles span multiple lines.
    const words = name.split(' ').map(text => {
      const group = document.createElement('span')
      group.className = 'pt-token'
      for (const letter of text) {
        const mask = document.createElement('span')
        mask.className = 'tc'
        const character = document.createElement('span')
        character.textContent = letter
        mask.append(character)
        group.append(mask)
      }
      return group
    })
    word.current!.replaceChildren(...words)
    word.current!.classList.toggle('pt-long-title', name.length > 14)
    const characters = word.current!.querySelectorAll('.tc > span')
    const length = stroke.current!.getTotalLength()
    // The original pack's 20-panel wipe, rising letters and drawn underline.
    animation.current = gsap.timeline({ onComplete: () => {
      destination.current = null
      overlay.current!.style.pointerEvents = 'none'
      ScrollTrigger.refresh()
    } })
      .set(blocks, { transformOrigin: 'left' })
      .to(blocks, { scaleX: 1, duration: .35, stagger: .012, ease: 'power2.out' })
      .set(label.current, { opacity: 1 }, '-=.15')
      .fromTo(characters, { y: '110%' }, { y: '0%', duration: .5, stagger: .025, ease: 'power4.out' }, '<')
      .fromTo(stroke.current, { strokeDasharray: length, strokeDashoffset: length }, { strokeDashoffset: 0, duration: .5, ease: 'power2.inOut' }, '<.05')
      .call(() => { revealAt = performance.now() + 380; navigate(to) })
      .to(label.current, { opacity: 0, duration: .2, ease: 'power2.out' }, '+=.1')
      .set(blocks, { transformOrigin: 'right' })
      .to(blocks, { scaleX: 0, duration: .35, stagger: .012, ease: 'power2.inOut' }, '<.05')
  }, [navigate])

  return <Ctx.Provider value={go}>
    {children}
    <div className="pt-overlay" ref={overlay} aria-hidden="true">{Array.from({ length: 20 }, (_, i) => <div key={i} className="pt-block" />)}</div>
    <div className="pt-label" ref={label} aria-hidden="true">
      <div className="pt-word" ref={word} />
      <svg className="pt-stroke" viewBox="0 0 420 40" fill="none" preserveAspectRatio="none">
        <path ref={stroke} d="M6 26 C 70 10, 140 34, 210 20 S 350 8, 414 22" stroke="var(--orange)" strokeWidth="7" strokeLinecap="round" />
      </svg>
    </div>
  </Ctx.Provider>
}

export function TLink({ to, onClick, ...rest }: Omit<LinkProps, 'to'> & { to: string }) {
  const go = useContext(Ctx)
  return <Link to={to} {...rest} onClick={e => {
    onClick?.(e)
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    e.preventDefault()
    go(to)
  }} />
}
