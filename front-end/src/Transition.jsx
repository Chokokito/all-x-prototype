'use client'
// Minimal port of Vue's <Transition name="x">: applies x-enter-from/-enter-active/-enter-to and
// x-leave-from/-leave-active/-leave-to to the single child, so existing CSS works unchanged.
// Usage: <Transition name="fade" show={open}><div className="modal" /></Transition>
import { cloneElement, useEffect, useLayoutEffect, useRef, useState } from 'react'

export default function Transition({ name, show, children }) {
  const [mounted, setMounted] = useState(show)
  const [cls, setCls] = useState('')
  const ref = useRef(null)
  const first = useRef(true)

  useLayoutEffect(() => {
    if (first.current) { first.current = false; return }
    let raf1, raf2, done
    const phase = show ? 'enter' : 'leave'
    if (show) setMounted(true)
    setCls(`${name}-${phase}-from ${name}-${phase}-active`)
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        setCls(`${name}-${phase}-active ${name}-${phase}-to`)
        const el = ref.current
        const end = () => {
          if (done) return
          done = true
          setCls('')
          if (!show) setMounted(false)
        }
        if (!el) return end()
        const s = getComputedStyle(el)
        const ms = Math.max(
          ...`${s.transitionDuration},${s.animationDuration}`.split(',').map((v) => parseFloat(v) * (v.includes('ms') ? 1 : 1000) || 0),
        ) + Math.max(...`${s.transitionDelay}`.split(',').map((v) => parseFloat(v) * 1000 || 0))
        setTimeout(end, ms)
      })
    })
    return () => { done = true; cancelAnimationFrame(raf1); cancelAnimationFrame(raf2) }
  }, [show, name])

  useEffect(() => { if (!show && !cls) setMounted(false) }, [show, cls])

  if (!mounted || !children) return null
  return cloneElement(children, {
    ref,
    className: [children.props.className, cls].filter(Boolean).join(' '),
  })
}
