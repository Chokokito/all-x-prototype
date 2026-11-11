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
    live: 'Conciliação em tempo real',
    balance: 'Saldo disponível',
    accounts: [
      { cur: 'USD', name: 'Conta Estados Unidos', bal: 'US$ 842.500,00', rail: 'ACH · Fedwire · SWIFT', coord: 'Routing 026073150',
        rows: [['Hoje', 'Recebimento · Enterprise Inc.', 'INV-2026-901', '+ US$ 185.000,00'], ['Ontem', 'Fornecedor de nuvem', 'CC-TECH-01', '− US$ 28.400,00'], ['06 nov', 'Conversão USD → BRL', 'FX-LOCK-442', '− US$ 95.000,00']] },
      { cur: 'EUR', name: 'Conta Zona do Euro', bal: '€ 315.200,00', rail: 'SEPA · SEPA Instant · SWIFT', coord: 'IBAN DE89 3704 0044 0532 0130 00',
        rows: [['Hoje', 'Repasse plataforma · Europa', 'REV-EU-112', '+ € 94.500,00'], ['06 nov', 'Contrato anual · Berlim GmbH', 'INV-2026-874', '+ € 120.000,00'], ['04 nov', 'Consultoria jurídica · UK', 'LEGAL-04', '− € 14.200,00']] },
      { cur: 'USDC', name: 'Carteira institucional', bal: '758.400,00 USDC', rail: 'USDC · USDT · Pix 24/7', coord: 'wl_corp_99481a',
        rows: [['Hoje', 'Reserva de folha mensal', 'PAY-NOV-26', '+ 250.000,00 USDC'], ['Ontem', 'Lote de contractors (38)', 'BATCH-992', '− 84.500,00 USDC'], ['05 nov', 'Off-ramp para Pix', 'OFF-7731', '− 120.000,00 USDC']] },
    ],
    cols: ['Data', 'Descrição', 'Tag ERP', 'Valor'],
    bEyebrow: 'Estrutura',
    bTitle: 'Uma conta no lugar de uma colcha de retalhos bancária.',
    feats: [
      ['Sem conversão forçada', 'O recurso permanece na moeda original até a sua tesouraria decidir converter ou usar.'],
      ['Subcontas por operação', 'Separe capital de giro, recebíveis, folha global e reservas, com a visão consolidada do grupo.'],
      ['Pronta para o ERP', 'Extratos padronizados e webhooks com ID de invoice, centro de custo e trilha de auditoria.'],
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
    live: 'Real-time reconciliation',
    balance: 'Available balance',
    accounts: [
      { cur: 'USD', name: 'United States account', bal: '$842,500.00', rail: 'ACH · Fedwire · SWIFT', coord: 'Routing 026073150',
        rows: [['Today', 'Inbound · Enterprise Inc.', 'INV-2026-901', '+ $185,000.00'], ['Yesterday', 'Cloud vendor', 'CC-TECH-01', '− $28,400.00'], ['Nov 06', 'FX USD → BRL', 'FX-LOCK-442', '− $95,000.00']] },
      { cur: 'EUR', name: 'Eurozone account', bal: '€315,200.00', rail: 'SEPA · SEPA Instant · SWIFT', coord: 'IBAN DE89 3704 0044 0532 0130 00',
        rows: [['Today', 'Platform payout · Europe', 'REV-EU-112', '+ €94,500.00'], ['Nov 06', 'Annual contract · Berlin GmbH', 'INV-2026-874', '+ €120,000.00'], ['Nov 04', 'Legal advisory · UK', 'LEGAL-04', '− €14,200.00']] },
      { cur: 'USDC', name: 'Institutional wallet', bal: '758,400.00 USDC', rail: 'USDC · USDT · 24/7 Pix', coord: 'wl_corp_99481a',
        rows: [['Today', 'Monthly payroll reserve', 'PAY-NOV-26', '+ 250,000.00 USDC'], ['Yesterday', 'Contractor batch (38)', 'BATCH-992', '− 84,500.00 USDC'], ['Nov 05', 'Off-ramp to Pix', 'OFF-7731', '− 120,000.00 USDC']] },
    ],
    cols: ['Date', 'Description', 'ERP tag', 'Amount'],
    bEyebrow: 'Structure',
    bTitle: 'One account instead of a multi-bank patchwork.',
    feats: [
      ['No forced conversion', 'Funds stay in their original currency until your treasury decides to convert or deploy.'],
      ['Sub-accounts per operation', 'Segregate working capital, receivables, global payroll and reserves, with a consolidated group view.'],
      ['ERP-ready', 'Standardized statements and webhooks with invoice ID, cost center and audit trail.'],
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
