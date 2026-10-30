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
              stroke="#8B95A5"
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
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EBAA89" stroke-width="2" aria-hidden="true">
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
                <strong>{{ p.b }}</strong>{{ p.t }}
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
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#EBAA89" stroke-width="2" aria-hidden="true">
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
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EBAA89" stroke-width="2" aria-hidden="true">
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
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34D399" stroke-width="2" aria-hidden="true">
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
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EBAA89" stroke-width="2" aria-hidden="true">
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
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8B95A5" stroke-width="2" aria-hidden="true">
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
  background: #0d0f12;
  color: #cbd5e1;
}

/* TopNavigationBar (#2:4) */
.cms-topbar {
  position: sticky;
  top: 0;
  z-index: 60;
  height: 64px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  background: rgba(12, 14, 18, 0.92);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid #212631;
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
  height: 20px;
  background: #212631;
}
.cms-docs-badge {
  padding: 2px 8px;
  border-radius: 4px;
  background: rgba(217, 142, 104, 0.1);
  border: 1px solid rgba(217, 142, 104, 0.25);
  color: #ebaa89;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
}
.cms-back-home {
  font-size: 12px;
  font-weight: 500;
  color: #8b95a5;
  padding-left: 4px;
  transition: color 0.15s;
  white-space: nowrap;
}
.cms-back-home:hover { color: #ebaa89; }

.cms-search-wrap {
  flex: 1;
  max-width: 448px;
}
.cms-search-box {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  background: #141820;
  border: 1px solid #242b38;
  border-radius: 8px;
  padding: 7px 12px;
  gap: 10px;
  font: inherit;
  cursor: pointer;
  text-align: left;
  transition: border-color 0.15s, box-shadow 0.2s;
}
.cms-search-box:hover {
  border-color: rgba(217, 142, 104, 0.45);
  box-shadow: 0 0 18px -6px rgba(217, 142, 104, 0.25);
}
.cms-search-ico { color: #64748b; flex-shrink: 0; }
.cms-search-placeholder {
  flex: 1;
  color: #64748b;
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.cms-kbd {
  padding: 2px 6px;
  background: #1c212c;
  border: 1px solid #2b3342;
  border-radius: 4px;
  font-size: 10px;
  color: #8b95a5;
}

.cms-topbar-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* Mobile Magnifying Glass ("Lupinha") */
.cms-mobile-search-btn {
  display: none;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: #141820;
  border: 1px solid #242b38;
  color: #ebaa89;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s, transform 0.2s;
}
.cms-mobile-search-btn:hover {
  border-color: rgba(217, 142, 104, 0.5);
  background: rgba(217, 142, 104, 0.12);
}
.cms-mobile-search-btn:active {
  transform: scale(0.93);
}

/* Animated Language Switcher Pill */
.cms-lang-switch {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 5px 3px 9px;
  background: #141820;
  border: 1px solid #242b38;
  border-radius: 999px;
  transition: border-color 0.25s, box-shadow 0.25s;
}
.cms-lang-switch:hover {
  border-color: rgba(217, 142, 104, 0.45);
  box-shadow: 0 0 18px -6px rgba(217, 142, 104, 0.35);
}
.cms-lang-globe {
  color: #ebaa89;
  transition: transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.cms-lang-switch[data-lang='en'] .cms-lang-globe {
  transform: rotate(180deg) scale(1.06);
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
  border-radius: 999px;
  background: linear-gradient(165deg, rgba(232, 169, 131, 0.26) 0%, rgba(217, 142, 104, 0.18) 100%);
  border: 1px solid rgba(217, 142, 104, 0.45);
  box-shadow: 0 2px 10px rgba(217, 142, 104, 0.25);
  transition: transform 0.38s cubic-bezier(0.34, 1.56, 0.64, 1);
  pointer-events: none;
}
.cms-lang-switch[data-lang='en'] .cms-lang-thumb {
  transform: translateX(100%);
}
.cms-lang-track button {
  position: relative;
  z-index: 1;
  padding: 3px 8px;
  background: none;
  border: 0;
  font: inherit;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: #64748b;
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
  padding: 7px 14px;
  border-radius: 6px;
  background: linear-gradient(167deg, #e8a983 0%, #d98e68 100%);
  color: #1a0e07;
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
  box-shadow: 0 4px 14px rgba(217, 142, 104, 0.2);
}

/* Animated Mobile Hamburger for CMS */
.cms-burger {
  display: none;
  position: relative;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: #141820;
  border: 1px solid #242b38;
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
  background: #e2e8f0;
  transition: transform 0.36s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.22s ease, background-color 0.25s;
}
.line-1 { transform: translateY(-5px); }
.line-2 { transform: translateY(0); }
.line-3 { transform: translateY(5px); }
.cms-burger.is-open .bar-line { background: #ebaa89; }
.cms-burger.is-open .line-1 { transform: translateY(0) rotate(45deg); }
.cms-burger.is-open .line-2 { opacity: 0; transform: scaleX(0.2); }
.cms-burger.is-open .line-3 { transform: translateY(0) rotate(-45deg); }

/* MainDocumentationLayout (#2:32) */
.cms-layout {
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 296px minmax(0, 1fr) 256px;
  align-items: start;
}

/* Left Sidebar (#2:249) — Enhanced API Explorer */
.cms-sidebar-left {
  position: sticky;
  top: 64px;
  height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
  background: #0b0d11;
  border-right: 1px solid #1d222b;
  overflow: hidden;
}
.cms-switcher-wrap {
  padding: 14px 14px 12px;
  border-bottom: 1px solid #1b2029;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.cms-switcher-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 9px 12px;
  background: linear-gradient(180deg, #161b24 0%, #12161e 100%);
  border: 1px solid #232b3a;
  border-radius: 10px;
  color: #f1f5f9;
  font: inherit;
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.cms-switcher-btn:hover,
.cms-switcher-btn.is-open {
  border-color: rgba(217, 142, 104, 0.45);
  box-shadow: 0 8px 24px -10px rgba(217, 142, 104, 0.28);
}
.cms-switcher-left {
  display: flex;
  align-items: center;
  gap: 10px;
}
.cms-switcher-icon {
  width: 26px;
  height: 26px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background: rgba(217, 142, 104, 0.14);
  border: 1px solid rgba(217, 142, 104, 0.3);
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
  color: #ebaa89;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.cms-switcher-title {
  font-size: 13px;
  font-weight: 600;
  color: #f1f5f9;
}
.cms-switcher-chevron {
  transition: transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.cms-switcher-btn.is-open .cms-switcher-chevron {
  transform: rotate(180deg);
  stroke: #ebaa89;
}

.cms-switcher-menu {
  background: #12161f;
  border: 1px solid rgba(217, 142, 104, 0.3);
  border-radius: 10px;
  padding: 6px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.6);
}
.cms-switcher-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 10px;
  border-radius: 7px;
  cursor: pointer;
  transition: background 0.15s;
}
.cms-switcher-option:hover {
  background: rgba(255, 255, 255, 0.04);
}
.cms-switcher-option.selected {
  background: rgba(217, 142, 104, 0.14);
}
.cms-switcher-option div {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.cms-switcher-option small {
  font-size: 9px;
  color: #8b95a5;
}
.cms-switcher-option strong {
  font-size: 12px;
  color: #f1f5f9;
}
.cms-mod-pill {
  padding: 2px 6px;
  border-radius: 4px;
  background: rgba(16, 185, 129, 0.12);
  border: 1px solid rgba(16, 185, 129, 0.25);
  color: #34d399;
  font-size: 9px;
  font-weight: 700;
}

/* Inline Sidebar Filter */
.cms-side-filter {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  background: #11151d;
  border: 1px solid #1e2431;
  border-radius: 7px;
  color: #64748b;
  transition: border-color 0.2s;
}
.cms-side-filter:focus-within {
  border-color: rgba(217, 142, 104, 0.45);
  color: #ebaa89;
}
.cms-side-filter-input {
  width: 100%;
  background: transparent;
  border: 0;
  outline: none;
  color: #e2e8f0;
  font-size: 11px;
}
.cms-side-filter-input::placeholder {
  color: #64748b;
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
  scrollbar-color: rgba(217, 142, 104, 0.32) rgba(15, 18, 25, 0.5);
}
.cms-nav-tree::-webkit-scrollbar {
  width: 5px;
}
.cms-nav-tree::-webkit-scrollbar-track {
  background: rgba(15, 18, 25, 0.5);
  border-radius: 99px;
  margin: 8px 0;
}
.cms-nav-tree::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, rgba(232, 169, 131, 0.42) 0%, rgba(217, 142, 104, 0.22) 100%);
  border-radius: 99px;
  border: 1px solid rgba(217, 142, 104, 0.25);
}
.cms-nav-tree::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #e8a983 0%, #d98e68 100%);
  box-shadow: 0 0 8px rgba(217, 142, 104, 0.55);
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
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: #8b95a5;
  cursor: pointer;
  transition: color 0.15s;
}
.cms-nav-heading:hover { color: #e2e8f0; }
.cms-nav-heading.accent { color: #d98e68; }
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
  border-left: 1px solid #181d26;
  margin-left: 8px;
}
.cms-nav-item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 9px;
  border-radius: 7px;
  border: 1px solid transparent;
  font-size: 12.5px;
  color: #cbd5e1;
  transition: background 0.18s, color 0.18s, transform 0.18s, border-color 0.18s;
}
.cms-nav-item:hover {
  background: rgba(255, 255, 255, 0.035);
  color: #f8fafc;
  transform: translateX(2px);
}
.cms-nav-item.active {
  background: linear-gradient(90deg, rgba(217, 142, 104, 0.16) 0%, rgba(217, 142, 104, 0.05) 100%);
  border-color: rgba(217, 142, 104, 0.3);
  color: #ebaa89;
  font-weight: 600;
}
.cms-nav-item.active::before {
  content: '';
  position: absolute;
  left: -7px;
  top: 6px;
  bottom: 6px;
  width: 2.5px;
  border-radius: 99px;
  background: #ebaa89;
  box-shadow: 0 0 8px #ebaa89;
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
  background: rgba(16, 185, 129, 0.14);
  border: 1px solid rgba(16, 185, 129, 0.3);
  color: #34d399;
}
.m-get {
  background: rgba(56, 189, 248, 0.14);
  border: 1px solid rgba(56, 189, 248, 0.3);
  color: #38bdf8;
}
.m-wss {
  background: rgba(245, 158, 11, 0.14);
  border: 1px solid rgba(245, 158, 11, 0.3);
  color: #fcd34d;
}
.m-doc {
  background: rgba(217, 142, 104, 0.13);
  border: 1px solid rgba(217, 142, 104, 0.26);
  color: #ebaa89;
}

.cms-nav-badge {
  padding: 0 5px;
  border-radius: 4px;
  background: rgba(217, 142, 104, 0.2);
  color: #d98e68;
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
  background: #0b0d11;
  border-top: 1px solid #1c212a;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
}
.cms-version-info {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #64748b;
  font-size: 11.5px;
}
.cms-version-dot {
  width: 7px;
  height: 7px;
  border-radius: 9999px;
  background: #d98e68;
}
.cms-status-link {
  color: #8b95a5;
  font-size: 12px;
}
.cms-status-link:hover { color: #ebaa89; }

/* Main Content Center (#2:33) */
.cms-main {
  padding: 48px 48px 96px;
  min-width: 0;
}
.cms-article {
  max-width: 640px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

/* Breadcrumbs (#2:35) */
.cms-breadcrumbs {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #8b95a5;
}
.crumb-sep { color: #64748b; }
.crumb-current { color: #ebaa89; font-weight: 500; }

/* Hero Header (#2:46) */
.cms-hero {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.cms-hero-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}
.cms-hero h1 {
  font-size: 36px;
  line-height: 40px;
  font-weight: 700;
  letter-spacing: -0.025em;
  color: #f8fafc;
}
.cms-copy-link-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 13px;
  background: #141820;
  border: 1px solid #242b38;
  border-radius: 6px;
  color: #cbd5e1;
  font: inherit;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
}
.cms-copy-link-btn:hover { border-color: #d98e68; color: #ebaa89; }
.cms-hero-sub {
  font-size: 16px;
  line-height: 26px;
  color: #8b95a5;
}

/* Enterprise Rails Banner Callout (#2:61) */
.cms-callout {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px 16px 16px 20px;
  background: rgba(217, 142, 104, 0.08);
  border-left: 4px solid #d98e68;
  border-radius: 0 8px 8px 0;
}
.cms-callout-icon {
  padding: 4px;
  border-radius: 4px;
  background: rgba(217, 142, 104, 0.2);
  display: inline-flex;
  flex-shrink: 0;
}
.cms-callout-text {
  font-size: 14px;
  line-height: 20px;
  color: #e2e8f0;
}
.cms-callout-text strong {
  color: #ebaa89;
  font-weight: 700;
}

/* Technical Description (#2:68) */
.cms-tech-desc {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.cms-body-p {
  font-size: 15px;
  line-height: 24px;
  color: #cbd5e1;
}
.cms-inline-code {
  padding: 2px 6px;
  background: #161b24;
  border: 1px solid #262f3f;
  border-radius: 4px;
  color: #ebaa89;
  font-size: 12px;
}
.cms-pillar-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-left: 20px;
}
.cms-pillar-list li {
  position: relative;
  font-size: 14.5px;
  line-height: 22px;
  color: #94a3b8;
}
.cms-pillar-list li::before {
  content: '•';
  position: absolute;
  left: -16px;
  color: #d98e68;
  font-weight: 700;
}
.cms-pillar-list strong {
  color: #cbd5e1;
  font-weight: 700;
}

/* Sections */
.cms-section {
  padding-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
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
  font-size: 22px;
  line-height: 30px;
  font-weight: 700;
  letter-spacing: -0.025em;
  color: #f8fafc;
}
.cms-hash {
  color: #d98e68;
  font-weight: 600;
}
.cms-sec-sub {
  font-size: 14px;
  line-height: 20px;
  color: #8b95a5;
}

/* Prerequisites (#2:89) */
.cms-prereq-box {
  padding: 20px;
  background: #12151c;
  border: 1px solid #212631;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.cms-prereq-head {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #cbd5e1;
}
.cms-prereq-ol {
  margin: 0;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 14px;
  line-height: 20px;
  color: #cbd5e1;
}
.cms-prereq-ol li::marker {
  color: #ebaa89;
  font-family: var(--mono);
  font-size: 12px;
}
.cms-inline-link {
  color: #ebaa89;
  text-decoration: underline;
  text-underline-offset: 3px;
}
.cms-inline-code-dark {
  padding: 2px 5px;
  background: #1a1f29;
  border-radius: 4px;
  color: #cbd5e1;
  font-size: 12px;
}

/* Compliance Note (#2:107) */
.cms-compliance-box {
  padding: 20px;
  background: #101319;
  border: 1px solid #262f3f;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.cms-compliance-head {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #f1f5f9;
}
.cms-compliance-p {
  font-size: 14px;
  line-height: 24px;
  color: #cbd5e1;
}
.cms-status-pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 1px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  vertical-align: baseline;
}
.cms-status-pill.green {
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.22);
  color: #34d399;
}
.cms-status-pill.green .pill-dot {
  width: 6px;
  height: 6px;
  border-radius: 9999px;
  background: #10b981;
}
.cms-status-pill.amber {
  background: rgba(245, 158, 11, 0.1);
  border: 1px solid rgba(245, 158, 11, 0.22);
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
  padding: 14px;
  background: #12161f;
  border: 1px solid #282f3d;
  border-radius: 8px;
  font-size: 12.5px;
  line-height: 18px;
  color: #8b95a5;
}
.cms-note-dot {
  width: 8px;
  height: 8px;
  border-radius: 9999px;
  background: #d98e68;
  flex-shrink: 0;
}
.cms-amber-code {
  color: #fcd34d;
  font-size: 12px;
}

/* Feature Grid (#2:201) */
.cms-feature-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.cms-feat-card {
  padding: 20px;
  background: #12161f;
  border: 1px solid #212631;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.cms-feat-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.cms-feat-icon.green {
  background: rgba(16, 185, 129, 0.15);
  border: 1px solid rgba(16, 185, 129, 0.3);
}
.cms-feat-icon.copper {
  background: rgba(217, 142, 104, 0.12);
  border: 1px solid rgba(217, 142, 104, 0.25);
}
.cms-feat-card h3 {
  font-size: 15px;
  font-weight: 700;
  color: #f8fafc;
}
.cms-feat-card p {
  font-size: 13.5px;
  line-height: 20px;
  color: #8b95a5;
  flex: 1;
}
.cms-feat-event {
  font-size: 11.5px;
  color: #d98e68;
}

/* Metadata Box (#2:231) */
.cms-metadata-box {
  padding: 18px 20px;
  background: #12161f;
  border: 1px solid #212631;
  border-radius: 12px;
  font-size: 14px;
  line-height: 22px;
  color: #cbd5e1;
}
.cms-copper-code {
  padding: 1px 6px;
  background: rgba(217, 142, 104, 0.15);
  border-radius: 4px;
  color: #ebaa89;
  font-size: 12px;
}

/* Pagination (#2:240) */
.cms-pagination {
  padding-top: 32px;
  border-top: 1px solid #212631;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}
.cms-page-card {
  padding: 12px 16px;
  border: 1px solid #212836;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  transition: border-color 0.15s, background 0.15s;
}
.cms-page-card:hover {
  border-color: rgba(217, 142, 104, 0.4);
  background: rgba(217, 142, 104, 0.04);
}
.cms-page-card.next { align-items: flex-end; text-align: right; }
.cms-page-dir {
  font-size: 12px;
  font-weight: 500;
  color: #64748b;
}
.cms-page-title {
  font-size: 14px;
  font-weight: 600;
  color: #cbd5e1;
}

/* Right Sidebar (#2:328) */
.cms-sidebar-right {
  position: sticky;
  top: 64px;
  height: calc(100vh - 64px);
  padding: 48px 24px;
  background: #0c0f14;
  border-left: 1px solid #1d222b;
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
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #8b95a5;
}
.cms-toc-list {
  padding-left: 12px;
  border-left: 1px solid #1f2633;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.cms-toc-link {
  display: block;
  font-size: 12.5px;
  line-height: 16px;
  color: #8b95a5;
  transition: color 0.15s;
}
.cms-toc-link:hover { color: #e2e8f0; }
.cms-toc-link.active {
  color: #ebaa89;
  font-weight: 500;
}

/* Feedback Widget (#2:346) */
.cms-feedback-card {
  padding: 16px;
  background: #12161f;
  border: 1px solid #212631;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.cms-feedback-title {
  font-size: 13px;
  font-weight: 600;
  color: #cbd5e1;
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
  padding: 6px 10px;
  background: #191f2b;
  border: 1px solid #262f40;
  border-radius: 6px;
  color: #cbd5e1;
  font: inherit;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
}
.cms-fb-btn:hover { border-color: #d98e68; color: #f8fafc; }
.cms-feedback-thanks {
  font-size: 12px;
  color: #34d399;
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
  font-size: 12px;
  color: #8b95a5;
  transition: color 0.15s;
}
.cms-quick-link:hover { color: #ebaa89; }

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
    top: 64px;
    left: 0;
    z-index: 55;
    width: 290px;
    max-width: 85vw;
    transform: translateX(-104%);
    transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
    box-shadow: 24px 0 60px rgba(0, 0, 0, 0.75);
  }
  .cms-sidebar-left.is-mobile-open {
    transform: translateX(0);
  }
  .cms-main { padding: 28px 18px 64px; }
  .cms-feature-grid { grid-template-columns: 1fr; }
}
</style>
