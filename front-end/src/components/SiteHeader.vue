<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from "vue";
import { lang, setLang, t, navigateTo } from "../i18n";

const hrefs = [
  "#pagamentos",
  "#contas",
  "#como-funciona",
  "#compliance",
  "#api",
];
const links = computed(() =>
  t("nav.links").map((label, i) => ({ label, href: hrefs[i] })),
);
const open = ref(false);
const activeMenu = ref(null);
const isScrolled = ref(false);
let closeTimer = null;

function onScroll() {
  isScrolled.value = window.scrollY > 8;
}

onMounted(() => {
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
});

function openMenu(key) {
  clearTimeout(closeTimer);
  activeMenu.value = key;
}
function scheduleClose() {
  clearTimeout(closeTimer);
  closeTimer = setTimeout(() => {
    activeMenu.value = null;
  }, 140);
}
function goAnchor(href) {
  activeMenu.value = null;
  open.value = false;
  if (href === "#cms") {
    navigateTo("cms");
  }
}

const megaMenus = computed(() =>
  lang.value === "pt"
    ? {
        products: {
          leftTitle: "Recursos Principais",
          rightTitle: "Cross-Border & Tesouraria",
          left: [
            {
              title: "Global Payments",
              desc: "Envie e receba pagamentos internacionais entre moedas",
              href: "#pagamentos",
              icon: "network",
            },
            {
              title: "Global Accounts",
              desc: "Contas virtuais nomeadas em USD, EUR e carteiras",
              href: "#contas",
              icon: "wallet",
            },
            {
              title: "Compliance",
              desc: "Escale globalmente com KYB, KYC e KYT integrados",
              href: "#compliance",
              icon: "shield",
            },
          ],
          right: [
            {
              title: "SWIFT & Trilhos Locais",
              desc: "Pix, ACH, SEPA e Fedwire integrados à mesma operação",
              href: "#pagamentos",
              icon: "globe",
            },
            {
              title: "Stablecoin Gateway",
              desc: "Liquidez em USDC e USDT com conversão transparente",
              href: "#como-funciona",
              icon: "coins",
            },
          ],
        },
        platform: {
          leftTitle: "Arquitetura Operacional",
          rightTitle: "Governança & Controle",
          left: [
            {
              title: "Como Funciona",
              desc: "Quatro etapas claras com infraestrutura coordenada",
              href: "#como-funciona",
              icon: "layers",
            },
            {
              title: "Console em Tempo Real",
              desc: "Acompanhe cotações, saldos e liquidações T+0",
              href: "#console",
              icon: "terminal",
            },
            {
              title: "Aplicações Setoriais",
              desc: "Comércio exterior, SaaS global e embedded finance",
              href: "#mercado",
              icon: "briefcase",
            },
          ],
          right: [
            {
              title: "Matriz de Compliance",
              desc: "Screening contínuo OFAC, PEP, UBO e monitoramento",
              href: "#compliance",
              icon: "check-shield",
            },
            {
              title: "Status dos Corredores",
              desc: "Verifique a disponibilidade dos trilhos em tempo real",
              href: "#contato",
              icon: "status",
            },
          ],
        },
        devs: {
          leftTitle: "Comece a Integrar",
          rightTitle: "Integre com",
          left: [
            {
              title: "Documentação",
              desc: "Construa sobre a infraestrutura da API ALL X",
              href: "#cms",
              icon: "doc",
            },
            {
              title: "Referência da API",
              desc: "Explore nossos endpoints REST para integração",
              href: "#api",
              icon: "branch",
            },
            {
              title: "Webhooks & Eventos",
              desc: "Conciliação automática de recebimentos e payouts",
              href: "#cms",
              icon: "webhook",
            },
          ],
          sdks: ["TS", "Py", "Go", "PHP", "cURL"],
          cards: [
            {
              title: "White-Label Core",
              desc: "Embuta contas e pagamentos no seu produto",
              href: "#cms",
            },
            {
              title: "Sandbox API",
              desc: "Ambiente isolado para testes de liquidação",
              href: "#cms",
            },
          ],
        },
      }
    : {
        products: {
          leftTitle: "Core Features",
          rightTitle: "Cross-Border & Treasury",
          left: [
            {
              title: "Global Payments",
              desc: "Send and receive money across borders seamlessly",
              href: "#pagamentos",
              icon: "network",
            },
            {
              title: "Global Accounts",
              desc: "Create named accounts in multiple currencies",
              href: "#contas",
              icon: "wallet",
            },
            {
              title: "Compliance",
              desc: "Scale globally with built-in KYC, KYB and KYT",
              href: "#compliance",
              icon: "shield",
            },
          ],
          right: [
            {
              title: "SWIFT & Local Rails",
              desc: "Pix, ACH, SEPA and Fedwire in your customer’s name",
              href: "#pagamentos",
              icon: "globe",
            },
            {
              title: "Stablecoin Gateway",
              desc: "Multi-chain USDC and USDT liquidity with live quotes",
              href: "#como-funciona",
              icon: "coins",
            },
          ],
        },
        platform: {
          leftTitle: "Operational Architecture",
          rightTitle: "Governance & Control",
          left: [
            {
              title: "How It Works",
              desc: "Four visible steps with coordinated infrastructure",
              href: "#como-funciona",
              icon: "layers",
            },
            {
              title: "Live Console",
              desc: "Track locked quotes, balances and T+0 settlements",
              href: "#console",
              icon: "terminal",
            },
            {
              title: "Use Cases",
              desc: "Global trade, SaaS payroll and embedded finance",
              href: "#mercado",
              icon: "briefcase",
            },
          ],
          right: [
            {
              title: "Compliance Matrix",
              desc: "Continuous OFAC, PEP, UBO and KYT monitoring",
              href: "#compliance",
              icon: "check-shield",
            },
            {
              title: "System Status",
              desc: "Check real-time payment rail performance",
              href: "#contato",
              icon: "status",
            },
          ],
        },
        devs: {
          leftTitle: "Start Building",
          rightTitle: "Integrate With",
          left: [
            {
              title: "Documentation",
              desc: "Build on the ALL X API infrastructure",
              href: "#cms",
              icon: "doc",
            },
            {
              title: "API Reference",
              desc: "Explore and master our REST API for integration",
              href: "#api",
              icon: "branch",
            },
            {
              title: "Webhooks & Events",
              desc: "Automated reconciliation for pay-ins and payouts",
              href: "#cms",
              icon: "webhook",
            },
          ],
          sdks: ["TS", "Py", "Go", "PHP", "cURL"],
          cards: [
            {
              title: "White-Label Core",
              desc: "Embed global accounts & payments into your app",
              href: "#cms",
            },
            {
              title: "API Sandbox",
              desc: "Isolated environment for end-to-end testing",
              href: "#cms",
            },
          ],
        },
      },
);
</script>

