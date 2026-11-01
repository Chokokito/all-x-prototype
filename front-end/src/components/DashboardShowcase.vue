<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { lang, t } from '../i18n'

const track = ref(null)
const pinned = ref(false)
let ro

const reduce = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches

function update() {
  const el = track.value
  if (!el) return
  pinned.value = !reduce && window.innerWidth >= 860
  if (!pinned.value || window.innerHeight > 1400) {
    el.style.setProperty('--reveal', '1')
    return
  }
  const rect = el.getBoundingClientRect()
  const vh = window.innerHeight
  const raw = (vh * 0.94 - rect.top) / (vh * 0.52)
  const p = Math.min(1, Math.max(0, raw))
  el.style.setProperty('--reveal', p.toFixed(3))
}

onMounted(() => {
  ro = new ResizeObserver(update)
  if (track.value) ro.observe(track.value)
  addEventListener('scroll', update, { passive: true })
  addEventListener('resize', update)
  update()
})

onBeforeUnmount(() => {
  ro?.disconnect()
  removeEventListener('scroll', update)
  removeEventListener('resize', update)
})

// Interactive Console State
const activeNav = ref(1) // 0: Overview, 1: Transactions, 2: Accounts, 3: Beneficiaries, 4: Compliance, 5: API Keys
const searchQuery = ref('')
const statusFilter = ref('all') // 'all' | 'done' | 'proc' | 'wait' | 'rev'
const currentPageNum = ref(1)
const selectedTxId = ref('tx_8F2K…91AC')
const showNewTx = ref(false)
const copiedToken = ref('')

// New Transaction Composer State
const newFrom = ref('BRL')
const newTo = ref('USDC')
const newAmount = ref(250000)
const newBeneficiary = ref('Acme Global Supplies LLC')

// Satellite Card Live Reactive State
const lastSettledAmt = ref('152.795,25 USDC')
const lastSettledSource = ref('R$ 850.000,00 · 1,8s')

const txList = ref([
  { id: 'tx_8F2K…91AC', from: 'BRL', to: 'USDC', amt: 'R$ 850.000,00', outAmt: '152.795,25 USDC', rail: 'Pix', s: 'done', ben: 'Acme Global Supplies LLC', rate: '1 USDC = 5,5630 BRL', fee: '0,25%', ref: 'E18236120202610301842a9f', time: '1,8s' },
  { id: 'tx_3H7Q…0B4E', from: 'USD', to: 'EUR', amt: '$ 124.500,00', outAmt: '€ 114.910,20', rail: 'SWIFT', s: 'proc', ben: 'Nordic Freight AB', rate: '1 EUR = 1,0834 USD', fee: '0,20%', ref: 'SWFT-99281-DE89', time: 'T+0' },
  { id: 'tx_Q19D…7F06', from: 'BRL', to: 'USDT', amt: 'R$ 212.300,00', outAmt: '38.162,86 USDT', rail: 'Pix', s: 'wait', ben: 'CloudScale Infrastructure Inc.', rate: '1 USDT = 5,5630 BRL', fee: '0,25%', ref: '0x944e8c...7F06', time: 'T+0' },
  { id: 'tx_6LMA…C2D8', from: 'USDC', to: 'USD', amt: '$ 98.870,00', outAmt: '$ 98.870,00', rail: 'ACH', s: 'done', ben: 'Mercury Treasury Ops', rate: '1 USDC = 1,0000 USD', fee: '0,10%', ref: 'ACH-021000021-8841', time: '2,4s' },
  { id: 'tx_Z04P…5E1B', from: 'EUR', to: 'BRL', amt: '€ 46.210,00', outAmt: 'R$ 278.184,20', rail: 'SEPA', s: 'rev', ben: 'Horizon Industrial GmbH', rate: '1 EUR = 6,0200 BRL', fee: '0,30%', ref: 'SEPA-DE71-55019', time: 'KYB Check' },
  { id: 'tx_K7WT…88A3', from: 'USD', to: 'BRL', amt: '$ 310.000,00', outAmt: 'R$ 1.724.530,00', rail: 'Fedwire', s: 'done', ben: 'Latam Logistics S.A.', rate: '1 USD = 5,5630 BRL', fee: '0,22%', ref: 'FW-026009593-772', time: '3,1s' },
  { id: 'tx_9P2M…44D1', from: 'USDC', to: 'EUR', amt: '$ 64.000,00', outAmt: '€ 59.073,00', rail: 'SEPA', s: 'done', ben: 'Berlin Digital Studio GmbH', rate: '1 EUR = 1,0834 USDC', fee: '0,18%', ref: 'SEPA-NL44-10942', time: '2,1s' },
  { id: 'tx_5V8N…19F0', from: 'BRL', to: 'USD', amt: 'R$ 540.000,00', outAmt: '$ 97.069,92', rail: 'ACH', s: 'done', ben: 'Apex Semiconductor Corp', rate: '1 USD = 5,5630 BRL', fee: '0,25%', ref: 'ACH-121000358-401', time: '1,9s' },
  { id: 'tx_2C9R…63E7', from: 'EUR', to: 'USDC', amt: '€ 88.500,00', outAmt: '95.880,90 USDC', rail: 'SEPA', s: 'proc', ben: 'Vault Liquidity Pool', rate: '1 EUR = 1,0834 USDC', fee: '0,15%', ref: '0x71c9a2...63E7', time: 'T+0' },
  { id: 'tx_7M4K…02B9', from: 'USD', to: 'USDT', amt: '$ 175.000,00', outAmt: '175.000,00 USDT', rail: 'Fedwire', s: 'done', ben: 'Pacific Trade Partners', rate: '1 USD = 1,0000 USDT', fee: '0,10%', ref: '0x38f1b0...02B9', time: '1,4s' },
])

