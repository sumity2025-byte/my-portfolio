import { useEffect, useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'
import { REDUCED } from '../lib/gsap'
import './work-film.css'

export default function WorkFilm({ ready }: { ready: boolean }) {
  const video = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [failed, setFailed] = useState(false)
  const [wantsPlay, setWantsPlay] = useState(!REDUCED)
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

  return <figure className="work-film">
    <div className="film-screen">
        <video ref={video} src="/work/working-notes.mp4" muted loop playsInline preload={REDUCED ? 'none' : 'metadata'}
          poster="/work/working-notes.webp" aria-label="Portfolio film featuring Shopdeck field notes, Honda production work and Shiksha’s library"
          onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setFailed(true)} />
      {!failed && <button className="film-toggle" type="button" aria-label={playing ? 'Pause portfolio film' : 'Play portfolio film'}
        onClick={togglePlayback}>{playing ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}</button>}
    </div>
    <figcaption><span>Inside my working files</span><span>Shopdeck &nbsp; / &nbsp; Honda &nbsp; / &nbsp; Shiksha</span></figcaption>
  </figure>
}
