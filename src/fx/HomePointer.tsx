import { Component, lazy, Suspense, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import './home-pointer.css'

const FluidPointerCanvas = lazy(() => import('./FluidPointerCanvas'))

class PointerFallback extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() { return this.state.failed ? null : this.props.children }
}

export default function HomePointer() {
  const [enabled, setEnabled] = useState(false)
  useEffect(() => {
    const media = matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)')
    const sync = () => {
      const active = media.matches && !document.hidden
      document.body.classList.toggle('home-pointer-active', active)
      setEnabled(active)
    }
    sync()
    media.addEventListener('change', sync)
    document.addEventListener('visibilitychange', sync)
    return () => {
      document.body.classList.remove('home-pointer-active')
      media.removeEventListener('change', sync)
      document.removeEventListener('visibilitychange', sync)
    }
  }, [])
  return enabled ? <PointerFallback><Suspense fallback={null}><FluidPointerCanvas /></Suspense></PointerFallback> : null
}
