'use client'
import { Fragment, useEffect, useRef, useState } from 'react'
import { useI18n } from '../i18n'
import { parallax } from '../parallax'
import './DashboardShowcase.css'

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

const initialTx = [
  { id: 'tx_8F2K…91AC', from: 'BRL', to: 'USDC', amt: 'R$ 850.000,00', outAmt: '152.795,25 USDC', rail: 'Pix', s: 'done', ben: 'Acme Global Supplies LLC', rate: '1 USDC = 5,5630 BRL', fee: '0,25%', ref: 'E18236120202610301842a9f', time: '1,8s' },
  { id: 'tx_3H7Q…0B4E', from: 'USD', to: 'EUR', amt: '$ 124.500,00', outAmt: '€ 114.910,20', rail: 'SWIFT', s: 'proc', ben: 'Nordic Freight AB', rate: '1 EUR = 1,0834 USD', fee: '0,20%', ref: 'SWFT-99281-DE89', time: 'Estimado' },
  { id: 'tx_Q19D…7F06', from: 'BRL', to: 'USDT', amt: 'R$ 212.300,00', outAmt: '38.162,86 USDT', rail: 'Pix', s: 'wait', ben: 'CloudScale Infrastructure Inc.', rate: '1 USDT = 5,5630 BRL', fee: '0,25%', ref: '0x944e8c...7F06', time: 'Estimado' },
  { id: 'tx_6LMA…C2D8', from: 'USDC', to: 'USD', amt: '$ 98.870,00', outAmt: '$ 98.870,00', rail: 'ACH', s: 'done', ben: 'Mercury Treasury Ops', rate: '1 USDC = 1,0000 USD', fee: '0,10%', ref: 'ACH-021000021-8841', time: '2,4s' },
  { id: 'tx_Z04P…5E1B', from: 'EUR', to: 'BRL', amt: '€ 46.210,00', outAmt: 'R$ 278.184,20', rail: 'SEPA', s: 'rev', ben: 'Horizon Industrial GmbH', rate: '1 EUR = 6,0200 BRL', fee: '0,30%', ref: 'SEPA-DE71-55019', time: 'KYB Check' },
  { id: 'tx_K7WT…88A3', from: 'USD', to: 'BRL', amt: '$ 310.000,00', outAmt: 'R$ 1.724.530,00', rail: 'Fedwire', s: 'done', ben: 'Latam Logistics S.A.', rate: '1 USD = 5,5630 BRL', fee: '0,22%', ref: 'FW-026009593-772', time: '3,1s' },
  { id: 'tx_9P2M…44D1', from: 'USDC', to: 'EUR', amt: '$ 64.000,00', outAmt: '€ 59.073,00', rail: 'SEPA', s: 'done', ben: 'Berlin Digital Studio GmbH', rate: '1 EUR = 1,0834 USDC', fee: '0,18%', ref: 'SEPA-NL44-10942', time: '2,1s' },
  { id: 'tx_5V8N…19F0', from: 'BRL', to: 'USD', amt: 'R$ 540.000,00', outAmt: '$ 97.069,92', rail: 'ACH', s: 'done', ben: 'Apex Semiconductor Corp', rate: '1 USD = 5,5630 BRL', fee: '0,25%', ref: 'ACH-121000358-401', time: '1,9s' },
  { id: 'tx_2C9R…63E7', from: 'EUR', to: 'USDC', amt: '€ 88.500,00', outAmt: '95.880,90 USDC', rail: 'SEPA', s: 'proc', ben: 'Vault Liquidity Pool', rate: '1 EUR = 1,0834 USDC', fee: '0,15%', ref: '0x71c9a2...63E7', time: 'Estimado' },
  { id: 'tx_7M4K…02B9', from: 'USD', to: 'USDT', amt: '$ 175.000,00', outAmt: '175.000,00 USDT', rail: 'Fedwire', s: 'done', ben: 'Pacific Trade Partners', rate: '1 USD = 1,0000 USDT', fee: '0,10%', ref: '0x38f1b0...02B9', time: '1,4s' },
]

