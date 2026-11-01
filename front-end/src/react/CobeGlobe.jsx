import { useEffect, useRef } from 'react'
import createGlobe from 'cobe'
import { useMotionValue, useSpring } from 'motion/react'

const MOVEMENT_DAMPING = 1400

// Core ALL X settlement hubs: São Paulo, New York, London, Frankfurt, Singapore, Mexico City, Zurich
const MARKERS = [
  { location: [-23.5505, -46.6333], size: 0.085 }, // São Paulo (Pix)
  { location: [40.7128, -74.006], size: 0.08 },   // New York (ACH / Fedwire)
  { location: [51.5072, -0.1276], size: 0.07 },   // London (FPS / SWIFT)
  { location: [50.1109, 8.6821], size: 0.07 },    // Frankfurt (SEPA Instant)
  { location: [47.3769, 8.5417], size: 0.055 },   // Zurich
  { location: [1.3521, 103.8198], size: 0.065 },  // Singapore
  { location: [19.4326, -99.1332], size: 0.06 },  // Mexico City (SPEI)
]

const ARCS = [
  { from: [-23.5505, -46.6333], to: [40.7128, -74.006] },  // BRL <-> USD
  { from: [-23.5505, -46.6333], to: [50.1109, 8.6821] },   // BRL <-> EUR
  { from: [40.7128, -74.006], to: [51.5072, -0.1276] },    // USD <-> GBP
  { from: [50.1109, 8.6821], to: [1.3521, 103.8198] },     // EUR <-> SGD
  { from: [-23.5505, -46.6333], to: [19.4326, -99.1332] }, // BRL <-> MXN
]

export default function CobeGlobe({ className = '' }) {
  const canvasRef = useRef(null)
  const pointerInteracting = useRef(null)
  const phiRef = useRef(0.75)

  const r = useMotionValue(0)
  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  })

  const updatePointerInteraction = (value) => {
    pointerInteracting.current = value
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? 'grabbing' : 'grab'
    }
  }

  const updateMovement = (clientX) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current
      pointerInteracting.current = clientX
      r.set(r.get() + delta / MOVEMENT_DAMPING)
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let width = canvas.offsetWidth || 380
    let rafId = null

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth || 380
      }
    }
    window.addEventListener('resize', onResize)
    onResize()

    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const globe = createGlobe(canvas, {
      devicePixelRatio: dpr,
      width: width * dpr,
      height: width * dpr,
      phi: phiRef.current,
      theta: 0.22,
      dark: 1,
      diffuse: 1.15,
      mapSamples: 16000,
      mapBrightness: 5.5,
      mapBaseBrightness: 0.06,
      baseColor: [0.16, 0.16, 0.19],
      markerColor: [0.85, 0.56, 0.41], // #d98e68 ALL X copper
      glowColor: [0.07, 0.07, 0.09],
      arcColor: [0.85, 0.56, 0.41],
      arcWidth: 0.55,
      arcHeight: 0.22,
      markers: MARKERS,
      arcs: ARCS,
    })

    const tick = () => {
      if (!pointerInteracting.current) {
        phiRef.current += 0.0035
      }
      globe.update({
        phi: phiRef.current + rs.get(),
        width: width * dpr,
        height: width * dpr,
      })
      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    setTimeout(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = '1'
    }, 30)

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      globe.destroy()
      window.removeEventListener('resize', onResize)
    }
  }, [rs])

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '370px',
        aspectRatio: '1 / 1',
        margin: '0 auto',
        display: 'grid',
        placeItems: 'center',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          opacity: 0,
          transition: 'opacity 500ms ease',
          cursor: 'grab',
          contain: 'layout paint size',
        }}
        onPointerDown={(e) => updatePointerInteraction(e.clientX)}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) => e.touches[0] && updateMovement(e.touches[0].clientX)}
      />
    </div>
  )
}
