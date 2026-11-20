// WebGL & ThreeJS Effects #5 from the Awwwards Pack: a grid of small squares; the ones near the cursor grow and light up.
import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { REDUCED } from '../lib/gsap'

const CELL = 42
const INK = new THREE.Color('#181b18'), BLUE = new THREE.Color('#2668fd'), ORANGE = new THREE.Color('#fd4400')

function Grid({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number; on: boolean }> }) {
  const { size } = useThree()
  const mesh = useRef<THREE.InstancedMesh>(null!)
  const cols = Math.ceil(size.width / CELL) + 1, rows = Math.ceil(size.height / CELL) + 1
  const count = cols * rows
  const scales = useMemo(() => new Float32Array(count).fill(0.16), [count])
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const col = useMemo(() => new THREE.Color(), [])
  const smooth = useRef({ x: -9999, y: -9999 })
  useFrame((_, dt) => {
    const m = mouse.current, s = smooth.current
    const k = 1 - Math.pow(0.0125, dt)
    if (m.on) { s.x += (m.x - s.x) * k; s.y += (m.y - s.y) * k }
    const R = 210
    let i = 0
    for (let cx = 0; cx < cols; cx++) for (let cy = 0; cy < rows; cy++, i++) {
      const x = cx * CELL - size.width / 2 + CELL / 2, y = size.height / 2 - cy * CELL - CELL / 2
      const d = m.on ? Math.hypot(x - s.x, y - s.y) : 9999
      const t = Math.max(0, 1 - d / R)
      const target = 0.16 + 0.76 * t * t * (3 - 2 * t)
      scales[i] += (target - scales[i]) * Math.min(1, dt * 10)
      dummy.position.set(x, y, 0)
      dummy.scale.setScalar(CELL * scales[i])
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
      const tt = (scales[i] - 0.16) / 0.76
      col.copy(INK).lerp(BLUE, Math.min(1, tt * 2)).lerp(ORANGE, Math.max(0, tt * 2 - 1))
      mesh.current.setColorAt(i, col)
    }
    mesh.current.instanceMatrix.needsUpdate = true
    if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true
  })
  return (
    <instancedMesh key={count} ref={mesh} args={[undefined, undefined, count]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial />
    </instancedMesh>
  )
}

export function DotGrid({ children, className = '' }: { children?: React.ReactNode; className?: string }) {
  const wrap = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: 0, y: 0, on: false })
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = wrap.current!
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: '100px' })
    io.observe(el)
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      mouse.current = { x: e.clientX - r.left - r.width / 2, y: r.height / 2 - (e.clientY - r.top), on: true }
    }
    const leave = () => (mouse.current.on = false)
    el.addEventListener('pointermove', move); el.addEventListener('pointerleave', leave)
    return () => { io.disconnect(); el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave) }
  }, [])
  return (
    <div className={`dotgrid ${className}`} ref={wrap}>
      {!REDUCED && (
        <div className="dotgrid-canvas" aria-hidden>
          <Canvas orthographic frameloop={visible ? 'always' : 'never'} camera={{ zoom: 1, position: [0, 0, 10] }} dpr={[1, 2]} gl={{ alpha: true, antialias: true }}>
            <Grid mouse={mouse} />
          </Canvas>
        </div>
      )}
      <div className="dotgrid-content">{children}</div>
    </div>
  )
}
