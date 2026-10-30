<script setup>
import { t, navigateTo } from '../i18n'
</script>

<template>
  <footer class="footer">
    <div class="wrap">
      <div class="grid">
        <div class="brand">
          <img src="/logo.png" alt="ALL X" width="84" height="20" />
          <p>{{ t('footer.desc') }}</p>
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
        <span class="thesis">any currency × any rail × any market × any business</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer { background: var(--bg-footer); border-top: 1px solid var(--line); padding: 56px 24px 36px; }
.wrap { max-width: 1024px; margin: 0 auto; }
.grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 32px; padding-bottom: 32px; border-bottom: 1px solid var(--line); }
.brand { display: flex; flex-direction: column; gap: 14px; }
.brand p { max-width: 340px; font-size: 13.5px; line-height: 1.55; font-weight: 400; color: var(--muted); }
h4 { margin-bottom: 12px; font-size: 13px; font-weight: 600; color: var(--text); }
ul { display: flex; flex-direction: column; gap: 8px; }
li a { font-size: 13px; color: var(--muted); transition: color 0.2s; }
li a:hover { color: var(--accent); }
.disclosure {
  padding: 20px 0 16px;
  border-bottom: 1px solid var(--line);
  font-size: 12px;
  line-height: 1.6;
  color: var(--dim);
}
.legal {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  padding-top: 20px;
  font-size: 12.5px;
  color: var(--dim);
}
.thesis {
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.02em;
  color: var(--accent-soft);
}
@media (max-width: 720px) { .grid { grid-template-columns: 1fr 1fr; } .brand { grid-column: 1 / -1; } }
</style>
