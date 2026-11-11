'use client'
import { useEffect, useId, useState } from 'react'
import './fx.css'

/**
 * AnimatedBeam — luz percorrendo uma curva entre dois elementos.
 * Uso: container (ref) com position:relative, e dois elementos (refs) dentro dele.
 *   <AnimatedBeam containerRef={c} fromRef={a} toRef={b} curvature={-40} duration={3} />
 * Pode ser repetido várias vezes (várias entradas / saídas) com `delay` diferente.
 */
export default function AnimatedBeam({
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  duration = 3,
  delay = 0,
  pathColor = 'rgba(255,255,255,0.10)',
  pathWidth = 1.5,
  gradientStart = '#d98e68',
  gradientStop = '#f2c4a8',
}) {
  const id = useId()
  const [d, setD] = useState('')
  const [box, setBox] = useState({ w: 0, h: 0 })

  useEffect(() => {
    const update = () => {
      const c = containerRef.current
      const a = fromRef.current
      const b = toRef.current
      if (!c || !a || !b) return
      const cr = c.getBoundingClientRect()
      const ar = a.getBoundingClientRect()
      const br = b.getBoundingClientRect()
      const x1 = ar.left - cr.left + ar.width / 2
      const y1 = ar.top - cr.top + ar.height / 2
      const x2 = br.left - cr.left + br.width / 2
      const y2 = br.top - cr.top + br.height / 2
      setBox({ w: cr.width, h: cr.height })
      setD(`M ${x1},${y1} Q ${(x1 + x2) / 2},${(y1 + y2) / 2 + curvature} ${x2},${y2}`)
    }
    update()
    const ro = new ResizeObserver(update)
    if (containerRef.current) ro.observe(containerRef.current)
    window.addEventListener('resize', update)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [containerRef, fromRef, toRef, curvature])

  const x = reverse ? ['90%;-10%', '100%;0%'] : ['10%;110%', '0%;100%']

  return (
    <svg className="fx-beam" width={box.w} height={box.h} viewBox={`0 0 ${box.w} ${box.h}`} fill="none" aria-hidden="true">
      <path d={d} stroke={pathColor} strokeWidth={pathWidth} strokeLinecap="round" />
      <path d={d} stroke={`url(#${id})`} strokeWidth={pathWidth + 0.5} strokeLinecap="round" />
      <defs>
        <linearGradient id={id} gradientUnits="userSpaceOnUse" x1="0%" x2="0%" y1="0%" y2="0%">
          <animate attributeName="x1" values={x[0].replace(';', ';')} dur={`${duration}s`} begin={`${delay}s`} repeatCount="indefinite" />
          <animate attributeName="x2" values={x[1]} dur={`${duration}s`} begin={`${delay}s`} repeatCount="indefinite" />
          <stop stopColor={gradientStart} stopOpacity="0" />
          <stop stopColor={gradientStart} />
          <stop offset="32.5%" stopColor={gradientStop} />
          <stop offset="100%" stopColor={gradientStop} stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  )
}
