// v-parallax="speed": translates the element on scroll (uses the independent `translate`
// property so it composes with transform-based animations). Disabled for reduced motion.
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

export const vParallax = {
  mounted(el, { value = 0.15 }) {
    if (reduce) return
    el.__speed = value
    el.style.willChange = 'translate'
    items.add(el)
    if (items.size === 1) {
      addEventListener('scroll', request, { passive: true })
      addEventListener('resize', request)
    }
    request()
  },
  updated(el, { value = 0.15 }) { el.__speed = value },
  unmounted(el) {
    items.delete(el)
    if (!items.size) { removeEventListener('scroll', request); removeEventListener('resize', request) }
  },
}
