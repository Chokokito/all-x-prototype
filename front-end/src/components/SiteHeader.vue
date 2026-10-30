<script setup>
import { computed, ref } from 'vue'
import { lang, setLang, t, navigateTo } from '../i18n'

const hrefs = ['#pagamentos', '#contas', '#como-funciona', '#compliance', '#api']
const links = computed(() => t('nav.links').map((label, i) => ({ label, href: hrefs[i] })))
const open = ref(false)
</script>

<template>
  <header class="header">
    <div class="bar container-wide">
      <a href="#" :aria-label="t('nav.home')"><img src="/logo.png" alt="ALL X" width="100" height="24" /></a>

      <nav class="links" :aria-label="t('nav.main')">
        <a v-for="l in links" :key="l.href" :href="l.href">{{ l.label }}</a>
      </nav>

      <div class="actions">
        <!-- Animated sliding pill language switcher -->
        <div class="lang-switch" role="group" :aria-label="t('nav.lang')" :data-lang="lang">
          <svg class="lang-globe" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          <div class="lang-track">
            <span class="lang-thumb" aria-hidden="true" />
            <button type="button" :class="{ on: lang === 'pt' }" :aria-pressed="lang === 'pt'" lang="pt" @click="setLang('pt')">PT</button>
            <button type="button" :class="{ on: lang === 'en' }" :aria-pressed="lang === 'en'" lang="en" @click="setLang('en')">EN</button>
          </div>
        </div>

        <a href="#cms" class="sandbox" @click.prevent="navigateTo('cms')">{{ t('nav.sandbox') }}</a>
        <a href="#contato" class="cta">{{ t('nav.contact') }}</a>

        <!-- Animated Hamburger Button -->
        <button
          type="button"
          class="burger"
          :class="{ 'is-open': open }"
          :aria-expanded="open"
          aria-controls="mobile-nav"
          :aria-label="t('nav.menu')"
          @click="open = !open"
        >
          <span class="bar-line line-1" />
          <span class="bar-line line-2" />
          <span class="bar-line line-3" />
        </button>
      </div>
    </div>

    <Transition name="mobile-drawer">
      <nav v-if="open" id="mobile-nav" class="mobile" aria-label="Mobile">
        <a
          v-for="(l, idx) in links"
          :key="l.href"
          :href="l.href"
          :style="{ '--i': idx }"
          @click="open = false"
        >
          {{ l.label }}
        </a>
        <a href="#cms" :style="{ '--i': links.length }" @click.prevent="open = false; navigateTo('cms')">
          {{ t('nav.sandbox') }}
        </a>
        <div class="mobile-bottom" :style="{ '--i': links.length + 1 }">
          <a href="#contato" class="cta mobile-cta" @click="open = false">{{ t('nav.contact') }}</a>
        </div>
      </nav>
    </Transition>
  </header>
</template>

<style scoped>
.header {
  position: sticky; top: 0; z-index: 50;
  background: rgba(13, 14, 19, 0.9);
  backdrop-filter: blur(24px);
  border-bottom: 1px solid var(--line);
}
.container-wide { max-width: 1280px; margin: 0 auto; padding: 0 clamp(20px, 7vw, 120px); }
.bar { height: 76px; display: flex; align-items: center; justify-content: space-between; gap: 24px; }
.links { display: flex; align-items: center; gap: 28px; }
.links a {
  font-weight: 600; font-size: 11.5px; letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--muted); transition: color 0.2s; white-space: nowrap;
}
.links a:hover { color: var(--accent); }
.actions { display: flex; align-items: center; gap: 14px; flex-shrink: 0; }

