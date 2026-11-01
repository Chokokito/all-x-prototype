<script setup>
import { t } from '../i18n'

const stepIcons = [
  // 01 Receba: Arrow down into tray
  'M12 3v12m0 0-4-4m4 4 4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2',
  // 02 Cote: Sliders / quote lock
  'M4 8h9m4 0h3M13 8a2 2 0 1 0 4 0 2 2 0 0 0-4 0zM4 16h3m4 0h9M7 16a2 2 0 1 0 4 0 2 2 0 0 0-4 0z',
  // 03 Converta: Swap arrows
  'M7 10h14l-4-4M17 14H3l4 4',
  // 04 Liquide: Check circle / bank
  'M20 6 9 17l-5-5',
]
</script>

<template>
  <section id="como-funciona" class="how container">
    <header class="section-head reveal">
      <div class="title-block">
        <span class="eyebrow">{{ t('how.eyebrow') }}</span>
        <h2 class="section-title">{{ t('how.title') }}</h2>
      </div>
      <p>{{ t('how.text') }}</p>
    </header>

    <ol class="steps reveal">
      <li v-for="(s, i) in t('how.steps')" :key="s.n" class="step">
        <div class="step-top">
          <span class="step-ico" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path :d="stepIcons[i]" />
            </svg>
          </span>
          <span class="n mono">{{ s.n }} · {{ s.sub }}</span>
        </div>
        <h3>{{ s.t }}</h3>
        <p>{{ s.d }}</p>
      </li>
    </ol>

    <div class="meta reveal">
      <div class="behind">
        <h3>{{ t('how.behindTitle') }}</h3>
        <p>{{ t('how.behindText') }}</p>
      </div>
      <div class="cases">
        <h3>{{ t('how.useCasesTitle') }}</h3>
        <ul>
          <li v-for="u in t('how.useCases')" :key="u">{{ u }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.how { padding: clamp(64px, 9vw, 120px) 0 clamp(24px, 4vw, 48px); display: flex; flex-direction: column; gap: clamp(36px, 5vw, 56px); }
.steps {
  list-style: none; margin: 0; padding: 0;
  display: grid; grid-template-columns: repeat(4, 1fr);
  border-top: 1px solid var(--line-2);
}
.step { padding: 24px 24px 8px 0; display: flex; flex-direction: column; gap: 10px; position: relative; }
.step + .step { padding-left: 24px; border-left: 1px solid var(--line); }
.step::before {
  content: ''; position: absolute; top: -1px; left: 0; height: 1px; width: 0; background: var(--accent);
  transition: width 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}
.step:hover::before { width: 100%; }
.step-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.step-ico {
  width: 34px;
  height: 34px;
  border-radius: 8px;
  background: var(--surface-2);
  border: 1px solid var(--line-2);
  display: grid;
  place-items: center;
  color: var(--text-2);
  transition: background 0.2s, color 0.2s, border-color 0.2s;
}
.step:hover .step-ico {
  background: var(--accent);
  color: var(--on-accent);
  border-color: var(--accent);
}
.n { font-size: 12px; color: var(--dim); }
.step h3 { font-size: 20px; font-weight: 500; letter-spacing: -0.02em; }
.step p { font-size: 14px; line-height: 1.55; color: var(--muted); }

.meta { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.behind, .cases {
  padding: clamp(24px, 3vw, 32px); display: flex; flex-direction: column; gap: 14px;
  background: var(--surface); border: 1px solid var(--line); border-radius: 16px;
}
.meta h3 { font-size: 15px; font-weight: 500; color: var(--text); }
.behind p { font-size: 14.5px; line-height: 1.65; color: var(--muted); }
.cases ul { display: flex; flex-wrap: wrap; gap: 8px; }
.cases li { padding: 6px 12px; border-radius: 6px; font-size: 13px; background: var(--surface-2); border: 1px solid var(--line); color: var(--text-2); }

@media (max-width: 960px) {
  .steps { grid-template-columns: repeat(2, 1fr); }
  .step:nth-child(3) { padding-left: 0; border-left: 0; }
  .step:nth-child(n + 3) { border-top: 1px solid var(--line); }
  .meta { grid-template-columns: 1fr; }
}
@media (max-width: 540px) {
  .steps { grid-template-columns: 1fr; }
  .step { padding-left: 0 !important; border-left: 0 !important; }
  .step + .step { border-top: 1px solid var(--line); }
  .step-top { margin-bottom: 12px; }
}
</style>
