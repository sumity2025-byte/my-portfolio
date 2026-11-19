import { useEffect, useRef } from 'react'

export default function CareerOrbit({ chapter = 0 }: { chapter?: number }) {
  const host = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const node = host.current
    if (!node) return
    let disposed = false
    let stop: (() => void) | undefined
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    function sync() {
      stop?.()
      stop = undefined
      if (media.matches) return
      void import('./orbitRenderer').then(({ mountOrbit }) => {
        if (!disposed && !media.matches && !stop && node) stop = mountOrbit(node)
      }).catch(() => { /* The poster remains visible when WebGL is unavailable. */ })
    }
    sync()
    media.addEventListener('change', sync)
    return () => { disposed = true; media.removeEventListener('change', sync); stop?.() }
  }, [])
  return <div ref={host} data-chapter={chapter} role="img" aria-label="A kinetic instrument with four satellites: meshing gears, rising columns, a compass and an open book." style={{ position: 'relative', width: '100%', height: '100%', minHeight: 180, touchAction: 'pan-y' }}>
    <img src={'/work/orbit-' + chapter + '.webp'} alt="" fetchPriority="high" draggable={false} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', pointerEvents: 'none' }}/>
  </div>
}