const accounts = ref([
  { id: 'acc_usd', name: 'USD Virtual Account', num: 'Routing 021000021 · Acc ·· 1796', rail: 'ACH & Fedwire', bal: '$ 1.420.500,00', cur: 'USD', dest: 'USDC' },
  { id: 'acc_eur', name: 'EUR Virtual Account', num: 'IBAN DE89 3704 0044 ·· 5678', rail: 'SEPA Instant & SWIFT', bal: '€ 860.240,00', cur: 'EUR', dest: 'USDC' },
  { id: 'acc_brl', name: 'Conta Operacional BRL', num: 'ISPB 18236120 · Pix Corporativo', rail: 'Pix & TED (Bacen)', bal: 'R$ 3.180.900,00', cur: 'BRL', dest: 'USDC' },
  { id: 'acc_usdc', name: 'Managed Wallet USDC', num: '0x944e8c21b0...7F06 (Solana / Base)', rail: 'Multichain MPC', bal: '2.280.740,00 USDC', cur: 'USDC', dest: 'USD' },
])

const beneficiaries = ref([
  { name: 'Acme Global Supplies LLC', country: 'Estados Unidos · Delaware', rail: 'ACH / USDC', kyb: 'KYB Verificado', cur: 'BRL', to: 'USDC' },
  { name: 'Nordic Freight AB', country: 'Suécia · Estocolmo', rail: 'SEPA / SWIFT', kyb: 'KYB Verificado', cur: 'USD', to: 'EUR' },
  { name: 'CloudScale Infrastructure Inc.', country: 'Estados Unidos · Califórnia', rail: 'Pix → USDT', kyb: 'KYB Verificado', cur: 'BRL', to: 'USDT' },
  { name: 'Horizon Industrial GmbH', country: 'Alemanha · Frankfurt', rail: 'SEPA Instant', kyb: 'Em revisão UBO', cur: 'EUR', to: 'BRL' },
])

const showSecret = ref(false)
const webhookPing = ref('')

const fxRates = {
  'BRL->USDC': { rate: 0.17976, label: '1 USDC = 5,5630 BRL', rail: 'Pix', sym: 'R$' },
  'BRL->USDT': { rate: 0.17976, label: '1 USDT = 5,5630 BRL', rail: 'Pix', sym: 'R$' },
  'BRL->USD': { rate: 0.17976, label: '1 USD = 5,5630 BRL', rail: 'Pix', sym: 'R$' },
  'BRL->EUR': { rate: 0.16611, label: '1 EUR = 6,0200 BRL', rail: 'Pix', sym: 'R$' },
  'USD->USDC': { rate: 1, label: '1 USD = 1,0000 USDC', rail: 'ACH', sym: '$' },
  'USD->USDT': { rate: 1, label: '1 USD = 1,0000 USDT', rail: 'Fedwire', sym: '$' },
  'USD->EUR': { rate: 0.923, label: '1 EUR = 1,0834 USD', rail: 'SWIFT', sym: '$' },
  'USD->BRL': { rate: 5.563, label: '1 USD = 5,5630 BRL', rail: 'Fedwire', sym: '$' },
  'EUR->USDC': { rate: 1.0834, label: '1 EUR = 1,0834 USDC', rail: 'SEPA', sym: '€' },
  'EUR->USD': { rate: 1.0834, label: '1 EUR = 1,0834 USD', rail: 'SEPA', sym: '€' },
  'EUR->BRL': { rate: 6.02, label: '1 EUR = 6,0200 BRL', rail: 'SEPA', sym: '€' },
  'USDC->USD': { rate: 1, label: '1 USDC = 1,0000 USD', rail: 'ACH', sym: '$' },
  'USDC->BRL': { rate: 5.563, label: '1 USDC = 5,5630 BRL', rail: 'Pix', sym: '$' },
  'USDC->EUR': { rate: 0.923, label: '1 EUR = 1,0834 USDC', rail: 'SEPA', sym: '$' },
}

const currentPair = computed(() => {
  const key = `${newFrom.value}->${newTo.value}`
  return fxRates[key] || { rate: 1, label: `1 ${newFrom.value} = 1,0000 ${newTo.value}`, rail: 'SWIFT', sym: '$' }
})

const calculatedOutput = computed(() => {
  const val = (Number(newAmount.value) || 0) * currentPair.value.rate
  return val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' ' + newTo.value
})

const filteredRows = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  return txList.value.filter((r) => {
    const matchStatus = statusFilter.value === 'all' || r.s === statusFilter.value
    const matchQuery = !q || r.id.toLowerCase().includes(q) || r.from.toLowerCase().includes(q) || r.to.toLowerCase().includes(q) || r.rail.toLowerCase().includes(q) || r.ben.toLowerCase().includes(q)
    return matchStatus && matchQuery
  })
})

const pageSize = 5
const totalPages = computed(() => Math.max(1, Math.ceil(filteredRows.value.length / pageSize)))
const paginatedRows = computed(() => {
  const p = Math.min(currentPageNum.value, totalPages.value)
  const start = (p - 1) * pageSize
  return filteredRows.value.slice(start, start + pageSize)
})

function selectFilter(f) {
  statusFilter.value = f
  currentPageNum.value = 1
}

function toggleRow(id) {
  selectedTxId.value = selectedTxId.value === id ? '' : id
}

function copyText(txt, tag) {
  navigator.clipboard?.writeText(txt).catch(() => {})
  copiedToken.value = tag
  setTimeout(() => {
    if (copiedToken.value === tag) copiedToken.value = ''
  }, 1600)
}

function settleNow(row) {
  row.s = 'done'
  row.time = '1,2s'
  lastSettledAmt.value = row.outAmt
  lastSettledSource.value = `${lang.value === 'pt' ? 'Origem' : 'Source'} ${row.amt} · 1,2s`
  if (row.ben.includes('Horizon')) {
    const b = beneficiaries.value.find(x => x.name.includes('Horizon'))
    if (b) b.kyb = 'KYB Verificado'
  }
}