/* Animated Language Switcher Pill */
.lang-switch {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 5px 3px 9px;
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid var(--line-2);
  border-radius: 999px;
  transition: border-color 0.25s, box-shadow 0.25s;
}
.lang-switch:hover {
  border-color: rgba(217, 142, 104, 0.45);
  box-shadow: 0 0 18px -6px rgba(217, 142, 104, 0.35);
}
.lang-globe {
  color: #ebaa89;
  transition: transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.lang-switch[data-lang='en'] .lang-globe {
  transform: rotate(180deg) scale(1.06);
}
.lang-track {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
}
.lang-thumb {
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(165deg, rgba(232, 169, 131, 0.26) 0%, rgba(217, 142, 104, 0.18) 100%);
  border: 1px solid rgba(217, 142, 104, 0.45);
  box-shadow: 0 2px 10px rgba(217, 142, 104, 0.25);
  transition: transform 0.38s cubic-bezier(0.34, 1.56, 0.64, 1);
  pointer-events: none;
}
.lang-switch[data-lang='en'] .lang-thumb {
  transform: translateX(100%);
}
.lang-track button {
  position: relative;
  z-index: 1;
  padding: 3px 9px;
  background: none;
  border: 0;
  font: inherit;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--dim);
  cursor: pointer;
  transition: color 0.25s, transform 0.2s;
}
.lang-track button.on {
  color: #f8fafc;
}
.lang-track button:active {
  transform: scale(0.92);
}

.sandbox {
  padding: 8px 14px; font-size: 12px; font-weight: 500; color: var(--text-2);
  background: rgba(255, 255, 255, 0.02); border: 1px solid var(--line-2); border-radius: 8px;
  white-space: nowrap; transition: border-color 0.2s, color 0.2s;
}
.sandbox:hover { border-color: rgba(217, 142, 104, 0.45); color: #ebaa89; }
.cta {
  padding: 8px 16px; border-radius: 8px; font-size: 12px; font-weight: 700;
  letter-spacing: 0.05em; text-transform: uppercase; white-space: nowrap;
  color: var(--on-accent);
  background: linear-gradient(167deg, #e8a983 0%, #d98e68 100%);
  box-shadow: 0 0 35px -8px rgba(217, 142, 104, 0.3);
}

/* Animated Hamburger Button */
.burger {
  display: none;
  position: relative;
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--line-2);
  padding: 0;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  transition: border-color 0.25s, background 0.25s, box-shadow 0.25s;
}
.burger:hover,
.burger.is-open {
  border-color: rgba(217, 142, 104, 0.5);
  background: rgba(217, 142, 104, 0.1);
  box-shadow: 0 0 20px -6px rgba(217, 142, 104, 0.4);
}
.bar-line {
  position: absolute;
  width: 18px;
  height: 2px;
  border-radius: 2px;
  background: var(--text);
  transition: transform 0.36s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.22s ease, background-color 0.25s;
}
.line-1 { transform: translateY(-6px); }
.line-2 { transform: translateY(0); }
.line-3 { transform: translateY(6px); }

.burger.is-open .bar-line { background: #ebaa89; }
.burger.is-open .line-1 { transform: translateY(0) rotate(45deg); }
.burger.is-open .line-2 { opacity: 0; transform: scaleX(0.2); }
.burger.is-open .line-3 { transform: translateY(0) rotate(-45deg); }

/* Mobile Drawer */
.mobile {
  display: flex;
  flex-direction: column;
  padding: 14px 24px 24px;
  gap: 14px;
  background: rgba(13, 15, 21, 0.96);
  border-bottom: 1px solid rgba(217, 142, 104, 0.22);
}
.mobile a {
  font-weight: 600;
  font-size: 13px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted);
  padding: 6px 0;
  animation: mobileItemIn 0.32s cubic-bezier(0.22, 1, 0.36, 1) calc(var(--i, 0) * 45ms) both;
}
.mobile a:hover { color: #ebaa89; }
.mobile-bottom {
  padding-top: 8px;
  animation: mobileItemIn 0.32s cubic-bezier(0.22, 1, 0.36, 1) calc(var(--i, 0) * 45ms) both;
}
.mobile-cta {
  display: inline-flex;
  justify-content: center;
  width: 100%;
  padding: 11px 16px;
}

@keyframes mobileItemIn {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}

.mobile-drawer-enter-active,
.mobile-drawer-leave-active {
  transition: opacity 0.24s ease, transform 0.26s cubic-bezier(0.22, 1, 0.36, 1);
  transform-origin: top;
}
.mobile-drawer-enter-from,
.mobile-drawer-leave-to {
  opacity: 0;
  transform: translateY(-10px) scaleY(0.96);
}

@media (max-width: 960px) {
  .container-wide { padding: 0 16px; }
  .bar { height: 66px; gap: 12px; }
  .actions { gap: 10px; }
  .links, .sandbox, .actions > .cta { display: none !important; }
  .burger { display: inline-flex; }
}
@media (min-width: 961px) { .mobile { display: none !important; } }
</style>
