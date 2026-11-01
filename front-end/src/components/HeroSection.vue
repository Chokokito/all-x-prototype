<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { lang, t } from '../i18n'

const rails = ['Pix', 'ACH', 'SWIFT', 'SEPA', 'Fedwire', 'USDC', 'USDT']
const heroEl = ref(null)
const activePillar = ref(0)

const pillars = computed(() =>
  lang.value === 'pt'
    ? [
        {
          icon: 'network',
          title: 'Mova dinheiro entre fronteiras',
          desc: 'Transações rápidas com conversão integrada, cotações ao vivo, taxas transparentes e liquidação T+0.',
          href: '#pagamentos',
        },
        {
          icon: 'wallet',
          title: 'Contas virtuais nomeadas',
          desc: 'Abra contas dedicadas em USD e EUR e carteiras multichain para receber em fiat e stablecoins.',
          href: '#contas',
        },
        {
          icon: 'shield',
          title: 'Compliance desde o primeiro dia',
          desc: 'KYB, KYC, screening de sanções e monitoramento contínuo integrados a cada fluxo operacional.',
          href: '#compliance',
        },
      ]
    : [
        {
          icon: 'network',
          title: 'Move money across borders',
          desc: 'Fast transactions with seamless on/off-ramps, live quotes, transparent fees, and T+0 settlement.',
          href: '#pagamentos',
        },
        {
          icon: 'wallet',
          title: 'Launch named virtual accounts',
          desc: 'Create dedicated USD and EUR accounts and multi-chain wallets to collect in fiat and stablecoins.',
          href: '#contas',
        },
        {
          icon: 'shield',
          title: 'Stay compliant at launch',
          desc: 'Automated KYC, KYB, sanctions screening and continuous risk monitoring built into every flow.',
          href: '#compliance',
        },
      ]
)

function onScroll() {
  const el = heroEl.value
  if (!el) return
  if (window.innerWidth < 768) {
    el.style.setProperty('--hero-p', '0')
    return
  }
  const p = Math.min(1, Math.max(0, window.scrollY / 560))
  el.style.setProperty('--hero-p', p.toFixed(3))
}

onMounted(() => {
  addEventListener('scroll', onScroll, { passive: true })
  addEventListener('resize', onScroll)
  onScroll()
})
onBeforeUnmount(() => {
  removeEventListener('scroll', onScroll)
  removeEventListener('resize', onScroll)
})
</script>

<template>
  <section ref="heroEl" class="hero">
    <!-- Subtle architectural grid plane moving at a slower parallax speed -->
    <div v-parallax="0.22" class="hero-grid" aria-hidden="true" />
    <div v-parallax="0.38" class="hero-horizon" aria-hidden="true" />

    <div class="container inner">
      <div class="hero-title-layer">
        <span class="hero-badge">
          <i class="hero-badge-dot" aria-hidden="true" />
          {{ t('hero.badge') }}
        </span>

        <h1 class="h1">
          <span class="l1">{{ t('hero.l1') }}</span>
          <span class="l2">{{ t('hero.l2') }} {{ t('hero.l3') }}</span>
        </h1>

        <p class="sub">{{ t('hero.sub') }}</p>

        <div class="ctas">
          <a href="#contato" class="btn btn-primary">{{ t('hero.cta1') }}</a>
          <a href="#como-funciona" class="btn btn-ghost">
            {{ t('hero.cta2') }}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </a>
        </div>
      </div>

      <!-- BlindPay-inspired Functional 3-Pillar Strip with Minimalist Solid Icon Boxes -->
      <div class="pillars-strip" role="list">
        <a
          v-for="(p, idx) in pillars"
          :key="p.title"
          :href="p.href"
          role="listitem"
          class="pillar-cell"
          :class="{ active: activePillar === idx }"
          @mouseenter="activePillar = idx"
          @focus="activePillar = idx"
        >
          <span class="pillar-ico" aria-hidden="true">
            <svg v-if="p.icon === 'network'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="5" r="2.5" /><circle cx="5" cy="19" r="2.5" /><circle cx="19" cy="19" r="2.5" />
              <path d="M10.5 7.2 6.5 16.8M13.5 7.2l4 9.6M7.5 19h9" />
            </svg>
            <svg v-else-if="p.icon === 'wallet'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="5" width="18" height="14" rx="3" />
              <path d="M3 10h18M15 14.5h3" />
            </svg>
            <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 3l7 3v5c0 4.5-3 8.3-7 9.5-4-1.2-7-5-7-9.5V6l7-3z" />
              <path d="m9.5 12 1.8 1.8 3.7-3.8" />
            </svg>
          </span>
          <strong>{{ p.title }}</strong>
          <p>{{ p.desc }}</p>
        </a>
      </div>

      <div v-parallax="-0.08" class="rails" :aria-label="t('hero.proofLabel')">
        <span class="rails-label">{{ lang === 'pt' ? 'Moedas, stablecoins e trilhos conectados' : 'Connected currencies, stablecoins and rails' }}</span>
        <ul class="rails-row">
          <li v-for="r in rails" :key="r">{{ r }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  z-index: 3;
  background: var(--bg);
  padding: clamp(64px, 9vw, 112px) 0 clamp(48px, 6vw, 84px);
  overflow: hidden;
  --hero-p: 0;
}
.hero-grid {
  position: absolute;
  inset: -120px 0 0 0;
  background-image:
    linear-gradient(90deg, rgba(255, 255, 255, 0.022) 1px, transparent 1px),
    linear-gradient(180deg, rgba(255, 255, 255, 0.022) 1px, transparent 1px);
  background-size: 72px 72px;
  mask-image: radial-gradient(ellipse 75% 65% at 50% 35%, #000 20%, transparent 75%);
  pointer-events: none;
}
.hero-horizon {
  position: absolute;
  left: 50%;
  top: 52%;
  width: min(1100px, 92vw);
  height: 1px;
  transform: translateX(-50%);
  background: linear-gradient(90deg, transparent, rgba(217, 142, 104, 0.22), transparent);
  pointer-events: none;
}
.inner {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.hero-title-layer {
  display: flex;
  flex-direction: column;
  align-items: center;
  transform:
    translateY(calc(var(--hero-p) * -42px))
    scale(calc(1 - var(--hero-p) * 0.045));
  opacity: calc(1 - var(--hero-p) * 0.65);
  will-change: transform, opacity;
}
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  margin-bottom: 22px;
  border-radius: 999px;
  background: var(--surface);
  border: 1px solid var(--line-2);
  font-size: 13px;
  color: var(--text-2);
  animation: heroIn 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
}
.hero-badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
}
.h1 {
  display: flex;
  flex-direction: column;
  font-size: clamp(38px, 5.4vw, 64px);
  line-height: 1.12;
  letter-spacing: -0.04em;
  font-weight: 500;
  margin: 0;
  animation: heroIn 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
}
.l1 { color: var(--text); }
.l2 { color: #9a9aa2; }
.sub {
  max-width: 560px;
  margin-top: 24px;
  font-size: clamp(15px, 1.5vw, 17px);
  line-height: 1.55;
  color: var(--text-2);
  animation: heroIn 0.9s 0.08s cubic-bezier(0.22, 1, 0.36, 1) both;
}
.ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-top: 34px;
  animation: heroIn 0.9s 0.16s cubic-bezier(0.22, 1, 0.36, 1) both;
}