function submitNewTx() {
  const amtNum = Number(newAmount.value) || 100000
  const sym = newFrom.value === 'BRL' ? 'R$ ' : newFrom.value === 'EUR' ? '€ ' : '$ '
  const formattedAmt = sym + amtNum.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  const outStr = calculatedOutput.value
  const randHex = Math.random().toString(16).substring(2, 6).toUpperCase()
  const newId = `tx_${randHex}…90F1`
  const newRow = {
    id: newId,
    from: newFrom.value,
    to: newTo.value,
    amt: formattedAmt,
    outAmt: outStr,
    rail: currentPair.value.rail,
    s: 'proc',
    ben: newBeneficiary.value,
    rate: currentPair.value.label,
    fee: '0,20%',
    ref: 'E18236120' + Date.now(),
    time: 'T+0',
  }
  txList.value.unshift(newRow)
  showNewTx.value = false
  statusFilter.value = 'all'
  currentPageNum.value = 1
  selectedTxId.value = newId
  setTimeout(() => {
    settleNow(newRow)
  }, 1400)
}

function openTransferFromAccount(acc) {
  newFrom.value = acc.cur
  newTo.value = acc.dest
  newAmount.value = 150000
  activeNav.value = 1
  showNewTx.value = true
}

function openTransferForBeneficiary(ben) {
  newFrom.value = ben.cur
  newTo.value = ben.to
  newBeneficiary.value = ben.name
  newAmount.value = 180000
  activeNav.value = 1
  showNewTx.value = true
}

function triggerWebhookTest() {
  webhookPing.value = 'sending'
  setTimeout(() => {
    webhookPing.value = '200 OK · 38ms (settlement.completed)'
  }, 450)
}

const copy = computed(() => lang.value === 'pt'
  ? {
      home: 'Console ALL X',
      search: 'Filtrar por ID, moeda, beneficiário ou trilho...',
      newTx: '+ Nova transação',
      closeTx: 'Fechar',
      cols: ['ID', 'Rota', 'Valor', 'Trilho', 'Status'],
      nav: ['Visão geral', 'Transações', 'Contas', 'Beneficiários', 'Compliance', 'Chaves de API'],
      filters: [
        { k: 'all', l: 'Todas' },
        { k: 'done', l: 'Liquidado' },
        { k: 'proc', l: 'Em conversão' },
        { k: 'wait', l: 'Aguardando Pix' },
        { k: 'rev', l: 'Em revisão' },
      ],
      perPage: '5 por página', prev: 'Anterior', next: 'Próxima',
      st: { done: 'Liquidado', proc: 'Em conversão', wait: 'Aguardando Pix', rev: 'Em revisão' },
      cardLTag: 'COTAÇÃO TRAVADA · 30s',
      cardLRate: currentPair.value.label,
      cardLSub: `Rota ${newFrom.value} → ${newTo.value} · Liquidação T+0`,
      cardRTag: 'LIQUIDAÇÃO CONCLUÍDA',
      cardRAmt: lastSettledAmt.value,
      cardRSub: lastSettledSource.value,
      settleBtn: 'Simular liquidação T+0',
      copied: 'Copiado ✓',
      copyId: 'Copiar hash',
      execBtn: 'Confirmar e liquidar',
    }
  : {
      home: 'ALL X Console',
      search: 'Filter by ID, currency, beneficiary or rail...',
      newTx: '+ New transaction',
      closeTx: 'Close',
      cols: ['ID', 'Route', 'Amount', 'Rail', 'Status'],
      nav: ['Overview', 'Transactions', 'Accounts', 'Beneficiaries', 'Compliance', 'API keys'],
      filters: [
        { k: 'all', l: 'All' },
        { k: 'done', l: 'Settled' },
        { k: 'proc', l: 'Converting' },
        { k: 'wait', l: 'Awaiting Pix' },
        { k: 'rev', l: 'In review' },
      ],
      perPage: '5 per page', prev: 'Previous', next: 'Next',
      st: { done: 'Settled', proc: 'Converting', wait: 'Awaiting Pix', rev: 'In review' },
      cardLTag: 'LOCKED QUOTE · 30s',
      cardLRate: currentPair.value.label,
      cardLSub: `Route ${newFrom.value} → ${newTo.value} · T+0 settlement`,
      cardRTag: 'SETTLEMENT COMPLETED',
      cardRAmt: lastSettledAmt.value,
      cardRSub: lastSettledSource.value,
      settleBtn: 'Simulate T+0 settlement',
      copied: 'Copied ✓',
      copyId: 'Copy hash',
      execBtn: 'Confirm & settle',
    })
</script>

