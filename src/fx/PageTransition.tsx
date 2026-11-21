// Page changes are instant: no wipe or title animation between pages.
// This keeps scroll and focus behaving sensibly when the route changes.
import { useLayoutEffect, useRef, type ReactNode } from 'react'
import { Link, useLocation, type LinkProps } from 'react-router-dom'
import { lenis, REDUCED, scrollTop } from '../lib/gsap'

/** Kept for text effects that used to wait for the page wipe; it now runs the callback at once. */
export function afterReveal(cb: () => void) {
  cb()
  return () => {}
}

function headerHeight() {
  return document.querySelector('header.site-header')?.clientHeight ?? 64
}

function showSection(hash: string, immediate: boolean) {
  const section = document.getElementById(decodeURIComponent(hash.slice(1)))
  if (!section) return
  const top = section.getBoundingClientRect().top + window.scrollY - headerHeight() - 8
  const heading = section.querySelector<HTMLElement>('h1,h2,h3') ?? section
  if (!heading.hasAttribute('tabindex')) heading.tabIndex = -1
  heading.focus({ preventScroll: true })
  if (lenis) lenis.scrollTo(top, { immediate, duration: .6, force: true })
  else window.scrollTo({ top, behavior: REDUCED || immediate ? 'instant' : 'smooth' })
}

export function TransitionProvider({ children }: { children: ReactNode }) {
  const { pathname, hash } = useLocation()
  const address = pathname + hash
  const previous = useRef(address)

  useLayoutEffect(() => {
    const from = previous.current
    previous.current = address
    const samePage = from.split('#')[0] === pathname
    if (hash) showSection(hash, !samePage)
    else if (from !== address) {
      scrollTop()
      const heading = document.querySelector<HTMLElement>('main h1') ?? document.getElementById('portfolio-content')
      if (heading) {
        if (!heading.hasAttribute('tabindex')) heading.tabIndex = -1
        heading.focus({ preventScroll: true })
      }
    }
  }, [address, hash, pathname])

  return <>{children}</>
}

/** A router link that also scrolls when it points at the page or section already shown. */
export function TLink({ to, onClick, ...rest }: Omit<LinkProps, 'to'> & { to: string }) {
  const { pathname, hash } = useLocation()
  return <Link to={to} {...rest} onClick={e => {
    onClick?.(e)
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    if (to !== pathname + hash) return
    e.preventDefault()
    const section = to.split('#')[1]
    if (section) showSection('#' + section, REDUCED)
    else scrollTop()
  }} />
}