<template>
  <header
    class="header"
    :class="{ 'is-scrolled': isScrolled }"
    @mouseleave="scheduleClose"
  >
    <div class="bar container-wide">
      <a href="#" :aria-label="t('nav.home')"
        ><img src="/logo.png" alt="ALL X" width="100" height="24"
      /></a>

      <nav class="links" :aria-label="t('nav.main')">
        <!-- Trigger 1: Pagamentos & Contas (Products Mega-Menu) -->
        <a
          :href="links[0].href"
          class="nav-item"
          :class="{ active: activeMenu === 'products' }"
          @mouseenter="openMenu('products')"
          @focus="openMenu('products')"
        >
          {{ links[0].label }}
        </a>

        <a
          :href="links[1].href"
          class="nav-item"
          @mouseenter="openMenu('products')"
          @focus="openMenu('products')"
        >
          {{ links[1].label }}
        </a>

        <!-- Trigger 2: Como funciona & Compliance (Platform Mega-Menu) -->
        <a
          :href="links[2].href"
          class="nav-item"
          :class="{ active: activeMenu === 'platform' }"
          @mouseenter="openMenu('platform')"
          @focus="openMenu('platform')"
        >
          {{ links[2].label }}
        </a>

        <a
          :href="links[3].href"
          class="nav-item"
          @mouseenter="openMenu('platform')"
          @focus="openMenu('platform')"
        >
          {{ links[3].label }}
        </a>

        <!-- Trigger 3: API & Developers Mega-Menu -->
        <a
          :href="links[4].href"
          class="nav-item"
          :class="{ active: activeMenu === 'devs' }"
          @mouseenter="openMenu('devs')"
          @focus="openMenu('devs')"
        >
          {{ links[4].label }}
        </a>
      </nav>

      <div class="actions">
        <!-- Animated sliding pill language switcher -->
        <div
          class="lang-switch"
          role="group"
          :aria-label="t('nav.lang')"
          :data-lang="lang"
        >
          <svg
            class="lang-globe"
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.9"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <path
              d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
            />
          </svg>
          <div class="lang-track">
            <span class="lang-thumb" aria-hidden="true" />
            <button
              type="button"
              :class="{ on: lang === 'pt' }"
              :aria-pressed="lang === 'pt'"
              lang="pt"
              @click="setLang('pt')"
            >
              PT
            </button>
            <button
              type="button"
              :class="{ on: lang === 'en' }"
              :aria-pressed="lang === 'en'"
              lang="en"
              @click="setLang('en')"
            >
              EN
            </button>
          </div>
        </div>

        <a href="#cms" class="sandbox" @click.prevent="navigateTo('cms')">{{
          t("nav.sandbox")
        }}</a>
        <a href="#contato" class="cta">{{ t("nav.contact") }}</a>

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

    <!-- BlindPay-inspired Functional Minimalist Hover Mega-Menu -->
    <Transition name="mega-pop">
      <div
        v-if="activeMenu"
        class="mega-wrap"
        @mouseenter="openMenu(activeMenu)"
        @mouseleave="scheduleClose"
      >
        <div class="mega-card">
          <!-- PRODUCTS OR PLATFORM 2-COLUMN MENU -->
          <template
            v-if="activeMenu === 'products' || activeMenu === 'platform'"
          >
            <div class="mega-col">
              <span class="mega-heading">{{
                megaMenus[activeMenu].leftTitle
              }}</span>
              <a
                v-for="item in megaMenus[activeMenu].left"
                :key="item.title"
                :href="item.href"
                class="mega-item"
                @click="goAnchor(item.href)"
              >
                <span class="mega-icon" aria-hidden="true">
                  <!-- Network / Global Payments -->
                  <svg
                    v-if="item.icon === 'network'"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="12" cy="5" r="2.5" />
                    <circle cx="5" cy="19" r="2.5" />
                    <circle cx="19" cy="19" r="2.5" />
                    <path d="M10.5 7.2 6.5 16.8M13.5 7.2l4 9.6M7.5 19h9" />
                  </svg>
                  <!-- Wallet / Accounts -->
                  <svg
                    v-else-if="item.icon === 'wallet'"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="3" />
                    <path d="M3 10h18M16 14h2" />
                  </svg>
                  <!-- Shield / Compliance -->
                  <svg
                    v-else-if="item.icon === 'shield'"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M12 3l7 3v5c0 4.5-3 8.3-7 9.5-4-1.2-7-5-7-9.5V6l7-3z"
                    />
                    <path d="M12 8v5M12 16h.01" />
                  </svg>
                  <!-- Layers / How it works -->
                  <svg
                    v-else-if="item.icon === 'layers'"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="m12 3 9 4.5-9 4.5-9-4.5L12 3zM3 12l9 4.5 9-4.5M3 16.5 12 21l9-4.5"
                    />
                  </svg>
                  <!-- Terminal / Console -->
                  <svg
                    v-else-if="item.icon === 'terminal'"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <rect x="3" y="4" width="18" height="16" rx="3" />
                    <path d="m8 10 3 2.5L8 15M13 15h3" />
                  </svg>
                  <!-- Briefcase / Use cases -->
                  <svg
                    v-else
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <rect x="3" y="7" width="18" height="13" rx="2.5" />
                    <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18" />
                  </svg>
                </span>
                <div class="mega-copy">
                  <strong>{{ item.title }}</strong>
                  <span>{{ item.desc }}</span>
                </div>
              </a>
            </div>

            <div class="mega-col mega-col-right">
              <span class="mega-heading">{{
                megaMenus[activeMenu].rightTitle
              }}</span>
              <a
                v-for="item in megaMenus[activeMenu].right"
                :key="item.title"
                :href="item.href"
                class="mega-item"
                @click="goAnchor(item.href)"
              >
                <span class="mega-icon" aria-hidden="true">
                  <!-- Globe / SWIFT -->
                  <svg
                    v-if="item.icon === 'globe'"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path
                      d="M3 12h18M12 3a14.5 14.5 0 0 1 0 18M12 3a14.5 14.5 0 0 0 0 18"
                    />
                  </svg>
                  <!-- Coins / Stablecoins -->
                  <svg
                    v-else-if="item.icon === 'coins'"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="9.5" cy="9.5" r="5.5" />
                    <path d="M14.5 9.5a5.5 5.5 0 1 1-5 5" />
                  </svg>
                  <!-- Check Shield -->
                  <svg
                    v-else-if="item.icon === 'check-shield'"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M12 3l7 3v5c0 4.5-3 8.3-7 9.5-4-1.2-7-5-7-9.5V6l7-3z"
                    />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  <!-- Status Signal -->
                  <svg
                    v-else
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <rect x="3" y="4" width="18" height="16" rx="3" />
                    <path
                      d="M8.5 14.5a5 5 0 0 1 7 0M6 12a8.5 8.5 0 0 1 12 0M12 17h.01"
                    />
                  </svg>
                </span>
                <div class="mega-copy">
                  <strong>{{ item.title }}</strong>
                  <span>{{ item.desc }}</span>
                </div>
              </a>
            </div>
          </template>

          <!-- DEVELOPERS 2-COLUMN MENU (Start Building + SDKs & Cards) -->
          <template v-else-if="activeMenu === 'devs'">
            <div class="mega-col">
              <span class="mega-heading">{{ megaMenus.devs.leftTitle }}</span>
              <a
                v-for="item in megaMenus.devs.left"
                :key="item.title"
                :href="item.href"
                class="mega-item"
                @click.prevent="
                  item.href === '#cms'
                    ? ((activeMenu = null), navigateTo('cms'))
                    : goAnchor(item.href)
                "
              >
                <span class="mega-icon" aria-hidden="true">
                  <svg
                    v-if="item.icon === 'doc'"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <rect x="5" y="3" width="14" height="18" rx="2.5" />
                    <path d="M9 8h6M9 12h6M9 16h4" />
                  </svg>
                  <svg
                    v-else-if="item.icon === 'branch'"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="6" cy="6" r="2.5" />
                    <circle cx="18" cy="8" r="2.5" />
                    <circle cx="6" cy="18" r="2.5" />
                    <path d="M6 8.5v7M8.5 6H13a2.5 2.5 0 0 1 2.5 2.5" />
                  </svg>
                  <svg
                    v-else
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="3" />
                    <path d="M9 12h6M12 9v6" />
                  </svg>
                </span>
                <div class="mega-copy">
                  <strong>{{ item.title }}</strong>
                  <span>{{ item.desc }}</span>
                </div>
              </a>
            </div>

            <div class="mega-col mega-col-right">
              <span class="mega-heading">{{ megaMenus.devs.rightTitle }}</span>
              <div class="sdk-row">
                <a
                  v-for="sdk in megaMenus.devs.sdks"
                  :key="sdk"
                  href="#cms"
                  class="sdk-box mono"
                  @click.prevent="
                    activeMenu = null;
                    navigateTo('cms');
                  "
                >
                  {{ sdk }}
                </a>
              </div>
              <div class="dev-cards">
                <a
                  v-for="card in megaMenus.devs.cards"
                  :key="card.title"
                  :href="card.href"
                  class="dev-subcard"
                  @click.prevent="
                    activeMenu = null;
                    navigateTo('cms');
                  "
                >
                  <strong>{{ card.title }}</strong>
                  <span>{{ card.desc }}</span>
                </a>
              </div>
            </div>
          </template>
        </div>
      </div>
    </Transition>

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
        <a
          href="#cms"
          :style="{ '--i': links.length }"
          @click.prevent="
            open = false;
            navigateTo('cms');
          "
        >
          {{ t("nav.sandbox") }}
        </a>
        <div class="mobile-bottom" :style="{ '--i': links.length + 1 }">
          <a href="#contato" class="cta mobile-cta" @click="open = false">{{
            t("nav.contact")
          }}</a>
        </div>
      </nav>
    </Transition>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  left: 0;
  right: 0;
  width: 100%;
  top: 0;
  z-index: 100;
  background: rgba(5, 5, 6, 0.72);
  -webkit-backdrop-filter: blur(20px);
  transition:
    background 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease;
  backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--line);
}
.header.is-scrolled {
  background: rgba(5, 5, 6, 0.85);
  border-bottom-color: rgba(255, 255, 255, 0.09);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
}
.container-wide {
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 clamp(20px, 4vw, 48px);
}
.bar {
  height: 68px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 24px;
}
.bar > a:first-child {
  justify-self: start;
}
.links {
  display: flex;
  align-items: center;
  gap: 6px;
}
.nav-item {
  padding: 7px 14px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: -0.01em;
  color: rgba(244, 244, 245, 0.78);
  transition:
    color 0.16s ease,
    background 0.16s ease;
  white-space: nowrap;
}
.nav-item:hover,
.nav-item.active {
  color: #fff;
  background: var(--surface-2);
}
.actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  justify-self: end;
}