<template>
  <section id="console" ref="track" class="showcase-track" :class="{ 'is-pinned': pinned }" :aria-label="t('showcase.label')">
    <div class="container stage-wrap">
      <!-- Foreground parallax card Left -->
      <aside v-parallax="-0.22" class="parallax-card card-left" aria-hidden="true">
        <div class="pc-head">
          <span class="pc-dot accent" />
          <span class="mono pc-tag">{{ copy.cardLTag }}</span>
        </div>
        <strong class="mono pc-val">{{ copy.cardLRate }}</strong>
        <span class="pc-sub">{{ copy.cardLSub }}</span>
      </aside>

      <!-- Foreground parallax card Right -->
      <aside v-parallax="0.18" class="parallax-card card-right" aria-hidden="true">
        <div class="pc-head">
          <span class="pc-dot ok" />
          <span class="mono pc-tag">{{ copy.cardRTag }}</span>
        </div>
        <strong class="mono pc-val">{{ copy.cardRAmt }}</strong>
        <span class="pc-sub">{{ copy.cardRSub }}</span>
      </aside>

      <!-- Main Interactive Operational Console -->
      <div class="frame">
        <aside class="side">
          <div class="side-top">
            <img src="/logo.png" alt="ALL X" width="54" height="13" class="side-logo" />
            <span class="live-pill"><i /> LIVE</span>
          </div>
          <ul role="tablist" aria-label="Console navigation">
            <li
              v-for="(n, i) in copy.nav"
              :key="n"
              role="tab"
              tabindex="0"
              :aria-selected="activeNav === i"
              :class="{ on: activeNav === i }"
              @click="activeNav = i"
              @keydown.enter.prevent="activeNav = i"
              @keydown.space.prevent="activeNav = i"
            >
              <span class="nav-label">
                <!-- Minimalist Sidebar Icons -->
                <svg v-if="i === 0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>
                <svg v-else-if="i === 1" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10" /></svg>
                <svg v-else-if="i === 2" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="M3 10h18" /></svg>
                <svg v-else-if="i === 3" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="8" r="3.5" /><path d="M3 19c0-3.3 2.7-6 6-6s6 2.7 6 6M16 11a3 3 0 1 0 0-6M21 19c0-2.8-2-5.1-4.6-5.8" /></svg>
                <svg v-else-if="i === 4" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l7 3v5c0 4.5-3 8.3-7 9.5-4-1.2-7-5-7-9.5V6l7-3z" /><path d="m9.5 12 1.8 1.8 3.7-3.8" /></svg>
                <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="8" cy="15" r="4" /><path d="m10.8 12.2 8.2-8.2M16 7l3 3" /></svg>
                <span>{{ n }}</span>
              </span>
              <small v-if="i === 1" class="nav-count mono">{{ txList.length }}</small>
            </li>
          </ul>
          <div class="side-foot">
            <a href="#api" class="side-foot-link">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m16 18 6-6-6-6M8 6l-6 6 6 6" /></svg>
              <span>Webhooks & API</span>
            </a>
            <a href="#contato" class="side-foot-link">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 8v4M12 16h.01" /></svg>
              <span>{{ lang === 'pt' ? 'Suporte dedicado' : 'Dedicated support' }}</span>
            </a>
          </div>
        </aside>

        <div class="main">
          <!-- Mobile / Tablet Tab Switcher -->
          <div class="mobile-tabs">
            <button
              v-for="(n, i) in copy.nav"
              :key="n"
              type="button"
              :class="{ on: activeNav === i }"
              @click="activeNav = i"
            >
              {{ n }}
            </button>
          </div>

          <div class="crumbs-row">
            <div class="crumbs">
              <span>{{ copy.home }}</span><i>›</i><b>{{ copy.nav[activeNav] }}</b>
            </div>
            <span class="hint-badge mono">
              {{ lang === 'pt' ? 'Console interativo · Clique nas linhas ou crie uma transação' : 'Interactive console · Click rows or create a transaction' }}
            </span>
          </div>

          <!-- TAB 1: TRANSACTIONS -->
          <template v-if="activeNav === 1">
            <div class="toolbar">
              <label class="search">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
                <input v-model="searchQuery" type="search" :placeholder="copy.search" @input="currentPageNum = 1" />
              </label>
              <button type="button" class="new-tx" :class="{ active: showNewTx }" @click="showNewTx = !showNewTx">
                {{ showNewTx ? copy.closeTx : copy.newTx }}
              </button>
            </div>

            <!-- Inline New Transaction Composer -->
            <div v-if="showNewTx" class="composer">
              <div class="comp-grid">
                <label>
                  <span>{{ lang === 'pt' ? 'Moeda de origem' : 'Source currency' }}</span>
                  <select v-model="newFrom">
                    <option value="BRL">BRL (Pix)</option>
                    <option value="USD">USD (ACH / Fedwire)</option>
                    <option value="EUR">EUR (SEPA)</option>
                    <option value="USDC">USDC (Wallet)</option>
                  </select>
                </label>
                <label>
                  <span>{{ lang === 'pt' ? 'Ativo de destino' : 'Destination asset' }}</span>
                  <select v-model="newTo">
                    <option value="USDC">USDC (Solana / Base)</option>
                    <option value="USDT">USDT (Polygon)</option>
                    <option value="USD">USD (Wire / ACH)</option>
                    <option value="EUR">EUR (SEPA Instant)</option>
                    <option value="BRL">BRL (Pix)</option>
                  </select>
                </label>
                <label>
                  <span>{{ lang === 'pt' ? 'Valor de envio' : 'Send amount' }}</span>
                  <input v-model.number="newAmount" type="number" min="100" step="1000" />
                </label>
                <div class="comp-preview">
                  <span>{{ lang === 'pt' ? 'Liquidação estimada (T+0)' : 'Estimated settlement (T+0)' }}</span>
                  <strong class="mono">{{ calculatedOutput }}</strong>
                  <small class="mono">{{ currentPair.label }} · {{ currentPair.rail }}</small>
                </div>
              </div>
              <div class="comp-foot">
                <span class="comp-ben">{{ lang === 'pt' ? 'Beneficiário:' : 'Beneficiary:' }} <b>{{ newBeneficiary }}</b></span>
                <button type="button" class="exec-btn" @click="submitNewTx">{{ copy.execBtn }}</button>
              </div>
            </div>

            <!-- Filter Pills -->
            <div class="filter-bar">
              <button
                v-for="f in copy.filters"
                :key="f.k"
                type="button"
                class="filter-pill"
                :class="{ on: statusFilter === f.k }"
                @click="selectFilter(f.k)"
              >
                {{ f.l }}
              </button>
            </div>

            <!-- Transactions Table -->
            <div class="table" role="table">
              <div class="tr th" role="row">
                <span v-for="c in copy.cols" :key="c" role="columnheader">{{ c }}</span>
              </div>

              <template v-for="r in paginatedRows" :key="r.id">
                <div
                  class="tr row-interactive"
                  :class="{ selected: selectedTxId === r.id }"
                  role="row"
                  tabindex="0"
                  @click="toggleRow(r.id)"
                  @keydown.enter.prevent="toggleRow(r.id)"
                >
                  <span class="mono id" role="cell">{{ r.id }}</span>
                  <span class="route-cell" role="cell">
                    <i class="ccy-dot" :data-ccy="r.from" aria-hidden="true">{{ r.from[0] }}</i>
                    <span>{{ r.from }}</span>
                    <i class="arr">→</i>
                    <i class="ccy-dot" :data-ccy="r.to" aria-hidden="true">{{ r.to[0] }}</i>
                    <span>{{ r.to }}</span>
                  </span>
                  <span class="amt" role="cell">{{ r.amt }}</span>
                  <span class="rail" role="cell">{{ r.rail }}</span>
                  <span role="cell"><em class="st" :class="r.s">{{ copy.st[r.s] }}</em></span>
                </div>

                <!-- Expanded Inspector Drawer -->
                <div v-if="selectedTxId === r.id" class="tx-drawer">
                  <div class="drawer-meta">
                    <div><small>{{ lang === 'pt' ? 'Beneficiário' : 'Beneficiary' }}</small><b>{{ r.ben }}</b></div>
                    <div><small>{{ lang === 'pt' ? 'Liquidação final' : 'Final settlement' }}</small><b class="mono accent-txt">{{ r.outAmt }}</b></div>
                    <div><small>{{ lang === 'pt' ? 'Cotação aplicada' : 'Applied rate' }}</small><b class="mono">{{ r.rate }} ({{ r.fee }})</b></div>
                    <div><small>Ref / Hash</small><b class="mono">{{ r.ref }}</b></div>
                  </div>
                  <div class="drawer-track">
                    <span class="dt-step done"><i /> {{ lang === 'pt' ? 'Origem capturada' : 'Pay-in captured' }} ({{ r.rail }})</span>
                    <span class="dt-sep" />
                    <span class="dt-step done"><i /> {{ lang === 'pt' ? 'Screening & FX' : 'Screening & FX' }}</span>
                    <span class="dt-sep" />
                    <span class="dt-step" :class="{ done: r.s === 'done' }"><i /> {{ r.s === 'done' ? (lang === 'pt' ? 'Crédito liquidado' : 'Settled') : (lang === 'pt' ? 'Em liquidação' : 'Settling') }}</span>
                  </div>
                  <div class="drawer-actions">
                    <button type="button" class="mini-btn" @click.stop="copyText(r.ref, r.id)">
                      {{ copiedToken === r.id ? copy.copied : copy.copyId }}
                    </button>
                    <button v-if="r.s !== 'done'" type="button" class="mini-btn primary" @click.stop="settleNow(r)">
                      {{ copy.settleBtn }}
                    </button>
                    <span v-else class="settled-stamp mono">✓ {{ lang === 'pt' ? 'Liquidado em' : 'Settled in' }} {{ r.time }}</span>
                  </div>
                </div>
              </template>
            </div>

            <div class="pager">
              <span class="pp">{{ copy.perPage }} · {{ filteredRows.length }} {{ lang === 'pt' ? 'registros' : 'records' }}</span>
              <button type="button" class="pg-btn" :disabled="currentPageNum <= 1" @click="currentPageNum--">‹ {{ copy.prev }}</button>
              <button
                v-for="p in totalPages"
                :key="p"
                type="button"
                class="pg-num"
                :class="{ on: currentPageNum === p }"
                @click="currentPageNum = p"
              >
                {{ p }}
              </button>
              <button type="button" class="pg-btn" :disabled="currentPageNum >= totalPages" @click="currentPageNum++">{{ copy.next }} ›</button>
            </div>
          </template>

          <!-- TAB 0: OVERVIEW -->
          <template v-else-if="activeNav === 0">
            <div class="kpi-grid">
              <div class="kpi-card">
                <small>{{ lang === 'pt' ? 'Volume liquidado (30d)' : 'Settled volume (30d)' }}</small>
                <strong class="mono">$ 4.820.500,00</strong>
                <span class="kpi-ok">+18,4% · 100% reconciliado</span>
              </div>
              <div class="kpi-card">
                <small>{{ lang === 'pt' ? 'Tempo médio de liquidação' : 'Avg settlement time' }}</small>
                <strong class="mono">1,8s (T+0)</strong>
                <span>Pix, SEPA Instant & Stablecoins</span>
              </div>
              <div class="kpi-card">
                <small>{{ lang === 'pt' ? 'Saldos consolidados' : 'Consolidated balances' }}</small>
                <strong class="mono">$ 5.148.920,00</strong>
                <span>USD · EUR · BRL · USDC</span>
              </div>
            </div>
            <div class="overview-cta">
              <div>
                <b>{{ lang === 'pt' ? 'Pronto para iniciar uma remessa ou conversão?' : 'Ready to initiate a transfer or conversion?' }}</b>
                <p>{{ lang === 'pt' ? 'Simule uma operação com cotação travada e veja a liquidação em tempo real na tabela.' : 'Simulate a locked-quote operation and watch real-time settlement in the table.' }}</p>
              </div>
              <button type="button" class="exec-btn" @click="activeNav = 1; showNewTx = true">{{ copy.newTx }}</button>
            </div>
          </template>

          <!-- TAB 2: ACCOUNTS -->
          <template v-else-if="activeNav === 2">
            <div class="acc-grid">
              <div v-for="a in accounts" :key="a.id" class="acc-card">
                <div class="acc-top">
                  <b>{{ a.name }}</b>
                  <span class="mono rail-badge">{{ a.rail }}</span>
                </div>
                <strong class="mono acc-bal">{{ a.bal }}</strong>
                <span class="mono acc-num">{{ a.num }}</span>
                <div class="acc-actions">
                  <button type="button" class="mini-btn" @click="copyText(a.num, a.id)">
                    {{ copiedToken === a.id ? copy.copied : (lang === 'pt' ? 'Copiar dados' : 'Copy details') }}
                  </button>
                  <button type="button" class="mini-btn primary" @click="openTransferFromAccount(a)">
                    {{ lang === 'pt' ? 'Converter / Enviar →' : 'Convert / Send →' }}
                  </button>
                </div>
              </div>
            </div>
          </template>

          <!-- TAB 3: BENEFICIARIES -->
          <template v-else-if="activeNav === 3">
            <div class="ben-list">
              <div v-for="b in beneficiaries" :key="b.name" class="ben-row">
                <div>
                  <b>{{ b.name }}</b>
                  <small>{{ b.country }} · {{ b.rail }}</small>
                </div>
                <div class="ben-right">
                  <span class="st done">{{ b.kyb }}</span>
                  <button type="button" class="mini-btn primary" @click="openTransferForBeneficiary(b)">
                    {{ lang === 'pt' ? 'Enviar pagamento' : 'Send payment' }}
                  </button>
                </div>
              </div>
            </div>
          </template>

          <!-- TAB 4: COMPLIANCE -->
          <template v-else-if="activeNav === 4">
            <div class="comp-panel">
              <div class="comp-row">
                <div>
                  <b>KYB / UBO & Sanctions Screening</b>
                  <small>{{ lang === 'pt' ? 'Monitoramento contínuo OFAC, ONU, UE e PEP ativo em todas as carteiras e contas.' : 'Continuous OFAC, UN, EU and PEP screening active across all wallets and accounts.' }}</small>
                </div>
                <span class="st done">{{ lang === 'pt' ? 'Operacional' : 'Operational' }}</span>
              </div>
              <div v-for="r in txList.filter(x => x.s === 'rev' || x.ben.includes('Horizon'))" :key="r.id" class="comp-row">
                <div>
                  <b>{{ r.ben }} ({{ r.id }})</b>
                  <small>{{ r.amt }} → {{ r.outAmt }} · {{ r.rail }}</small>
                </div>
                <button v-if="r.s === 'rev'" type="button" class="mini-btn primary" @click="settleNow(r)">
                  {{ lang === 'pt' ? 'Aprovar KYB e liquidar' : 'Approve KYB & settle' }}
                </button>
                <span v-else class="st done">✓ {{ lang === 'pt' ? 'Aprovado e liquidado' : 'Approved & settled' }}</span>
              </div>
            </div>
          </template>

          <!-- TAB 5: API KEYS -->
          <template v-else>
            <div class="comp-panel">
              <div class="comp-row">
                <div>
                  <b>Production Secret Key</b>
                  <code class="mono key-code">{{ showSecret ? 'ax_live_9f8a44c2e10b77d3a90131c4' : 'ax_live_9f8a••••••••••••••••31c4' }}</code>
                </div>
                <div class="ben-right">
                  <button type="button" class="mini-btn" @click="showSecret = !showSecret">
                    {{ showSecret ? (lang === 'pt' ? 'Ocultar' : 'Hide') : (lang === 'pt' ? 'Revelar' : 'Reveal') }}
                  </button>
                  <button type="button" class="mini-btn" @click="copyText('ax_live_9f8a44c2e10b77d3a90131c4', 'key')">
                    {{ copiedToken === 'key' ? copy.copied : (lang === 'pt' ? 'Copiar chave' : 'Copy key') }}
                  </button>
                </div>
              </div>
              <div class="comp-row">
                <div>
                  <b>Webhook Endpoint · https://api.empresa.com/webhooks/allx</b>
                  <small class="mono">{{ webhookPing || 'Eventos: settlement.completed, quote.locked, kyb.verified' }}</small>
                </div>
                <button type="button" class="mini-btn primary" @click="triggerWebhookTest">
                  {{ lang === 'pt' ? 'Disparar evento de teste' : 'Send test webhook' }}
                </button>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.showcase-track {
  position: relative;
  z-index: 4;
  --reveal: 1;
  padding: 8px 0 clamp(56px, 8vw, 96px);
}
.showcase-track.is-pinned {
  margin-top: -36px;
  padding-top: 36px;
}
.stage-wrap {
  position: relative;
}
.frame {
  display: grid;
  grid-template-columns: 205px 1fr;
  background: var(--surface);
  border: 1px solid var(--line-2);
  border-radius: 20px;
  overflow: hidden;
  box-shadow:
    0 40px 90px -30px rgba(0, 0, 0, 0.95),
    0 0 0 1px rgba(255, 255, 255, 0.03);
  transform-origin: 50% 0%;
  transform:
    perspective(1400px)
    translateY(calc((1 - var(--reveal)) * -44px))
    scale(calc(0.91 + var(--reveal) * 0.09))
    rotateX(calc((1 - var(--reveal)) * 11deg));
  opacity: calc(0.45 + var(--reveal) * 0.55);
  will-change: transform, opacity;
}

