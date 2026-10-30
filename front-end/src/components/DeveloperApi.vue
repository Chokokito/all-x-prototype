<script setup>
import ReactIsland from '../react/ReactIsland.vue'
import ApiTerminal from '../react/ApiTerminal.jsx'
import { t } from '../i18n'
import AnimatedTitle from './AnimatedTitle.vue'
</script>

<template>
  <section id="api" class="api container reveal">
    <div class="copy">
      <span class="eyebrow">{{ t('api.eyebrow') }}</span>
      <AnimatedTitle class="h2" :text="t('api.title')" :center="false" />
      <p>{{ t('api.text') }}</p>
      <ul><li v-for="b in t('api.bullets')" :key="b">{{ b }}</li></ul>
    </div>
    <ReactIsland :component="ApiTerminal" :props="{ copyLabel: t('api.copy'), copiedLabel: t('api.copied') }" />
  </section>
</template>

<style scoped>
.api { display: grid; grid-template-columns: 5fr 7fr; align-items: center; gap: clamp(32px, 6vw, 64px); padding: clamp(24px, 4vw, 48px) 0 0; }
.api > * { min-width: 0; }
.copy { display: flex; flex-direction: column; gap: 18px; }
.h2 { font-size: clamp(32px, 4.5vw, 44px); line-height: 1.06; letter-spacing: -0.03em; font-weight: 600; }
p { font-size: 15px; line-height: 1.6; font-weight: 400; color: var(--muted); }
ul { display: flex; flex-direction: column; gap: 8px; padding-top: 4px; font-size: 13.5px; color: var(--text-2); }
ul li::before { content: '— '; color: var(--accent); }
@media (max-width: 800px) { .api { grid-template-columns: 1fr; } }
</style>
