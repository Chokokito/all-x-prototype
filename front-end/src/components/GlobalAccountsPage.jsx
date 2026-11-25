'use client'

import { useEffect, useRef, useState } from 'react'
import { useI18n } from '../i18n'
import { parallax } from '../parallax'
import CobeGlobe from '../react/CobeGlobe.jsx'
import './pages/global-accounts.css'

const COPY = {
  pt: {
    badge: 'Contas corporativas multimoeda',
    l1: 'Contas globais para empresas',
    l2: 'que operam além da fronteira.',
    sub: 'Consulte a disponibilidade de contas em USD e EUR e organize saldos em stablecoins em uma única visão. Rotas e serviços dependem de elegibilidade e parceiros.',
    cta1: 'Consultar disponibilidade',
    cta2: 'Ver saldos',
    panel: 'ALL X · Exemplo',
    live: 'Demonstração de interface com dados ilustrativos',
    balance: 'Saldo disponível',
    accounts: [
      { cur: 'USD', name: 'Conta corporativa em USD', bal: 'USD · saldo operacional', rail: 'Redes locais conforme disponibilidade', coord: 'Conta nomeada',
        rows: [['Entrada', 'Recebimento internacional', 'Recebimento', 'Exemplo'], ['Saída', 'Pagamento a fornecedor', 'Pagamento', 'Exemplo'], ['Conversão', 'Conversão de moeda', 'Conversão', 'Exemplo']] },
      { cur: 'EUR', name: 'Conta corporativa em EUR', bal: 'EUR · saldo operacional', rail: 'Redes locais conforme disponibilidade', coord: 'Conta nomeada',
        rows: [['Entrada', 'Recebimento internacional', 'Recebimento', 'Exemplo'], ['Saída', 'Pagamento a fornecedor', 'Pagamento', 'Exemplo'], ['Conversão', 'Conversão de moeda', 'Conversão', 'Exemplo']] },
      { cur: 'USDC', name: 'Carteira gerenciada', bal: 'USDC / USDT · saldo operacional', rail: 'Stablecoins e trilhos locais', coord: 'Carteira gerenciada',
        rows: [['Entrada', 'Recebimento em stablecoin', 'Recebimento', 'Exemplo'], ['Saída', 'Pagamento a beneficiário', 'Pagamento', 'Exemplo'], ['Conversão', 'Liquidação em moeda local', 'Conversão', 'Exemplo']] },
    ],
    cols: ['Etapa', 'Descrição', 'Tipo', 'Status'],
    bEyebrow: 'Estrutura',
    bTitle: 'Uma visão para organizar contas e saldos globais.',
    feats: [
      ['Saldos em múltiplas moedas', 'Consulte saldos em moedas e stablecoins dentro do escopo disponível para a sua operação.'],
      ['Contas para operações globais', 'Contas em USD e EUR sujeitas à elegibilidade, jurisdição e disponibilidade dos parceiros.'],
      ['Conciliação e integração', 'Webhooks e informações de liquidação podem apoiar a conciliação, conforme a integração acordada.'],
    ],
  },
  en: {
    badge: 'Multi-currency corporate accounts',
    l1: 'Global accounts for companies',
    l2: 'operating beyond borders.',
    sub: 'Check the availability of USD and EUR accounts and organize stablecoin balances in one view. Routes and services depend on eligibility and partners.',
    cta1: 'Check availability',
    cta2: 'View balances',
    panel: 'ALL X · Example',
    live: 'Illustrative interface demonstration',
    balance: 'Available balance',
    accounts: [
      { cur: 'USD', name: 'Corporate USD account', bal: 'USD · operating balance', rail: 'Local rails as available', coord: 'Named account',
        rows: [['Inbound', 'International collection', 'Collection', 'Example'], ['Outbound', 'Supplier payment', 'Payment', 'Example'], ['Conversion', 'Currency conversion', 'Conversion', 'Example']] },
      { cur: 'EUR', name: 'Corporate EUR account', bal: 'EUR · operating balance', rail: 'Local rails as available', coord: 'Named account',
        rows: [['Inbound', 'International collection', 'Collection', 'Example'], ['Outbound', 'Supplier payment', 'Payment', 'Example'], ['Conversion', 'Currency conversion', 'Conversion', 'Example']] },
      { cur: 'USDC', name: 'Managed wallet', bal: 'USDC / USDT · operating balance', rail: 'Stablecoins and local rails', coord: 'Managed wallet',
        rows: [['Inbound', 'Stablecoin collection', 'Collection', 'Example'], ['Outbound', 'Beneficiary payment', 'Payment', 'Example'], ['Conversion', 'Local currency settlement', 'Conversion', 'Example']] },
    ],
    cols: ['Step', 'Description', 'Type', 'Status'],
    bEyebrow: 'Structure',
    bTitle: 'One view to organize global accounts and balances.',
    feats: [
      ['Multi-currency balances', 'View balances across currencies and stablecoins within the scope available to your operation.'],
      ['Accounts for global operations', 'USD and EUR accounts are subject to eligibility, jurisdiction, and partner availability.'],
      ['Reconciliation and integration', 'Webhooks and settlement information may support reconciliation, depending on the agreed integration.'],
    ],
  },
}