/* BlindPay-inspired Hover Mega-Menu */
.mega-wrap {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding-top: 10px;
  z-index: 80;
  width: min(680px, calc(100vw - 32px));
}
.mega-card {
  display: grid;
  grid-template-columns: 1.08fr 1fr;
  background: #0b0b0e;
  border: 1px solid var(--line-2);
  border-radius: 16px;
  padding: 6px;
  box-shadow:
    0 28px 60px -16px rgba(0, 0, 0, 0.85),
    0 0 0 1px rgba(255, 255, 255, 0.03);
}
.mega-col {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.mega-col-right {
  border-left: 1px solid var(--line);
}
.mega-heading {
  font-size: 12px;
  font-weight: 500;
  color: var(--muted);
  padding: 0 8px 8px;
}
.mega-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 10px 10px;
  border-radius: 10px;
  transition: background 0.16s ease;
}
.mega-item:hover {
  background: var(--surface-2);
}
.mega-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: var(--surface-2);
  border: 1px solid var(--line-2);
  display: grid;
  place-items: center;
  color: var(--text-2);
  flex-shrink: 0;
  transition:
    color 0.16s ease,
    border-color 0.16s ease,
    background 0.16s ease;
}
.mega-item:hover .mega-icon {
  color: var(--accent-soft);
  border-color: rgba(217, 142, 104, 0.35);
  background: #19191e;
}
.mega-copy {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}
.mega-copy strong {
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
  letter-spacing: -0.01em;
}
.mega-copy span {
  font-size: 12.5px;
  line-height: 1.4;
  color: var(--muted);
}

