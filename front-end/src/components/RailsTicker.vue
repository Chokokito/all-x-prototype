<script setup>
import ReactIsland from '../react/ReactIsland.vue'
import ScrollVelocity from '../react/bits/ScrollVelocity'

const lines = [
  'ALL X = any currency × any rail × any market × any business  —',
  'USD / EUR / BRL  ·  USDC / USDT  ·  Pix / ACH / SWIFT / SEPA  —',
]
</script>

<template>
  <aside class="ticker" aria-label="Brand Thesis">
    <ReactIsland
      :component="ScrollVelocity"
      :props="{
        texts: lines,
        velocity: 42,
        numCopies: 5,
        fadeEdges: true,
        pauseOnHover: true,
        skewWithVelocity: 6,
        fontSize: '15px',
        fontWeight: 600,
        color: '#d98e68',
        gap: 28,
      }"
    />
  </aside>
</template>

<style scoped>
.ticker {
  padding: 20px 0;
  margin-top: 28px;
  border-block: 1px solid var(--line);
  background: linear-gradient(90deg, rgba(217, 142, 104, 0.02), rgba(217, 142, 104, 0.07), rgba(217, 142, 104, 0.02));
  opacity: 0.9;
  overflow: hidden;
  max-width: 100%;
}
:deep(.sv-par + .sv-par) {
  margin-top: 8px;
  opacity: 0.65;
}
</style>
