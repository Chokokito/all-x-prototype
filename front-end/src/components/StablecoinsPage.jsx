'use client'
import { useState } from 'react'
import { useI18n } from '../i18n'
import { parallax } from '../parallax'
import CobeGlobe from '../react/CobeGlobe.jsx'
import ProductCrossNav from './ProductCrossNav'
import './ProductPage.css'

const SP = [-23.5505, -46.6333]
const NY = [40.7128, -74.006]
const ZH = [47.3769, 8.5417]
const SG = [1.3521, 103.8198]
const DXB = [25.2048, 55.2708]
const MARKERS = [
  { location: SP, size: 0.08 },
  { location: NY, size: 0.08 },
  { location: ZH, size: 0.07 },
  { location: SG, size: 0.07 },
  { location: DXB, size: 0.06 },
]
const ARCS = [
  { from: SP, to: ZH },
  { from: NY, to: SG },
  { from: ZH, to: DXB },
  { from: DXB, to: SG },
]

const COPY = {
  pt: {
    badge: 'Stablecoin Gateway · operação 24/7',
    l1: 'Stablecoins quando aceleram.',
    l2: 'Moeda local no destino.',
    sub: 'A ALL X conecta USDC e USDT aos trilhos bancários locais sem exigir que sua empresa gerencie chaves privadas, taxas de rede ou corretoras cripto.',
    cta1: 'Integrar o Gateway',
    cta2: 'Ver os fluxos',
    modes: [
      { tab: 'On-ramp', from: ['Pix · ACH · SEPA', 'BRL, USD ou EUR da sua conta'], to: ['USDC · USDT', 'Na carteira gerenciada ou no destino'], note: 'Em menos de 60 segundos, 24/7, inclusive feriados bancários.' },
      { tab: 'Off-ramp', from: ['USDC · USDT', 'Depósito em endereço dedicado'], to: ['Pix · ACH · SEPA', 'Crédito em moeda local na conta'], note: 'Screening on-chain e liquidação T+0 com comprovante para o ERP.' },
      { tab: 'Cross-border', from: ['BRL ou USD', 'Sua tesouraria opera em moeda local'], to: ['USD · EUR · BRL', 'O fornecedor recebe no banco dele'], note: 'A stablecoin é o trilho invisível: de D+4 para o mesmo dia.' },
    ],
    engine: 'ALL X',
    eEyebrow: 'Stablecoin é infraestrutura',
    eTitle: 'Você compra velocidade e controle, não uma aula de blockchain.',
    eText: 'A experiência executiva fica com o seu financeiro. A complexidade dos protocolos fica conosco.',
    visible: 'O que sua equipe vê',
    hidden: 'O que a ALL X orquestra',
    vis: ['Cotação clara e travada', 'Aprovação por função e MFA', 'Saldos fiat e stablecoin lado a lado', 'Conciliação com ID de invoice'],
    hid: ['Taxas de rede (gas) abstraídas', 'Custódia segregada, sem seed phrase', 'Seleção automática de redes e contratos', 'Blockchain screening (KYT) em cada transação'],
  },
  en: {
    badge: 'Stablecoin Gateway · 24/7 operation',
    l1: 'Stablecoins when they speed up.',
    l2: 'Local currency at destination.',
    sub: 'ALL X bridges USDC and USDT with local banking rails without your business managing private keys, network fees or crypto exchanges.',
    cta1: 'Integrate the Gateway',
    cta2: 'View the flows',
    modes: [
      { tab: 'On-ramp', from: ['Pix · ACH · SEPA', 'BRL, USD or EUR from your account'], to: ['USDC · USDT', 'In the managed wallet or at destination'], note: 'Under 60 seconds, 24/7, including bank holidays.' },
      { tab: 'Off-ramp', from: ['USDC · USDT', 'Deposit to a dedicated address'], to: ['Pix · ACH · SEPA', 'Local currency credit to your account'], note: 'On-chain screening and T+0 settlement with ERP-ready receipt.' },
      { tab: 'Cross-border', from: ['BRL or USD', 'Your treasury operates in local currency'], to: ['USD · EUR · BRL', 'The supplier is paid at their own bank'], note: 'Stablecoin is the invisible rail: from D+4 to same day.' },
    ],
    engine: 'ALL X',
    eEyebrow: 'Stablecoin is infrastructure',
    eTitle: 'You buy speed and control, not a blockchain lecture.',
    eText: 'The executive experience stays with your finance team. Protocol complexity stays with us.',
    visible: 'What your team sees',
    hidden: 'What ALL X orchestrates',
    vis: ['Clear, locked quotes', 'Role-based approvals and MFA', 'Fiat and stablecoin balances side by side', 'Reconciliation by invoice ID'],
    hid: ['Network (gas) fees abstracted', 'Segregated custody, no seed phrase', 'Automatic network and contract selection', 'Blockchain screening (KYT) on every transaction'],
  },
}

