<script setup>
import { lang, t, navigateTo } from '../i18n'
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="grid">
        <div class="brand">
          <img src="/logo.png" alt="ALL X" width="92" height="22" />
          <p>{{ t('footer.desc') }}</p>
          <div class="status-pill">
            <span class="status-dot" aria-hidden="true" />
            <span>{{ lang === 'pt' ? 'Todos os sistemas operacionais' : 'All systems operational' }}</span>
          </div>
        </div>
        <nav v-for="c in t('footer.cols')" :key="c.h" :aria-label="c.h">
          <h4>{{ c.h }}</h4>
          <ul>
            <li v-for="i in c.items" :key="i">
              <a
                :href="i === 'Documentação' || i === 'Documentation' || i === 'API / White-Label' ? '#cms' : '#'"
                @click="i === 'Documentação' || i === 'Documentation' || i === 'API / White-Label' ? navigateTo('cms') : null"
              >
                {{ i }}
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <p class="disclosure">{{ t('footer.disclosure') }}</p>
      <div class="legal">
        <span>{{ t('footer.rights') }}</span>
        <div class="social">
          <a href="#cms" @click.prevent="navigateTo('cms')">API Docs</a>
          <a href="#compliance">Compliance</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--bg-footer);
  border-top: 1px solid var(--line);
  padding: clamp(56px, 7vw, 88px) 0 40px;
}
.grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 32px;
  padding-bottom: 48px;
}
.brand {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
}
.brand p {
  max-width: 320px;
  font-size: 13.5px;
  line-height: 1.6;
  color: var(--muted);
}
.status-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 5px 11px;
  border-radius: 8px;
  background: var(--surface);
  border: 1px solid var(--line-2);
  font-size: 12px;
  font-weight: 500;
  color: var(--text-2);
}
.status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--ok);
}
h4 {
  margin-bottom: 16px;
  font-size: 13.5px;
  font-weight: 600;
  color: var(--text);
}
ul {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
li a {
  font-size: 13.5px;
  color: var(--text-2);
  transition: color 0.2s;
}
li a:hover { color: #fff; }
.disclosure {
  padding: 28px 0;
  border-top: 1px solid var(--line);
  font-size: 12px;
  line-height: 1.65;
  color: var(--dim);
}
.legal {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  padding-top: 8px;
  font-size: 12.5px;
  color: var(--muted);
}
.social {
  display: flex;
  gap: 20px;
}
.social a {
  color: var(--muted);
  transition: color 0.2s;
}
.social a:hover { color: var(--text); }
@media (max-width: 720px) {
  .grid { grid-template-columns: 1fr 1fr; }
  .brand { grid-column: 1 / -1; }
}
</style>
