<script setup>
import { computed } from 'vue'
import { t } from '../i18n'
import AnimatedTitle from './AnimatedTitle.vue'
import ReactIsland from '../react/ReactIsland.vue'
import CountUp from '../react/bits/CountUp'

const ids = ['pagamentos', 'contas', 'compliance']
const features = computed(() => t('features').map((f, i) => ({ ...f, id: ids[i], wide: i === 0 })))
</script>

<template>
  <section class="triad container">
    <article
      v-for="(f, i) in features" :id="f.id" :key="f.id"
      class="cell reveal" :class="{ wide: f.wide }" :data-delay="i"
    >
      <div class="copy">
        <span class="eyebrow">{{ f.tag }}</span>
        <AnimatedTitle class="h2" :text="f.title" :center="false" />
        <p>{{ f.text }}</p>
        <ul class="bul"><li v-for="b in f.bullets" :key="b">{{ b }}</li></ul>
      </div>

      <!-- Pagamentos -->
      <div v-if="f.id === 'pagamentos'" v-parallax="0.05" class="vis">
        <div class="hd"><span class="muted">{{ t('vis.crossBorder') }}</span><span class="ok">{{ t('vis.instant') }}</span></div>
        <div class="box"><small>{{ t('vis.send') }}</small><p class="mono"><ReactIsland as="span" :component="CountUp" :props="{ to: 500000, prefix: 'R$ ', separator: '.', suffix: ',00', duration: 2.2 }" /> <em>BRL</em></p></div>
        <div class="flow" aria-hidden="true"><i /></div>
        <div class="box"><small>{{ t('vis.receive') }}</small><p class="soft mono"><ReactIsland as="span" :component="CountUp" :props="{ to: 89870, prefix: '$ ', separator: '.', suffix: ',00', duration: 2.2 }" /> <em>USDC</em></p></div>
      </div>

      <!-- Contas -->
      <div v-else-if="f.id === 'contas'" class="vis">
        <div class="hd"><b>{{ t('vis.multi') }}</b><span class="chip">{{ t('vis.custody') }}</span></div>
        <div class="two">
          <div class="box"><small>{{ t('vis.subUsd') }}</small><p class="sm mono"><ReactIsland as="span" :component="CountUp" :props="{ to: 1420500, prefix: '$ ', separator: ',', duration: 2.2 }" /></p></div>
          <div class="box"><small>{{ t('vis.subEur') }}</small><p class="sm mono"><ReactIsland as="span" :component="CountUp" :props="{ to: 860240, prefix: '€ ', separator: ',', duration: 2.2 }" /></p></div>
        </div>
        <div class="unified">
          <span>{{ t('vis.unified') }}<br /><small class="muted">{{ t('vis.stable') }}</small></span>
          <b class="mono"><ReactIsland as="span" :component="CountUp" :props="{ to: 2280740, separator: ',', duration: 2.2 }" /> USDC</b>
        </div>
      </div>

      <!-- Compliance -->
      <div v-else class="vis">
        <div class="hd"><span class="muted">{{ t('vis.screening') }}</span><span class="ok">{{ t('vis.regulated') }}</span></div>
        <div class="box">
          <div class="r2"><b>Acme Corp Global Ltd.</b><span class="ok">{{ t('vis.kyb') }}</span></div>
          <div class="r3"><span>{{ t('vis.sanctions') }} <i>{{ t('vis.alerts') }}</i></span><span>{{ t('vis.risk') }} <i>{{ t('vis.low') }}</i></span></div>
        </div>
      </div>
    </article>
  </section>
</template>

<style scoped>
.triad { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; padding: clamp(40px, 5vw, 64px) 0 clamp(24px, 4vw, 40px); }
.cell {
  display: flex; flex-direction: column; justify-content: space-between; gap: 28px;
  padding: clamp(24px, 3.5vw, 40px);
  background: linear-gradient(160deg, rgba(30, 31, 40, 0.7), rgba(18, 19, 24, 0.7));
  border: 1px solid var(--line); border-radius: 24px;
  transition: border-color 0.3s ease;
}
.cell:hover { border-color: rgba(217, 142, 104, 0.25); }
.cell.wide { grid-column: 1 / -1; flex-direction: row; align-items: center; gap: clamp(28px, 5vw, 64px); }
.cell.wide > * { flex: 1; min-width: 0; }
.copy { display: flex; flex-direction: column; gap: 14px; align-items: flex-start; }
.h2 { font-size: clamp(26px, 3vw, 34px); line-height: 1.1; letter-spacing: -0.03em; font-weight: 600; }
p { font-size: 15px; line-height: 1.6; font-weight: 400; color: var(--muted); }
.bul { display: flex; flex-wrap: wrap; gap: 8px 18px; padding-top: 4px; font-size: 13px; color: var(--text-2); }
.bul li::before { content: '— '; color: var(--accent); }
.vis { display: flex; flex-direction: column; gap: 14px; padding: 24px; background: rgba(0, 0, 0, 0.3); border: 1px solid var(--line); border-radius: 16px; }
.hd { display: flex; justify-content: space-between; align-items: center; gap: 12px; padding-bottom: 12px; border-bottom: 1px solid var(--line); font-size: 12.5px; }
.hd b { font-size: 13px; font-weight: 600; }
.muted { color: var(--muted); } .ok { color: var(--ok); font-weight: 500; }
.chip { padding: 3px 9px; border-radius: 6px; background: rgba(217, 142, 104, 0.12); color: var(--accent-soft); font-size: 11.5px; }
.box { padding: 16px; display: flex; flex-direction: column; gap: 6px; background: rgba(255, 255, 255, 0.025); border: 1px solid var(--line); border-radius: 12px; }
.box small { font-size: 12px; color: var(--muted); }
.box p { color: #fff; font-size: 22px; font-weight: 600; line-height: 30px; }
.box p.soft { color: var(--accent-soft); }
.box p.sm { font-size: 19px; line-height: 26px; }
.box em { font-family: var(--sans); font-style: normal; font-weight: 400; font-size: 12px; color: var(--muted); }
.flow { height: 20px; margin: -4px 0; display: grid; place-items: center; }
.flow i { width: 1px; height: 100%; background: linear-gradient(var(--accent), transparent); animation: drip 1.8s ease-in-out infinite; }
@keyframes drip { 0% { opacity: 0.2; transform: scaleY(0.2); transform-origin: top; } 60% { opacity: 1; transform: scaleY(1); } 100% { opacity: 0; } }
.two { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.unified { display: flex; justify-content: space-between; align-items: center; gap: 12px; padding: 16px; background: rgba(217, 142, 104, 0.05); border: 1px solid rgba(217, 142, 104, 0.18); border-radius: 12px; font-size: 13px; color: var(--text-2); }
.unified b { color: var(--accent-soft); font-size: 14px; font-weight: 500; text-align: right; }
.r2 { display: flex; justify-content: space-between; gap: 8px; font-size: 14px; }
.r2 b { font-weight: 600; }
.r2 span { font-size: 12.5px; }
.r3 { display: flex; justify-content: space-between; gap: 16px; flex-wrap: wrap; padding-top: 8px; margin-top: 8px; border-top: 1px solid var(--line); font-size: 12px; color: var(--muted); }
.r3 i { font-style: normal; color: var(--text-2); }

@media (max-width: 860px) {
  .triad { grid-template-columns: 1fr; }
  .cell.wide { flex-direction: column; align-items: stretch; }
}
</style>
