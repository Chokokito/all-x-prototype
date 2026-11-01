<script setup>
import { computed } from 'vue'
import { lang, t } from '../i18n'
import ReactIsland from '../react/ReactIsland.vue'
import CobeGlobe from '../react/CobeGlobe.jsx'
import AnimatedComplianceList from '../react/AnimatedComplianceList.jsx'

const ids = ['pagamentos', 'contas', 'compliance']
const icons = [
  // globe
  'M12 2a10 10 0 1 0 0 20a10 10 0 1 0 0-20zM2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20',
  // bank
  'M3 10h18M5 10v8M9 10v8M15 10v8M19 10v8M3 20h18M12 3l9 5H3z',
  // shield
  'M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6zM8.5 12l2.5 2.5 4.5-5',
]
const features = computed(() => t('features').map((f, i) => ({ ...f, id: ids[i], icon: icons[i], flip: i % 2 === 1 })))
const head = computed(() => lang.value === 'pt'
  ? { title: 'Uma plataforma completa para operar dinheiro entre países', text: 'Orquestramos compliance, liquidez, stablecoins e trilhos locais por baixo — para que a sua operação não precise.' }
  : { title: 'A complete platform to move money across borders', text: 'We orchestrate compliance, liquidity, stablecoins and local rails underneath — so your operation doesn’t have to.' })
const ui = computed(() => lang.value === 'pt'
  ? {
      corridors: 'Corredores ativos 24/7',
      select: 'Saldos multimoeda',
      accTitle: 'Contas corporativas nominais & Wallets',
      usd: 'Conta comercial USD',
      usdSub: 'Routing ACH & Fedwire ·· 4820',
      eur: 'Conta corporativa EUR',
      eurSub: 'SEPA Instant IBAN ·· 9104',
      usdc: 'Carteira Tesouraria USDC',
      usdcSub: 'Solana · Polygon · Ethereum',
    }
  : {
      corridors: '24/7 active corridors',
      select: 'Multi-currency balances',
      accTitle: 'Named corporate accounts & Wallets',
      usd: 'USD commercial account',
      usdSub: 'ACH & Fedwire routing ·· 4820',
      eur: 'EUR corporate account',
      eurSub: 'SEPA Instant IBAN ·· 9104',
      usdc: 'USDC Treasury Wallet',
      usdcSub: 'Solana · Polygon · Ethereum',
    })
</script>

<template>
  <section class="features container">
    <header class="section-head reveal">
      <h2 class="section-title">{{ head.title }}</h2>
      <p>{{ head.text }}</p>
    </header>

    <article v-for="f in features" :id="f.id" :key="f.id" class="panel reveal" :class="{ flip: f.flip }">
      <div class="copy">
        <span class="eyebrow">
          <svg class="ico" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path :d="f.icon" /></svg>
          {{ f.tag }}
        </span>
        <h3>{{ f.title }}</h3>
        <p>{{ f.text }}</p>
        <ul class="checks"><li v-for="b in f.bullets" :key="b">{{ b }}</li></ul>
      </div>

      <div class="visual">
        <div class="visual-bg" aria-hidden="true" />

        <!-- Pagamentos: Cobe Interactive WebGL Globe -->
        <div v-if="f.id === 'pagamentos'" class="globe-wrap">
          <ReactIsland :component="CobeGlobe" class="globe-island" />
          <div class="globe-pill">
            <span class="pulse-dot" aria-hidden="true" />
            <span>{{ ui.corridors }}</span>
            <span class="sep">·</span>
            <code>Pix · ACH · SEPA · USDC</code>
          </div>
        </div>

        <!-- Contas: Solid minimalist multi-currency account selector -->
        <div v-else-if="f.id === 'contas'" v-parallax="0.06" class="acc">
          <span class="select">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></svg>
            {{ ui.select }}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="m6 9 6 6 6-6" /></svg>
          </span>
          <div class="acc-box">
            <small>{{ ui.accTitle }}</small>
            <div class="acc-row">
              <span class="ccy-badge">USD</span>
              <div class="acc-meta"><b>{{ ui.usd }}</b><small>{{ ui.usdSub }}</small></div>
              <span class="acc-status">Ativa</span>
            </div>
            <div class="acc-row">
              <span class="ccy-badge">EUR</span>
              <div class="acc-meta"><b>{{ ui.eur }}</b><small>{{ ui.eurSub }}</small></div>
              <span class="acc-status">Ativa</span>
            </div>
            <div class="acc-row">
              <span class="ccy-badge copper">USDC</span>
              <div class="acc-meta"><b>{{ ui.usdc }}</b><small>{{ ui.usdcSub }}</small></div>
              <span class="acc-status">T+0</span>
            </div>
          </div>
        </div>

        <!-- Compliance: Magic UI AnimatedList -->
        <div v-else class="compliance-wrap">
          <ReactIsland :component="AnimatedComplianceList" :props="{ lang }" class="list-island" />
          <ul class="rails">
            <li class="on">Pix</li><li class="on">SEPA</li><li class="on">ACH</li><li class="on">USDC</li><li>SWIFT</li>
          </ul>
        </div>
      </div>
    </article>
  </section>
</template>