/* Developers Right Column (SDKs + Cards) */
.sdk-row {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
  padding: 2px 4px 10px;
}
.sdk-box {
  height: 40px;
  border-radius: 9px;
  background: var(--surface-2);
  border: 1px solid var(--line-2);
  display: grid;
  place-items: center;
  font-size: 11.5px;
  font-weight: 700;
  color: var(--text-2);
  transition:
    border-color 0.16s,
    color 0.16s,
    background 0.16s;
}
.sdk-box:hover {
  border-color: rgba(217, 142, 104, 0.4);
  color: var(--accent-soft);
  background: #19191e;
}
.dev-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  padding: 0 4px;
}
.dev-subcard {
  padding: 12px;
  border-radius: 10px;
  background: var(--surface);
  border: 1px solid var(--line);
  display: flex;
  flex-direction: column;
  gap: 4px;
  transition:
    background 0.16s,
    border-color 0.16s;
}
.dev-subcard:hover {
  background: var(--surface-2);
  border-color: var(--line-2);
}
.dev-subcard strong {
  font-size: 13px;
  font-weight: 600;
  color: var(--text);
}
.dev-subcard span {
  font-size: 12px;
  line-height: 1.4;
  color: var(--muted);
}

.mega-pop-enter-active,
.mega-pop-leave-active {
  transition:
    opacity 0.16s ease,
    transform 0.18s cubic-bezier(0.22, 1, 0.36, 1);
}
.mega-pop-enter-from,
.mega-pop-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-6px) scale(0.985);
}

