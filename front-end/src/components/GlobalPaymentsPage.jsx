'use client'
import { useState } from 'react'
import { useI18n } from '../i18n'
import { parallax } from '../parallax'
import CobeGlobe from '../react/CobeGlobe.jsx'
import ProductCrossNav from './ProductCrossNav'
import './ProductPage.css'

const SP = [-23.5505, -46.6333]
const NY = [40.7128, -74.006]
const FR = [50.1109, 8.6821]
const LN = [51.5072, -0.1276]
const SG = [1.3521, 103.8198]
const MARKERS = [
  { location: SP, size: 0.09 },
  { location: NY, size: 0.085 },
  { location: FR, size: 0.075 },
  { location: LN, size: 0.06 },
  { location: SG, size: 0.065 },
]
const ARCS = [
  { from: SP, to: NY },
  { from: NY, to: FR },
  { from: SP, to: FR },
  { from: FR, to: SG },
  { from: NY, to: LN },
]

const COPY = {
  pt: {
    badge: 'Pagamentos internacionais corporativos',
    l1: 'Pagamentos internacionais',
    l2: 'em uma única experiência.',
    sub: 'Envie e receba pagamentos internacionais por uma experiência única. Quotes, status e liquidação local sem trocar de plataforma.',
    cta1: 'Fale com a ALL X',
    cta2: 'Ver corredores',
    quote: 'Cotação transparente',
    quoteSub: 'Taxa, fees e prazo estimado de liquidação',
    settled: 'Liquidação local',
    settledSub: 'Conforme rota e disponibilidade aplicáveis',
    railsLabel: 'Moedas, stablecoins e trilhos conectados',
    rails: ['USD', 'EUR', 'BRL', 'USDC', 'USDT', 'Pix', 'ACH', 'SWIFT', 'SEPA'],
    cEyebrow: 'Corredores',
    cTitle: 'Trilhos locais em uma única operação.',
    cText: 'Receba em moedas tradicionais ou stablecoins, converta com cotação transparente e liquide conforme a rota disponível.',
    corridors: [
      ['Receba', 'Receba pagamentos em moedas tradicionais ou stablecoins.', 'Inbound'],
      ['Cote', 'Consulte taxa, fees e prazo estimado antes de confirmar.', 'Quote'],
      ['Envie', 'Pague fornecedores e beneficiários usando os trilhos locais de cada mercado.', 'Payout'],
      ['Liquide', 'A disponibilidade depende do corredor, parceiro e jurisdição aplicáveis.', 'Settlement'],
    ],
    fEyebrow: 'Controle',
    fTitle: 'Clareza antes, durante e depois de cada operação.',
    feats: [
      ['Uma experiência única', 'Envie e receba pagamentos internacionais sem trocar de plataforma.'],
      ['Quotes e status', 'Acompanhe cotações, status e informações da liquidação ao longo da operação.'],
      ['Trilhos locais', 'Pague fornecedores e beneficiários usando os trilhos locais de cada mercado.'],
    ],
  },
  en: {
    badge: 'Corporate cross-border payments',
    l1: 'International payments',
    l2: 'in a single experience.',
    sub: 'Send and receive international payments in a single experience. Quotes, status and local settlement without switching platforms.',
    cta1: 'Talk to ALL X',
    cta2: 'View corridors',
    quote: 'Transparent quote',
    quoteSub: 'Rate, fees and estimated settlement',
    settled: 'Local settlement',
    settledSub: 'Subject to applicable route and availability',
    railsLabel: 'Connected currencies, stablecoins and rails',
    rails: ['USD', 'EUR', 'BRL', 'USDC', 'USDT', 'Pix', 'ACH', 'SWIFT', 'SEPA'],
    cEyebrow: 'Corridors',
    cTitle: 'Local rails in a single operation.',
    cText: 'Receive in fiat or stablecoins, convert with transparent quotes and settle according to the available route.',
    corridors: [
      ['Receive', 'Receive payments in fiat currencies or stablecoins.', 'Inbound'],
      ['Quote', 'Review rate, fees and estimated timing before confirming.', 'Quote'],
      ['Send', 'Pay suppliers and beneficiaries through local rails in each market.', 'Payout'],
      ['Settle', 'Availability depends on the applicable corridor, partner and jurisdiction.', 'Settlement'],
    ],
    fEyebrow: 'Control',
    fTitle: 'Clarity before, during and after every operation.',
    feats: [
      ['A single experience', 'Send and receive international payments without switching platforms.'],
      ['Quotes and status', 'Follow quotes, status and settlement information throughout the operation.'],
      ['Local rails', 'Pay suppliers and beneficiaries through local rails in each market.'],
    ],
  },
}

export default function GlobalPaymentsPage() {
  const { lang } = useI18n()
  const c = COPY[lang] || COPY.pt
  const [hover, setHover] = useState(0)

  return (
    <div data-c="ProductPage">
      <section className="pp-hero">
        <div ref={parallax(0.22)} className="pp-grid-bg" aria-hidden="true" />
        <div className="container pp-split">
          <div className="pp-copy">
            <span className="pp-badge"><i />{c.badge}</span>
            <h1 className="pp-h1"><span>{c.l1}</span><span>{c.l2}</span></h1>
            <p className="pp-sub">{c.sub}</p>
            <div className="pp-ctas">
              <a href="#contato" className="btn btn-primary">{c.cta1}</a>
              <a href="#corredores" className="btn btn-ghost">{c.cta2}</a>
            </div>
          </div>
          <div className="pp-globe-wrap">
            <CobeGlobe markers={MARKERS} arcs={ARCS} maxWidth={480} theta={0.25} phi={5.2} speed={0.003} />
            <div className="pp-float a">
              <small><i />{c.quote.toUpperCase()}</small>
              <strong>BRL → USD</strong>
              <span>{c.quoteSub}</span>
            </div>
            <div className="pp-float b">
              <small><i />{c.settled.toUpperCase()}</small>
              <strong>USD / local rail</strong>
              <span>{c.settledSub}</span>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="pp-rails">
            <span>{c.railsLabel}</span>
            <ul>{c.rails.map((r) => <li key={r}>{r}</li>)}</ul>
          </div>
        </div>
      </section>

      <section id="corredores" className="pp-sec">
        <div className="container">
          <header className="section-head pp-head reveal">
            <div className="title-block">
              <span className="eyebrow">{c.cEyebrow}</span>
              <h2 className="section-title">{c.cTitle}</h2>
            </div>
            <p>{c.cText}</p>
          </header>
          <div className="pp-rows reveal">
            {c.corridors.map(([n, d, w], i) => (
              <div key={n} className="pp-row" onMouseEnter={() => setHover(i)} style={hover === i ? undefined : undefined}>
                <strong>{n}</strong>
                <p>{d}</p>
                <em>{w}</em>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pp-sec">
        <div className="container">
          <header className="section-head pp-head reveal">
            <div className="title-block">
              <span className="eyebrow">{c.fEyebrow}</span>
              <h2 className="section-title">{c.fTitle}</h2>
            </div>
          </header>
          <div className="pp-cols">
            {c.feats.map(([t, d], i) => (
              <div key={t} className="pp-col reveal">
                <span className="n">0{i + 1}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pp-sec">
        <div className="container"><ProductCrossNav current="global-payments" /></div>
      </section>
    </div>
  )
}
