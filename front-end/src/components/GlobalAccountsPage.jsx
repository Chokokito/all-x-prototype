'use client'
import { useState } from 'react'
import { useI18n } from '../i18n'
import { parallax } from '../parallax'
import CobeGlobe from '../react/CobeGlobe.jsx'
import ProductCrossNav from './ProductCrossNav'
import './ProductPage.css'

const MARKERS = [
  { location: [40.7128, -74.006], size: 0.09 },
  { location: [50.1109, 8.6821], size: 0.09 },
  { location: [-23.5505, -46.6333], size: 0.09 },
]
const ARCS = []

const COPY = {
  pt: {
    badge: 'Contas corporativas multimoeda',
    l1: 'Contas globais para empresas',
    l2: 'que operam além da fronteira.',
    sub: 'Receba pagamentos internacionais como uma operação local e organize saldos em USD, EUR, BRL e stablecoins em um único lugar.',
    cta1: 'Abrir conta corporativa',
    cta2: 'Ver saldos',
    panel: 'ALL X · Tesouraria',
    live: 'Saldos e movimentações',
    balance: 'Saldo disponível',
    accounts: [
      { cur: 'USD', name: 'Conta corporativa em USD', bal: 'USD · saldo operacional', rail: 'Redes locais conforme disponibilidade', coord: 'Conta nomeada',
        rows: [['Entrada', 'Recebimento internacional', 'Collection', 'Recebido'], ['Saída', 'Pagamento a fornecedor', 'Payable', 'Pago'], ['Conversão', 'Conversão de moeda', 'FX', 'Processado']] },
      { cur: 'EUR', name: 'Conta corporativa em EUR', bal: 'EUR · saldo operacional', rail: 'Redes locais conforme disponibilidade', coord: 'Conta nomeada',
        rows: [['Entrada', 'Recebimento internacional', 'Collection', 'Recebido'], ['Saída', 'Pagamento a fornecedor', 'Payable', 'Pago'], ['Conversão', 'Conversão de moeda', 'FX', 'Processado']] },
      { cur: 'USDC', name: 'Carteira gerenciada', bal: 'USDC / USDT · saldo operacional', rail: 'Stablecoins e trilhos locais', coord: 'Carteira gerenciada',
        rows: [['Entrada', 'Recebimento em stablecoin', 'Collection', 'Recebido'], ['Saída', 'Pagamento a beneficiário', 'Payout', 'Pago'], ['Conversão', 'Liquidação em moeda local', 'Settlement', 'Processado']] },
    ],
    cols: ['Data', 'Descrição', 'Tag ERP', 'Valor'],
    bEyebrow: 'Estrutura',
    bTitle: 'Uma conta no lugar de uma colcha de retalhos bancária.',
    feats: [
      ['Saldos em múltiplas moedas', 'Organize saldos e movimentações em diferentes moedas e stablecoins em uma única experiência.'],
      ['Contas para operações globais', 'Receba pagamentos internacionais e acompanhe os fluxos da sua empresa em um só lugar.'],
      ['Conciliação e integração', 'Use informações padronizadas, webhooks e referências operacionais para apoiar a reconciliação.'],
    ],
  },
  en: {
    badge: 'Multi-currency corporate accounts',
    l1: 'Global accounts for companies',
    l2: 'operating beyond borders.',
    sub: 'Collect international payments like a local entity and keep USD, EUR, BRL and stablecoin balances in one place.',
    cta1: 'Open corporate account',
    cta2: 'View balances',
    panel: 'ALL X · Treasury',
    live: 'Balances and movements',
    balance: 'Available balance',
    accounts: [
      { cur: 'USD', name: 'Corporate USD account', bal: 'USD · operating balance', rail: 'Local rails as available', coord: 'Named account',
        rows: [['Inbound', 'International collection', 'Collection', 'Received'], ['Outbound', 'Supplier payment', 'Payable', 'Paid'], ['Conversion', 'Currency conversion', 'FX', 'Processed']] },
      { cur: 'EUR', name: 'Corporate EUR account', bal: 'EUR · operating balance', rail: 'Local rails as available', coord: 'Named account',
        rows: [['Inbound', 'International collection', 'Collection', 'Received'], ['Outbound', 'Supplier payment', 'Payable', 'Paid'], ['Conversion', 'Currency conversion', 'FX', 'Processed']] },
      { cur: 'USDC', name: 'Managed wallet', bal: 'USDC / USDT · operating balance', rail: 'Stablecoins and local rails', coord: 'Managed wallet',
        rows: [['Inbound', 'Stablecoin collection', 'Collection', 'Received'], ['Outbound', 'Beneficiary payment', 'Payout', 'Paid'], ['Conversion', 'Local currency settlement', 'Settlement', 'Processed']] },
    ],
    cols: ['Date', 'Description', 'ERP tag', 'Amount'],
    bEyebrow: 'Structure',
    bTitle: 'One account instead of a multi-bank patchwork.',
    feats: [
      ['Multi-currency balances', 'Organize balances and movements across currencies and stablecoins in one experience.'],
      ['Accounts for global operations', 'Receive international payments and follow your company’s flows in one place.'],
      ['Reconciliation and integration', 'Use standardized information, webhooks, and operational references to support reconciliation.'],
    ],
  },
}

