<script setup>
import { t } from '../i18n'
import AnimatedTitle from './AnimatedTitle.vue'
import ReactIsland from '../react/ReactIsland.vue'
import { ArticleCard } from '../react/cards.jsx'
</script>

<template>
  <section id="mercado" class="market container">
    <header class="head reveal">
      <div>
        <span class="eyebrow">{{ t('market.eyebrow') }}</span>
        <AnimatedTitle class="h2" :text="t('market.title')" :center="false" />
      </div>
      <a href="#mercado" class="eyebrow more">{{ t('market.more') }}</a>
    </header>
    <div class="list">
      <ReactIsland
        v-for="(a, i) in t('market.articles')"
        :key="i"
        :component="ArticleCard"
        :props="{ tag: a.tag, title: a.t, text: a.d }"
        class="reveal island-fill"
        :data-delay="i"
      />
    </div>
  </section>
</template>

<style scoped>
.market { padding: clamp(56px, 8vw, 96px) 0; display: flex; flex-direction: column; gap: 32px; }
.head { display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 16px; }
.head > div { display: flex; flex-direction: column; gap: 6px; }
.h2 { font-size: clamp(26px, 3.5vw, 30px); line-height: 36px; font-weight: 700; }
.more { transition: opacity 0.2s; } .more:hover { opacity: 0.7; }
.list { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; }
.art { padding: 24px; border-radius: 12px; display: flex; flex-direction: column; gap: 7px; transition: transform 0.25s ease; }
.art:hover { transform: translateY(-4px); }
small { font-size: 11px; line-height: 16.5px; color: var(--accent); }
h3 { font-size: 14px; line-height: 19.25px; font-weight: 700; }
p { font-size: 12px; line-height: 19.5px; font-weight: 300; color: var(--muted); }
</style>
