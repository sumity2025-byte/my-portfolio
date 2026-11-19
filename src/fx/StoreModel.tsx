import { useEffect, useRef } from 'react'

export default function StoreModel({ view = 'perspective' }: { view?: 'perspective' | 'plan' }) {
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
      void import('./storeRenderer').then(({ mountStore }) => {
        if (!disposed && !media.matches && !stop && node) stop = mountStore(node)
      }).catch(() => { /* The poster remains visible when WebGL is unavailable. */ })
    }
    sync()
    media.addEventListener('change', sync)
    return () => { disposed = true; media.removeEventListener('change', sync); stop?.() }
  }, [])
  return <div ref={host} data-view={view} role="img" aria-label="An illustrative cutaway of a dark store. An orange pick route runs between stocked shelves and the dispatch area." style={{ position: 'relative', width: '100%', height: '100%', minHeight: 180, touchAction: 'pan-y' }}>
    <img src={view === 'plan' ? '/work/store-plan.webp' : '/work/store-model.webp'} alt="" fetchPriority="high" draggable={false} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', pointerEvents: 'none' }}/>
  </div>
}
