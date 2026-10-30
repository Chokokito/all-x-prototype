<script setup>
import { t } from '../i18n'
import AnimatedTitle from './AnimatedTitle.vue'
</script>

<template>
  <section class="manifesto">
    <div class="container head reveal">
      <span class="eyebrow">{{ t('manifesto.eyebrow') }}</span>
      <AnimatedTitle class="h2" :text="t('manifesto.title')" />
      <p>{{ t('manifesto.text') }}</p>
    </div>

    <dl class="stats container reveal" data-delay="1">
      <div class="stat">
        <dt>{{ t('stats')[0] }}</dt>
        <dd>USD · EUR · BRL</dd>
      </div>
      <div class="stat">
        <dt>{{ t('stats')[1] }}</dt>
        <dd>USDC · USDT</dd>
      </div>
      <div class="stat">
        <dt>{{ t('stats')[2] }}</dt>
        <dd>Pix · ACH · SEPA</dd>
      </div>
      <div class="stat">
        <dt>{{ t('stats')[3] }}</dt>
        <dd>SWIFT · Wire</dd>
      </div>
    </dl>
  </section>
</template>

<style scoped>
.manifesto { padding-top: clamp(48px, 6vw, 72px); display: flex; flex-direction: column; gap: 40px; }
.head { width: min(832px, 100% - 48px); display: flex; flex-direction: column; align-items: center; gap: 16px; text-align: center; }
.h2 { font-size: clamp(30px, 4.6vw, 46px); line-height: 1.08; letter-spacing: -0.03em; font-weight: 600; }
.head p { max-width: 660px; font-size: clamp(16px, 1.8vw, 17.5px); line-height: 1.6; font-weight: 400; color: var(--muted); }
.stats {
  display: grid; grid-template-columns: repeat(4, 1fr); margin-block: 0;
  border-block: 1px solid var(--line);
}
.stat { padding: 26px 16px; text-align: center; display: flex; flex-direction: column-reverse; gap: 6px; }
.stat + .stat { border-left: 1px solid var(--line); }
dt { font-size: 13px; color: var(--muted); font-weight: 400; }
dd { margin: 0; font-weight: 600; font-size: clamp(19px, 2.2vw, 23px); letter-spacing: -0.02em; color: var(--text); }
@media (max-width: 720px) {
  .stats { grid-template-columns: 1fr 1fr; }
  .stat:nth-child(3) { border-left: 0; }
  .stat:nth-child(n + 3) { border-top: 1px solid var(--line); }
}
</style>