/* BlindPay-inspired 3-Pillar Strip */
.pillars-strip {
  margin-top: clamp(52px, 6.5vw, 76px);
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border: 1px solid var(--line);
  border-radius: 14px;
  background: var(--surface);
  overflow: hidden;
  animation: heroIn 0.9s 0.2s cubic-bezier(0.22, 1, 0.36, 1) both;
}
.pillar-cell {
  position: relative;
  padding: 28px 24px 26px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 10px;
  border-right: 1px solid var(--line);
  transition: background 0.2s ease;
}
.pillar-cell:last-child {
  border-right: 0;
}
.pillar-cell::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 44px;
  height: 2px;
  background: transparent;
  transition: background 0.22s ease, width 0.22s ease;
}
.pillar-cell.active::before,
.pillar-cell:hover::before {
  background: var(--accent);
  width: 64px;
}
.pillar-cell:hover {
  background: rgba(255, 255, 255, 0.018);
}
.pillar-ico {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: var(--surface-2);
  border: 1px solid var(--line-2);
  display: grid;
  place-items: center;
  color: var(--text-2);
  margin-bottom: 4px;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}
.pillar-cell.active .pillar-ico,
.pillar-cell:hover .pillar-ico {
  background: var(--accent);
  color: var(--on-accent);
  border-color: var(--accent);
}
.pillar-cell strong {
  font-size: 15.5px;
  font-weight: 500;
  letter-spacing: -0.015em;
  color: var(--text);
}
.pillar-cell p {
  font-size: 13.5px;
  line-height: 1.5;
  color: var(--muted);
  max-width: 30ch;
}

.rails {
  margin-top: clamp(44px, 5.5vw, 64px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  transform: translateY(calc(var(--hero-p) * -18px));
  opacity: calc(1 - var(--hero-p) * 0.5);
  will-change: transform, opacity;
  animation: heroIn 0.9s 0.24s cubic-bezier(0.22, 1, 0.36, 1) both;
}
.rails-label {
  font-size: 13px;
  color: var(--dim);
}
.rails-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 14px clamp(28px, 4.5vw, 56px);
}
.rails-row li {
  font-size: clamp(17px, 1.8vw, 21px);
  font-weight: 600;
  letter-spacing: -0.02em;
  color: #5d5d64;
  transition: color 0.25s ease;
}
.rails-row li:hover { color: var(--text-2); }

@keyframes heroIn {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: none; }
}

@media (max-width: 860px) {
  .pillars-strip {
    grid-template-columns: 1fr;
  }
  .pillar-cell {
    border-right: 0;
    border-bottom: 1px solid var(--line);
  }
  .pillar-cell:last-child {
    border-bottom: 0;
  }
}
@media (max-width: 767px) {
  .hero { padding: 56px 0 48px; }
  .hero-title-layer, .rails { transform: none !important; opacity: 1 !important; }
  .ctas { flex-direction: column; width: 100%; }
  .ctas .btn { width: 100%; }
  .rails { margin-top: 44px; }
  .rails-row { gap: 10px 22px; }
}
</style>
