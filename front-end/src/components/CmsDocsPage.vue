<script setup>
import { ref, computed } from 'vue'
import { lang, setLang, t, navigateTo, openSearchModal } from '../i18n'
import ReactIsland from '../react/ReactIsland.vue'
import DocsCodeCard from '../react/DocsCodeCard.jsx'

const activeSection = ref('sec-create')
const activeNavId = ref('managed-wallets')
const copiedLink = ref(false)
const feedbackGiven = ref(false)
const switcherOpen = ref(false)
const selectedModuleIdx = ref(0)
const sidebarFilter = ref('')
const collapsedGroups = ref({})
const mobileSidebarOpen = ref(false)

const currentModule = computed(() => {
  const mods = t('cms.sidebar.modules')
  return Array.isArray(mods) ? mods[selectedModuleIdx.value] || mods[0] : { sub: 'API & ENGINE', title: 'Corporate Treasury' }
})

const filteredSections = computed(() => {
  const secs = t('cms.sidebar.sections')
  if (!Array.isArray(secs)) return []
  const q = sidebarFilter.value.trim().toLowerCase()
  if (!q) return secs
  return secs
    .map((s) => ({
      ...s,
      items: s.items.filter(
        (it) => it.label.toLowerCase().includes(q) || (it.method && it.method.toLowerCase().includes(q))
      ),
    }))
    .filter((s) => s.items.length > 0)
})

function toggleGroup(title) {
  collapsedGroups.value[title] = !collapsedGroups.value[title]
}

function selectModule(idx) {
  selectedModuleIdx.value = idx
  switcherOpen.value = false
}

function methodClass(m) {
  if (!m) return 'm-doc'
  const u = m.toUpperCase()
  if (u === 'POST') return 'm-post'
  if (u === 'GET') return 'm-get'
  if (u === 'WSS') return 'm-wss'
  return 'm-doc'
}

function copyPageLink() {
  navigator.clipboard?.writeText(window.location.href)
  copiedLink.value = true
  setTimeout(() => { copiedLink.value = false }, 1800)
}
</script>

