import { useEffect, useRef } from 'react'
import { mountWaves } from './reactive-waves/waves'
import './pack-effects.css'

export default function WaveField({ className = '' }: { className?: string }) {
  const field = useRef<HTMLDivElement>(null)
  const surface = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    if (field.current && surface.current) return mountWaves(field.current, surface.current)
  }, [])
  return <div ref={field} className={'pack-wave ' + className} aria-hidden="true">
    <canvas ref={surface} />
  </div>
}
