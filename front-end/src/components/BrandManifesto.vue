<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { t } from '../i18n'

const root = ref(null)
const progress = ref(0)

const titleWords = computed(() => t('manifesto.title').split(/\s+/))
const bodyWords = computed(() => t('manifesto.text').split(/\s+/))
const totalWords = computed(() => titleWords.value.length + bodyWords.value.length)

function onScroll() {
  const el = root.value
  if (!el) return
  const r = el.getBoundingClientRect()
  const vh = window.innerHeight
  const p = (vh * 0.85 - r.top) / (r.height + vh * 0.25)
  progress.value = Math.min(1, Math.max(0, p))
}
onMounted(() => { addEventListener('scroll', onScroll, { passive: true }); onScroll() })
onBeforeUnmount(() => removeEventListener('scroll', onScroll))
</script>

<template>
  <section class="manifesto">
    <div class="container">
      <span class="eyebrow">{{ t('manifesto.eyebrow') }}</span>
      <div ref="root" class="statement-group">
        <p class="statement">
          <span
            v-for="(w, i) in titleWords" :key="'t-' + i"
            class="w" :class="{ lit: i / totalWords < progress }"
          >{{ w + ' ' }}</span>
        </p>
        <p class="statement sub-statement">
          <span
            v-for="(w, i) in bodyWords" :key="'b-' + i"
            class="w" :class="{ lit: (titleWords.length + i) / totalWords < progress }"
          >{{ w + ' ' }}</span>
        </p>
      </div>

      <dl class="stats">
        <div class="stat"><dt>{{ t('stats')[0] }}</dt><dd>USD · EUR · BRL</dd></div>
        <div class="stat"><dt>{{ t('stats')[1] }}</dt><dd>USDC · USDT</dd></div>
        <div class="stat"><dt>{{ t('stats')[2] }}</dt><dd>Pix · ACH · SEPA</dd></div>
        <div class="stat"><dt>{{ t('stats')[3] }}</dt><dd>SWIFT · Wire</dd></div>
      </dl>
    </div>
  </section>
</template>

<style scoped>
.manifesto { padding: clamp(64px, 9vw, 120px) 0 clamp(40px, 6vw, 72px); }
.manifesto .container { display: flex; flex-direction: column; gap: 28px; }
.statement-group {
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 780px;
}
.statement {
  margin: 0;
  font-size: clamp(24px, 3vw, 34px);
  line-height: 1.32;
  letter-spacing: -0.025em;
  font-weight: 500;
}
.sub-statement {
  font-size: clamp(20px, 2.4vw, 28px);
  line-height: 1.38;
}
.w { color: #3a3a40; transition: color 0.35s ease; }
.w.lit { color: var(--text); }
.stats {
  display: grid; grid-template-columns: repeat(4, 1fr); margin: 32px 0 0;
  border-top: 1px solid var(--line);
}
.stat { padding: 24px 24px 0 0; display: flex; flex-direction: column-reverse; gap: 6px; }
.stat + .stat { padding-left: 24px; border-left: 1px solid var(--line); }
dt { font-size: 13.5px; color: var(--muted); }
dd { margin: 0; font-weight: 500; font-size: clamp(18px, 1.9vw, 21px); letter-spacing: -0.02em; color: var(--text); }
@media (max-width: 720px) {
  .stats { grid-template-columns: 1fr 1fr; }
  .stat { padding: 20px 12px 20px 0 !important; border-left: 0 !important; border-bottom: 1px solid var(--line); }
  .stat:nth-child(even) { padding-left: 16px !important; border-left: 1px solid var(--line) !important; }
}
@media (prefers-reduced-motion: reduce) { .w { color: var(--text); } }
</style>
