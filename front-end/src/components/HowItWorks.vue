<script setup>
import { t } from '../i18n'
import AnimatedTitle from './AnimatedTitle.vue'
import ReactIsland from '../react/ReactIsland.vue'
import { StepTiltCard } from '../react/cards.jsx'
</script>

<template>
  <section id="como-funciona" class="how container">
    <header class="head reveal">
      <span class="eyebrow">{{ t('how.eyebrow') }}</span>
      <AnimatedTitle class="h2" :text="t('how.title')" />
      <p>{{ t('how.text') }}</p>
    </header>

    <div class="steps">
      <div v-for="(s, i) in t('how.steps')" :key="s.n" class="step-wrap reveal" :data-delay="i % 3">
        <ReactIsland
          :component="StepTiltCard"
          :props="{ n: s.n, sub: s.sub, title: s.t, text: s.d }"
        />
      </div>
    </div>

    <div class="meta reveal">
      <div class="behind glass">
        <span class="eyebrow">{{ t('how.behindTitle') }}</span>
        <p>{{ t('how.behindText') }}</p>
      </div>

      <div class="cases glass">
        <span class="eyebrow">{{ t('how.useCasesTitle') }}</span>
        <ul>
          <li v-for="u in t('how.useCases')" :key="u">
            {{ u }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.how {
  padding: clamp(48px, 7vw, 84px) 0 clamp(24px, 4vw, 48px);
  display: flex; flex-direction: column; gap: 40px;
}
.head {
  max-width: 720px; margin: 0 auto;
  display: flex; flex-direction: column; align-items: center; gap: 12px; text-align: center;
}
.h2 { font-size: clamp(28px, 4vw, 40px); line-height: 1.08; letter-spacing: -0.03em; font-weight: 600; }
.head p { font-size: 15.5px; line-height: 1.55; font-weight: 400; color: var(--muted); }
.steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
.meta {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 20px;
}
.behind, .cases {
  padding: 28px;
  display: flex; flex-direction: column; gap: 12px;
}
.behind p {
  font-size: 14.5px; line-height: 1.65; font-weight: 400; color: var(--text-2);
}
.cases ul {
  display: flex; flex-wrap: wrap; gap: 8px;
}
.cases li {
  padding: 6px 13px;
  border-radius: 999px;
  font-size: 12.5px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--line-2);
  color: var(--text-2);
}
@media (max-width: 960px) {
  .steps { grid-template-columns: repeat(2, 1fr); }
  .meta { grid-template-columns: 1fr; }
}
@media (max-width: 540px) {
  .steps { grid-template-columns: 1fr; }
}
</style>
