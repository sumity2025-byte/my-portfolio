import { useEffect, useRef } from 'react'
import type { WebGLRenderer } from 'three'

// Scroll dissolve shader from the supplied Ironhill section.
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform float uProgress;
  uniform vec2 uResolution;
  uniform vec3 uColor;
  uniform float uSpread;
  varying vec2 vUv;

  float Hash(vec2 p) {
    vec3 p2 = vec3(p.xy, 1.0);
    return fract(sin(dot(p2, vec3(37.1, 61.7, 12.4))) * 3758.5453123);
  }

  float noise(in vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f *= f * (3.0 - 2.0 * f);
    return mix(
      mix(Hash(i + vec2(0.0, 0.0)), Hash(i + vec2(1.0, 0.0)), f.x),
      mix(Hash(i + vec2(0.0, 1.0)), Hash(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0;
    v += noise(p * 1.0) * 0.5;
    v += noise(p * 2.0) * 0.25;
    v += noise(p * 4.0) * 0.125;
    return v;
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    vec2 centeredUv = (uv - 0.5) * vec2(aspect, 1.0);
    
    float dissolveEdge = uv.y - uProgress * 1.2;
    float noiseValue = fbm(centeredUv * 15.0);
    float d = dissolveEdge + noiseValue * uSpread;
    
    float pixelSize = 1.0 / uResolution.y;
    float alpha = 1.0 - smoothstep(-pixelSize, pixelSize, d);
    
    gl_FragColor = vec4(uColor, alpha);
  }
`


export default function SnapshotDissolve({ color }: { color: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const host = canvas.parentElement
    if (!host || motion.matches || !('IntersectionObserver' in window)) return

    let cancelled = false
    let started = false
    let visible = false
    let frame = 0
    let draw: (() => void) | undefined
    let release: (() => void) | undefined

    function schedule() {
      if (!visible || frame || !draw || motion.matches) return
      frame = requestAnimationFrame(() => {
        frame = 0
        draw?.()
      })
    }

    async function start(target: HTMLCanvasElement, wrapper: HTMLElement) {
      const THREE = await import('three')
      if (cancelled) return
      let renderer: WebGLRenderer
      try {
        renderer = new THREE.WebGLRenderer({ canvas: target, alpha: true, antialias: false })
      } catch {
        return
      }
      const rgb = new THREE.Color(color).convertLinearToSRGB()
      const uniforms = {
        uProgress: { value: 0 },
        uResolution: { value: new THREE.Vector2() },
        uColor: { value: rgb },
        uSpread: { value: 0.5 },
      }
      const material = new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader, transparent: true })
      const geometry = new THREE.PlaneGeometry(2, 2)
      const scene = new THREE.Scene()
      scene.add(new THREE.Mesh(geometry, material))
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))

      draw = () => {
        const { top, width, height } = wrapper.getBoundingClientRect()
        if (width <= 0 || height <= 0) return
        const resolution = uniforms.uResolution.value
        if (resolution.x !== width || resolution.y !== height) {
          resolution.set(width, height)
          renderer.setSize(width, height, false)
        }
        uniforms.uProgress.value = Math.min(1.1, Math.max(0, -top / height))
        renderer.render(scene, camera)
      }
      release = () => {
        geometry.dispose()
        material.dispose()
        renderer.dispose()
      }
      schedule()
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible && !started) {
        started = true
        void start(canvas, host).catch(() => { /* Keep the static image if WebGL is unavailable. */ })
      } else schedule()
    })
    const resize = new ResizeObserver(schedule)
    const onMotion = () => {
      canvas.style.visibility = motion.matches ? 'hidden' : 'visible'
      schedule()
    }
    resize.observe(host)
    observer.observe(host)
    window.addEventListener('scroll', schedule, { passive: true })
    motion.addEventListener('change', onMotion)
    return () => {
      cancelled = true
      observer.disconnect()
      resize.disconnect()
      motion.removeEventListener('change', onMotion)
      window.removeEventListener('scroll', schedule)
      cancelAnimationFrame(frame)
      release?.()
    }
  }, [color])

  return <canvas ref={ref} aria-hidden="true" style={{
    position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none',
  }} />
}