/* Floating Parallax Satellite Cards */
.parallax-card {
  position: absolute;
  z-index: 6;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 14px 18px;
  border-radius: 12px;
  background: rgba(16, 16, 19, 0.92);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.85);
  pointer-events: none;
}
.card-left { left: -20px; top: 64px; }
.card-right { right: -20px; bottom: 54px; }
.pc-head { display: flex; align-items: center; gap: 8px; }
.pc-dot { width: 7px; height: 7px; border-radius: 50%; }
.pc-dot.accent { background: var(--accent); }
.pc-dot.ok { background: var(--ok); }
.pc-tag { font-size: 10.5px; letter-spacing: 0.06em; color: var(--muted); }
.pc-val { font-size: 15px; font-weight: 700; color: var(--text); letter-spacing: -0.02em; }
.pc-sub { font-size: 12px; color: var(--text-2); }

/* Sidebar */
.side { padding: 20px 12px; border-right: 1px solid var(--line); display: flex; flex-direction: column; gap: 20px; background: #0a0a0c; }
.side-top { display: flex; align-items: center; justify-content: space-between; padding: 0 8px; }
.side-logo { width: 54px; height: auto; opacity: 0.92; }
.live-pill {
  display: inline-flex; align-items: center; gap: 5px;
  font-family: var(--mono); font-size: 10px; color: var(--ok);
  padding: 2px 7px; border-radius: 99px; background: rgba(74, 222, 128, 0.08);
}
.live-pill i { width: 5px; height: 5px; border-radius: 50%; background: var(--ok); }
.side ul { display: flex; flex-direction: column; gap: 3px; }
.side li {
  display: flex; align-items: center; justify-content: space-between;
  padding: 9px 10px; border-radius: 7px; font-size: 13px; color: var(--muted);
  cursor: pointer; user-select: none; transition: background 0.15s, color 0.15s;
}
.side li:hover { color: var(--text-2); background: rgba(255, 255, 255, 0.03); }
.side li.on { background: var(--surface-2); color: var(--text); font-weight: 500; }
.nav-label { display: inline-flex; align-items: center; gap: 9px; }
.nav-label svg { color: var(--dim); transition: color 0.15s; flex-shrink: 0; }
.side li.on .nav-label svg { color: var(--accent); }
.nav-count { font-size: 11px; color: var(--dim); padding: 1px 6px; border-radius: 99px; background: rgba(255, 255, 255, 0.04); }
.side-foot {
  margin-top: auto;
  padding-top: 14px;
  border-top: 1px solid var(--line);
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.side-foot-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 10px;
  border-radius: 7px;
  font-size: 12px;
  color: var(--dim);
  transition: color 0.15s, background 0.15s;
}
.side-foot-link:hover {
  color: var(--text-2);
  background: rgba(255, 255, 255, 0.03);
}

/* Main Console Body */
.main { padding: 20px 24px 18px; display: flex; flex-direction: column; gap: 14px; min-width: 0; }
.mobile-tabs { display: none; gap: 6px; overflow-x: auto; padding-bottom: 4px; }
.mobile-tabs button {
  padding: 6px 11px; border-radius: 6px; border: 1px solid var(--line);
  background: var(--surface-2); color: var(--muted); font: inherit; font-size: 12px; white-space: nowrap; cursor: pointer;
}
.mobile-tabs button.on { color: var(--text); border-color: var(--accent); }

.crumbs-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
.crumbs { font-size: 13px; color: var(--muted); display: flex; gap: 8px; align-items: center; }
.crumbs i { font-style: normal; color: #4b4b52; }
.crumbs b { font-weight: 500; color: var(--text); }
.hint-badge { font-size: 11px; color: var(--dim); }

.toolbar { display: flex; gap: 10px; }
.search {
  flex: 1; display: flex; align-items: center; gap: 10px; padding: 9px 14px;
  border: 1px solid var(--line-2); border-radius: 8px; font-size: 13px; color: var(--dim);
  background: #0a0a0c; transition: border-color 0.2s;
}
.search:focus-within { border-color: rgba(217, 142, 104, 0.5); color: var(--text-2); }
.search input {
  width: 100%; background: transparent; border: 0; outline: none;
  color: var(--text); font: inherit; font-size: 13px;
}
.search input::placeholder { color: var(--dim); }
.new-tx {
  padding: 9px 16px; border-radius: 8px; border: 1px solid transparent;
  background: var(--text); color: #0a0a0b; font: inherit; font-size: 13px; font-weight: 600;
  white-space: nowrap; cursor: pointer; transition: background 0.2s, color 0.2s;
}
.new-tx:hover { background: var(--accent); color: var(--on-accent); }
.new-tx.active { background: var(--surface-2); color: var(--text-2); border-color: var(--line-2); }

/* Composer */
.composer {
  padding: 16px; border-radius: 12px; background: #09090b; border: 1px solid rgba(217, 142, 104, 0.32);
  display: flex; flex-direction: column; gap: 14px;
}
.comp-grid { display: grid; grid-template-columns: 1fr 1fr 1fr 1.3fr; gap: 12px; align-items: end; }
.comp-grid label, .comp-preview { display: flex; flex-direction: column; gap: 6px; font-size: 11.5px; color: var(--muted); }
.comp-grid select, .comp-grid input {
  padding: 8px 10px; border-radius: 7px; border: 1px solid var(--line-2);
  background: var(--surface); color: var(--text); font: inherit; font-size: 13px; outline: none;
}
.comp-grid select:focus, .comp-grid input:focus { border-color: var(--accent); }
.comp-preview { padding: 8px 12px; border-radius: 8px; background: rgba(217, 142, 104, 0.07); border: 1px solid rgba(217, 142, 104, 0.2); }
.comp-preview strong { font-size: 14px; color: var(--accent-soft); }
.comp-preview small { font-size: 10.5px; color: var(--muted); }
.comp-foot { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; padding-top: 10px; border-top: 1px solid var(--line); }
.comp-ben { font-size: 12.5px; color: var(--muted); }
.comp-ben b { color: var(--text-2); font-weight: 500; }
.exec-btn {
  padding: 8px 16px; border-radius: 7px; border: 0; background: var(--accent); color: var(--on-accent);
  font: inherit; font-size: 12.5px; font-weight: 600; cursor: pointer; transition: background 0.2s;
}
.exec-btn:hover { background: var(--accent-soft); }

/* Filter Pills */
.filter-bar { display: flex; gap: 6px; flex-wrap: wrap; }
.filter-pill {
  padding: 4px 11px; border-radius: 99px; border: 1px solid var(--line);
  background: transparent; color: var(--muted); font: inherit; font-size: 12px; cursor: pointer;
  transition: border-color 0.15s, color 0.15s, background 0.15s;
}
.filter-pill:hover { color: var(--text-2); border-color: var(--line-2); }
.filter-pill.on { background: var(--surface-2); color: var(--text); border-color: rgba(255, 255, 255, 0.18); }

/* Table */
.table { display: flex; flex-direction: column; }
.tr {
  display: grid; grid-template-columns: 1.25fr 1fr 1.2fr 0.8fr 1fr; gap: 12px; align-items: center;
  padding: 12px 8px; border-bottom: 1px solid var(--line); font-size: 13px; color: var(--text-2);
}
.row-interactive { cursor: pointer; border-radius: 6px; transition: background 0.15s; }
.row-interactive:hover { background: rgba(255, 255, 255, 0.025); }
.row-interactive.selected { background: rgba(217, 142, 104, 0.06); border-bottom-color: transparent; }
.th { font-size: 12px; color: var(--dim); padding-top: 2px; }
.id { font-size: 11.5px; color: var(--muted); }
.route-cell { display: inline-flex; align-items: center; gap: 6px; }
.ccy-dot {
  width: 17px;
  height: 17px;
  border-radius: 50%;
  display: inline-grid;
  place-items: center;
  font-style: normal;
  font-family: var(--mono);
  font-size: 9.5px;
  font-weight: 700;
  background: var(--surface-2);
  border: 1px solid var(--line-2);
  color: var(--text-2);
  flex-shrink: 0;
}
.ccy-dot[data-ccy='USDC'], .ccy-dot[data-ccy='USDT'] {
  background: rgba(217, 142, 104, 0.14);
  border-color: rgba(217, 142, 104, 0.35);
  color: var(--accent-soft);
}
.ccy-dot[data-ccy='BRL'] {
  background: rgba(74, 222, 128, 0.1);
  border-color: rgba(74, 222, 128, 0.28);
  color: #86efac;
}
.arr { font-style: normal; color: #55555c; margin: 0 1px; }
.amt { font-variant-numeric: tabular-nums; color: var(--text); }
.rail { color: var(--muted); }
.st { font-style: normal; font-size: 12px; padding: 3px 9px; border-radius: 999px; background: var(--surface-2); color: var(--text-2); white-space: nowrap; }
.st.done { color: #86efac; background: rgba(74, 222, 128, 0.08); }
.st.proc { color: var(--accent-soft); background: rgba(217, 142, 104, 0.12); }
.st.wait, .st.rev { color: var(--muted); }

/* Inspector Drawer */
.tx-drawer {
  padding: 12px 14px; margin-bottom: 4px; border-radius: 0 0 8px 8px;
  background: #09090b; border: 1px solid rgba(255, 255, 255, 0.07);
  display: flex; align-items: center; justify-content: space-between; gap: 14px; flex-wrap: wrap;
}
.drawer-track {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 0 4px;
  border-top: 1px solid var(--line);
  font-size: 11.5px;
  color: var(--dim);
  flex-wrap: wrap;
}
.dt-step {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.dt-step i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--dim);
}
.dt-step.done {
  color: var(--text-2);
}
.dt-step.done i {
  background: var(--ok);
}
.dt-sep {
  width: 18px;
  height: 1px;
  background: var(--line-2);
}
.drawer-meta { display: flex; flex-wrap: wrap; gap: 12px 24px; }
.drawer-meta div { display: flex; flex-direction: column; gap: 2px; }
.drawer-meta small { font-size: 11px; color: var(--dim); }
.drawer-meta b { font-size: 12.5px; font-weight: 500; color: var(--text-2); }
.accent-txt { color: var(--accent-soft) !important; }
.drawer-actions { display: flex; align-items: center; gap: 8px; }
.mini-btn {
  padding: 5px 11px; border-radius: 6px; border: 1px solid var(--line-2);
  background: var(--surface-2); color: var(--text-2); font: inherit; font-size: 12px; cursor: pointer;
  transition: border-color 0.15s, color 0.15s, background 0.15s;
}
.mini-btn:hover { border-color: rgba(255, 255, 255, 0.25); color: #fff; }
.mini-btn.primary { background: rgba(217, 142, 104, 0.14); border-color: rgba(217, 142, 104, 0.4); color: var(--accent-soft); }
.mini-btn.primary:hover { background: var(--accent); color: var(--on-accent); }
.settled-stamp { font-size: 11.5px; color: var(--ok); }

/* Pager */
.pager { display: flex; justify-content: flex-end; align-items: center; gap: 8px; font-size: 12.5px; color: var(--text-2); padding-top: 4px; }
.pager .pp { margin-right: auto; color: var(--muted); font-size: 12px; }
.pg-btn, .pg-num {
  padding: 4px 10px; border-radius: 6px; border: 1px solid var(--line-2);
  background: transparent; color: var(--text-2); font: inherit; font-size: 12px; cursor: pointer;
}
.pg-btn:disabled { opacity: 0.35; cursor: not-allowed; }
.pg-num.on { background: var(--surface-2); color: var(--text); border-color: rgba(255, 255, 255, 0.22); font-weight: 600; }

/* Secondary Tabs (Overview, Accounts, Beneficiaries, Compliance, API) */
.kpi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
.kpi-card {
  padding: 18px; border-radius: 10px; background: #09090b; border: 1px solid var(--line);
  display: flex; flex-direction: column; gap: 6px;
}
.kpi-card small { font-size: 12px; color: var(--muted); }
.kpi-card strong { font-size: 20px; color: var(--text); }
.kpi-card span { font-size: 12px; color: var(--dim); }
.kpi-ok { color: var(--ok) !important; }
.overview-cta {
  padding: 18px; border-radius: 10px; background: #09090b; border: 1px solid var(--line);
  display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap;
}
.overview-cta b { display: block; font-size: 14px; color: var(--text); margin-bottom: 4px; }
.overview-cta p { font-size: 13px; color: var(--muted); margin: 0; }

.acc-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
.acc-card {
  padding: 16px; border-radius: 10px; background: #09090b; border: 1px solid var(--line);
  display: flex; flex-direction: column; gap: 8px;
}
.acc-top { display: flex; justify-content: space-between; align-items: center; gap: 8px; font-size: 13.5px; }
.rail-badge { font-size: 11px; color: var(--muted); padding: 2px 8px; border-radius: 99px; background: var(--surface-2); }
.acc-bal { font-size: 19px; color: var(--text); }
.acc-num { font-size: 11.5px; color: var(--dim); }
.acc-actions { display: flex; gap: 8px; margin-top: 4px; }

.ben-list, .comp-panel { display: flex; flex-direction: column; gap: 10px; }
.ben-row, .comp-row {
  padding: 14px 16px; border-radius: 10px; background: #09090b; border: 1px solid var(--line);
  display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap;
}
.ben-row b, .comp-row b { display: block; font-size: 13.5px; color: var(--text); margin-bottom: 3px; }
.ben-row small, .comp-row small { font-size: 12px; color: var(--muted); }
.ben-right { display: flex; align-items: center; gap: 10px; }
.key-code { font-size: 12px; color: var(--accent-soft); }

@media (max-width: 1160px) {
  .card-left { left: 10px; top: -22px; }
  .card-right { right: 10px; bottom: -22px; }
}
@media (max-width: 860px) {
  .frame {
    grid-template-columns: 1fr;
    transform: none !important;
    opacity: 1 !important;
  }
  .parallax-card { display: none; }
  .side { display: none; }
  .mobile-tabs { display: flex; }
  .comp-grid { grid-template-columns: 1fr 1fr; }
  .kpi-grid, .acc-grid { grid-template-columns: 1fr; }
  .tr { grid-template-columns: 1.2fr 1fr 1fr; }
  .tr > :nth-child(1), .tr > :nth-child(4) { display: none; }
}
@media (max-width: 520px) {
  .main { padding: 16px; }
  .comp-grid { grid-template-columns: 1fr; }
  .tr { grid-template-columns: 1fr auto; }
  .tr > :nth-child(2) { display: none; }
  .pager .pp { display: none; }
}
</style>
