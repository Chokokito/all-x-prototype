<script setup>
import { t } from '../i18n'

const compIcons = [
  // KYB & UBO (Building)
  'M4 21h16M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16M10 9h4M10 13h4',
  // KYC (User check)
  'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm7 0 2 2 4-4',
  // Sanctions / PEP (Shield alert)
  'M12 3l7 3v5c0 4.5-3 8.3-7 9.5-4-1.2-7-5-7-9.5V6l7-3zm0 5v4m0 4h.01',
  // Source of Funds (File check)
  'M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-6-6zm-4 11 2 2 4-4',
  // Monitoring (Pulse / Activity)
  'M22 12h-4l-3 9L9 3l-3 9H2',
  // Blockchain Screening (Nodes)
  'M12 5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM6 16a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm12 0a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM10.5 9.5 7 16m6.5-6.5L17 16',
  // Security (Lock)
  'M5 11h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2zm3 0V7a4 4 0 1 1 8 0v4',
  // Fraud Controls (Sliders)
  'M4 21v-7m0-4V3m8 18v-9m0-4V3m8 18v-5m0-4V3M2 14h4m4-6h4m4 8h4',
]
</script>

<template>
  <section class="comp container">
    <header class="section-head reveal">
      <div class="title-block">
        <span class="eyebrow">{{ t('compliance.eyebrow') }}</span>
        <h2 class="section-title">{{ t('compliance.title') }}</h2>
      </div>
      <p>{{ t('compliance.text') }}</p>
    </header>

    <dl class="grid reveal">
      <div v-for="(item, i) in t('compliance.items')" :key="item.t" class="cell">
        <span class="cell-ico" aria-hidden="true">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path :d="compIcons[i]" />
          </svg>
        </span>
        <dt>{{ item.t }}</dt>
        <dd>{{ item.d }}</dd>
      </div>
    </dl>
  </section>
</template>

<style scoped>
.comp { padding: clamp(64px, 9vw, 112px) 0 clamp(20px, 3vw, 36px); display: flex; flex-direction: column; gap: clamp(36px, 5vw, 56px); }
.grid { margin: 0; display: grid; grid-template-columns: repeat(4, 1fr); border-top: 1px solid var(--line-2); }
.cell { padding: 24px 20px 24px 0; display: flex; flex-direction: column; gap: 8px; border-bottom: 1px solid var(--line); }
.cell:not(:nth-child(4n + 1)) { padding-left: 20px; border-left: 1px solid var(--line); }
.cell-ico {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: var(--surface-2);
  border: 1px solid var(--line-2);
  display: grid;
  place-items: center;
  color: var(--text-2);
  margin-bottom: 4px;
  transition: color 0.2s, border-color 0.2s, background 0.2s;
}
.cell:hover .cell-ico {
  color: var(--accent-soft);
  border-color: rgba(217, 142, 104, 0.35);
  background: #19191e;
}
dt { font-size: 15px; font-weight: 500; color: var(--text); letter-spacing: -0.01em; }
dd { margin: 0; font-size: 13.5px; line-height: 1.55; color: var(--muted); }
@media (max-width: 960px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
  .cell { padding-left: 0 !important; border-left: 0 !important; }
  .cell:nth-child(even) { padding-left: 20px !important; border-left: 1px solid var(--line) !important; }
}
@media (max-width: 520px) {
  .grid { grid-template-columns: 1fr; }
  .cell:nth-child(even) { padding-left: 0 !important; border-left: 0 !important; }
}
</style>
