import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'
import { CustomEase } from 'gsap/CustomEase'
import { gsap, REDUCED } from '../lib/gsap'
import './work-film.css'

gsap.registerPlugin(CustomEase)
const revealEase = CustomEase.create('workFilm', '.87,0,.13,1')

export default function WorkFilm({ ready }: { ready: boolean }) {
  const frame = useRef<HTMLElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [failed, setFailed] = useState(false)
  const [wantsPlay, setWantsPlay] = useState(!REDUCED)
  useLayoutEffect(() => {
    if (!ready || REDUCED || !frame.current) return
    let observer: IntersectionObserver | undefined
    // The supplied hero opens a slit across the frame, then unwinds its rotated video.
    const ctx = gsap.context(() => {
      const counter = frame.current!.querySelector<HTMLElement>('.film-counter')
      const value = { percent: 0 }
      const tl = gsap.timeline({ paused: true, defaults: { ease: revealEase } })
      tl.fromTo('.film-mask', { clipPath: 'polygon(0% 45%,0% 45%,0% 55%,0% 55%)' },
        { clipPath: 'polygon(0% 45%,25% 45%,25% 55%,0% 55%)', duration: .35 })
        .to('.film-mask', { clipPath: 'polygon(0% 45%,100% 45%,100% 55%,0% 55%)', duration: .47 })
        .fromTo('.film-progress', { scaleX: 0 }, { scaleX: 1, duration: .47 }, '<')
        .to(value, { percent: 100, duration: .47, onUpdate: () => { if (counter) counter.textContent = Math.round(value.percent) + '%' } }, '<')
        .to('.film-mask', { clipPath: 'polygon(0% 0%,100% 0%,100% 100%,0% 100%)', duration: .64 })
        .fromTo('.film-media', { scale: .15, rotation: -20 }, { scale: 1, rotation: 0, duration: .78 }, '<')
        .to('.film-loader', { autoAlpha: 0, duration: .16 }, '<')
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) { tl.play(); observer?.disconnect() }
      })
      observer.observe(frame.current!)
    }, frame)
    return () => { observer?.disconnect(); ctx.revert() }
  }, [ready])
  useEffect(() => {
    const node = video.current
    if (!ready || !node || failed) return
    let visible = false
    const sync = () => {
      if (wantsPlay && visible && !document.hidden) void node.play().catch(() => {})
      else node.pause()
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      sync()
    })
    observer.observe(node)
    document.addEventListener('visibilitychange', sync)
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', sync); node.pause() }
  }, [ready, wantsPlay, failed])

  function togglePlayback() {
    const node = video.current
    if (!node) return
    const play = node.paused
    setWantsPlay(play)
    if (play) void node.play().catch(() => {})
    else node.pause()
  }

  return <figure className="work-film" ref={frame}>
    <div className="film-screen" onPointerMove={event => {
      if (REDUCED || event.pointerType !== 'mouse') return
      const el = event.currentTarget
      const rect = el.getBoundingClientRect()
      el.style.setProperty('--film-yaw', ((event.clientX - rect.left) / rect.width * 2 - 1).toFixed(3) + 'deg')
      el.style.setProperty('--film-pitch', (1 - (event.clientY - rect.top) / rect.height * 2).toFixed(3) + 'deg')
    }} onPointerLeave={event => {
      event.currentTarget.style.removeProperty('--film-yaw')
      event.currentTarget.style.removeProperty('--film-pitch')
    }}>
      <div className="film-mask"><div className="film-media">
        <video ref={video} src="/work/working-notes.mp4" muted loop playsInline preload={REDUCED ? 'none' : 'metadata'}
          poster="/work/working-notes.webp" aria-label="Portfolio film featuring Shopdeck field notes, Honda production work and Shiksha’s library"
          onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setFailed(true)} />
      </div></div>
      {!REDUCED && <div className="film-loader" aria-hidden="true"><span className="film-counter">0%</span><span className="film-progress" /></div>}
      {!failed && <button className="film-toggle" type="button" aria-label={playing ? 'Pause portfolio film' : 'Play portfolio film'}
        onClick={togglePlayback}>{playing ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}</button>}
    </div>
    <figcaption><span>Inside my working files</span><span>Shopdeck &nbsp; / &nbsp; Honda &nbsp; / &nbsp; Shiksha</span></figcaption>
  </figure>
}