export default function StablecoinsPage() {
  const { lang } = useI18n()
  const c = COPY[lang] || COPY.pt
  const [m, setM] = useState(0)
  const mode = c.modes[m]

  return (
    <div data-c="ProductPage">
      <section className="pp-hero">
        <div ref={parallax(0.22)} className="pp-grid-bg" aria-hidden="true" />
        <div className="container pp-split is-reverse">
          <div className="pp-copy">
            <span className="pp-badge"><i />{c.badge}</span>
            <h1 className="pp-h1"><span>{c.l1}</span><span>{c.l2}</span></h1>
            <p className="pp-sub">{c.sub}</p>
            <div className="pp-ctas">
              <a href="#contato" className="btn btn-primary">{c.cta1}</a>
              <a href="#fluxos" className="btn btn-ghost">{c.cta2}</a>
            </div>
          </div>
          <div className="pp-globe-wrap">
            <CobeGlobe markers={MARKERS} arcs={ARCS} maxWidth={460} theta={-0.15} phi={1.2} speed={0.0045} />
          </div>
        </div>
      </section>

      <section id="fluxos" className="pp-sec">
        <div className="container">
          <div className="pp-seg reveal" role="tablist" style={{ marginBottom: 28 }}>
            {c.modes.map((x, k) => (
              <button key={x.tab} role="tab" aria-selected={m === k} className={m === k ? 'on' : ''} onClick={() => setM(k)}>{x.tab}</button>
            ))}
          </div>
          <div className="pp-panel reveal">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 'clamp(16px, 3vw, 40px)', padding: 'clamp(24px, 4vw, 44px)' }} className="sc-flow">
              <div>
                <strong style={{ fontSize: 'clamp(20px, 2.4vw, 28px)', fontWeight: 500, letterSpacing: '-0.03em' }}>{mode.from[0]}</strong>
                <p style={{ marginTop: 8, fontSize: 14.5, color: 'var(--muted)' }}>{mode.from[1]}</p>
              </div>
              <div aria-hidden="true" style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 140 }}>
                <span style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(217,142,104,.1), var(--accent))' }} />
                <span className="mono" style={{ fontSize: 11, padding: '5px 10px', borderRadius: 99, border: '1px solid rgba(217,142,104,.45)', color: 'var(--accent-soft)', background: 'rgba(217,142,104,.08)' }}>{c.engine}</span>
                <span style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, var(--accent), rgba(217,142,104,.1))' }} />
              </div>
              <div style={{ textAlign: 'right' }}>
                <strong style={{ fontSize: 'clamp(20px, 2.4vw, 28px)', fontWeight: 500, letterSpacing: '-0.03em', color: 'var(--accent-soft)' }}>{mode.to[0]}</strong>
                <p style={{ marginTop: 8, fontSize: 14.5, color: 'var(--muted)' }}>{mode.to[1]}</p>
              </div>
            </div>
            <div className="pp-panel-top" style={{ borderTop: '1px solid var(--line)', borderBottom: 0 }}>
              <span>{mode.note}</span>
              <span className="pp-live"><i />24/7/365</span>
            </div>
          </div>
        </div>
      </section>

      <section className="pp-sec">
        <div className="container">
          <header className="section-head pp-head reveal">
            <div className="title-block">
              <span className="eyebrow">{c.eEyebrow}</span>
              <h2 className="section-title">{c.eTitle}</h2>
            </div>
            <p>{c.eText}</p>
          </header>
          <div className="pp-cols" style={{ gridTemplateColumns: '1fr 1fr' }}>
            {[[c.visible, c.vis, true], [c.hidden, c.hid, false]].map(([title, items, accent]) => (
              <div key={title} className="pp-col reveal" style={accent ? { borderTopColor: 'var(--accent)' } : undefined}>
                <h3>{title}</h3>
                <ul className="checks" style={{ marginTop: 6 }}>
                  {items.map((it) => <li key={it}>{it}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pp-sec">
        <div className="container"><ProductCrossNav current="stablecoins" /></div>
      </section>
    </div>
  )
}
