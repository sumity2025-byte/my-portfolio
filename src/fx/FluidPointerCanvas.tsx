import { useEffect, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { EffectComposer } from '@react-three/postprocessing'
import { Fluid } from '@whatisjery/react-fluid-distortion'

function FluidTrail() {
  const invalidate = useThree(state => state.invalidate)
  const until = useRef(0)
  useEffect(() => {
    const wake = () => {
      until.current = performance.now() + 1500
      invalidate()
    }
    window.addEventListener('pointermove', wake, { passive: true })
    return () => window.removeEventListener('pointermove', wake)
  }, [invalidate])
  useFrame(() => { if (performance.now() < until.current) invalidate() })
  return <EffectComposer multisampling={0}>
    <Fluid curl={30} fluidColor="#90c6b8" rainbow={false} radius={0.12} densityDissipation={0.90} />
  </EffectComposer>
}

export default function FluidPointerCanvas() {
  const overlay = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let idle = 0
    const show = () => {
      overlay.current?.classList.add('is-moving')
      window.clearTimeout(idle)
      idle = window.setTimeout(() => overlay.current?.classList.remove('is-moving'), 600)
    }
    window.addEventListener('pointermove', show, { passive: true })
    return () => {
      window.clearTimeout(idle)
      window.removeEventListener('pointermove', show)
    }
  }, [])
  return <div ref={overlay} className="home-pointer-fluid" aria-hidden="true">
    <Canvas dpr={0.75} frameloop="demand" gl={{ alpha: true, antialias: false }} fallback={null}>
      <FluidTrail />
    </Canvas>
  </div>
}