const CURS = ['USD', 'EUR', 'BRL', 'USDC']

const EXTRA = {
  pt: {
    brl: { name: 'Conta corporativa em BRL', bal: 'BRL · saldo operacional', rail: 'Pix e TED conforme disponibilidade', coord: 'Conta nomeada' },
    sub: { USD: 'Dólar americano', EUR: 'Euro', BRL: 'Real brasileiro', USDC: 'Stablecoin' },
    tabs: 'Selecione a moeda da conta',
    rails: 'Trilhos',
    h: ['Data', 'Descrição', 'Tag ERP', 'Status'],
    stepsEyebrow: 'Selecione a moeda',
    stepsTitle: 'Contas e saldos, conforme disponibilidade.',
    zzEyebrow: 'Estrutura',
    closeT: 'Consulte a disponibilidade de contas.',
    closeP: 'Converse com a equipe sobre contas em USD e EUR e saldos em stablecoins para a sua operação.',
    cardLabel: 'ALL X · conta',
    cards: 'Cartões e contas em cascata',
  },
  en: {
    brl: { name: 'Corporate BRL account', bal: 'BRL · operating balance', rail: 'Pix and TED as available', coord: 'Named account' },
    sub: { USD: 'US dollar', EUR: 'Euro', BRL: 'Brazilian real', USDC: 'Stablecoin' },
    tabs: 'Select account currency',
    rails: 'Rails',
    h: ['Date', 'Description', 'ERP tag', 'Status'],
    stepsEyebrow: 'Select currency',
    stepsTitle: 'Accounts and balances, subject to availability.',
    zzEyebrow: 'Structure',
    closeT: 'Check account availability.',
    closeP: 'Talk to the team about USD and EUR accounts and stablecoin balances for your operation.',
    cardLabel: 'ALL X · account',
    cards: 'Cascading cards and accounts',
  },
}

const DETAILS = {
  USD: { fields: [['Routing', '•••• ••• 21'], ['Account', '•••• 4471'], ['SWIFT', 'ALLXUS••']], rails: ['ACH', 'Fedwire', 'SWIFT'] },
  EUR: { fields: [['IBAN', 'DE•• •••• •••• 4471 00'], ['BIC', 'ALLXDE••'], ['Ref', 'SEPA']], rails: ['SEPA', 'SEPA Instant', 'SWIFT'] },
  BRL: { fields: [['Pix', 'chave@allx'], ['Agência', '0001'], ['Conta', '••••4471-0']], rails: ['Pix', 'TED'] },
  USDC: { fields: [['Network', 'Ethereum · Solana'], ['Address', '0x71C…4471'], ['Wallet', 'Managed']], rails: ['USDC', 'USDT', 'On/off-ramp'] },
}

const CURMARK = { USD: [40.7128, -74.006], EUR: [50.1109, 8.6821], BRL: [-23.5505, -46.6333], USDC: [1.3521, 103.8198] }
const MARKERS = CURS.map((k) => ({ location: CURMARK[k], size: 0.1 }))
const ARCS = [
  { from: CURMARK.BRL, to: CURMARK.USD },
  { from: CURMARK.USD, to: CURMARK.EUR },
  { from: CURMARK.EUR, to: CURMARK.USDC },
  { from: CURMARK.BRL, to: CURMARK.EUR },
]

// fan layout: [x, y, z, rotate, depth]
const FAN = [
  [-96, 30, -60, -14, 2],
  [-34, 8, -20, -5, 4],
  [30, -8, 20, 4, 7],
  [92, -26, 60, 13, 11],
]

