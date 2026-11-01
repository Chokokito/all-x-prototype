<script setup>
import ReactIsland from '../react/ReactIsland.vue'
import ApiTerminal from '../react/ApiTerminal.jsx'
import { t, navigateTo } from '../i18n'
</script>

<template>
  <section id="api" class="api container reveal">
    <div class="copy">
      <span class="eyebrow">{{ t('api.eyebrow') }}</span>
      <h2 class="section-title">{{ t('api.title') }}</h2>
      <p>{{ t('api.text') }}</p>
      <ul class="checks"><li v-for="b in t('api.bullets')" :key="b">{{ b }}</li></ul>
      <a href="#cms" class="btn btn-ghost docs-btn" @click.prevent="navigateTo('cms')">{{ t('cta.b2') }}</a>
    </div>
    <ReactIsland :component="ApiTerminal" :props="{ copyLabel: t('api.copy'), copiedLabel: t('api.copied') }" />
  </section>
</template>

<style scoped>
.api { display: grid; grid-template-columns: 5fr 7fr; align-items: center; gap: clamp(32px, 6vw, 72px); padding: clamp(64px, 9vw, 112px) 0 0; }
.api > * { min-width: 0; }
.copy { display: flex; flex-direction: column; align-items: flex-start; gap: 18px; }
p { font-size: 16px; line-height: 1.55; color: var(--text-2); max-width: 420px; }
.checks { margin-top: 6px; }
.docs-btn { margin-top: 10px; padding: 10px 18px; font-size: 14px; }
@media (max-width: 800px) { .api { grid-template-columns: 1fr; } }
</style>
