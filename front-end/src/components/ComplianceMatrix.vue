<script setup>
import { t } from '../i18n'
import AnimatedTitle from './AnimatedTitle.vue'
</script>

<template>
  <section class="comp container">
    <header class="head reveal">
      <span class="eyebrow">{{ t('compliance.eyebrow') }}</span>
      <AnimatedTitle class="h2" :text="t('compliance.title')" />
      <p>{{ t('compliance.text') }}</p>
    </header>

    <div class="grid">
      <article v-for="(item, i) in t('compliance.items')" :key="item.t" class="cell reveal" :data-delay="i % 3">
        <h3>{{ item.t }}</h3>
        <p>{{ item.d }}</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.comp {
  padding: clamp(44px, 6vw, 76px) 0 clamp(20px, 3vw, 36px);
  display: flex; flex-direction: column; gap: 36px;
}
.head {
  max-width: 680px; margin: 0 auto;
  display: flex; flex-direction: column; align-items: center; gap: 10px; text-align: center;
}
.h2 { font-size: clamp(28px, 4vw, 38px); line-height: 1.1; font-weight: 600; letter-spacing: -0.03em; }
.head p { font-size: 15px; line-height: 1.55; font-weight: 400; color: var(--muted); }
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}
.cell {
  padding: 22px;
  border-radius: 14px;
  background: rgba(18, 19, 26, 0.72);
  border: 1px solid var(--line);
  display: flex; flex-direction: column; gap: 8px;
  transition: border-color 0.25s ease;
}
.cell:hover {
  border-color: rgba(217, 142, 104, 0.28);
}
.cell h3 {
  font-size: 15px;
  font-weight: 600;
  color: var(--text);
  letter-spacing: -0.01em;
}
.cell p {
  font-size: 13px; line-height: 1.55; font-weight: 400; color: var(--muted);
}
@media (max-width: 960px) { .grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 520px) { .grid { grid-template-columns: 1fr; } }
</style>