const accounts = [
  { id: 'acc_usd', name: 'USD Virtual Account', num: 'Routing 021000021 · Acc ·· 1796', rail: 'ACH & Fedwire', bal: '$ 1.420.500,00', cur: 'USD', dest: 'USDC' },
  { id: 'acc_eur', name: 'EUR Virtual Account', num: 'IBAN DE89 3704 0044 ·· 5678', rail: 'SEPA Instant & SWIFT', bal: '€ 860.240,00', cur: 'EUR', dest: 'USDC' },
  { id: 'acc_brl', name: 'Conta Operacional BRL', num: 'ISPB 18236120 · Pix Corporativo', rail: 'Pix & TED (Bacen)', bal: 'R$ 3.180.900,00', cur: 'BRL', dest: 'USDC' },
  { id: 'acc_usdc', name: 'Managed Wallet USDC', num: '0x944e8c21b0...7F06 (Solana / Base)', rail: 'Multichain MPC', bal: '2.280.740,00 USDC', cur: 'USDC', dest: 'USD' },
]

const initialBen = [
  { name: 'Acme Global Supplies LLC', country: 'Estados Unidos · Delaware', rail: 'ACH / USDC', kyb: 'KYB Verificado', cur: 'BRL', to: 'USDC' },
  { name: 'Nordic Freight AB', country: 'Suécia · Estocolmo', rail: 'SEPA / SWIFT', kyb: 'KYB Verificado', cur: 'USD', to: 'EUR' },
  { name: 'CloudScale Infrastructure Inc.', country: 'Estados Unidos · Califórnia', rail: 'Pix → USDT', kyb: 'KYB Verificado', cur: 'BRL', to: 'USDT' },
  { name: 'Horizon Industrial GmbH', country: 'Alemanha · Frankfurt', rail: 'SEPA Instant', kyb: 'Em revisão UBO', cur: 'EUR', to: 'BRL' },
]

const pageSize = 5

