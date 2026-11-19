import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useRef, type ReactNode } from 'react'
import { Link, useLocation, useNavigate, type LinkProps } from 'react-router-dom'
import { gsap, lenis, REDUCED, ScrollTrigger, scrollTop } from '../lib/gsap'

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

function showSection(hash: string, immediate: boolean) {
  const target = document.getElementById(hash.slice(1))
  if (!target) return
  const top = target.getBoundingClientRect().top + window.scrollY - (document.querySelector('header.cv-header')?.clientHeight ?? 70) - 12
  const focus = target.matches('h1,h2,h3') ? target : target.querySelector<HTMLElement>('h1,h2,h3') ?? target
  focus.tabIndex = -1
  focus.focus({ preventScroll: true })
  if (lenis) lenis.scrollTo(top, { immediate, duration: .7, force: true })
  else window.scrollTo({ top, behavior: REDUCED || immediate ? 'instant' : 'smooth' })
}

export function TransitionProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const { pathname, hash } = useLocation()
  const address = pathname + hash
  const current = useRef(address)
  const busy = useRef(false)
  const pending = useRef<{ address: string; resolve: () => void } | null>(null)
  const fallback = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const task = pending.current
    if (task && task.address === address) {
      if (hash) showSection(hash, true)
      else scrollTop()
      task.resolve()
      pending.current = null
    }
  }, [address, hash])

  useEffect(() => {
    const previous = current.current
    current.current = address
    const frame = requestAnimationFrame(() => {
      if (hash) showSection(hash, previous.split('#')[0] !== pathname || previous === address)
      else if (previous !== address) {
        if (!busy.current) scrollTop()
        const heading = document.querySelector<HTMLElement>('main h1')
        if (heading) {
          heading.tabIndex = -1
          heading.focus({ preventScroll: true })
        }
      }
    })
    return () => cancelAnimationFrame(frame)
  }, [address, hash, pathname])

  const go = useCallback((to: string) => {
    if (busy.current) return
    const [nextPage, section] = to.split('#')
    if (to === current.current) {
      if (section) showSection('#' + section, REDUCED)
      else scrollTop()
      return
    }
    if (nextPage === current.current.split('#')[0] || REDUCED) {
      navigate(to)
      if (!section) scrollTop()
      return
    }
    busy.current = true
    // Page Transitions #1 from the Drive pack: the departing surface recedes
    // as the destination rises through an inset mask. Native snapshots keep
    // both pages visible without mounting two copies of the React routes.
    const finish = () => {
      busy.current = false
      ScrollTrigger.refresh()
    }
    if (typeof document.startViewTransition === 'function') {
      const transition = document.startViewTransition(() => new Promise<void>(resolve => {
        pending.current = { address: to, resolve }
        revealAt = performance.now() + 300
        navigate(to)
      }))
      void transition.finished.then(finish, finish)
      return
    }
    const sheet = fallback.current
    if (!sheet) { navigate(to); finish(); return }
    gsap.timeline({ onComplete: finish })
      .set(sheet, { visibility: 'visible', yPercent: 105 })
      .to(sheet, { yPercent: 0, duration: .32, ease: 'power3.inOut' })
      .call(() => { revealAt = performance.now() + 160; navigate(to); scrollTop() })
      .to(sheet, { yPercent: -105, duration: .42, ease: 'power3.inOut' })
      .set(sheet, { visibility: 'hidden' })
  }, [navigate])

  return (
    <Ctx.Provider value={go}>
      {children}
      <div className="page-sheet" ref={fallback} aria-hidden />
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
