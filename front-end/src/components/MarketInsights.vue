<script setup>
import { t } from '../i18n'
</script>

<template>
  <section id="mercado" class="market container">
    <header class="head reveal">
      <div class="title-block">
        <span class="eyebrow">{{ t('market.eyebrow') }}</span>
        <h2 class="section-title">{{ t('market.title') }}</h2>
      </div>
      <a href="#contato" class="more">{{ t('market.more') }}</a>
    </header>
    <div class="list">
      <article v-for="(a, i) in t('market.articles')" :key="i" class="art reveal">
        <div class="thumb" :class="'t' + i" aria-hidden="true"><span>{{ a.tag }}</span></div>
        <h3>{{ a.t }}</h3>
        <p>{{ a.d }}</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.market { padding: clamp(64px, 9vw, 120px) 0; display: flex; flex-direction: column; gap: clamp(32px, 4vw, 48px); }
.head { display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 16px; }
.title-block { display: flex; flex-direction: column; gap: 16px; }
.more { font-size: 15px; color: var(--text-2); transition: color 0.2s; }
.more:hover { color: #fff; }
.list { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.art { display: flex; flex-direction: column; gap: 10px; }
.thumb {
  aspect-ratio: 16 / 10; border-radius: 12px; margin-bottom: 10px; position: relative; overflow: hidden;
  border: 1px solid var(--line);
  background: linear-gradient(160deg, #1a1b1f, #0c0c0e);
}
.thumb::after {
  content: ''; position: absolute; inset: 0;
  background: repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.035) 0 1px, transparent 1px 48px);
}
.t0 { background: url(/img/panel-sea.jpg) center / cover, #16181c; }
.t1 { background: url(/img/panel-copper.jpg) center / cover, #1b1714; }
.t2 { background: url(/img/panel-forest.jpg) center / cover, #141612; }
.thumb { filter: grayscale(0.35) brightness(0.8); transition: filter 0.4s ease; }
.art:hover .thumb { filter: none; }
.thumb span {
  position: absolute; left: 14px; bottom: 14px; z-index: 1; padding: 5px 10px; border-radius: 6px;
  background: rgba(5, 5, 6, 0.7); backdrop-filter: blur(8px); font-size: 12px; color: var(--text-2);
}
.art h3 { font-size: 19px; line-height: 1.3; font-weight: 500; letter-spacing: -0.02em; }
.art p { font-size: 14px; line-height: 1.55; color: var(--muted); }
@media (max-width: 860px) { .list { grid-template-columns: 1fr; } }
</style>