export default function DashboardShowcase() {
  const { t, lang } = useI18n()
  const langRef = useRef(lang)
  langRef.current = lang

  const track = useRef(null)
  const [pinned, setPinned] = useState(false)

  useEffect(() => {
    const reduce = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches
    function update() {
      const el = track.current
      if (!el) return
      const isPinned = !reduce && window.innerWidth >= 860
      setPinned(isPinned)
      if (!isPinned || window.innerHeight > 1400) {
        el.style.setProperty('--reveal', '1')
        return
      }
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const raw = (vh * 0.94 - rect.top) / (vh * 0.52)
      const p = Math.min(1, Math.max(0, raw))
      el.style.setProperty('--reveal', p.toFixed(3))
    }
    const ro = new ResizeObserver(update)
    if (track.current) ro.observe(track.current)
    addEventListener('scroll', update, { passive: true })
    addEventListener('resize', update)
    update()
    return () => {
      ro.disconnect()
      removeEventListener('scroll', update)
      removeEventListener('resize', update)
    }
  }, [])

  // Interactive Console State
  const [activeNav, setActiveNav] = useState(1) // 0: Overview, 1: Transactions, 2: Accounts, 3: Beneficiaries, 4: Compliance, 5: API Keys
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all') // 'all' | 'done' | 'proc' | 'wait' | 'rev'
  const [currentPageNum, setCurrentPageNum] = useState(1)
  const [selectedTxId, setSelectedTxId] = useState('tx_8F2K…91AC')
  const [showNewTx, setShowNewTx] = useState(false)
  const [copiedToken, setCopiedToken] = useState('')

  // New Transaction Composer State
  const [newFrom, setNewFrom] = useState('BRL')
  const [newTo, setNewTo] = useState('USDC')
  const [newAmount, setNewAmount] = useState(250000)
  const [newBeneficiary, setNewBeneficiary] = useState('Acme Global Supplies LLC')

  // Satellite Card Live Reactive State
  const [lastSettledAmt, setLastSettledAmt] = useState('152.795,25 USDC')
  const [lastSettledSource, setLastSettledSource] = useState('R$ 850.000,00 · 1,8s')

  const [txList, setTxList] = useState(initialTx)
  const [beneficiaries, setBeneficiaries] = useState(initialBen)

  const [showSecret, setShowSecret] = useState(false)
  const [webhookPing, setWebhookPing] = useState('')

  const currentPair = fxRates[`${newFrom}->${newTo}`] || { rate: 1, label: `1 ${newFrom} = 1,0000 ${newTo}`, rail: 'SWIFT', sym: '$' }

  const calculatedOutput = ((Number(newAmount) || 0) * currentPair.rate).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' ' + newTo

  const q = searchQuery.trim().toLowerCase()
  const filteredRows = txList.filter((r) => {
    const matchStatus = statusFilter === 'all' || r.s === statusFilter
    const matchQuery = !q || r.id.toLowerCase().includes(q) || r.from.toLowerCase().includes(q) || r.to.toLowerCase().includes(q) || r.rail.toLowerCase().includes(q) || r.ben.toLowerCase().includes(q)
    return matchStatus && matchQuery
  })

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize))
  const pageClamped = Math.min(currentPageNum, totalPages)
  const paginatedRows = filteredRows.slice((pageClamped - 1) * pageSize, (pageClamped - 1) * pageSize + pageSize)

  function selectFilter(f) {
    setStatusFilter(f)
    setCurrentPageNum(1)
  }

  function toggleRow(id) {
    setSelectedTxId((s) => (s === id ? '' : id))
  }

  function copyText(txt, tag) {
    navigator.clipboard?.writeText(txt).catch(() => {})
    setCopiedToken(tag)
    setTimeout(() => {
      setCopiedToken((c) => (c === tag ? '' : c))
    }, 1600)
  }

  function settleNow(row) {
    setTxList((list) => list.map((x) => (x.id === row.id ? { ...x, s: 'done', time: '1,2s' } : x)))
    setLastSettledAmt(row.outAmt)
    setLastSettledSource(`${langRef.current === 'pt' ? 'Origem' : 'Source'} ${row.amt} · 1,2s`)
    if (row.ben.includes('Horizon')) {
      setBeneficiaries((list) => list.map((b) => (b.name.includes('Horizon') ? { ...b, kyb: 'KYB Verificado' } : b)))
    }
  }

  function submitNewTx() {
    const amtNum = Number(newAmount) || 100000
    const sym = newFrom === 'BRL' ? 'R$ ' : newFrom === 'EUR' ? '€ ' : '$ '
    const formattedAmt = sym + amtNum.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    const outStr = calculatedOutput
    const randHex = Math.random().toString(16).substring(2, 6).toUpperCase()
    const newId = `tx_${randHex}…90F1`
    const newRow = {
      id: newId,
      from: newFrom,
      to: newTo,
      amt: formattedAmt,
      outAmt: outStr,
      rail: currentPair.rail,
      s: 'proc',
      ben: newBeneficiary,
      rate: currentPair.label,
      fee: '0,20%',
      ref: 'E18236120' + Date.now(),
      time: 'Estimado',
    }
    setTxList((list) => [newRow, ...list])
    setShowNewTx(false)
    setStatusFilter('all')
    setCurrentPageNum(1)
    setSelectedTxId(newId)
    setTimeout(() => {
      settleNow(newRow)
    }, 1400)
  }

  function openTransferFromAccount(acc) {
    setNewFrom(acc.cur)
    setNewTo(acc.dest)
    setNewAmount(150000)
    setActiveNav(1)
    setShowNewTx(true)
  }

  function openTransferForBeneficiary(ben) {
    setNewFrom(ben.cur)
    setNewTo(ben.to)
    setNewBeneficiary(ben.name)
    setNewAmount(180000)
    setActiveNav(1)
    setShowNewTx(true)
  }

  function triggerWebhookTest() {
    setWebhookPing('sending')
    setTimeout(() => {
      setWebhookPing('200 OK · 38ms (settlement.completed)')
    }, 450)
  }

  const copy = lang === 'pt'
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
        cardLRate: currentPair.label,
        cardLSub: `Rota ${newFrom} → ${newTo} · Liquidação estimada`,
        cardRTag: 'LIQUIDAÇÃO CONCLUÍDA',
        cardRAmt: lastSettledAmt,
        cardRSub: lastSettledSource,
        settleBtn: 'Simular liquidação',
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
        cardLRate: currentPair.label,
        cardLSub: `Route ${newFrom} → ${newTo} · Estimated settlement`,
        cardRTag: 'SETTLEMENT COMPLETED',
        cardRAmt: lastSettledAmt,
        cardRSub: lastSettledSource,
        settleBtn: 'Simulate settlement',
        copied: 'Copied ✓',
        copyId: 'Copy hash',
        execBtn: 'Confirm & settle',
      }

  const pt = lang === 'pt'
  const svgP = { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': 'true' }
  const navKey = (i) => (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setActiveNav(i)
    }
  }

  return (
    <section id="console" ref={track} data-c="DashboardShowcase" className={`showcase-track${pinned ? ' is-pinned' : ''}`} aria-label={t('showcase.label')}>
      <div className="container stage-wrap">
        {/* Foreground parallax card Left */}
        <aside ref={parallax(-0.22)} className="parallax-card card-left" aria-hidden="true">
          <div className="pc-head">
            <span className="pc-dot accent" />
            <span className="mono pc-tag">{copy.cardLTag}</span>
          </div>
          <strong className="mono pc-val">{copy.cardLRate}</strong>
          <span className="pc-sub">{copy.cardLSub}</span>
        </aside>

        {/* Foreground parallax card Right */}
        <aside ref={parallax(0.18)} className="parallax-card card-right" aria-hidden="true">
          <div className="pc-head">
            <span className="pc-dot ok" />
            <span className="mono pc-tag">{copy.cardRTag}</span>
          </div>
          <strong className="mono pc-val">{copy.cardRAmt}</strong>
          <span className="pc-sub">{copy.cardRSub}</span>
        </aside>

        {/* Main Interactive Operational Console */}
        <div className="frame">
          <aside className="side">
            <div className="side-top">
              <img src="/logo.png" alt="ALL X" width="54" height="13" className="side-logo" />
              <span className="live-pill"><i /> LIVE</span>
            </div>
            <ul role="tablist" aria-label="Console navigation">
              {copy.nav.map((n, i) => (
                <li
                  key={n}
                  role="tab"
                  tabIndex={0}
                  aria-selected={activeNav === i}
                  className={activeNav === i ? 'on' : ''}
                  onClick={() => setActiveNav(i)}
                  onKeyDown={navKey(i)}
                >
                  <span className="nav-label">
                    {/* Minimalist Sidebar Icons */}
                    {i === 0 ? (
                      <svg {...svgP}><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>
                    ) : i === 1 ? (
                      <svg {...svgP}><path d="M7 17 17 7M7 7h10v10" /></svg>
                    ) : i === 2 ? (
                      <svg {...svgP}><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="M3 10h18" /></svg>
                    ) : i === 3 ? (
                      <svg {...svgP}><circle cx="9" cy="8" r="3.5" /><path d="M3 19c0-3.3 2.7-6 6-6s6 2.7 6 6M16 11a3 3 0 1 0 0-6M21 19c0-2.8-2-5.1-4.6-5.8" /></svg>
                    ) : i === 4 ? (
                      <svg {...svgP}><path d="M12 3l7 3v5c0 4.5-3 8.3-7 9.5-4-1.2-7-5-7-9.5V6l7-3z" /><path d="m9.5 12 1.8 1.8 3.7-3.8" /></svg>
                    ) : (
                      <svg {...svgP}><circle cx="8" cy="15" r="4" /><path d="m10.8 12.2 8.2-8.2M16 7l3 3" /></svg>
                    )}
                    <span>{n}</span>
                  </span>
                  {i === 1 && <small className="nav-count mono">{txList.length}</small>}
                </li>
              ))}
            </ul>
            <div className="side-foot">
              <a href="#api" className="side-foot-link">
                <svg {...svgP} width="13" height="13"><path d="m16 18 6-6-6-6M8 6l-6 6 6 6" /></svg>
                <span>Webhooks &amp; API</span>
              </a>
              <a href="#contato" className="side-foot-link">
                <svg {...svgP} width="13" height="13"><circle cx="12" cy="12" r="9" /><path d="M12 8v4M12 16h.01" /></svg>
                <span>{pt ? 'Suporte dedicado' : 'Dedicated support'}</span>
              </a>
            </div>
          </aside>

          <div className="main">
            {/* Mobile / Tablet Tab Switcher */}
            <div className="mobile-tabs">
              {copy.nav.map((n, i) => (
                <button key={n} type="button" className={activeNav === i ? 'on' : ''} onClick={() => setActiveNav(i)}>
                  {n}
                </button>
              ))}
            </div>

            <div className="crumbs-row">
              <div className="crumbs">
                <span>{copy.home}</span><i>›</i><b>{copy.nav[activeNav]}</b>
              </div>
              <span className="hint-badge mono">
                {pt ? 'Console interativo · Clique nas linhas ou crie uma transação' : 'Interactive console · Click rows or create a transaction'}
              </span>
            </div>

            {activeNav === 1 ? (
              /* TAB 1: TRANSACTIONS */
              <>
                <div className="toolbar">
                  <label className="search">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
                    <input value={searchQuery} type="search" placeholder={copy.search} onChange={(e) => { setSearchQuery(e.target.value); setCurrentPageNum(1) }} />
                  </label>
                  <button type="button" className={`new-tx${showNewTx ? ' active' : ''}`} onClick={() => setShowNewTx(!showNewTx)}>
                    {showNewTx ? copy.closeTx : copy.newTx}
                  </button>
                </div>

                {/* Inline New Transaction Composer */}
                {showNewTx && (
                  <div className="composer">
                    <div className="comp-grid">
                      <label>
                        <span>{pt ? 'Moeda de origem' : 'Source currency'}</span>
                        <select value={newFrom} onChange={(e) => setNewFrom(e.target.value)}>
                          <option value="BRL">BRL (Pix)</option>
                          <option value="USD">USD (ACH / Fedwire)</option>
                          <option value="EUR">EUR (SEPA)</option>
                          <option value="USDC">USDC (Wallet)</option>
                        </select>
                      </label>
                      <label>
                        <span>{pt ? 'Ativo de destino' : 'Destination asset'}</span>
                        <select value={newTo} onChange={(e) => setNewTo(e.target.value)}>
                          <option value="USDC">USDC (Solana / Base)</option>
                          <option value="USDT">USDT (Polygon)</option>
                          <option value="USD">USD (Wire / ACH)</option>
                          <option value="EUR">EUR (SEPA Instant)</option>
                          <option value="BRL">BRL (Pix)</option>
                        </select>
                      </label>
                      <label>
                        <span>{pt ? 'Valor de envio' : 'Send amount'}</span>
                        <input value={newAmount} type="number" min="100" step="1000" onChange={(e) => setNewAmount(e.target.value === '' ? '' : Number(e.target.value))} />
                      </label>
                      <div className="comp-preview">
                        <span>{pt ? 'Liquidação estimada' : 'Estimated settlement'}</span>
                        <strong className="mono">{calculatedOutput}</strong>
                        <small className="mono">{currentPair.label} · {currentPair.rail}</small>
                      </div>
                    </div>
                    <div className="comp-foot">
                      <span className="comp-ben">{pt ? 'Beneficiário:' : 'Beneficiary:'} <b>{newBeneficiary}</b></span>
                      <button type="button" className="exec-btn" onClick={submitNewTx}>{copy.execBtn}</button>
                    </div>
                  </div>
                )}

                {/* Filter Pills */}
                <div className="filter-bar">
                  {copy.filters.map((f) => (
                    <button key={f.k} type="button" className={`filter-pill${statusFilter === f.k ? ' on' : ''}`} onClick={() => selectFilter(f.k)}>
                      {f.l}
                    </button>
                  ))}
                </div>

                {/* Transactions Table */}
                <div className="table" role="table">
                  <div className="tr th" role="row">
                    {copy.cols.map((c) => <span key={c} role="columnheader">{c}</span>)}
                  </div>

                  {paginatedRows.map((r) => (
                    <Fragment key={r.id}>
                      <div
                        className={`tr row-interactive${selectedTxId === r.id ? ' selected' : ''}`}
                        role="row"
                        tabIndex={0}
                        onClick={() => toggleRow(r.id)}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); toggleRow(r.id) } }}
                      >
                        <span className="mono id" role="cell">{r.id}</span>
                        <span className="route-cell" role="cell">
                          <i className="ccy-dot" data-ccy={r.from} aria-hidden="true">{r.from[0]}</i>
                          <span>{r.from}</span>
                          <i className="arr">→</i>
                          <i className="ccy-dot" data-ccy={r.to} aria-hidden="true">{r.to[0]}</i>
                          <span>{r.to}</span>
                        </span>
                        <span className="amt" role="cell">{r.amt}</span>
                        <span className="rail" role="cell">{r.rail}</span>
                        <span role="cell"><em className={`st ${r.s}`}>{copy.st[r.s]}</em></span>
                      </div>

                      {/* Expanded Inspector Drawer */}
                      {selectedTxId === r.id && (
                        <div className="tx-drawer">
                          <div className="drawer-meta">
                            <div><small>{pt ? 'Beneficiário' : 'Beneficiary'}</small><b>{r.ben}</b></div>
                            <div><small>{pt ? 'Liquidação final' : 'Final settlement'}</small><b className="mono accent-txt">{r.outAmt}</b></div>
                            <div><small>{pt ? 'Cotação aplicada' : 'Applied rate'}</small><b className="mono">{r.rate} ({r.fee})</b></div>
                            <div><small>Ref / Hash</small><b className="mono">{r.ref}</b></div>
                          </div>
                          <div className="drawer-track">
                            <span className="dt-step done"><i /> {pt ? 'Origem capturada' : 'Pay-in captured'} ({r.rail})</span>
                            <span className="dt-sep" />
                            <span className="dt-step done"><i /> {pt ? 'Screening & FX' : 'Screening & FX'}</span>
                            <span className="dt-sep" />
                            <span className={`dt-step${r.s === 'done' ? ' done' : ''}`}><i /> {r.s === 'done' ? (pt ? 'Crédito liquidado' : 'Settled') : (pt ? 'Em liquidação' : 'Settling')}</span>
                          </div>
                          <div className="drawer-actions">
                            <button type="button" className="mini-btn" onClick={(e) => { e.stopPropagation(); copyText(r.ref, r.id) }}>
                              {copiedToken === r.id ? copy.copied : copy.copyId}
                            </button>
                            {r.s !== 'done' ? (
                              <button type="button" className="mini-btn primary" onClick={(e) => { e.stopPropagation(); settleNow(r) }}>
                                {copy.settleBtn}
                              </button>
                            ) : (
                              <span className="settled-stamp mono">✓ {pt ? 'Liquidado em' : 'Settled in'} {r.time}</span>
                            )}
                          </div>
                        </div>
                      )}
                    </Fragment>
                  ))}
                </div>

                <div className="pager">
                  <span className="pp">{copy.perPage} · {filteredRows.length} {pt ? 'registros' : 'records'}</span>
                  <button type="button" className="pg-btn" disabled={currentPageNum <= 1} onClick={() => setCurrentPageNum((p) => p - 1)}>‹ {copy.prev}</button>
                  {Array.from({ length: totalPages }, (_, k) => k + 1).map((p) => (
                    <button key={p} type="button" className={`pg-num${currentPageNum === p ? ' on' : ''}`} onClick={() => setCurrentPageNum(p)}>
                      {p}
                    </button>
                  ))}
                  <button type="button" className="pg-btn" disabled={currentPageNum >= totalPages} onClick={() => setCurrentPageNum((p) => p + 1)}>{copy.next} ›</button>
                </div>
              </>
            ) : activeNav === 0 ? (
              /* TAB 0: OVERVIEW */
              <>
                <div className="kpi-grid">
                  <div className="kpi-card">
                    <small>{pt ? 'Volume liquidado (30d)' : 'Settled volume (30d)'}</small>
                    <strong className="mono">$ 4.820.500,00</strong>
                    <span className="kpi-ok">+18,4% · 100% reconciliado</span>
                  </div>
                  <div className="kpi-card">
                    <small>{pt ? 'Tempo médio de liquidação' : 'Avg settlement time'}</small>
                    <strong className="mono">{pt ? 'Conforme rota' : 'Route dependent'}</strong>
                    <span>Pix, SEPA Instant &amp; Stablecoins</span>
                  </div>
                  <div className="kpi-card">
                    <small>{pt ? 'Saldos consolidados' : 'Consolidated balances'}</small>
                    <strong className="mono">$ 5.148.920,00</strong>
                    <span>USD · EUR · BRL · USDC</span>
                  </div>
                </div>
                <div className="overview-cta">
                  <div>
                    <b>{pt ? 'Pronto para iniciar uma remessa ou conversão?' : 'Ready to initiate a transfer or conversion?'}</b>
                    <p>{pt ? 'Simule uma operação com cotação travada e veja a liquidação em tempo real na tabela.' : 'Simulate a locked-quote operation and watch real-time settlement in the table.'}</p>
                  </div>
                  <button type="button" className="exec-btn" onClick={() => { setActiveNav(1); setShowNewTx(true) }}>{copy.newTx}</button>
                </div>
              </>
            ) : activeNav === 2 ? (
              /* TAB 2: ACCOUNTS */
              <div className="acc-grid">
                {accounts.map((a) => (
                  <div key={a.id} className="acc-card">
                    <div className="acc-top">
                      <b>{a.name}</b>
                      <span className="mono rail-badge">{a.rail}</span>
                    </div>
                    <strong className="mono acc-bal">{a.bal}</strong>
                    <span className="mono acc-num">{a.num}</span>
                    <div className="acc-actions">
                      <button type="button" className="mini-btn" onClick={() => copyText(a.num, a.id)}>
                        {copiedToken === a.id ? copy.copied : (pt ? 'Copiar dados' : 'Copy details')}
                      </button>
                      <button type="button" className="mini-btn primary" onClick={() => openTransferFromAccount(a)}>
                        {pt ? 'Converter / Enviar →' : 'Convert / Send →'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : activeNav === 3 ? (
              /* TAB 3: BENEFICIARIES */
              <div className="ben-list">
                {beneficiaries.map((b) => (
                  <div key={b.name} className="ben-row">
                    <div>
                      <b>{b.name}</b>
                      <small>{b.country} · {b.rail}</small>
                    </div>
                    <div className="ben-right">
                      <span className="st done">{b.kyb}</span>
                      <button type="button" className="mini-btn primary" onClick={() => openTransferForBeneficiary(b)}>
                        {pt ? 'Enviar pagamento' : 'Send payment'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : activeNav === 4 ? (
              /* TAB 4: COMPLIANCE */
              <div className="comp-panel">
                <div className="comp-row">
                  <div>
                    <b>KYB / UBO &amp; Sanctions Screening</b>
                    <small>{pt ? 'Monitoramento contínuo OFAC, ONU, UE e PEP ativo em todas as carteiras e contas.' : 'Continuous OFAC, UN, EU and PEP screening active across all wallets and accounts.'}</small>
                  </div>
                  <span className="st done">{pt ? 'Operacional' : 'Operational'}</span>
                </div>
                {txList.filter((x) => x.s === 'rev' || x.ben.includes('Horizon')).map((r) => (
                  <div key={r.id} className="comp-row">
                    <div>
                      <b>{r.ben} ({r.id})</b>
                      <small>{r.amt} → {r.outAmt} · {r.rail}</small>
                    </div>
                    {r.s === 'rev' ? (
                      <button type="button" className="mini-btn primary" onClick={() => settleNow(r)}>
                        {pt ? 'Aprovar KYB e liquidar' : 'Approve KYB & settle'}
                      </button>
                    ) : (
                      <span className="st done">✓ {pt ? 'Aprovado e liquidado' : 'Approved & settled'}</span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              /* TAB 5: API KEYS */
              <div className="comp-panel">
                <div className="comp-row">
                  <div>
                    <b>Production Secret Key</b>
                    <code className="mono key-code">{showSecret ? 'ax_live_9f8a44c2e10b77d3a90131c4' : 'ax_live_9f8a••••••••••••••••31c4'}</code>
                  </div>
                  <div className="ben-right">
                    <button type="button" className="mini-btn" onClick={() => setShowSecret(!showSecret)}>
                      {showSecret ? (pt ? 'Ocultar' : 'Hide') : (pt ? 'Revelar' : 'Reveal')}
                    </button>
                    <button type="button" className="mini-btn" onClick={() => copyText('ax_live_9f8a44c2e10b77d3a90131c4', 'key')}>
                      {copiedToken === 'key' ? copy.copied : (pt ? 'Copiar chave' : 'Copy key')}
                    </button>
                  </div>
                </div>
                <div className="comp-row">
                  <div>
                    <b>Webhook Endpoint · https://api.empresa.com/webhooks/allx</b>
                    <small className="mono">{webhookPing || 'Eventos: settlement.completed, quote.locked, kyb.verified'}</small>
                  </div>
                  <button type="button" className="mini-btn primary" onClick={triggerWebhookTest}>
                    {pt ? 'Disparar evento de teste' : 'Send test webhook'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