export default function GlobalAccountsPage() {
  const { lang } = useI18n()
  const c = COPY[lang] || COPY.pt
  const [i, setI] = useState(0)
  const acc = c.accounts[i]

  return (
    <div data-c="ProductPage">
      <section className="pp-hero">
        <div ref={parallax(0.22)} className="pp-grid-bg" aria-hidden="true" />
        {/* Globe rises from the bottom of the hero, behind the headline — never overlaps the panel */}
        <div aria-hidden="true" style={{ position: 'absolute', left: '50%', top: '50%', width: 'min(760px, 120vw)', transform: 'translate(-50%, -50%)', zIndex: 0, opacity: 0.38, pointerEvents: 'none', maskImage: 'radial-gradient(circle, #000 35%, transparent 72%)', WebkitMaskImage: 'radial-gradient(circle, #000 35%, transparent 72%)' }}>
          <CobeGlobe markers={MARKERS} arcs={ARCS} maxWidth={760} theta={0.3} phi={4.4} speed={0.002} />
        </div>
        <div className="container pp-center">
          <span className="pp-badge"><i />{c.badge}</span>
          <h1 className="pp-h1" style={{ alignItems: 'center' }}><span>{c.l1}</span><span>{c.l2}</span></h1>
          <p className="pp-sub">{c.sub}</p>
          <div className="pp-ctas">
            <a href="#contato" className="btn btn-primary">{c.cta1}</a>
            <a href="#saldos" className="btn btn-ghost">{c.cta2}</a>
          </div>
        </div>
      </section>

      <section className="pp-sec" style={{ paddingTop: 'clamp(40px, 5vw, 64px)' }}>
        <div id="saldos" className="container">
          <div className="pp-panel reveal">
            <div className="pp-panel-top">
              <span>{c.panel}</span>
              <span className="pp-live"><i />{c.live}</span>
            </div>
            <div className="pp-seg" style={{ margin: '20px 20px 0' }} role="tablist">
              {c.accounts.map((a, k) => (
                <button key={a.cur} role="tab" aria-selected={i === k} className={i === k ? 'on' : ''} onClick={() => setI(k)}>{a.cur}</button>
              ))}
            </div>
            <div style={{ padding: '24px 28px 8px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 16, alignItems: 'flex-end' }}>
              <div>
                <span style={{ fontSize: 13, color: 'var(--muted)' }}>{acc.name} · {c.balance}</span>
                <div className="mono" style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 600, letterSpacing: '-0.03em', marginTop: 6 }}>{acc.bal}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 13, color: 'var(--text-2)' }}>{acc.rail}</div>
                <div className="mono" style={{ fontSize: 12, color: 'var(--accent-soft)', marginTop: 4 }}>{acc.coord}</div>
              </div>
            </div>
            <div style={{ padding: '8px 28px 24px' }}>
              <div className="pp-rows" style={{ marginTop: 14 }}>
                {acc.rows.map(([d, desc, tag, amt]) => (
                  <div key={tag} className="pp-row" style={{ gridTemplateColumns: '90px 1fr auto auto', padding: '14px 4px', alignItems: 'center' }}>
                    <span className="mono" style={{ fontSize: 12, color: 'var(--muted)' }}>{d}</span>
                    <strong style={{ fontSize: 14.5 }}>{desc}</strong>
                    <em>{tag}</em>
                    <span className="mono" style={{ fontSize: 13.5, color: amt.startsWith('+') ? 'var(--ok)' : 'var(--text)' }}>{amt}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pp-sec">
        <div className="container">
          <header className="section-head pp-head reveal">
            <div className="title-block">
              <span className="eyebrow">{c.bEyebrow}</span>
              <h2 className="section-title">{c.bTitle}</h2>
            </div>
          </header>
          <div className="pp-cols">
            {c.feats.map(([t, d], k) => (
              <div key={t} className="pp-col reveal">
                <span className="n">0{k + 1}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pp-sec">
        <div className="container"><ProductCrossNav current="global-accounts" /></div>
      </section>
    </div>
  )
}
