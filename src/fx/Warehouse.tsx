// Home hero: a dark-store floor seen from above. The tangled grey route is the old pick path;
// the orange route draws itself as you scroll, and shelves light up blue as the picker passes.
import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { REDUCED } from '../lib/gsap'

const ORANGE = new THREE.Color('#fd4400')
const BLUE = new THREE.Color('#2668fd')
const SHELF = new THREE.Color('#ffffff')
const R = 8, C = 16, DX = 1.45, DZ = 2.9
const XE = (C * DX) / 2 + 0.9

function seeded(seed: number) {
  let s = seed
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646
}

function buildPath() {
  const path = new THREE.CurvePath<THREE.Vector3>()
  const z0 = -((R - 1) * DZ) / 2
  let prev: THREE.Vector3 | null = null
  const push = (p: THREE.Vector3) => {
    if (prev) path.add(new THREE.LineCurve3(prev, p))
    prev = p
  }
  for (let a = 0; a < R - 1; a++) {
    const z = z0 + a * DZ + DZ / 2
    const dir = a % 2 === 0 ? 1 : -1
    push(new THREE.Vector3(-dir * XE, 0.12, z))
    push(new THREE.Vector3(dir * XE, 0.12, z))
    if (a < R - 2) push(new THREE.Vector3(dir * XE, 0.12, z + DZ))
  }
  return path
}

function Warehouse({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const mesh = useRef<THREE.InstancedMesh>(null!)
  const tube = useRef<THREE.Mesh>(null!)
  const picker = useRef<THREE.Mesh>(null!)
  const group = useRef<THREE.Group>(null!)
  const smooth = useRef(0)

  const { boxes, path, tubeGeo, messy } = useMemo(() => {
    const rnd = seeded(7)
    const z0 = -((R - 1) * DZ) / 2
    const boxes: { x: number; z: number; h: number; pick: boolean; litAt: number }[] = []
    for (let r = 0; r < R; r++)
      for (let c = 0; c < C; c++)
        boxes.push({ x: (c - (C - 1) / 2) * DX, z: z0 + r * DZ, h: 0.25 + rnd() * 0.55, pick: rnd() < 0.2, litAt: -1 })
    const path = buildPath()
    const tubeGeo = new THREE.TubeGeometry(path, 900, 0.075, 6, false)
    const pts: THREE.Vector3[] = []
    for (let i = 0; i < 46; i++)
      pts.push(new THREE.Vector3((rnd() - 0.5) * XE * 2, 0.03, (rnd() - 0.5) * (R - 1) * DZ))
    const mg = new THREE.BufferGeometry().setFromPoints(pts)
    const messy = new THREE.Line(mg, new THREE.LineBasicMaterial({ color: '#8d8a80', transparent: true, opacity: 0.45 }))
    return { boxes, path, tubeGeo, messy }
  }, [])

  const dummy = useMemo(() => new THREE.Object3D(), [])
  const col = useMemo(() => new THREE.Color(), [])
  const total = tubeGeo.index!.count
  const reduced = REDUCED

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime
    const target = reduced ? 0.6 : Math.max(Math.min(0.3, t * 0.08), progressRef.current)
    smooth.current += (target - smooth.current) * Math.min(1, dt * 3)
    const p = smooth.current

    // camera drift from pointer and progress
    const px = state.pointer.x, py = state.pointer.y
    const ang = -0.55 + p * 0.5 + px * 0.12
    const rad = 21
    state.camera.position.set(Math.sin(ang) * rad, 17 - py * 1.2 - p * 3, Math.cos(ang) * rad)
    state.camera.lookAt(-5, 0, 0)

    tube.current.geometry.setDrawRange(0, Math.floor(total * p))
    const pt = path.getPointAt(Math.min(0.9999, p))
    picker.current.position.set(pt.x, 0.3, pt.z)
    picker.current.scale.setScalar(1 + Math.sin(t * 6) * 0.08)

    for (let i = 0; i < boxes.length; i++) {
      const b = boxes[i]
      let k = 0
      if (b.pick) {
        if (b.litAt < 0 && Math.hypot(pt.x - b.x, pt.z - b.z) < DZ * 0.55 && Math.abs(pt.x - b.x) < 0.9) b.litAt = p
        k = b.litAt >= 0 && p >= b.litAt ? 1 : 0
      }
      dummy.position.set(b.x, b.h / 2, b.z)
      dummy.scale.set(1.1, b.h, 0.7)
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
      col.copy(SHELF).lerp(BLUE, k * 0.85)
      mesh.current.setColorAt(i, col)
    }
    mesh.current.instanceMatrix.needsUpdate = true
    mesh.current.instanceColor!.needsUpdate = true
  })

  return (
    <group ref={group}>
      <instancedMesh ref={mesh} args={[undefined, undefined, boxes.length]} castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial roughness={0.9} metalness={0} />
      </instancedMesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[80, 80]} />
        <shadowMaterial opacity={0.12} />
      </mesh>
      <primitive object={messy} />
      <mesh ref={tube} geometry={tubeGeo}>
        <meshBasicMaterial color={ORANGE} />
      </mesh>
      <mesh ref={picker}>
        <sphereGeometry args={[0.24, 24, 24]} />
        <meshBasicMaterial color="#0f0f0f" />
      </mesh>
      <gridHelper args={[60, 60, '#d9d5c9', '#e7e3d8']} position={[0, -0.001, 0]} />
    </group>
  )
}

export default function Scene({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  return (
    <Canvas shadows dpr={[1, 1.75]} camera={{ fov: 38, near: 0.1, far: 80 }} gl={{ antialias: true, alpha: true }}>
      <fog attach="fog" args={['#f6f4ee', 30, 60]} />
      <hemisphereLight args={['#ffffff', '#e9e4d8', 1.6]} />
      <directionalLight position={[8, 16, 6]} intensity={2.2} castShadow shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-20} shadow-camera-right={20} shadow-camera-top={20} shadow-camera-bottom={-20} shadow-bias={-0.0005} />
      <Warehouse progressRef={progressRef} />
    </Canvas>
  )
}