<template>
  <div class="cms-page">
    <!-- TopNavigationBar (#2:4) -->
    <header class="cms-topbar">
      <div class="cms-topbar-left">
        <a href="#" class="cms-logo-link" @click.prevent="navigateTo('home')" :aria-label="t('nav.home')">
          <img src="/logo.png" alt="ALL X" width="84" height="20" />
        </a>
        <span class="cms-divider" aria-hidden="true" />
        <span class="cms-docs-badge mono">{{ t('cms.top.badge') }}</span>
        <a href="#" class="cms-back-home" @click.prevent="navigateTo('home')">{{ t('cms.top.backHome') }}</a>
      </div>

      <!-- Desktop Search Bar -->
      <div class="cms-search-wrap">
        <button type="button" class="cms-search-box" @click="openSearchModal">
          <svg class="cms-search-ico" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <span class="cms-search-placeholder">{{ t('cms.top.searchPlaceholder') }}</span>
          <kbd class="cms-kbd mono">Ctrl + K</kbd>
        </button>
      </div>

      <div class="cms-topbar-right">
        <!-- Mobile Magnifying Glass Button ("Lupinha") -->
        <button
          type="button"
          class="cms-mobile-search-btn"
          :aria-label="t('cms.top.searchPlaceholder')"
          @click="openSearchModal"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </button>

        <!-- Animated Sliding Pill Language Switcher -->
        <div class="cms-lang-switch" role="group" :aria-label="t('nav.lang')" :data-lang="lang">
          <svg class="cms-lang-globe" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          <div class="cms-lang-track">
            <span class="cms-lang-thumb" aria-hidden="true" />
            <button type="button" :class="{ on: lang === 'pt' }" :aria-pressed="lang === 'pt'" @click="setLang('pt')">PT</button>
            <button type="button" :class="{ on: lang === 'en' }" :aria-pressed="lang === 'en'" @click="setLang('en')">EN</button>
          </div>
        </div>

        <a href="#contato" class="cms-contact-btn" @click.prevent="navigateTo('home', '#contato')">
          {{ t('cms.top.contact') }}
        </a>

        <!-- Animated Mobile Hamburger for API Sidebar -->
        <button
          type="button"
          class="cms-burger"
          :class="{ 'is-open': mobileSidebarOpen }"
          :aria-expanded="mobileSidebarOpen"
          aria-label="Menu API"
          @click="mobileSidebarOpen = !mobileSidebarOpen"
        >
          <span class="bar-line line-1" />
          <span class="bar-line line-2" />
          <span class="bar-line line-3" />
        </button>
      </div>
    </header>

    <!-- MainDocumentationLayout (#2:32) -->
    <div class="cms-layout">
      <!-- Aside - LeftSidebarNav (#2:249) — Enhanced API Explorer -->
      <aside class="cms-sidebar-left" :class="{ 'is-mobile-open': mobileSidebarOpen }" aria-label="Documentation Navigation">
        <!-- Context Switcher / API Engine Selector -->
        <div class="cms-switcher-wrap">
          <button
            type="button"
            class="cms-switcher-btn"
            :class="{ 'is-open': switcherOpen }"
            :aria-expanded="switcherOpen"
            @click="switcherOpen = !switcherOpen"
          >
            <div class="cms-switcher-left">
              <span class="cms-switcher-icon">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#D98E68" stroke-width="2" aria-hidden="true">
                  <polygon points="12 2 2 7 12 12 22 7 12 2" />
                  <polyline points="2 17 12 22 22 17" />
                  <polyline points="2 12 12 17 22 12" />
                </svg>
              </span>
              <div class="cms-switcher-text">
                <span class="cms-switcher-sub mono">{{ currentModule.sub }}</span>
                <span class="cms-switcher-title">{{ currentModule.title }}</span>
              </div>
            </div>
            <svg
              class="cms-switcher-chevron"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>

          <Transition name="dropdown-slide">
            <ul v-if="switcherOpen" class="cms-switcher-menu">
              <li
                v-for="(mod, idx) in t('cms.sidebar.modules')"
                :key="mod.id"
                class="cms-switcher-option"
                :class="{ selected: idx === selectedModuleIdx }"
                @click="selectModule(idx)"
              >
                <div>
                  <small class="mono">{{ mod.sub }}</small>
                  <strong>{{ mod.title }}</strong>
                </div>
                <span class="cms-mod-pill mono">{{ mod.status }}</span>
              </li>
            </ul>
          </Transition>

          <!-- Quick inline API endpoint filter -->
          <div class="cms-side-filter">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            <input
              v-model="sidebarFilter"
              type="text"
              class="cms-side-filter-input mono"
              :placeholder="lang === 'pt' ? 'Filtrar APIs (ex: POST, Pix...)' : 'Filter APIs (e.g. POST, Pix...)'"
            />
          </div>
        </div>

        <nav class="cms-nav-tree">
          <div v-for="sec in filteredSections" :key="sec.title" class="cms-nav-group">
            <button
              type="button"
              class="cms-nav-heading"
              :class="{ accent: sec.accent, collapsed: collapsedGroups[sec.title] }"
              @click="toggleGroup(sec.title)"
            >
              <span>{{ sec.title }}</span>
              <svg class="cms-group-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            <ul v-show="!collapsedGroups[sec.title]" class="cms-nav-list">
              <li v-for="item in sec.items" :key="item.id">
                <a
                  href="#cms"
                  class="cms-nav-item"
                  :class="{ active: activeNavId === item.id }"
                  @click.prevent="activeNavId = item.id; mobileSidebarOpen = false"
                >
                  <span class="cms-nav-item-left">
                    <span class="cms-method-tag mono" :class="methodClass(item.method)">
                      {{ item.method || 'DOC' }}
                    </span>
                    <span class="cms-nav-label">{{ item.label }}</span>
                  </span>
                  <span v-if="item.badge" class="cms-nav-badge mono">{{ item.badge }}</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <div class="cms-sidebar-footer">
          <div class="cms-version-info mono">
            <span class="cms-version-dot" />
            <span>{{ t('cms.sidebar.version') }}</span>
          </div>
          <a href="#cms" class="cms-status-link" @click.prevent>{{ t('cms.sidebar.status') }}</a>
        </div>
      </aside>

      <!-- MainContentCenter (#2:33) -->
      <main id="main" class="cms-main">
        <div class="cms-bg-grid" aria-hidden="true" />
        <div class="cms-article">
          <!-- Breadcrumbs (#2:35) -->
          <nav class="cms-breadcrumbs" aria-label="Breadcrumb">
            <span>{{ t('cms.breadcrumbs')[0] }}</span>
            <span class="crumb-sep">&gt;</span>
            <span>{{ t('cms.breadcrumbs')[1] }}</span>
            <span class="crumb-sep">&gt;</span>
            <span class="crumb-current">{{ t('cms.breadcrumbs')[2] }}</span>
          </nav>

          <!-- Hero Header (#2:46) -->
          <div class="cms-hero">
            <div class="cms-hero-top">
              <h1>{{ t('cms.hero.title') }}</h1>
              <button type="button" class="cms-copy-link-btn" @click="copyPageLink">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
                <span>{{ copiedLink ? t('cms.hero.copiedLink') : t('cms.hero.copyLink') }}</span>
              </button>
            </div>
            <p class="cms-hero-sub">{{ t('cms.hero.subtitle') }}</p>
          </div>

          <!-- Banner Callout (#2:61) -->
          <div class="cms-callout">
            <div class="cms-callout-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D98E68" stroke-width="2" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4M12 8h.01" />
              </svg>
            </div>
            <p class="cms-callout-text">
              <strong>{{ t('cms.callout.bold') }}</strong>
              {{ t('cms.callout.text') }}
            </p>
          </div>

          <!-- Technical Description Section (#2:68) -->
          <div class="cms-tech-desc">
            <p class="cms-body-p">
              {{ t('cms.intro.p1Before') }}<code class="cms-inline-code mono">{{ t('cms.intro.p1Code') }}</code>{{ t('cms.intro.p1After') }}
            </p>
            <ul class="cms-pillar-list">
              <li v-for="p in t('cms.intro.pillars')" :key="p.b">
                <span><strong>{{ p.b }}</strong>{{ p.t }}</span>
              </li>
            </ul>
          </div>

          <!-- SectionPrerequisites (#2:85) -->
          <section id="sec-prereq" class="cms-section">
            <h2 class="cms-h2">
              <span class="cms-hash">#</span>
              <span>{{ t('cms.prereq.title') }}</span>
            </h2>

            <div class="cms-prereq-box">
              <div class="cms-prereq-head">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#D98E68" stroke-width="2" aria-hidden="true">
                  <path d="M9 11l3 3L22 4" />
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                </svg>
                <span>{{ t('cms.prereq.boxTitle') }}</span>
              </div>
              <ol class="cms-prereq-ol">
                <li>
                  {{ t('cms.prereq.step1Before') }}<a href="#cms" class="cms-inline-link" @click.prevent>{{ t('cms.prereq.step1Link') }}</a>.
                </li>
                <li>
                  {{ t('cms.prereq.step2Before') }}<code class="cms-inline-code-dark mono">{{ t('cms.prereq.step2Code') }}</code>{{ t('cms.prereq.step2After') }}
                </li>
                <li>{{ t('cms.prereq.step3') }}</li>
              </ol>
            </div>

            <!-- Compliance Note (#2:107) -->
            <div class="cms-compliance-box">
              <div class="cms-compliance-head">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D98E68" stroke-width="2" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span>{{ t('cms.prereq.compTitle') }}</span>
              </div>
              <p class="cms-compliance-p">
                {{ t('cms.prereq.compBefore') }}
                <span class="cms-status-pill green mono">
                  <span class="pill-dot" />
                  kyc_status: approved
                </span>
                {{ t('cms.prereq.compOr') }}
                <span class="cms-status-pill amber mono">
                  <span class="pill-dot" />
                  compliance_request
                </span>{{ t('cms.prereq.compAfter') }}
              </p>
            </div>
          </section>

          <!-- SectionCreateWallet (#2:124) -->
          <section id="sec-create" class="cms-section">
            <div class="cms-sec-header">
              <h2 class="cms-h2">{{ t('cms.create.title') }}</h2>
              <p class="cms-sec-sub">{{ t('cms.create.sub') }}</p>
            </div>

            <div class="cms-important-note">
              <span class="cms-note-dot" />
              <p>
                {{ t('cms.create.noteBefore') }}<code class="cms-amber-code mono">YOUR_API_KEY</code>{{ t('cms.create.noteMid') }}<code class="cms-amber-code mono">in_000000000000</code>{{ t('cms.create.noteAfter') }}
              </p>
            </div>

            <ReactIsland
              :component="DocsCodeCard"
              :props="{
                mode: 'create',
                copyLabel: t('cms.create.copy'),
                copiedLabel: t('cms.create.copied'),
                copyJsonLabel: t('cms.create.copyJson'),
                respLabel: t('cms.create.respLabel'),
              }"
            />
          </section>

          <!-- SectionCheckBalance (#2:169) -->
          <section id="sec-balance" class="cms-section">
            <div class="cms-sec-header">
              <h2 class="cms-h2">{{ t('cms.balance.title') }}</h2>
              <p class="cms-sec-sub">{{ t('cms.balance.sub') }}</p>
            </div>

            <ReactIsland
              :component="DocsCodeCard"
              :props="{
                mode: 'balance',
                copyLabel: t('cms.create.copy'),
                copiedLabel: t('cms.create.copied'),
                copyJsonLabel: t('cms.create.copyJson'),
                reqLabel: t('cms.balance.reqLabel'),
                respLabel: t('cms.balance.respLabel'),
                respSub: t('cms.balance.respSub'),
              }"
            />
          </section>

          <!-- SectionReceiveAndPayout (#2:195) -->
          <section id="sec-settlement" class="cms-section">
            <div class="cms-sec-header">
              <h2 class="cms-h2">{{ t('cms.receivePayout.title') }}</h2>
              <p class="cms-sec-sub">{{ t('cms.receivePayout.sub') }}</p>
            </div>

            <div class="cms-feature-grid">
              <!-- Receive Card (#2:202) -->
              <div class="cms-feat-card">
                <div class="cms-feat-icon green">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4ADE80" stroke-width="2" aria-hidden="true">
                    <path d="M7 7l10 10M17 7v10H7" />
                  </svg>
                </div>
                <h3>{{ t('cms.receivePayout.payinTitle') }}</h3>
                <p>
                  {{ t('cms.receivePayout.payinBefore') }}<code class="cms-amber-code mono">wallet_id</code>{{ t('cms.receivePayout.payinAfter') }}
                </p>
                <div class="cms-feat-event mono">{{ t('cms.receivePayout.payinEvent') }}</div>
              </div>

              <!-- Payout Card (#2:215) -->
              <div class="cms-feat-card">
                <div class="cms-feat-icon copper">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D98E68" stroke-width="2" aria-hidden="true">
                    <path d="M7 17L17 7M7 7h10v10" />
                  </svg>
                </div>
                <h3>{{ t('cms.receivePayout.payoutTitle') }}</h3>
                <p>{{ t('cms.receivePayout.payoutText') }}</p>
                <div class="cms-feat-event mono">{{ t('cms.receivePayout.payoutEvent') }}</div>
              </div>
            </div>
          </section>

          <!-- SectionCMSAndMetadata (#2:225) -->
          <section id="sec-cms" class="cms-section">
            <div class="cms-sec-header">
              <h2 class="cms-h2">{{ t('cms.metadata.title') }}</h2>
              <p class="cms-sec-sub">{{ t('cms.metadata.sub') }}</p>
            </div>

            <div class="cms-metadata-box">
              <p>
                {{ t('cms.metadata.boxBefore') }}<code class="cms-copper-code mono">customer_internal_id</code>{{ t('cms.metadata.boxMid') }}<code class="cms-copper-code mono">ledger_account</code>{{ t('cms.metadata.boxAnd') }}{{ t('cms.metadata.boxAfter') }}
              </p>
            </div>
          </section>

          <!-- Pagination Controls (#2:240) -->
          <nav class="cms-pagination" aria-label="Pagination">
            <a href="#cms" class="cms-page-card prev" @click.prevent>
              <span class="cms-page-dir">{{ t('cms.pagination.prevLabel') }}</span>
              <span class="cms-page-title">{{ t('cms.pagination.prevTitle') }}</span>
            </a>
            <a href="#cms" class="cms-page-card next" @click.prevent>
              <span class="cms-page-dir">{{ t('cms.pagination.nextLabel') }}</span>
              <span class="cms-page-title">{{ t('cms.pagination.nextTitle') }}</span>
            </a>
          </nav>
        </div>
      </main>

      <!-- Aside - RightSidebarOnThisPage (#2:328) -->
      <aside class="cms-sidebar-right" aria-label="Table of contents">
        <div class="cms-toc-sticky">
          <div class="cms-toc-block">
            <div class="cms-toc-head">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
              <span>{{ t('cms.toc.title') }}</span>
            </div>
            <ul class="cms-toc-list">
              <li v-for="item in t('cms.toc.items')" :key="item.id">
                <a
                  :href="`#${item.id}`"
                  class="cms-toc-link"
                  :class="{ active: activeSection === item.id }"
                  @click="activeSection = item.id"
                >
                  {{ item.label }}
                </a>
              </li>
            </ul>
          </div>

          <!-- Feedback Widget (#2:346) -->
          <div class="cms-feedback-card">
            <p class="cms-feedback-title">{{ t('cms.toc.feedbackTitle') }}</p>
            <div v-if="!feedbackGiven" class="cms-feedback-btns">
              <button type="button" class="cms-fb-btn" @click="feedbackGiven = true">
                <span aria-hidden="true">👍</span>
                <span>{{ t('cms.toc.yes') }}</span>
              </button>
              <button type="button" class="cms-fb-btn" @click="feedbackGiven = true">
                <span aria-hidden="true">👎</span>
                <span>{{ t('cms.toc.no') }}</span>
              </button>
            </div>
            <p v-else class="cms-feedback-thanks">{{ t('cms.toc.thanks') }}</p>
          </div>

          <!-- Quick Developer Actions (#2:358) -->
          <div class="cms-quick-actions">
            <a href="#cms" class="cms-quick-link" @click.prevent>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              <span>{{ t('cms.toc.editCms') }}</span>
            </a>
            <a href="#contato" class="cms-quick-link" @click.prevent="navigateTo('home', '#contato')">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <span>{{ t('cms.toc.support') }}</span>
            </a>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.cms-page {
  min-height: 100vh;
  background: var(--bg);
  color: var(--text-2);
}

/* TopNavigationBar (#2:4) — Aligned with SiteHeader.vue */
.cms-topbar {
  position: sticky;
  top: 0;
  z-index: 60;
  height: 68px;
  padding: 0 clamp(20px, 4vw, 36px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  background: rgba(5, 5, 6, 0.75);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--line);
}
.cms-topbar-left {
  display: flex;
  align-items: center;
  gap: 14px;
}
.cms-logo-link {
  display: inline-flex;
  align-items: center;
}
.cms-divider {
  width: 1px;
  height: 18px;
  background: var(--line-2);
}
.cms-docs-badge {
  padding: 3px 9px;
  border-radius: 6px;
  background: var(--surface-2);
  border: 1px solid var(--line-2);
  color: var(--accent-soft);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
}
.cms-back-home {
  font-size: 13.5px;
  font-weight: 500;
  color: rgba(244, 244, 245, 0.72);
  padding: 6px 10px;
  border-radius: 8px;
  transition: color 0.16s ease, background 0.16s ease;
  white-space: nowrap;
}
.cms-back-home:hover {
  color: #fff;
  background: var(--surface-2);
}

.cms-search-wrap {
  flex: 1;
  max-width: 440px;
}
.cms-search-box {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  background: var(--surface);
  border: 1px solid var(--line-2);
  border-radius: 8px;
  padding: 8px 12px;
  gap: 10px;
  font: inherit;
  cursor: pointer;
  text-align: left;
  transition: border-color 0.18s ease, background 0.18s ease;
}
.cms-search-box:hover {
  background: var(--surface-2);
  border-color: rgba(255, 255, 255, 0.18);
}
.cms-search-ico { color: var(--muted); flex-shrink: 0; }
.cms-search-placeholder {
  flex: 1;
  color: var(--muted);
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.cms-kbd {
  padding: 2px 6px;
  background: var(--surface-2);
  border: 1px solid var(--line-2);
  border-radius: 5px;
  font-size: 10px;
  color: var(--muted);
}

.cms-topbar-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* Mobile Magnifying Glass ("Lupinha") */
.cms-mobile-search-btn {
  display: none;
  width: 38px;
  height: 38px;
  border-radius: 8px;
  background: var(--surface);
  border: 1px solid var(--line-2);
  color: var(--text-2);
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s, transform 0.2s;
}
.cms-mobile-search-btn:hover {
  border-color: rgba(255, 255, 255, 0.2);
  background: var(--surface-2);
  color: var(--text);
}
.cms-mobile-search-btn:active {
  transform: scale(0.93);
}

/* Language Switcher — Identical to SiteHeader.vue */
.cms-lang-switch {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 4px 3px 10px;
  background: var(--surface);
  border: 1px solid var(--line-2);
  border-radius: 8px;
  transition: border-color 0.25s;
}
.cms-lang-switch:hover {
  border-color: rgba(255, 255, 255, 0.2);
}
.cms-lang-globe {
  color: var(--text-2);
  transition: transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.cms-lang-switch[data-lang='en'] .cms-lang-globe {
  transform: rotate(180deg);
}
.cms-lang-track {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
}
.cms-lang-thumb {
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  border-radius: 5px;
  background: #222226;
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: transform 0.38s cubic-bezier(0.34, 1.56, 0.64, 1);
  pointer-events: none;
}
.cms-lang-switch[data-lang='en'] .cms-lang-thumb {
  transform: translateX(100%);
}
.cms-lang-track button {
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
.cms-lang-track button.on {
  color: #f8fafc;
}
.cms-lang-track button:active {
  transform: scale(0.92);
}

.cms-contact-btn {
  padding: 9px 16px;
  border-radius: 8px;
  background: var(--accent);
  color: var(--on-accent);
  font-size: 13.5px;
  font-weight: 500;
  white-space: nowrap;
  transition: background 0.2s;
}
.cms-contact-btn:hover {
  background: var(--accent-soft);
}

/* Animated Mobile Hamburger for CMS */
.cms-burger {
  display: none;
  position: relative;
  width: 38px;
  height: 38px;
  border-radius: 8px;
  background: var(--surface);
  border: 1px solid var(--line-2);
  padding: 0;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  transition: border-color 0.25s, background 0.25s;
}
.cms-burger.is-open {
  border-color: rgba(217, 142, 104, 0.5);
  background: rgba(217, 142, 104, 0.12);
}
.bar-line {
  position: absolute;
  width: 16px;
  height: 2px;
  border-radius: 2px;
  background: var(--text);
  transition: transform 0.36s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.22s ease, background-color 0.25s;
}
.line-1 { transform: translateY(-5px); }
.line-2 { transform: translateY(0); }
.line-3 { transform: translateY(5px); }
.cms-burger.is-open .bar-line { background: var(--accent-soft); }
.cms-burger.is-open .line-1 { transform: translateY(0) rotate(45deg); }
.cms-burger.is-open .line-2 { opacity: 0; transform: scaleX(0.2); }
.cms-burger.is-open .line-3 { transform: translateY(0) rotate(-45deg); }

/* MainDocumentationLayout (#2:32) */
.cms-layout {
  max-width: 1320px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 296px minmax(0, 1fr) 256px;
  align-items: start;
}

/* Left Sidebar (#2:249) — Enhanced API Explorer */
.cms-sidebar-left {
  position: sticky;
  top: 68px;
  height: calc(100vh - 68px);
  display: flex;
  flex-direction: column;
  background: var(--bg);
  border-right: 1px solid var(--line);
  overflow: hidden;
}
.cms-switcher-wrap {
  padding: 16px 14px 12px;
  border-bottom: 1px solid var(--line);
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.cms-switcher-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  background: var(--surface);
  border: 1px solid var(--line-2);
  border-radius: 10px;
  color: var(--text);
  font: inherit;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
}
.cms-switcher-btn:hover,
.cms-switcher-btn.is-open {
  background: var(--surface-2);
  border-color: rgba(217, 142, 104, 0.4);
}
.cms-switcher-left {
  display: flex;
  align-items: center;
  gap: 10px;
}
.cms-switcher-icon {
  width: 28px;
  height: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 7px;
  background: var(--surface-2);
  border: 1px solid var(--line-2);
}
.cms-switcher-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
}
.cms-switcher-sub {
  font-size: 9.5px;
  line-height: 1;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.cms-switcher-title {
  font-size: 13px;
  font-weight: 500;
  letter-spacing: -0.01em;
  color: var(--text);
}
.cms-switcher-chevron {
  color: var(--muted);
  transition: transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.2s;
}
.cms-switcher-btn.is-open .cms-switcher-chevron {
  transform: rotate(180deg);
  color: var(--accent-soft);
}

.cms-switcher-menu {
  background: #0b0b0e;
  border: 1px solid var(--line-2);
  border-radius: 12px;
  padding: 6px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  box-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.85);
}
.cms-switcher-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.15s;
}
.cms-switcher-option:hover {
  background: var(--surface-2);
}
.cms-switcher-option.selected {
  background: rgba(217, 142, 104, 0.12);
}
.cms-switcher-option div {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.cms-switcher-option small {
  font-size: 9px;
  color: var(--muted);
}
.cms-switcher-option strong {
  font-size: 12.5px;
  font-weight: 500;
  color: var(--text);
}
.cms-mod-pill {
  padding: 2px 6px;
  border-radius: 4px;
  background: rgba(74, 222, 128, 0.1);
  border: 1px solid rgba(74, 222, 128, 0.24);
  color: var(--ok);
  font-size: 9px;
  font-weight: 700;
}

/* Inline Sidebar Filter */
.cms-side-filter {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 10px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 8px;
  color: var(--muted);
  transition: border-color 0.2s, background 0.2s;
}
.cms-side-filter:focus-within {
  background: var(--surface-2);
  border-color: rgba(217, 142, 104, 0.4);
  color: var(--accent-soft);
}
.cms-side-filter-input {
  width: 100%;
  background: transparent;
  border: 0;
  outline: none;
  color: var(--text);
  font-size: 11px;
}
.cms-side-filter-input::placeholder {
  color: var(--dim);
}

.cms-nav-tree {
  flex: 1;
  min-height: 0;
  padding: 14px 10px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(217, 142, 104, 0.3) var(--surface);
}
.cms-nav-tree::-webkit-scrollbar {
  width: 5px;
}
.cms-nav-tree::-webkit-scrollbar-track {
  background: var(--surface);
  border-radius: 99px;
  margin: 8px 0;
}
.cms-nav-tree::-webkit-scrollbar-thumb {
  background: rgba(217, 142, 104, 0.28);
  border-radius: 99px;
}
.cms-nav-tree::-webkit-scrollbar-thumb:hover {
  background: var(--accent);
}
.cms-nav-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.cms-nav-heading {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 10px;
  background: none;
  border: 0;
  font: inherit;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--muted);
  cursor: pointer;
  transition: color 0.15s;
}
.cms-nav-heading:hover { color: var(--text); }
.cms-nav-heading.accent { color: var(--accent); }
.cms-group-arrow {
  transition: transform 0.22s ease;
  opacity: 0.7;
}
.cms-nav-heading.collapsed .cms-group-arrow {
  transform: rotate(-90deg);
}

.cms-nav-list {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding-left: 6px;
  border-left: 1px solid var(--line);
  margin-left: 8px;
}
.cms-nav-item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 9px;
  border-radius: 8px;
  border: 1px solid transparent;
  font-size: 13px;
  color: var(--text-2);
  transition: background 0.16s ease, color 0.16s ease, border-color 0.16s ease;
}
.cms-nav-item:hover {
  background: var(--surface-2);
  color: var(--text);
}
.cms-nav-item.active {
  background: var(--surface-2);
  border-color: var(--line-2);
  color: var(--text);
  font-weight: 500;
}
.cms-nav-item.active::before {
  content: '';
  position: absolute;
  left: -7px;
  top: 6px;
  bottom: 6px;
  width: 2px;
  border-radius: 99px;
  background: var(--accent);
}
.cms-nav-item-left {
  display: flex;
  align-items: center;
  gap: 7px;
  min-width: 0;
}
.cms-nav-label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* HTTP Method Badges in Sidebar */
.cms-method-tag {
  padding: 1px 5px;
  border-radius: 4px;
  font-size: 9px;
  font-weight: 700;
  line-height: 14px;
  letter-spacing: 0.03em;
  flex-shrink: 0;
}
.m-post {
  background: rgba(74, 222, 128, 0.12);
  border: 1px solid rgba(74, 222, 128, 0.26);
  color: var(--ok);
}
.m-get {
  background: rgba(56, 189, 248, 0.12);
  border: 1px solid rgba(56, 189, 248, 0.26);
  color: #38bdf8;
}
.m-wss {
  background: rgba(245, 158, 11, 0.12);
  border: 1px solid rgba(245, 158, 11, 0.26);
  color: #fcd34d;
}
.m-doc {
  background: rgba(217, 142, 104, 0.12);
  border: 1px solid rgba(217, 142, 104, 0.25);
  color: var(--accent-soft);
}

.cms-nav-badge {
  padding: 0 5px;
  border-radius: 4px;
  background: rgba(217, 142, 104, 0.16);
  color: var(--accent-soft);
  font-size: 9.5px;
  font-weight: 600;
  line-height: 18px;
  flex-shrink: 0;
}

.dropdown-slide-enter-active,
.dropdown-slide-leave-active {
  transition: opacity 0.2s ease, transform 0.22s cubic-bezier(0.22, 1, 0.36, 1);
}
.dropdown-slide-enter-from,
.dropdown-slide-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

.cms-sidebar-footer {
  margin-top: auto;
  padding: 12px 16px;
  background: var(--bg);
  border-top: 1px solid var(--line);
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
}
.cms-version-info {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--muted);
  font-size: 11.5px;
}
.cms-version-dot {
  width: 6px;
  height: 6px;
  border-radius: 9999px;
  background: var(--accent);
}
.cms-status-link {
  color: var(--muted);
  font-size: 12px;
  transition: color 0.15s;
}
.cms-status-link:hover { color: var(--accent-soft); }

/* Main Content Center (#2:33) */
.cms-main {
  position: relative;
  padding: 48px 48px 96px;
  min-width: 0;
  overflow: hidden;
}
/* Subtle architectural grid plane matching HeroSection.vue */
.cms-bg-grid {
  position: absolute;
  inset: 0 0 auto 0;
  height: 420px;
  background-image:
    linear-gradient(90deg, rgba(255, 255, 255, 0.022) 1px, transparent 1px),
    linear-gradient(180deg, rgba(255, 255, 255, 0.022) 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: radial-gradient(ellipse 80% 70% at 50% 0%, #000 15%, transparent 75%);
  pointer-events: none;
}
.cms-article {
  position: relative;
  z-index: 1;
  max-width: 660px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 36px;
}

/* Breadcrumbs (#2:35) */
.cms-breadcrumbs {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12.5px;
  color: var(--muted);
}
.crumb-sep { color: var(--dim); }
.crumb-current { color: var(--accent-soft); font-weight: 500; }

/* Hero Header (#2:46) — Matching homepage typography */
.cms-hero {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.cms-hero-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}
.cms-hero h1 {
  font-size: clamp(30px, 3.6vw, 40px);
  line-height: 1.15;
  font-weight: 500;
  letter-spacing: -0.035em;
  color: var(--text);
}
.cms-copy-link-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: var(--surface-2);
  border: 1px solid var(--line-2);
  border-radius: 8px;
  color: var(--text-2);
  font: inherit;
  font-size: 12.5px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.18s ease, border-color 0.18s ease, color 0.18s ease;
}
.cms-copy-link-btn:hover {
  background: #1b1b1f;
  border-color: rgba(255, 255, 255, 0.16);
  color: var(--text);
}
.cms-hero-sub {
  font-size: 16px;
  line-height: 1.55;
  color: var(--text-2);
}

/* Enterprise Rails Banner Callout (#2:61) */
.cms-callout {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 18px 20px;
  background: var(--surface);
  border: 1px solid var(--line-2);
  border-left: 3px solid var(--accent);
  border-radius: 12px;
}
.cms-callout-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: var(--surface-2);
  border: 1px solid var(--line-2);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.cms-callout-text {
  font-size: 14px;
  line-height: 1.55;
  color: var(--text-2);
}
.cms-callout-text strong {
  color: var(--text);
  font-weight: 600;
}

/* Technical Description (#2:68) */
.cms-tech-desc {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.cms-body-p {
  font-size: 15px;
  line-height: 1.6;
  color: var(--text-2);
}
.cms-inline-code {
  padding: 2px 6px;
  background: var(--surface-2);
  border: 1px solid var(--line-2);
  border-radius: 5px;
  color: var(--accent-soft);
  font-size: 12px;
}
.cms-pillar-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0;
}
.cms-pillar-list li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 14.5px;
  line-height: 1.5;
  color: var(--text-2);
}
.cms-pillar-list li::before {
  content: '';
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  margin-top: 3px;
  background: var(--accent);
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M4 12.5l5 5L20 6.5'/%3E%3C/svg%3E") center / contain no-repeat;
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M4 12.5l5 5L20 6.5'/%3E%3C/svg%3E") center / contain no-repeat;
}
.cms-pillar-list strong {
  color: var(--text);
  font-weight: 600;
}

/* Sections */
.cms-section {
  padding-top: 16px;
  border-top: 1px solid var(--line);
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.cms-sec-header {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.cms-h2 {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 24px;
  line-height: 1.25;
  font-weight: 500;
  letter-spacing: -0.03em;
  color: var(--text);
}
.cms-hash {
  color: var(--accent);
  font-weight: 500;
}
.cms-sec-sub {
  font-size: 14.5px;
  line-height: 1.5;
  color: var(--muted);
}

/* Prerequisites (#2:89) */
.cms-prereq-box {
  padding: 22px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.cms-prereq-head {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--text);
}
.cms-prereq-ol {
  margin: 0;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 14px;
  line-height: 1.55;
  color: var(--text-2);
}
.cms-prereq-ol li::marker {
  color: var(--accent);
  font-family: var(--mono);
  font-size: 12px;
}
.cms-inline-link {
  color: var(--accent-soft);
  text-decoration: underline;
  text-underline-offset: 3px;
}
.cms-inline-code-dark {
  padding: 2px 6px;
  background: var(--surface-2);
  border: 1px solid var(--line-2);
  border-radius: 5px;
  color: var(--text);
  font-size: 12px;
}

/* Compliance Note (#2:107) */
.cms-compliance-box {
  padding: 22px;
  background: var(--surface);
  border: 1px solid var(--line-2);
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.cms-compliance-head {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14.5px;
  font-weight: 500;
  letter-spacing: -0.01em;
  color: var(--text);
}
.cms-compliance-p {
  font-size: 14px;
  line-height: 1.65;
  color: var(--text-2);
}
.cms-status-pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 1px 8px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 500;
  vertical-align: baseline;
}
.cms-status-pill.green {
  background: rgba(74, 222, 128, 0.1);
  border: 1px solid rgba(74, 222, 128, 0.24);
  color: var(--ok);
}
.cms-status-pill.green .pill-dot {
  width: 6px;
  height: 6px;
  border-radius: 9999px;
  background: var(--ok);
}
.cms-status-pill.amber {
  background: rgba(245, 158, 11, 0.1);
  border: 1px solid rgba(245, 158, 11, 0.24);
  color: #fcd34d;
}
.cms-status-pill.amber .pill-dot {
  width: 6px;
  height: 6px;
  border-radius: 9999px;
  background: #fbbf24;
}

/* Important Note (#2:130) */
.cms-important-note {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px;
  background: var(--surface);
  border: 1px solid var(--line-2);
  border-radius: 10px;
  font-size: 13px;
  line-height: 1.5;
  color: var(--muted);
}
.cms-note-dot {
  width: 7px;
  height: 7px;
  border-radius: 9999px;
  background: var(--accent);
  flex-shrink: 0;
}
.cms-amber-code {
  color: var(--accent-soft);
  font-size: 12px;
}

/* Feature Grid (#2:201) — Matching Homepage Pillar Cards */
.cms-feature-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.cms-feat-card {
  padding: 22px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: border-color 0.2s ease, background 0.2s ease;
}
.cms-feat-card:hover {
  border-color: var(--line-2);
  background: var(--surface-2);
}
.cms-feat-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--surface-2);
  border: 1px solid var(--line-2);
}
.cms-feat-icon.green {
  background: rgba(74, 222, 128, 0.1);
  border: 1px solid rgba(74, 222, 128, 0.24);
}
.cms-feat-icon.copper {
  background: rgba(217, 142, 104, 0.12);
  border: 1px solid rgba(217, 142, 104, 0.26);
}
.cms-feat-card h3 {
  font-size: 15.5px;
  font-weight: 500;
  letter-spacing: -0.015em;
  color: var(--text);
}
.cms-feat-card p {
  font-size: 13.5px;
  line-height: 1.5;
  color: var(--muted);
  flex: 1;
}
.cms-feat-event {
  font-size: 11.5px;
  color: var(--accent);
}

/* Metadata Box (#2:231) */
.cms-metadata-box {
  padding: 20px 22px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 14px;
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-2);
}
.cms-copper-code {
  padding: 2px 6px;
  background: var(--surface-2);
  border: 1px solid var(--line-2);
  border-radius: 5px;
  color: var(--accent-soft);
  font-size: 12px;
}

/* Pagination (#2:240) */
.cms-pagination {
  padding-top: 32px;
  border-top: 1px solid var(--line);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}
.cms-page-card {
  padding: 14px 18px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  transition: border-color 0.18s ease, background 0.18s ease;
}
.cms-page-card:hover {
  border-color: var(--line-2);
  background: var(--surface-2);
}
.cms-page-card.next { align-items: flex-end; text-align: right; }
.cms-page-dir {
  font-size: 12px;
  font-weight: 500;
  color: var(--muted);
}
.cms-page-title {
  font-size: 14px;
  font-weight: 500;
  color: var(--text);
}

/* Right Sidebar (#2:328) */
.cms-sidebar-right {
  position: sticky;
  top: 68px;
  height: calc(100vh - 68px);
  padding: 48px 24px;
  background: var(--bg);
  border-left: 1px solid var(--line);
}
.cms-toc-sticky {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.cms-toc-block {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.cms-toc-head {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11.5px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--muted);
}
.cms-toc-list {
  padding-left: 12px;
  border-left: 1px solid var(--line);
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.cms-toc-link {
  display: block;
  font-size: 13px;
  line-height: 1.4;
  color: var(--muted);
  transition: color 0.15s;
}
.cms-toc-link:hover { color: var(--text); }
.cms-toc-link.active {
  color: var(--accent-soft);
  font-weight: 500;
}

/* Feedback Widget (#2:346) */
.cms-feedback-card {
  padding: 16px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.cms-feedback-title {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-2);
}
.cms-feedback-btns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}
.cms-fb-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 7px 10px;
  background: var(--surface-2);
  border: 1px solid var(--line-2);
  border-radius: 8px;
  color: var(--text-2);
  font: inherit;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: border-color 0.16s, color 0.16s, background 0.16s;
}
.cms-fb-btn:hover {
  background: #1b1b1f;
  border-color: rgba(255, 255, 255, 0.18);
  color: var(--text);
}
.cms-feedback-thanks {
  font-size: 12px;
  color: var(--ok);
}

/* Quick Developer Actions (#2:358) */
.cms-quick-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.cms-quick-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12.5px;
  color: var(--muted);
  transition: color 0.15s;
}
.cms-quick-link:hover { color: var(--accent-soft); }

@media (max-width: 1100px) {
  .cms-layout { grid-template-columns: 280px minmax(0, 1fr); }
  .cms-sidebar-right { display: none; }
}
@media (max-width: 820px) {
  .cms-topbar { padding: 0 14px; }
  .cms-back-home, .cms-contact-btn, .cms-search-wrap { display: none; }
  .cms-mobile-search-btn, .cms-burger { display: inline-flex; }
  .cms-layout { grid-template-columns: 1fr; }
  .cms-sidebar-left {
    position: fixed;
    top: 68px;
    left: 0;
    z-index: 55;
    width: 290px;
    max-width: 85vw;
    transform: translateX(-104%);
    transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
    box-shadow: 24px 0 60px rgba(0, 0, 0, 0.85);
  }
  .cms-sidebar-left.is-mobile-open {
    transform: translateX(0);
  }
  .cms-main { padding: 28px 18px 64px; }
  .cms-feature-grid { grid-template-columns: 1fr; }
}
</style>
