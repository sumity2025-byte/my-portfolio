// Scroll animation from the Awwwards Pack: Count (a number counts up when it scrolls into view).
import { useRef, useState } from 'react'
import { gsap, REDUCED, useGSAP } from '../lib/gsap'

export function Count({ to, prefix = '', suffix = '', decimals = 0, from = 0, duration = 1.6 }: { to: number; prefix?: string; suffix?: string; decimals?: number; from?: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [v, setV] = useState(REDUCED ? to : from)
  useGSAP(() => {
    if (REDUCED) return
    const o = { v: from }
    gsap.to(o, { v: to, duration, ease: 'power3.out', onUpdate: () => setV(o.v), scrollTrigger: { trigger: ref.current, start: 'top 90%', once: true } })
  }, { scope: ref })
  return <span ref={ref}>{prefix}{decimals ? v.toFixed(decimals) : Math.round(v).toLocaleString('en-IN')}{suffix}</span>
}