/* Animated Language Switcher Pill */
.lang-switch {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 4px 3px 10px;
  background: var(--surface);
  border: 1px solid var(--line-2);
  border-radius: 8px;
  transition: border-color 0.25s;
}
.lang-switch:hover {
  border-color: rgba(255, 255, 255, 0.2);
}
.lang-globe {
  color: var(--text-2);
  transition: transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.lang-switch[data-lang="en"] .lang-globe {
  transform: rotate(180deg);
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
  border-radius: 5px;
  background: #222226;
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: transform 0.38s cubic-bezier(0.34, 1.56, 0.64, 1);
  pointer-events: none;
}
.lang-switch[data-lang="en"] .lang-thumb {
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
  transition:
    color 0.25s,
    transform 0.2s;
}
.lang-track button.on {
  color: #f8fafc;
}
.lang-track button:active {
  transform: scale(0.92);
}

.sandbox {
  padding: 8px 12px;
  font-size: 13.5px;
  font-weight: 500;
  color: rgba(244, 244, 245, 0.78);
  border-radius: 8px;
  white-space: nowrap;
  transition: color 0.2s;
}
.sandbox:hover {
  color: #fff;
}
.cta {
  padding: 9px 16px;
  border-radius: 8px;
  font-size: 13.5px;
  font-weight: 500;
  white-space: nowrap;
  color: var(--on-accent);
  background: var(--accent);
  transition: background 0.2s;
}
.cta:hover {
  background: var(--accent-soft);
}

/* Animated Hamburger Button */
.burger {
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
  transition:
    border-color 0.25s,
    background 0.25s;
}
.burger:hover,
.burger.is-open {
  border-color: rgba(255, 255, 255, 0.2);
  background: var(--surface-2);
}
.bar-line {
  position: absolute;
  width: 18px;
  height: 2px;
  border-radius: 2px;
  background: var(--text);
  transition:
    transform 0.36s cubic-bezier(0.34, 1.56, 0.64, 1),
    opacity 0.22s ease,
    background-color 0.25s;
}
.line-1 {
  transform: translateY(-6px);
}
.line-2 {
  transform: translateY(0);
}
.line-3 {
  transform: translateY(6px);
}

.burger.is-open .bar-line {
  background: var(--text);
}
.burger.is-open .line-1 {
  transform: translateY(0) rotate(45deg);
}
.burger.is-open .line-2 {
  opacity: 0;
  transform: scaleX(0.2);
}
.burger.is-open .line-3 {
  transform: translateY(0) rotate(-45deg);
}

/* Mobile Drawer */
.mobile {
  display: flex;
  flex-direction: column;
  padding: 10px 20px 22px;
  gap: 4px;
  background: rgba(5, 5, 6, 0.94);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--line);
  max-height: calc(100vh - 62px);
  overflow-y: auto;
}
.mobile a {
  font-weight: 500;
  font-size: 16px;
  letter-spacing: -0.01em;
  color: var(--text-2);
  padding: 10px 0;
  border-bottom: 1px solid var(--line);
  animation: mobileItemIn 0.32s cubic-bezier(0.22, 1, 0.36, 1)
    calc(var(--i, 0) * 45ms) both;
}
.mobile a:hover {
  color: #fff;
}
.mobile-bottom {
  padding-top: 14px;
  animation: mobileItemIn 0.32s cubic-bezier(0.22, 1, 0.36, 1)
    calc(var(--i, 0) * 45ms) both;
}
.mobile .mobile-cta {
  display: inline-flex;
  justify-content: center;
  width: 100%;
  padding: 12px 16px;
  border-bottom: 0;
  color: var(--on-accent);
}

@keyframes mobileItemIn {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.mobile-drawer-enter-active,
.mobile-drawer-leave-active {
  transition:
    opacity 0.24s ease,
    transform 0.26s cubic-bezier(0.22, 1, 0.36, 1);
  transform-origin: top;
}
.mobile-drawer-enter-from,
.mobile-drawer-leave-to {
  opacity: 0;
  transform: translateY(-10px) scaleY(0.96);
}

@media (max-width: 1180px) {
  .sandbox {
    display: none;
  }
}
@media (max-width: 960px) {
  .container-wide {
    padding: 0 16px;
  }
  .bar {
    height: 62px;
    gap: 12px;
    display: flex;
    justify-content: space-between;
  }
  .actions {
    gap: 10px;
  }
  .links,
  .sandbox,
  .actions > .cta,
  .mega-wrap {
    display: none !important;
  }
  .burger {
    display: inline-flex;
  }
}
@media (min-width: 961px) {
  .mobile {
    display: none !important;
  }
}
</style>
