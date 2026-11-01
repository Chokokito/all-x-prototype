<script setup>
import { t } from '../i18n'

const productIcons = [
  // Global Accounts (Wallet / IBAN)
  'M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7zm0 3h18M15 14h2',
  // Global Payments (Globe / Cross-border)
  'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3.6 9h16.8M3.6 15h16.8M12 3a14.5 14.5 0 0 1 0 18M12 3a14.5 14.5 0 0 0 0 18',
  // Stablecoin Gateway (Coins / Bridge)
  'M9.5 9.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11zM14.5 4a5.5 5.5 0 0 1 0 11',
  // Treasury (Layers / Dashboard)
  'M12 3 3 7.5 12 12l9-4.5L12 3zM3 12l9 4.5 9-4.5M3 16.5 12 21l9-4.5',
  // API / White-Label (Code brackets)
  'm16 18 6-6-6-6M8 6l-6 6 6 6',
  // Payables (Invoice / Check)
  'M6 3h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm3 6h6m-6 4h6m-6 4h4',
]
</script>

<template>
  <section class="stack container">
    <header class="section-head reveal">
      <div class="title-block">
        <span class="eyebrow">{{ t('stack.eyebrow') }}</span>
        <h2 class="section-title">{{ t('stack.title') }}</h2>
      </div>
      <p>{{ t('stack.text') }}</p>
    </header>
    <div class="cards">
      <article v-for="(c, i) in t('stack.cards')" :key="i" class="card reveal">
        <div class="card-top">
          <span class="card-ico" aria-hidden="true">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
              <path :d="productIcons[i]" />
            </svg>
          </span>
          <span class="n mono">{{ '0' + (i + 1) }}</span>
        </div>
        <h3>{{ c.t }}</h3>
        <p>{{ c.d }}</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.stack { padding: clamp(64px, 9vw, 112px) 0 clamp(24px, 4vw, 48px); display: flex; flex-direction: column; gap: clamp(36px, 5vw, 56px); }
.cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--line); border: 1px solid var(--line); border-radius: 16px; overflow: hidden; }
.card { padding: 28px; background: var(--bg); display: flex; flex-direction: column; gap: 10px; min-height: 220px; transition: background 0.25s ease; }
.card:hover { background: var(--surface); }
.card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: auto;
  padding-bottom: 28px;
}
.card-ico {
  width: 36px;
  height: 36px;
  border-radius: 9px;
  background: var(--surface-2);
  border: 1px solid var(--line-2);
  display: grid;
  place-items: center;
  color: var(--text-2);
  transition: background 0.2s, color 0.2s, border-color 0.2s;
}
.card:hover .card-ico {
  background: var(--accent);
  color: var(--on-accent);
  border-color: var(--accent);
}
.n { font-size: 12px; color: var(--dim); }
.card h3 { font-size: 18px; font-weight: 500; letter-spacing: -0.02em; }
.card p { font-size: 14px; line-height: 1.55; color: var(--muted); }
@media (max-width: 900px) { .cards { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 560px) { .cards { grid-template-columns: 1fr; } .card { min-height: 0; } }
</style>
