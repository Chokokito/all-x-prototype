// parallax(speed): callback ref that translates the element on scroll (uses the independent
// `translate` property so it composes with transform-based animations). Disabled for reduced motion.
// Usage: <div ref={parallax(0.22)} />
const items = new Set()
let ticking = false
const reduce = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches

function update() {
  ticking = false
  const vh = innerHeight
  items.forEach((el) => {
    const r = el.getBoundingClientRect()
    if (r.bottom < -300 || r.top > vh + 300) return
    const base = r.top - (el.__py || 0) + r.height / 2
    const y = -(base - vh / 2) * el.__speed
    el.__py = y
    el.style.translate = `0 ${y.toFixed(1)}px`
  })
}
function request() {
  if (!ticking) { ticking = true; requestAnimationFrame(update) }
}

const cache = new Map()
export function parallax(speed = 0.15) {
  if (cache.has(speed)) return cache.get(speed)
  const ref = (el) => {
    if (!el || reduce) return
    el.__speed = speed
    el.style.willChange = 'translate'
    items.add(el)
    if (items.size === 1) {
      addEventListener('scroll', request, { passive: true })
      addEventListener('resize', request)
    }
    request()
    return () => {
      items.delete(el)
      if (!items.size) { removeEventListener('scroll', request); removeEventListener('resize', request) }
    }
  }
  cache.set(speed, ref)
  return ref
}
