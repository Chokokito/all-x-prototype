<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import ReactIsland from '../react/ReactIsland.vue'
import LiveFeed from '../react/LiveFeed.jsx'
import CountUp from '../react/bits/CountUp'
import { t } from '../i18n'

const track = ref(null)
const pinned = ref(false)
let ro

const reduce = matchMedia('(prefers-reduced-motion: reduce)')

function update() {
  const el = track.value
  if (!el) return
  pinned.value = !reduce.matches && window.innerWidth >= 768
  if (!pinned.value) {
    el.style.setProperty('--reveal', '1')
    return
  }
  const rect = el.getBoundingClientRect()
  const vh = window.innerHeight
  // If viewport is taller than a standard screen (e.g. full-page screenshot) or already scrolled into view
  if (vh > 1400) {
    el.style.setProperty('--reveal', '1')
    return
  }
  const raw = (vh * 0.96 - rect.top) / (vh * 0.55)
  const p = Math.min(1, Math.max(0, raw))
  el.style.setProperty('--reveal', p.toFixed(3))
}

onMounted(() => {
  ro = new ResizeObserver(update)
  ro.observe(track.value)
  addEventListener('scroll', update, { passive: true })
  addEventListener('resize', update)
  update()
})

onBeforeUnmount(() => {
  ro?.disconnect()
  removeEventListener('scroll', update)
  removeEventListener('resize', update)
})
</script>

<template>
  <section id="console" ref="track" class="showcase-track" :class="{ 'is-pinned': pinned }" :aria-label="t('showcase.label')">
    <div class="showcase-sticky">
      <div class="ambient-halo" aria-hidden="true" />
      <div class="showcase container">
        <div class="frame">
          <div class="inner">
            <div class="top">
              <div class="l">
                <span class="dots" aria-hidden="true">
                  <i style="background:rgba(239,68,68,.6)" />
                  <i style="background:rgba(234,179,8,.6)" />
                  <i style="background:rgba(16,185,129,.6)" />
                </span>
                <span class="t">{{ t('showcase.title') }}</span>
              </div>
              <span class="ok"><i /> {{ t('showcase.connected') }}</span>
            </div>

            <div class="body">
              <div class="cards">
                <article class="card">
                  <div class="row mono"><span class="muted">{{ t('showcase.origin') }}</span><span class="ok">{{ t('showcase.settled') }}</span></div>
                  <p class="amt"><ReactIsland as="span" :component="CountUp" :props="{ to: 850000, prefix: 'R$ ', separator: '.', suffix: ',00', duration: 2.2 }" /></p>
                  <p class="note">{{ t('showcase.originNote') }}</p>
                </article>
                <article class="card">
                  <div class="row mono"><span class="muted">{{ t('showcase.dest') }}</span><span class="acc">{{ t('showcase.network') }}</span></div>
                  <p class="amt soft"><ReactIsland as="span" :component="CountUp" :props="{ to: 152880, prefix: '', separator: '.', suffix: ',00 USDC', duration: 2.2 }" /></p>
                  <p class="note">{{ t('showcase.destNote') }}</p>
                </article>
              </div>
              <ReactIsland :component="LiveFeed" :props="{ tag: t('showcase.feedTag'), exec: t('showcase.feedExec') }" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Upper curtain reveal: the Hero (z-index: 3) sits above this track (z-index: 1) with a negative top overlap.
   As the user scrolls down, the Hero slides up and away while this sticky stage emerges from behind it. */
.showcase-track {
  position: relative;
  z-index: 1;
  --reveal: 1;
  padding: 32px 0 16px;
}
.showcase-track.is-pinned {
  margin-top: -150px;
  padding-top: 170px;
  padding-bottom: 36px;
}
.showcase-sticky {
  position: relative;
}
.showcase-track.is-pinned .showcase-sticky {
  position: sticky;
  top: 108px;
}
.ambient-halo {
  position: absolute; inset: -40px auto auto 50%; transform: translateX(-50%);
  width: min(760px, 92vw); height: 260px; pointer-events: none;
  background: radial-gradient(ellipse at 50% 30%, rgba(217, 142, 104, 0.24), transparent 70%);
  filter: blur(28px);
  opacity: calc(0.25 + var(--reveal) * 0.75);
}
.showcase {
  width: min(860px, 100% - 48px);
  padding: 16px;
  background: rgba(22, 23, 29, 0.55);
  border: 1px solid rgba(217, 142, 104, 0.22);
  border-radius: 24px;
  box-shadow:
    0 30px 70px -12px rgba(0, 0, 0, 0.75),
    0 0 50px -16px rgba(217, 142, 104, 0.25);
  transform-origin: 50% 0%;
  transform:
    perspective(1200px)
    translateY(calc((1 - var(--reveal)) * -64px))
    scale(calc(0.9 + var(--reveal) * 0.1))
    rotateX(calc((1 - var(--reveal)) * 10deg));
  opacity: calc(0.25 + var(--reveal) * 0.75);
  filter: blur(calc((1 - var(--reveal)) * 4px));
  will-change: transform, opacity, filter;
}
.inner { background: #121318; border: 1px solid var(--line-2); border-radius: 16px; overflow: hidden; }
.top { display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap; padding: 16px 24px; background: #14151b; border-bottom: 1px solid var(--line); }
.l { display: flex; align-items: center; gap: 14px; }
.dots { display: flex; gap: 6px; }
.dots i { width: 10px; height: 10px; border-radius: 50%; }
.t, .ok, .muted, .acc { font-size: 12px; }
.t, .muted { color: var(--muted); }
.ok { color: var(--ok); display: inline-flex; align-items: center; gap: 8px; }
.ok i { width: 8px; height: 8px; border-radius: 50%; background: var(--ok); box-shadow: 0 0 10px var(--ok); }
.acc { color: var(--accent); }
.body { padding: clamp(16px, 4vw, 32px); display: flex; flex-direction: column; gap: 16px; }
.cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; }
.card {
  padding: 24px; background: rgba(22, 23, 30, 0.78);
  border: 1px solid var(--line); border-radius: 12px;
  transition: border-color 0.25s ease, transform 0.25s ease;
}
.card:hover { border-color: rgba(217, 142, 104, 0.35); transform: translateY(-2px); }
.row { display: flex; justify-content: space-between; gap: 8px; }
.amt { margin-top: 16px; font-size: 30px; font-weight: 700; letter-spacing: -0.025em; line-height: 36px; }
.amt.soft { color: var(--accent-soft); }
.note { margin-top: 4px; font-size: 12px; color: var(--muted); }

@media (max-width: 640px) {
  .showcase {
    width: calc(100% - 24px);
    padding: 8px;
    border-radius: 18px;
    transform: none !important;
    filter: none !important;
  }
  .inner { border-radius: 12px; }
  .top { padding: 12px 14px; }
  .body { padding: 14px; }
  .cards { grid-template-columns: 1fr; gap: 12px; }
  .card { padding: 16px; }
  .amt { font-size: 24px; line-height: 28px; margin-top: 10px; }
}
</style>