<style scoped>
.features { display: flex; flex-direction: column; gap: 16px; padding: clamp(56px, 8vw, 104px) 0 clamp(24px, 4vw, 48px); }
.section-head { margin-bottom: clamp(32px, 4vw, 48px); }
.panel {
  display: grid; grid-template-columns: 1fr 1fr; gap: 8px; padding: 8px;
  background: var(--surface); border: 1px solid var(--line); border-radius: 20px;
}
.panel.flip .copy { order: 2; }
.copy { padding: clamp(28px, 4vw, 48px); display: flex; flex-direction: column; align-items: flex-start; gap: 18px; }
.copy h3 { margin-top: 18px; font-size: clamp(24px, 2.4vw, 30px); line-height: 1.22; letter-spacing: -0.03em; font-weight: 500; max-width: 16ch; }
.copy p { max-width: 400px; font-size: 15px; line-height: 1.55; color: var(--text-2); }
.copy .checks { margin-top: 20px; }
.visual {
  position: relative; min-height: 430px; border-radius: 14px; overflow: hidden;
  display: grid; place-items: center; padding: 28px;
  isolation: isolate;
  border: 1px solid var(--line);
  background: #09090b;
}
.visual-bg {
  position: absolute; inset: 0; z-index: -1;
  background:
    radial-gradient(65% 65% at 50% 45%, rgba(217, 142, 104, 0.08), transparent 70%),
    radial-gradient(rgba(255, 255, 255, 0.045) 1px, transparent 1px) 0 0 / 20px 20px,
    #09090b;
}

/* Panel 1: Cobe Globe */
.globe-wrap {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.globe-island {
  width: 100%;
  display: flex;
  justify-content: center;
}
.globe-pill {
  margin-top: -12px;
  position: relative;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 7px 14px;
  border-radius: 999px;
  background: #111114;
  border: 1px solid var(--line-2);
  font-size: 12px;
  color: var(--text-2);
  box-shadow: 0 12px 24px -10px rgba(0, 0, 0, 0.7);
}
.pulse-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 0 3px rgba(217, 142, 104, 0.18);
}
.globe-pill .sep { color: var(--muted); }
.globe-pill code { font-family: var(--mono); font-size: 11px; color: var(--text); }

/* Panel 2: Accounts */
.acc { width: min(390px, 100%); display: flex; flex-direction: column; align-items: flex-start; gap: 12px; }
.select {
  display: inline-flex; align-items: center; gap: 8px; padding: 9px 14px;
  border-radius: 999px; background: #111114; border: 1px solid var(--line-2);
  color: var(--text); font-size: 13px; font-weight: 500;
}
.select svg:first-child { color: var(--accent-soft); }
.acc-box {
  width: 100%; padding: 14px; border-radius: 14px;
  background: #111114; border: 1px solid var(--line-2);
  display: flex; flex-direction: column; gap: 8px;
  box-shadow: 0 18px 36px -18px rgba(0, 0, 0, 0.7);
}
.acc-box > small { font-size: 12px; color: var(--muted); padding: 0 2px 4px; font-family: var(--mono); text-transform: uppercase; letter-spacing: 0.04em; }
.acc-row {
  display: flex; align-items: center; gap: 12px; padding: 11px 12px;
  border-radius: 10px; background: #16161a; border: 1px solid var(--line);
  color: var(--text);
}
.ccy-badge {
  width: 38px; height: 36px; border-radius: 8px;
  background: #1f1f24; border: 1px solid var(--line-2);
  display: grid; place-items: center;
  font-family: var(--mono); font-size: 11px; font-weight: 600; color: var(--text);
  flex-shrink: 0;
}
.ccy-badge.copper { color: var(--accent-soft); border-color: rgba(217, 142, 104, 0.3); background: rgba(217, 142, 104, 0.1); }
.acc-meta { flex: 1; min-width: 0; }
.acc-row b { display: block; font-size: 13.5px; font-weight: 500; color: var(--text); }
.acc-row small { display: block; font-size: 11.5px; color: var(--muted); margin-top: 2px; }
.acc-status {
  padding: 3px 8px; border-radius: 999px;
  font-family: var(--mono); font-size: 10.5px;
  background: rgba(255, 255, 255, 0.04); border: 1px solid var(--line-2); color: var(--text-2);
}

/* Panel 3: Magic UI AnimatedList */
.compliance-wrap {
  width: min(430px, 100%);
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.list-island { width: 100%; }
.rails { display: flex; flex-wrap: wrap; gap: 8px; }
.rails li {
  padding: 5px 12px 5px 26px; position: relative; border-radius: 999px;
  font-size: 12px; font-family: var(--mono);
  background: #111114; border: 1px solid var(--line); color: var(--muted);
}
.rails li::before {
  content: ''; position: absolute; left: 9px; top: 50%;
  width: 9px; height: 9px; margin-top: -4.5px; border-radius: 50%;
  border: 1px solid var(--line-2);
}
.rails li.on { border-color: var(--line-2); color: var(--text); }
.rails li.on::before { background: var(--accent); border-color: var(--accent); }

@media (max-width: 860px) {
  .panel { grid-template-columns: 1fr; }
  .panel.flip .copy { order: 0; }
  .visual { min-height: 340px; padding: 20px; }
}
</style>