function Viz({ k }) {
  if (k === 0) return (
    <svg viewBox="0 0 320 180" role="img" aria-label="Multi-currency balances">
      <line className="st" x1="10" y1="160" x2="310" y2="160" />
      {[['USD', 110, 40, 0], ['EUR', 80, 110, 0.15], ['BRL', 60, 180, 0.3], ['USDC', 130, 250, 0.45]].map(([l, h, x, dl]) => (
        <g key={l}>
          <rect className={'ga-bar ' + (l === 'USD' ? 'fa' : 'fs')} style={{ animationDelay: dl + 's' }} x={x - 14} y={160 - h} width="28" height={h} rx="4" opacity={l === 'USD' ? 1 : 0.6} />
          <text className="fm" x={x} y="176" textAnchor="middle">{l}</text>
        </g>
      ))}
    </svg>
  )
  if (k === 1) return (
    <svg viewBox="0 0 320 180" role="img" aria-label="Global operations network">
      {[[60, 40], [260, 40], [60, 140], [260, 140]].map(([x, y], n) => (
        <line key={n} className="ac ga-dash" x1="160" y1="90" x2={x} y2={y} />
      ))}
      {[[60, 40], [260, 40], [60, 140], [260, 140]].map(([x, y], n) => (
        <circle key={n} className="fs ga-pulse" style={{ animationDelay: n * 0.4 + 's' }} cx={x} cy={y} r="9" />
      ))}
      <circle className="fa" cx="160" cy="90" r="18" />
      <circle className="ac" cx="160" cy="90" r="30" opacity=".4" />
      <text className="fm" x="160" y="94" textAnchor="middle" fill="#000" style={{ fill: '#1a1109' }}>X</text>
    </svg>
  )
  return (
    <svg viewBox="0 0 320 180" role="img" aria-label="Reconciliation">
      {[0, 1, 2].map((n) => (
        <g key={n} transform={`translate(20 ${20 + n * 48})`}>
          <rect className="st" width="280" height="36" rx="8" />
          <rect className="fs" x="12" y="14" width={90 - n * 14} height="8" rx="4" opacity=".5" />
          <rect className="fm" x="150" y="14" width="50" height="8" rx="4" opacity=".4" />
          <circle className="fa" cx="256" cy="18" r="9" />
          <path d="M251 18l4 4 7-8" stroke="#1a1109" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      ))}
    </svg>
  )
}

function BankCard({ cur, label, name, hot, style }) {
  return (
    <div className={'ga-card' + (hot ? ' hot' : '')} style={style}>
      <div className="ga-card-top"><span>{label}</span><b>{cur}</b></div>
      <div className="ga-chipic" />
      <div className="ga-card-num">•••• •••• •••• 4471</div>
      <div className="ga-card-bot"><span>{name}</span><span>12/29</span></div>
    </div>
  )
}

