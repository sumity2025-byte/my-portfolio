import { Component, lazy, Suspense, useEffect, useRef, useState, type ReactNode, type TouchEvent } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play } from 'lucide-react'
import { PROJECTS } from '../data'
import { TLink } from '../fx/PageTransition'
import { REDUCED } from '../lib/gsap'
import './featured-cases.css'

const Warehouse = lazy(() => import('../fx/Warehouse'))
const count = PROJECTS.length
const formatPosition = (value: number) => String(value).padStart(2, '0')

class WarehouseFallback extends Component<{ children: ReactNode }, { unavailable: boolean }> {
  state = { unavailable: false }
  static getDerivedStateFromError() { return { unavailable: true } }
  render() { return this.state.unavailable ? null : this.props.children }
}

export default function FeaturedCases({ ready }: { ready: boolean }) {
  const region = useRef<HTMLElement>(null)
  const progress = useRef(0)
  const touchStart = useRef<{ x: number; y: number } | null>(null)
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(!REDUCED)
  const [reduced, setReduced] = useState(REDUCED)
  const [hovered, setHovered] = useState(false)
  const [visible, setVisible] = useState(false)
  const [pageVisible, setPageVisible] = useState(!document.hidden)
  const [sceneRequested, setSceneRequested] = useState(false)
  const current = PROJECTS[index]
  const visual = current.visual
  const showWarehouse = visual.type === 'warehouse'
  const rotating = ready && visible && pageVisible && playing && !hovered

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .2 })
    observer.observe(region.current!)
    const visibility = () => setPageVisible(!document.hidden)
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const motion = () => {
      setReduced(preference.matches)
      if (preference.matches) setPlaying(false)
    }
    document.addEventListener('visibilitychange', visibility)
    preference.addEventListener('change', motion)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', visibility)
      preference.removeEventListener('change', motion)
    }
  }, [])

  useEffect(() => {
    const element = region.current
    if (!element || !ready || !visible || !pageVisible || reduced || !showWarehouse) return
    setSceneRequested(true)
    const follow = () => {
      const bounds = element.getBoundingClientRect()
      if (!bounds.height) return
      progress.current = Math.max(0, Math.min(1, -bounds.top / bounds.height))
    }
    follow()
    window.addEventListener('scroll', follow, { passive: true })
    return () => window.removeEventListener('scroll', follow)
  }, [ready, visible, pageVisible, reduced, showWarehouse])

  useEffect(() => {
    if (!rotating) return
    const timer = window.setTimeout(() => setIndex(i => (i + 1) % count), 8500)
    return () => window.clearTimeout(timer)
  }, [index, rotating])

  function step(direction: number) {
    setPlaying(false)
    setIndex(i => (i + direction + count) % count)
  }

  function toggleRotation() {
    setHovered(false)
    setPlaying(value => !value)
  }

  function endSwipe(event: TouchEvent) {
    const start = touchStart.current
    touchStart.current = null
    if (!start || event.touches.length) return
    const touch = event.changedTouches[0]
    const dx = touch.clientX - start.x
    const dy = touch.clientY - start.y
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.5) step(dx < 0 ? 1 : -1)
  }

  return <section ref={region} className="featured-cases" aria-roledescription="carousel" aria-label="Selected cases"
    onPointerEnter={e => { if (e.pointerType === 'mouse') setHovered(true) }}
    onPointerLeave={() => setHovered(false)}
    onFocusCapture={e => { if (!e.currentTarget.contains(e.relatedTarget) && e.target.matches(':focus-visible')) setPlaying(false) }}
    onKeyDown={e => {
      if (e.altKey || e.metaKey || e.ctrlKey || e.shiftKey || !['ArrowLeft','ArrowRight'].includes(e.key)) return
      e.preventDefault()
      step(e.key === 'ArrowRight' ? 1 : -1)
    }}>
    <header className="fc-header">
      <div className="fc-series"><span>Selected cases</span><span className="fc-count">{formatPosition(index + 1)} / {formatPosition(count)}</span></div>
      <div className="fc-controls">
        <button type="button" aria-label={playing ? 'Pause case rotation' : 'Play case rotation'} onClick={toggleRotation}>
          {playing ? <Pause size={15} /> : <Play size={15} />}
        </button>
        <button type="button" aria-label="Previous case" onClick={() => step(-1)}><ArrowLeft size={18} /></button>
        <button type="button" aria-label="Next case" onClick={() => step(1)}><ArrowRight size={18} /></button>
      </div>
    </header>
    <div className="fc-slide" role="group" aria-roledescription="slide" aria-label={(index + 1) + ' of ' + count + ', ' + current.tag}
      onTouchStart={e => { touchStart.current = e.touches.length === 1 ? { x: e.touches[0].clientX, y: e.touches[0].clientY } : null }}
      onTouchEnd={endSwipe} onTouchCancel={() => { touchStart.current = null }}>
      <div className="fc-media">
        <div className="fc-warehouse" data-active={showWarehouse} aria-hidden="true">
          {sceneRequested && !reduced && <WarehouseFallback><Suspense fallback={null}>
            <Warehouse running={ready && showWarehouse && visible && pageVisible} progressRef={progress} />
          </Suspense></WarehouseFallback>}
        </div>
        {(visual.type === 'photo' || visual.type === 'document') && <div key={current.tag} className={'fc-image fc-' + visual.type}>
          <img src={visual.src} alt={visual.alt} draggable={false} />
        </div>}
        {visual.type === 'figures' && <div key={current.tag} className={'fc-exhibit fc-tone-' + current.tone}>
          <p>{visual.label}</p>
          <dl>{visual.items.map(([value, label]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
        </div>}
      </div>
      <div className="fc-summaries">
        {PROJECTS.map((item, i) => <div key={item.tag} className="fc-summary" data-active={i === index} aria-hidden={i !== index}>
          <p className="fc-byline">{item.tag} <span> / </span> {item.discipline}</p>
          <h2>{item.title}</h2>
          <p className="fc-body">{item.body}</p>
        </div>)}
      </div>
      <TLink to={current.to} className="fc-outcome" aria-label={'View ' + current.tag + ' experience and evidence'}>
        <span><strong>{current.metrics[0][0]}</strong><small>{current.metrics[0][1]}</small></span>
        <ArrowUpRight size={23} aria-hidden="true" />
      </TLink>
    </div>
    <span className="fc-announcement" aria-live={playing ? 'off' : 'polite'} aria-atomic="true">Case {index + 1} of {count}. {current.tag}. {current.title}.</span>
  </section>
}
