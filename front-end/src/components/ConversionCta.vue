<script setup>
import { t, navigateTo } from '../i18n'

const badges = [
  { top: 'PIX · BACEN', sub: 'Liquidação local BRL' },
  { top: 'ACH · FEDWIRE', sub: 'Clearing doméstico USD' },
  { top: 'SEPA · SWIFT', sub: 'Corredores EUR & Global' },
  { top: 'KYB · AML · KYT', sub: 'Screening contínuo' },
  { top: 'USDC · USDT', sub: 'Liquidez multichain' },
  { top: 'REST API · WEBHOOKS', sub: 'Integração white-label' },
]
</script>

<template>
  <section id="contato" class="cta-band">
    <div class="container cta-grid">
      <div class="pitch">
        <h2>{{ t('cta.title') }}</h2>
        <p>{{ t('cta.text') }}</p>
        <div class="actions">
          <a href="mailto:contato@allx.global" class="btn btn-primary">{{ t('cta.b1') }}</a>
          <a href="#cms" class="btn btn-ghost" @click.prevent="navigateTo('cms')">{{ t('cta.b2') }}</a>
        </div>
      </div>

      <div class="rail-badges" :aria-label="t('cta.corridorsLabel')">
        <div v-for="b in badges" :key="b.top" class="badge-cell">
          <strong class="mono">{{ b.top }}</strong>
          <span>{{ b.sub }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta-band {
  padding: clamp(64px, 8vw, 104px) 0;
  border-top: 1px solid var(--line);
  background: var(--bg);
}
.cta-grid {
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  gap: clamp(36px, 6vw, 80px);
  align-items: center;
}
.pitch {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
}
.pitch h2 {
  margin: 0;
  font-size: clamp(28px, 3.4vw, 40px);
  line-height: 1.15;
  letter-spacing: -0.035em;
  font-weight: 500;
  color: var(--text);
  max-width: 18ch;
}
.pitch p {
  margin: 0;
  font-size: 16px;
  line-height: 1.55;
  color: var(--text-2);
  max-width: 440px;
}
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}
.rail-badges {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-top: 1px solid var(--line);
  border-left: 1px solid var(--line);
}
.badge-cell {
  padding: 22px 18px;
  border-right: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.badge-cell strong {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: var(--text);
}
.badge-cell span {
  font-size: 12.5px;
  color: var(--muted);
}

@media (max-width: 900px) {
  .cta-grid { grid-template-columns: 1fr; }
}
@media (max-width: 560px) {
  .rail-badges { grid-template-columns: 1fr 1fr; }
  .actions { width: 100%; flex-direction: column; }
  .actions .btn { width: 100%; }
}
</style>
