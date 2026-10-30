<script setup>
import { t } from '../i18n'
import AnimatedTitle from './AnimatedTitle.vue'
import ReactIsland from '../react/ReactIsland.vue'
import { ModuleCard } from '../react/cards.jsx'
</script>

<template>
  <section class="stack container">
    <header class="head reveal">
      <span class="eyebrow">{{ t('stack.eyebrow') }}</span>
      <AnimatedTitle class="h2" :text="t('stack.title')" />
      <p>{{ t('stack.text') }}</p>
    </header>
    <div class="cards">
      <ReactIsland
        v-for="(c, i) in t('stack.cards')"
        :key="i"
        :component="ModuleCard"
        :props="{ n: '0' + (i + 1), title: c.t, text: c.d }"
        class="reveal island-fill"
        :data-delay="i % 3"
      />
    </div>
  </section>
</template>

<style scoped>
.stack { padding: clamp(44px, 6vw, 76px) 0 clamp(24px, 4vw, 48px); display: flex; flex-direction: column; align-items: center; gap: 36px; }
.head { display: flex; flex-direction: column; align-items: center; gap: 10px; text-align: center; max-width: 672px; }
.h2 { font-size: clamp(28px, 4vw, 38px); line-height: 1.1; font-weight: 700; letter-spacing: -0.025em; }
.head p { font-size: 14.5px; line-height: 21px; font-weight: 300; color: var(--muted); }
.cards { width: 100%; display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
@media (max-width: 900px) { .cards { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 560px) { .cards { grid-template-columns: 1fr; } }
</style>
