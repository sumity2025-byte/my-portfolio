import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { createPortal } from 'react-dom'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play } from 'lucide-react'
import { FEATURED_CASES, type Project } from '../data'
import { TLink } from '../fx/PageTransition'
import { lockScroll, REDUCED } from '../lib/gsap'
import './cases.css'

const ROTATE_MS = 5000
const count = FEATURED_CASES.length

function CaseVisual({ item, detail = false, eager = false }: { item: Project; detail?: boolean; eager?: boolean }) {
  const visual = item.visual
  if (visual.type === 'figures') return <div className={'case-figures case-tone-' + item.tone}>
    <p>{visual.label}</p>
    <dl>{visual.items.map(([value, label]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
  </div>
  // On the card the image is decoration: the card's text already names the case.
  return <img className={'case-image case-' + visual.type} src={visual.src} alt={detail ? visual.alt : ''}
    loading={eager || detail ? undefined : 'lazy'} decoding="async" draggable={false} />
}

/** Elements outside the dialog that must not be reachable while it is open. The contact bar stays usable. */
const backgroundSelector = '#root .site-header, #root main, #root .site-footer'

function CaseDialog({ item, index, onClose, onNext }: { item: Project; index: number; onClose: () => void; onNext: () => void }) {
  const sheet = useRef<HTMLDivElement>(null)
  const back = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    lockScroll(true)
    const background = Array.from(document.querySelectorAll<HTMLElement>(backgroundSelector))
    background.forEach(node => { node.inert = true })
    return () => {
      lockScroll(false)
      background.forEach(node => { node.inert = false })
    }
  }, [])

  useEffect(() => {
    sheet.current?.scrollTo(0, 0)
    back.current?.focus({ preventScroll: true })
  }, [item.id])

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') { event.preventDefault(); onClose(); return }
    if (event.key !== 'Tab') return
    const focusable = sheet.current!.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
    const first = focusable[0], last = focusable[focusable.length - 1]
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
  }

  return createPortal(<div className="case-layer">
    <div className="case-backdrop" onClick={onClose} aria-hidden="true" />
    {/* data-lenis-prevent: while the page is locked, Lenis cancels wheel events unless they start in a marked element. */}
    <div className="case-sheet" ref={sheet} role="dialog" aria-modal="true" aria-labelledby="case-sheet-title" onKeyDown={onKeyDown} data-lenis-prevent>
      <div className="case-sheet-bar">
        <button ref={back} type="button" onClick={onClose}><ArrowLeft size={20} aria-hidden="true" />Back to home</button>
        <span>Case {index + 1} of {count}</span>
      </div>
      <div className="case-sheet-visual"><CaseVisual item={item} detail /></div>
      <div className="case-sheet-body">
        <p className="case-tag">{item.tag} · {item.discipline}</p>
        <h2 id="case-sheet-title">{item.title}</h2>
        <p className="case-summary">{item.body}</p>
        <dl className="case-metrics">{item.metrics.map(([value, label]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
        {item.points && <>
          <h3>What I did</h3>
          <ul className="case-points">{item.points.map(point => <li key={point}>{point}</li>)}</ul>
        </>}
        <div className="case-actions">
          <TLink to={item.to}>See evidence <ArrowUpRight size={17} aria-hidden="true" /></TLink>
          <button type="button" onClick={onNext}>Next case <ArrowRight size={17} aria-hidden="true" /></button>
        </div>
      </div>
    </div>
  </div>, document.body)
}

export default function CaseCarousel() {
  const location = useLocation()
  const navigate = useNavigate()
  const openId = new URLSearchParams(location.search).get('case')
  const openIndex = FEATURED_CASES.findIndex(item => item.id === openId)

  const section = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const programmatic = useRef(false)
  const settle = useRef(0)
  const opener = useRef<HTMLButtonElement | null>(null)
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(REDUCED)
  const [holding, setHolding] = useState(false)
  const [visible, setVisible] = useState(false)
  const [pageVisible, setPageVisible] = useState(!document.hidden)
  const [restart, setRestart] = useState(0)

  const offsets = useCallback(() => {
    const cards = Array.from(track.current!.children) as HTMLElement[]
    return cards.map(card => card.offsetLeft - cards[0].offsetLeft)
  }, [])

  const goTo = useCallback((index: number, smooth = !REDUCED) => {
    const node = track.current
    if (!node) return
    const max = node.scrollWidth - node.clientWidth
    programmatic.current = true
    setActive(index)
    node.scrollTo({ left: Math.min(offsets()[index], max), behavior: smooth ? 'smooth' : 'auto' })
  }, [offsets])

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .35 })
    observer.observe(section.current!)
    const onVisibility = () => setPageVisible(!document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', onVisibility) }
  }, [])

  // Advance every five seconds while the cases are on screen and nobody is interacting with them.
  useEffect(() => {
    if (paused || holding || !visible || !pageVisible || openIndex >= 0) return
    const timer = window.setTimeout(() => {
      const node = track.current!
      const atEnd = node.scrollLeft >= node.scrollWidth - node.clientWidth - 2
      goTo(atEnd ? 0 : (active + 1) % count)
    }, ROTATE_MS)
    return () => window.clearTimeout(timer)
  }, [active, paused, holding, visible, pageVisible, openIndex, restart, goTo])

  // Keep the carousel on the case that was open, so closing it lands where the reader left off.
  useEffect(() => {
    if (openIndex >= 0) goTo(openIndex, false)
    else setHolding(false)
  }, [openIndex, goTo])

  function onScroll() {
    window.clearTimeout(settle.current)
    settle.current = window.setTimeout(() => {
      if (programmatic.current) { programmatic.current = false; return }
      const node = track.current!
      const positions = offsets()
      let nearest = 0
      positions.forEach((left, i) => { if (Math.abs(left - node.scrollLeft) < Math.abs(positions[nearest] - node.scrollLeft)) nearest = i })
      setActive(nearest)
      setRestart(value => value + 1)
    }, 140)
  }

  function open(item: Project, button: HTMLButtonElement) {
    opener.current = button
    navigate({ pathname: location.pathname, hash: location.hash, search: '?case=' + item.id }, { state: { caseFromHome: true } })
  }

  function close() {
    if ((location.state as { caseFromHome?: boolean } | null)?.caseFromHome) navigate(-1)
    else navigate({ pathname: location.pathname, hash: location.hash, search: '' }, { replace: true })
    const button = opener.current ?? track.current?.children[Math.max(openIndex, 0)]?.querySelector('button')
    window.setTimeout(() => (button as HTMLElement | null)?.focus({ preventScroll: true }), 0)
  }

  function next() {
    const item = FEATURED_CASES[(openIndex + 1) % count]
    opener.current = null
    navigate({ pathname: location.pathname, hash: location.hash, search: '?case=' + item.id }, { replace: true, state: location.state })
  }

  const current = FEATURED_CASES[active]
  return <section ref={section} id="cases" className="home-cases" aria-roledescription="carousel" aria-labelledby="cases-title"
    onPointerDown={() => setHolding(true)} onPointerUp={() => setHolding(false)} onPointerCancel={() => setHolding(false)}
    onPointerLeave={() => setHolding(false)}
    onFocus={event => { if (event.target.matches(':focus-visible')) setHolding(true) }}
    onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setHolding(false) }}>
    <div className="wrap home-section-head">
      <h2 id="cases-title">Selected cases</h2>
      <span className="cases-position" aria-hidden="true">{active + 1} / {count} · swipe</span>
    </div>
    <div className="cases-track" ref={track} onScroll={onScroll}>
      {FEATURED_CASES.map((item, i) => <article key={item.id} className="case-card" aria-roledescription="slide" aria-label={`${i + 1} of ${count}: ${item.tag}`}>
        <button type="button" onClick={event => open(item, event.currentTarget)}>
          <span className="case-card-visual"><CaseVisual item={item} eager={i === 0} /></span>
          <span className="case-card-body">
            <span className="case-tag">{item.tag} · {item.discipline}</span>
            <span className="case-card-title">{item.title}</span>
            <span className="case-card-result">
              <span><b>{item.metrics[0][0]}</b><small>{item.metrics[0][1]}</small></span>
              <span className="case-card-arrow" aria-hidden="true"><ArrowRight size={18} /></span>
            </span>
          </span>
        </button>
      </article>)}
    </div>
    <div className="wrap cases-controls">
      <div className="cases-dots">{FEATURED_CASES.map((item, i) =>
        <button key={item.id} type="button" aria-label={`Show case ${i + 1}, ${item.tag}`} aria-current={i === active ? 'true' : undefined}
          onClick={() => { goTo(i); setRestart(value => value + 1) }}><span /></button>
      )}</div>
      <button className="cases-pause" type="button" onClick={() => setPaused(value => !value)}>
        {paused ? <Play size={13} fill="currentColor" aria-hidden="true" /> : <Pause size={13} fill="currentColor" aria-hidden="true" />}
        {paused ? 'Play' : 'Pause'}<span className="sr-only"> case rotation</span>
      </button>
    </div>
    <p className="sr-only" aria-live={paused ? 'polite' : 'off'} aria-atomic="true">Case {active + 1} of {count}: {current.tag}. {current.title}.</p>
    {openIndex >= 0 && <CaseDialog item={FEATURED_CASES[openIndex]} index={openIndex} onClose={close} onNext={next} />}
  </section>
}
