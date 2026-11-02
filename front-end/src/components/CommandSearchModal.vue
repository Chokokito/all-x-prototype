<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { lang, searchModalOpen, closeSearchModal, navigateTo } from '../i18n'

const query = ref('')
const activeIdx = ref(0)
const inputEl = ref(null)

const items = computed(() =>
  lang.value === 'pt'
    ? [
        {
          id: 'sec-create',
          badge: 'POST',
          badgeClass: 'post',
          title: 'Criar uma carteira gerenciada',
          sub: '/v1/instances/:id/customers/:id/wallets • Provisionamento MPC <100ms',
        },
        {
          id: 'sec-balance',
          badge: 'GET',
          badgeClass: 'get',
          title: 'Consultar saldo e reservas',
          sub: '/v1/wallets/:id/balances • Multicurrency Payload (USDC, BRL, EUR)',
        },
        {
          id: 'sec-prereq',
          badge: 'DOCS',
          badgeClass: 'docs',
          title: 'Pré-requisitos & Regra de Compliance KYC',
          sub: 'kyc_status: approved, compliance_request e assinatura HMAC',
        },
        {
          id: 'sec-settlement',
          badge: 'RAILS',
          badgeClass: 'rails',
          title: 'Recebimento e Liquidação T+0',
          sub: 'Event: payment.received & Event: payout.settled via Pix e Stablecoins',
        },
        {
          id: 'sec-cms',
          badge: 'WEBHOOK',
          badgeClass: 'docs',
          title: 'Metadados no CMS & Webhooks',
          sub: 'Chaves customizadas customer_internal_id e ledger_account',
        },
      ]
    : [
        {
          id: 'sec-create',
          badge: 'POST',
          badgeClass: 'post',
          title: 'Create a managed wallet',
          sub: '/v1/instances/:id/customers/:id/wallets • MPC provisioning <100ms',
        },
        {
          id: 'sec-balance',
          badge: 'GET',
          badgeClass: 'get',
          title: 'Query balance and reserves',
          sub: '/v1/wallets/:id/balances • Multicurrency Payload (USDC, BRL, EUR)',
        },
        {
          id: 'sec-prereq',
          badge: 'DOCS',
          badgeClass: 'docs',
          title: 'Prerequisites & KYC Compliance Rule',
          sub: 'kyc_status: approved, compliance_request and HMAC signature',
        },
        {
          id: 'sec-settlement',
          badge: 'RAILS',
          badgeClass: 'rails',
          title: 'Receiving & T+0 Settlement',
          sub: 'Event: payment.received & Event: payout.settled via Pix and Stablecoins',
        },
        {
          id: 'sec-cms',
          badge: 'WEBHOOK',
          badgeClass: 'docs',
          title: 'CMS Metadata & Webhooks',
          sub: 'Custom keys customer_internal_id and ledger_account',
        },
      ]
)

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return items.value
  return items.value.filter(
    (it) =>
      it.title.toLowerCase().includes(q) ||
      it.sub.toLowerCase().includes(q) ||
      it.badge.toLowerCase().includes(q)
  )
})

watch(searchModalOpen, async (open) => {
  if (open) {
    query.value = ''
    activeIdx.value = 0
    await nextTick()
    inputEl.value?.focus()
  }
})

