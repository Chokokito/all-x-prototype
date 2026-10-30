<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { lang, t } from '../i18n'
import ReactIsland from '../react/ReactIsland.vue'
import BlurText from '../react/bits/BlurText'

const heroEl = ref(null)

function onScroll() {
  const el = heroEl.value
  if (!el) return
  const p = Math.min(1, Math.max(0, window.scrollY / 520))
  el.style.setProperty('--hero-p', p.toFixed(3))
}

onMounted(() => {
  addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onBeforeUnmount(() => removeEventListener('scroll', onScroll))
</script>

<template>
  <section ref="heroEl" class="hero">
    <div v-parallax="0.35" class="glow" aria-hidden="true" />
    <div v-parallax="0.18" class="grid" aria-hidden="true" />

    <div class="container inner">
      <div class="h1" role="heading" aria-level="1">
        <ReactIsland
          :component="BlurText"
          :props="{ text: t('hero.l1'), trigger: 'load', delay: 40, duration: 0.35, direction: 'bottom', distance: 16, blur: 4, className: 'bt-center' }"
        />
        <span class="grad blur-in">{{ t('hero.l2') }} <span class="accent-word">{{ t('hero.l3') }}</span></span>
      </div>

      <p class="sub">{{ t('hero.sub') }}</p>

      <div class="ctas">
        <a href="#contato" class="btn btn-primary">{{ t('hero.cta1') }}</a>
        <a href="#como-funciona" class="btn btn-ghost">{{ t('hero.cta2') }}</a>
      </div>

      <!-- Clean, responsive proof strip -->
      <div class="rails-strip" :aria-label="t('hero.proofLabel')">
        <div class="rail-chip">
          <span class="rail-indicator" aria-hidden="true" />
          <span class="rail-label">{{ lang === 'pt' ? 'Moedas' : 'Currencies' }}:</span>
          <span class="rail-value">USD · EUR · BRL</span>
        </div>
        <div class="rail-divider" aria-hidden="true" />
        <div class="rail-chip">
          <span class="rail-indicator" aria-hidden="true" />
          <span class="rail-label">Stablecoins:</span>
          <span class="rail-value">USDC · USDT</span>
        </div>
        <div class="rail-divider" aria-hidden="true" />
        <div class="rail-chip">
          <span class="rail-indicator" aria-hidden="true" />
          <span class="rail-label">{{ lang === 'pt' ? 'Trilhos' : 'Rails' }}:</span>
          <span class="rail-value">Pix · ACH · SWIFT · SEPA</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  z-index: 3;
  background: radial-gradient(ellipse 90% 60% at 50% 100%, #151722 0%, var(--bg) 70%);
  padding: clamp(56px, 7vw, 96px) 0 clamp(48px, 6vw, 76px);
  border-radius: 0 0 40px 40px;
  border-bottom: 1px solid rgba(217, 142, 104, 0.2);
  box-shadow:
    0 42px 90px rgba(0, 0, 0, 0.92),
    0 10px 30px -10px rgba(217, 142, 104, 0.14);
  overflow: hidden;
  --hero-p: 0;
}
.glow {
  position: absolute; top: 0; left: 50%; transform: translateX(-50%);
  width: min(1024px, 100%); height: 550px; animation: floatGlow 9s ease-in-out infinite;
  background: radial-gradient(circle at 50% 0%, rgba(217, 142, 104, 0.12) 0%, rgba(217, 142, 104, 0) 70%);
  pointer-events: none;
}
.grid {
  position: absolute; inset: 0 0 auto 0; height: 1005px;
  background-image:
    linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(180deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: linear-gradient(#000 35%, transparent);
  pointer-events: none;
}
.inner {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 26px;
  text-align: center;
  transform: translateY(calc(var(--hero-p) * -18px)) scale(calc(1 - var(--hero-p) * 0.025));
  opacity: calc(1 - var(--hero-p) * 0.18);
  will-change: transform, opacity;
  box-sizing: border-box;
}
.h1 {
  font-size: clamp(34px, 6.4vw, 72px);
  line-height: 1.05;
  letter-spacing: -0.035em;
  font-weight: 600;
  max-width: 100%;
}
.grad {
  display: block;
  margin-top: 4px;
  color: #f3e4dc;
}
.accent-word {
  color: var(--accent-soft);
  font-weight: 600;
}
.sub {
  max-width: 620px;
  font-size: clamp(15px, 1.8vw, 18px);
  line-height: 1.55;
  font-weight: 400;
  color: var(--muted);
}
.ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  padding-top: 4px;
  width: 100%;
  max-width: 440px;
}

/* Rails Proof Strip */
.rails-strip {
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px 16px;
  margin-top: 6px;
  padding: 8px 18px;
  background: rgba(18, 20, 27, 0.72);
  border: 1px solid var(--line-2);
  border-radius: 999px;
  backdrop-filter: blur(12px);
  max-width: 100%;
  box-sizing: border-box;
}
.rail-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--text-2);
}
.rail-indicator {
  width: 5px;
  height: 5px;
  border-radius: 99px;
  background: var(--accent);
  box-shadow: 0 0 6px rgba(217, 142, 104, 0.6);
  flex-shrink: 0;
}
.rail-label {
  font-size: 11.5px;
  font-weight: 500;
  color: var(--dim);
}
.rail-value {
  font-weight: 600;
  color: #f1f5f9;
  letter-spacing: -0.01em;
  white-space: nowrap;
}
.rail-divider {
  width: 1px;
  height: 14px;
  background: var(--line-2);
}

@media (max-width: 680px) {
  .hero {
    padding: 38px 0 36px;
    border-radius: 0 0 28px 28px;
  }
  .inner {
    gap: 18px;
  }
  :deep(.blur-text span[aria-hidden='true']) {
    filter: none !important;
    opacity: 1 !important;
  }
  .ctas {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
  }
  .ctas .btn {
    width: 100%;
    padding: 13px 20px;
    font-size: 14px;
  }
  .rails-strip {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
    padding: 12px 16px;
    width: 100%;
    border-radius: 14px;
    background: rgba(18, 20, 27, 0.85);
  }
  .rail-divider {
    display: none;
  }
  .rail-chip {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 4px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  }
  .rail-chip:last-child {
    border-bottom: 0;
  }
  .rail-label {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
  }
  .rail-value {
    font-size: 12.5px;
  }
}
</style>