export default function GlobalAccountsPage() {
  const { lang } = useI18n()
  const c = COPY[lang] || COPY.pt
  const x = EXTRA[lang] || EXTRA.pt
  const [i, setI] = useState(0)
  const heroRef = useRef(null)
  const closeRef = useRef(null)
  const [closeIn, setCloseIn] = useState(false)

  const list = [c.accounts[0], c.accounts[1], { cur: 'BRL', rows: c.accounts[0].rows, ...x.brl }, c.accounts[2]]
  const acc = list[i]
  const det = DETAILS[acc.cur]

  useEffect(() => {
    const el = closeRef.current
    if (!el || typeof IntersectionObserver === 'undefined') { setCloseIn(true); return }
    const io = new IntersectionObserver(([en]) => { if (en.isIntersecting) { setCloseIn(true); io.disconnect() } }, { threshold: 0.25 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const onMove = (e) => {
    const el = closeRef.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', (((e.clientX - r.left) / r.width - 0.5) * 2).toFixed(3))
    el.style.setProperty('--my', (((e.clientY - r.top) / r.height - 0.5) * 2).toFixed(3))
  }
  const onLeave = () => { const el = closeRef.current; if (el) { el.style.setProperty('--mx', 0); el.style.setProperty('--my', 0) } }

  const onTabKey = (e) => {
    const d = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0
    if (!d) return
    e.preventDefault()
    const n = (i + d + list.length) % list.length
    setI(n)
    document.getElementById('ga-tab-' + n)?.focus()
  }

  return (
    <div data-c="GlobalAccountsPage" className="ga">
      <section className="ga-hero" ref={heroRef}>
        <div ref={parallax(0.18)} className="ga-hero-glow" aria-hidden="true" />
        <div className="container ga-hero-in">
          <div className="ga-globe-wrap">
            <CobeGlobe markers={MARKERS} arcs={ARCS} maxWidth={560} theta={0.25} phi={0.9} speed={0.0025} />
            {CURS.map((k, n) => <span key={k} className={'ga-chip c' + (n + 1)} aria-hidden="true">{k}</span>)}
          </div>
          <div className="ga-copy">
            <span className="ga-badge"><i />{c.badge}</span>
            <h1 className="ga-h1"><span>{c.l1}</span><span>{c.l2}</span></h1>
            <p className="ga-sub">{c.sub}</p>
            <div className="ga-ctas">
              <a href="#contato" className="btn btn-primary">{c.cta1}</a>
              <a href="#saldos" className="btn btn-ghost">{c.cta2}</a>
            </div>
          </div>
        </div>
      </section>

      <section className="ga-sel" id="saldos">
        <div className="container">
          <header className="ga-zz-head reveal">
            <span className="eyebrow">{x.stepsEyebrow}</span>
            <h2>{x.stepsTitle}</h2>
          </header>
          <div className="ga-sel-grid reveal">
            <div className="ga-sel-tabs" role="tablist" aria-label={x.tabs} onKeyDown={onTabKey}>
              {list.map((a, k) => (
                <button key={a.cur} id={'ga-tab-' + k} role="tab" type="button" className="ga-tab" aria-selected={i === k} aria-controls="ga-panel" tabIndex={i === k ? 0 : -1} onClick={() => setI(k)}>
                  {a.cur}<small>{x.sub[a.cur]}</small>
                </button>
              ))}
            </div>
            <div className="ga-sheet" id="ga-panel" role="tabpanel" aria-labelledby={'ga-tab-' + i}>
              <div className="ga-sheet-in" key={acc.cur}>
                <div className="ga-sheet-top"><span>{acc.name} · {c.balance}</span><span>{c.panel}</span></div>
                <div className="ga-bal">{acc.bal}</div>
                <dl className="ga-kv">
                  {det.fields.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
                  <div><dt>{x.rails}</dt><dd>{acc.rail}</dd></div>
                </dl>
                <div className="ga-rails">{det.rails.map((r) => <span key={r}>{r}</span>)}</div>
                <div className="ga-tx" role="table" aria-label={c.live}>
                  <div className="ga-tx-h" role="row">{x.h.map((h) => <span key={h} role="columnheader">{h}</span>)}</div>
                  {acc.rows.map(([d, desc, tag, st]) => (
                    <div key={tag} className="ga-tx-r" role="row">
                      <span className="d" role="cell">{d}</span>
                      <strong role="cell" style={{ fontWeight: 500 }}>{desc}</strong>
                      <em role="cell">{tag}</em>
                      <span className="ok" role="cell">{st}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ga-zz">
        <div className="container">
          <header className="ga-zz-head reveal">
            <span className="eyebrow">{c.bEyebrow}</span>
            <h2>{c.bTitle}</h2>
          </header>
          {c.feats.map(([t, d], k) => (
            <div key={t} className="ga-row reveal">
              <div className="ga-row-t">
                <span className="n">0{k + 1}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
              <div className="ga-viz" ref={parallax(k % 2 ? -0.04 : 0.04)}><Viz k={k} /></div>
            </div>
          ))}
        </div>
      </section>

      <section ref={closeRef} className={'ga-close' + (closeIn ? ' in' : '')} onMouseMove={onMove} onMouseLeave={onLeave}>
        <div className="container ga-close-in">
          <div className="reveal">
            <h2>{x.closeT}</h2>
            <p>{x.closeP}</p>
            <a href="#contato" className="btn btn-primary">{c.cta1}</a>
          </div>
          <div className="ga-fan" role="img" aria-label={x.cards}>
            <div className="ga-fan-in">
              {CURS.map((k, n) => {
                const [fx, fy, fz, fr, fd] = FAN[n]
                return (
                  <BankCard
                    key={k}
                    cur={k}
                    label={x.cardLabel}
                    name={x.sub[k]}
                    hot={n === 2}
                    style={{ '--x': fx, '--y': fy, '--z': fz, '--r': fr, '--d': fd, zIndex: n + 1 }}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
