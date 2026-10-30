<script setup>
// "Curtain" reveal: the final CTA + footer stay pinned behind the page and are uncovered
// as the main content scrolls away. Falls back to normal flow on small/short screens or
// when the user prefers reduced motion.
import { onBeforeUnmount, onMounted, ref } from 'vue'

const stage = ref(null)
const enabled = ref(false)
let ro

const reduce = matchMedia('(prefers-reduced-motion: reduce)')

function layout() {
  const el = stage.value
  if (!el) return
  const h = el.offsetHeight
  enabled.value = !reduce.matches && innerWidth >= 900 && h <= innerHeight * 0.96
  document.documentElement.style.setProperty('--stage-h', enabled.value ? `${h}px` : '0px')
  document.documentElement.classList.toggle('has-stage', enabled.value)
  progress()
}

function progress() {
  const el = stage.value
  if (!el || !enabled.value) return
  const h = el.offsetHeight
  const start = document.documentElement.scrollHeight - innerHeight - h
  const p = Math.min(1, Math.max(0, (scrollY - start) / h))
  el.style.setProperty('--p', p.toFixed(3))
}

// #contato lives in the pinned stage, so "scroll to it" means "scroll to the bottom".
function onAnchor(e) {
  const a = e.target.closest?.('a[href="#contato"]')
  if (a && enabled.value) {
    e.preventDefault()
    scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })
  }
}

onMounted(() => {
  ro = new ResizeObserver(layout)
  ro.observe(stage.value)
  ro.observe(document.body)
  addEventListener('scroll', progress, { passive: true })
  addEventListener('resize', layout)
  document.addEventListener('click', onAnchor)
  layout()
})
onBeforeUnmount(() => {
  ro?.disconnect()
  removeEventListener('scroll', progress)
  removeEventListener('resize', layout)
  document.removeEventListener('click', onAnchor)
})
</script>

<template>
  <div ref="stage" class="stage" :class="{ pinned: enabled }">
    <div class="stage-backdrop" aria-hidden="true" />
    <div class="stage-inner"><slot /></div>
  </div>
</template>

<style>
.stage {
  position: relative;
  --p: 1;
  background: radial-gradient(ellipse 90% 70% at 50% 0%, rgba(217, 142, 104, 0.14) 0%, #07080c 72%);
  overflow: hidden;
}
.stage-backdrop {
  position: absolute; inset: 0; pointer-events: none;
  background-image:
    radial-gradient(circle at 20% 25%, rgba(217, 142, 104, 0.12), transparent 45%),
    radial-gradient(circle at 80% 35%, rgba(52, 211, 153, 0.06), transparent 45%);
  opacity: calc(0.3 + 0.7 * var(--p));
}
.stage.pinned { position: fixed; inset: auto 0 0 0; z-index: 0; }
.stage.pinned .stage-inner {
  transform-origin: 50% 100%;
  transform: translateY(calc((1 - var(--p)) * -44px)) scale(calc(0.95 + 0.05 * var(--p)));
  opacity: calc(0.4 + 0.6 * var(--p));
  will-change: transform, opacity;
}
/* The page content that slides away and uncovers the stage */
.page-top {
  position: relative;
  z-index: 1;
  background: var(--bg);
}
.has-stage .page-top {
  margin-bottom: var(--stage-h, 0px);
  border-radius: 0 0 42px 42px;
  border-bottom: 1px solid rgba(217, 142, 104, 0.28);
  box-shadow:
    0 40px 90px rgba(0, 0, 0, 0.92),
    0 12px 36px -10px rgba(217, 142, 104, 0.22);
}
</style>
