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
    l1: 'Pagamentos globais com',
    l2: 'velocidade de trilho local.',
    sub: 'Envie e receba pagamentos internacionais por uma experiência única. Cotação, status e liquidação local sem trocar de plataforma e sem cadeias opacas de bancos correspondentes.',
    cta1: 'Fale com a ALL X',
    cta2: 'Ver corredores',
    quote: 'Cotação travada',
    quoteSub: 'Pix → Fedwire · liquidação T+0',
    settled: 'Liquidado',
    settledSub: 'Crédito integral no destino',
    railsLabel: 'Moedas, stablecoins e trilhos conectados',
    rails: ['Pix', 'ACH', 'Fedwire', 'SEPA', 'SWIFT', 'USDC', 'USDT'],
    cEyebrow: 'Corredores',
    cTitle: 'Os trilhos locais de cada mercado, em uma única operação.',
    cText: 'Receba em uma moeda e liquide em outra, direto no sistema doméstico do beneficiário.',
    corridors: [
      ['Brasil', 'Pix e TED 24/7 conectados a USD, EUR e USDC.', 'T+0'],
      ['Estados Unidos', 'ACH, Same-Day ACH, Fedwire e SWIFT.', 'T+0'],
      ['Europa e Reino Unido', 'SEPA, SEPA Instant e SWIFT.', 'T+0'],
      ['Ásia e cadeias de suprimentos', 'SWIFT e rotas em USDC/USDT para importadores.', 'T+0 / T+1'],
    ],
    fEyebrow: 'Controle',
    fTitle: 'Clareza antes, durante e depois de cada ordem.',
    feats: [
      ['Cotação transparente', 'Taxa, tarifas e prazo estimado visíveis antes de confirmar. O valor aprovado é o valor entregue.'],
      ['Rastreio de ponta a ponta', 'Funding, compliance, conversão e crédito acompanhados em tempo real, com comprovante padronizado.'],
      ['Lotes e alçadas', 'Pagamentos unitários ou em lote, com permissões por função e aprovação executiva.'],
    ],
  },
  en: {
    badge: 'Corporate cross-border payments',
    l1: 'Global payments at',
    l2: 'local-rail speed.',
    sub: 'Send and receive international payments in a single experience. Quotes, status and local settlement without switching platforms or opaque correspondent banking chains.',
    cta1: 'Talk to ALL X',
    cta2: 'View corridors',
    quote: 'Locked quote',
    quoteSub: 'Pix → Fedwire · T+0 settlement',
    settled: 'Settled',
    settledSub: 'Full credit at destination',
    railsLabel: 'Connected currencies, stablecoins and rails',
    rails: ['Pix', 'ACH', 'Fedwire', 'SEPA', 'SWIFT', 'USDC', 'USDT'],
    cEyebrow: 'Corridors',
    cTitle: 'Each market’s local rails, in one single operation.',
    cText: 'Collect in one currency and settle in another, straight into the beneficiary’s domestic system.',
    corridors: [
      ['Brazil', 'Pix and TED 24/7 connected to USD, EUR and USDC.', 'T+0'],
      ['United States', 'ACH, Same-Day ACH, Fedwire and SWIFT.', 'T+0'],
      ['Europe and United Kingdom', 'SEPA, SEPA Instant and SWIFT.', 'T+0'],
      ['Asia and supply chains', 'SWIFT and USDC/USDT routes for importers.', 'T+0 / T+1'],
    ],
    fEyebrow: 'Control',
    fTitle: 'Clarity before, during and after every order.',
    feats: [
      ['Transparent quotes', 'Rate, fees and estimated timing visible before you confirm. The approved amount is the delivered amount.'],
      ['End-to-end tracking', 'Funding, compliance, conversion and credit tracked in real time, with a standardized receipt.'],
      ['Batches and approvals', 'Single or batch payments, with role-based permissions and executive sign-off.'],
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
              <strong>R$ 528.000 → US$ 100.000</strong>
              <span>{c.quoteSub}</span>
            </div>
            <div className="pp-float b">
              <small><i />{c.settled.toUpperCase()}</small>
              <strong>USD 100,000.00</strong>
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