function selectItem(item) {
  closeSearchModal()
  navigateTo('cms', `#${item.id}`)
  setTimeout(() => {
    document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, 60)
}

function onKeydown(e) {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    searchModalOpen.value = !searchModalOpen.value
    return
  }
  if (!searchModalOpen.value) return
  if (e.key === 'Escape') {
    e.preventDefault()
    closeSearchModal()
  } else if (e.key === 'ArrowDown') {
    e.preventDefault()
    if (filtered.value.length) activeIdx.value = (activeIdx.value + 1) % filtered.value.length
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    if (filtered.value.length) activeIdx.value = (activeIdx.value - 1 + filtered.value.length) % filtered.value.length
  } else if (e.key === 'Enter' && filtered.value[activeIdx.value]) {
    e.preventDefault()
    selectItem(filtered.value[activeIdx.value])
  }
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <Transition name="cmd-fade">
    <div
      v-if="searchModalOpen"
      class="cmd-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Search Documentation"
      @mousedown.self="closeSearchModal"
    >
      <div class="cmd-modal">
        <!-- Center Search Input -->
        <div class="cmd-input-row">
          <svg class="cmd-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            ref="inputEl"
            v-model="query"
            type="text"
            class="cmd-input"
            :placeholder="lang === 'pt' ? 'Buscar documentação, APIs, endpoints, métodos...' : 'Search documentation, APIs, endpoints, methods...'"
          />
          <button type="button" class="cmd-esc mono" @click="closeSearchModal">ESC</button>
        </div>

        <!-- Results List -->
        <div class="cmd-body">
          <div class="cmd-group-label mono">
            {{ lang === 'pt' ? 'DOCUMENTAÇÃO & ENDPOINTS RECOMENDADOS' : 'RECOMMENDED DOCUMENTATION & ENDPOINTS' }}
          </div>

          <ul v-if="filtered.length" class="cmd-list">
            <li
              v-for="(item, idx) in filtered"
              :key="item.id"
              class="cmd-item"
              :class="{ active: idx === activeIdx }"
              @mouseenter="activeIdx = idx"
              @click="selectItem(item)"
            >
              <div class="cmd-item-left">
                <span class="cmd-badge mono" :class="item.badgeClass">{{ item.badge }}</span>
                <div class="cmd-item-text">
                  <span class="cmd-item-title">{{ item.title }}</span>
                  <span class="cmd-item-sub mono">{{ item.sub }}</span>
                </div>
              </div>
              <span class="cmd-enter mono" aria-hidden="true">↵</span>
            </li>
          </ul>

          <div v-else class="cmd-empty">
            {{ lang === 'pt' ? 'Nenhum resultado encontrado para' : 'No results found for' }} "{{ query }}"
          </div>
        </div>

        <!-- Footer -->
        <div class="cmd-footer mono">
          <div class="cmd-shortcuts">
            <span><kbd>↑</kbd><kbd>↓</kbd> {{ lang === 'pt' ? 'navegar' : 'navigate' }}</span>
            <span><kbd>↵</kbd> {{ lang === 'pt' ? 'abrir' : 'open' }}</span>
            <span><kbd>esc</kbd> {{ lang === 'pt' ? 'fechar' : 'close' }}</span>
          </div>
          <span class="cmd-brand">ALL X DOCS • v2.4</span>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.cmd-backdrop {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 13vh 20px 24px;
  background: rgba(5, 5, 6, 0.76);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
}

.cmd-modal {
  width: 100%;
  max-width: 620px;
  background: #0b0b0e;
  border: 1px solid var(--line-2);
  border-radius: 16px;
  box-shadow:
    0 32px 80px -12px rgba(0, 0, 0, 0.85),
    0 0 0 1px rgba(255, 255, 255, 0.03);
  overflow: hidden;
}

.cmd-input-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  background: var(--surface);
  border-bottom: 1px solid var(--line);
}
.cmd-search-icon {
  color: var(--accent);
  flex-shrink: 0;
}
.cmd-input {
  flex: 1;
  background: transparent;
  border: 0;
  outline: none;
  color: var(--text);
  font: inherit;
  font-size: 15px;
}
.cmd-input::placeholder {
  color: var(--dim);
}
.cmd-esc {
  padding: 3px 8px;
  background: var(--surface-2);
  border: 1px solid var(--line-2);
  border-radius: 6px;
  color: var(--muted);
  font-size: 10.5px;
  cursor: pointer;
}
.cmd-esc:hover {
  border-color: rgba(255, 255, 255, 0.2);
  color: var(--text);
}

.cmd-body {
  padding: 14px 12px;
  max-height: 360px;
  overflow-y: auto;
}
.cmd-group-label {
  padding: 0 10px 8px;
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--dim);
}
.cmd-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.cmd-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
}
.cmd-item.active {
  background: var(--surface-2);
  border-color: var(--line-2);
}
.cmd-item-left {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}
.cmd-badge {
  padding: 2px 7px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 700;
  flex-shrink: 0;
}
.cmd-badge.post {
  background: rgba(74, 222, 128, 0.12);
  border: 1px solid rgba(74, 222, 128, 0.26);
  color: var(--ok);
}
.cmd-badge.get {
  background: rgba(56, 189, 248, 0.12);
  border: 1px solid rgba(56, 189, 248, 0.26);
  color: #38bdf8;
}
.cmd-badge.docs,
.cmd-badge.rails {
  background: rgba(217, 142, 104, 0.14);
  border: 1px solid rgba(217, 142, 104, 0.28);
  color: var(--accent-soft);
}
.cmd-item-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}
.cmd-item-title {
  font-size: 13.5px;
  font-weight: 500;
  color: var(--text);
}
.cmd-item-sub {
  font-size: 11px;
  color: var(--muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.cmd-enter {
  font-size: 13px;
  color: var(--dim);
  opacity: 0;
  transition: opacity 0.15s, color 0.15s;
}
.cmd-item.active .cmd-enter {
  opacity: 1;
  color: var(--accent-soft);
}

.cmd-empty {
  padding: 28px 16px;
  text-align: center;
  font-size: 13.5px;
  color: var(--muted);
}

.cmd-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 18px;
  background: var(--bg);
  border-top: 1px solid var(--line);
  font-size: 11px;
  color: var(--dim);
}
.cmd-shortcuts {
  display: flex;
  align-items: center;
  gap: 14px;
}
.cmd-shortcuts kbd {
  padding: 1px 5px;
  margin-right: 3px;
  background: var(--surface-2);
  border: 1px solid var(--line-2);
  border-radius: 4px;
  font-size: 10px;
  color: var(--muted);
}
.cmd-brand {
  color: var(--accent);
  font-weight: 600;
}

.cmd-fade-enter-active,
.cmd-fade-leave-active {
  transition: opacity 0.18s ease;
}
.cmd-fade-enter-active .cmd-modal,
.cmd-fade-leave-active .cmd-modal {
  transition: transform 0.18s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.18s ease;
}
.cmd-fade-enter-from,
.cmd-fade-leave-to {
  opacity: 0;
}
.cmd-fade-enter-from .cmd-modal,
.cmd-fade-leave-to .cmd-modal {
  transform: scale(0.96) translateY(-8px);
  opacity: 0;
}
</style>
