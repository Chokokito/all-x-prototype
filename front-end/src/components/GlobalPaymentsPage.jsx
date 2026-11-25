'use client'
import { useRef, useState } from 'react'
import { useI18n } from '../i18n'
import { parallax } from '../parallax'
import CobeGlobe from '../react/CobeGlobe.jsx'
import AnimatedBeam from '../react/fx/AnimatedBeam.jsx'
import './pages/global-payments.css'

const SP = [-23.5505, -46.6333]
const NY = [40.7128, -74.006]
const FR = [50.1109, 8.6821]
const LN = [51.5072, -0.1276]
const SG = [1.3521, 103.8198]
const MX = [19.4326, -99.1332]
const ZH = [47.3769, 8.5417]
const DX = [25.2048, 55.2708]
const MARKERS = [
  { location: SP, size: 0.1 },
  { location: NY, size: 0.09 },
  { location: FR, size: 0.08 },
  { location: LN, size: 0.07 },
  { location: SG, size: 0.075 },
  { location: MX, size: 0.065 },
  { location: ZH, size: 0.05 },
  { location: DX, size: 0.06 },
]
const ARCS = [
  { from: SP, to: NY },
  { from: NY, to: FR },
  { from: SP, to: FR },
  { from: FR, to: SG },
  { from: NY, to: LN },
  { from: SP, to: MX },
  { from: LN, to: DX },
  { from: DX, to: SG },
]

// Exemplos de moedas e trilhos; não representam uma rota disponível ou prazo garantido.
const ROUTES = [
  { o: ['Origem elegível', 'Conforme rota'], d: ['Destino elegível', 'Conforme rota'], ccy: 'BRL / USD', t: 'Sob consulta', rail: 'Pix · ACH' },
  { o: ['Origem elegível', 'Conforme rota'], d: ['Destino elegível', 'Conforme rota'], ccy: 'EUR / USD', t: 'Sob consulta', rail: 'SEPA · SWIFT' },
  { o: ['Origem elegível', 'Conforme rota'], d: ['Destino elegível', 'Conforme rota'], ccy: 'USD / EUR', t: 'Sob consulta', rail: 'ACH · SWIFT' },
  { o: ['Origem elegível', 'Conforme rota'], d: ['Destino elegível', 'Conforme rota'], ccy: 'BRL / EUR', t: 'Sob consulta', rail: 'Pix · SEPA' },
  { o: ['Origem elegível', 'Conforme rota'], d: ['Destino elegível', 'Conforme rota'], ccy: 'USDC / USDT', t: 'Sob consulta', rail: 'Conforme rota' },
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
    colFrom: 'Origem',
    colTo: 'Destino',
    colCcy: 'Moeda',
    colTime: 'Prazo',
    colRail: 'Trilho',
    boardLabel: 'Painel de corredores',
    boardNote: 'Exemplos esquemáticos de moedas e trilhos, não de corredores ativos. Prazos e disponibilidade dependem da rota, do parceiro e da jurisdição.',
    corridors: [
      ['Receba', 'Receba pagamentos em moedas tradicionais ou stablecoins.', 'Inbound'],
      ['Cote', 'Consulte taxa, fees e prazo estimado antes de confirmar.', 'Quote'],
      ['Envie', 'Pague fornecedores e beneficiários pelos trilhos locais disponíveis para a rota.', 'Payout'],
      ['Liquide', 'A disponibilidade depende do corredor, parceiro e jurisdição aplicáveis.', 'Settlement'],
    ],
    fEyebrow: 'Controle',
    fTitle: 'Clareza antes, durante e depois de cada operação.',
    feats: [
      ['Uma experiência única', 'Envie e receba pagamentos internacionais sem trocar de plataforma.'],
      ['Quotes e status', 'Acompanhe cotações, status e informações da liquidação ao longo da operação.'],
      ['Trilhos locais', 'Pague fornecedores e beneficiários pelos trilhos locais disponíveis para a rota.'],
    ],
    closeA: 'Sua próxima rota',
    closeB: 'começa aqui.',
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
    colFrom: 'Origin',
    colTo: 'Destination',
    colCcy: 'Currency',
    colTime: 'Timing',
    colRail: 'Rail',
    boardLabel: 'Corridor board',
    boardNote: 'Schematic examples of currencies and rails, not active corridors. Timing and availability depend on the route, partner, and jurisdiction.',
    corridors: [
      ['Receive', 'Receive payments in fiat currencies or stablecoins.', 'Inbound'],
      ['Quote', 'Review rate, fees and estimated timing before confirming.', 'Quote'],
      ['Send', 'Pay suppliers and beneficiaries through local rails available for the route.', 'Payout'],
      ['Settle', 'Availability depends on the applicable corridor, partner and jurisdiction.', 'Settlement'],
    ],
    fEyebrow: 'Control',
    fTitle: 'Clarity before, during and after every operation.',
    feats: [
      ['A single experience', 'Send and receive international payments without switching platforms.'],
      ['Quotes and status', 'Follow quotes, status and settlement information throughout the operation.'],
      ['Local rails', 'Pay suppliers and beneficiaries through local rails available for the route.'],
    ],
    closeA: 'Your next route',
    closeB: 'starts here.',
  },
}

function RouteRow({ r, active, onOn, onOff, i }) {
  const box = useRef(null)
  const a = useRef(null)
  const b = useRef(null)
  return (
    <li
      className={`gpx-route${active ? ' on' : ''}`}
      tabIndex={0}
      onMouseEnter={onOn}
      onMouseLeave={onOff}
      onFocus={onOn}
      onBlur={onOff}
    >
      <div className="gpx-city"><span>{r.o[0]}</span><small>{r.o[1]}</small></div>
      <div className="gpx-track" ref={box} aria-hidden="true">
        <span className="gpx-dot o" ref={a} />
        <span className="gpx-dot d" ref={b} />
        <AnimatedBeam
          containerRef={box}
          fromRef={a}
          toRef={b}
          curvature={i % 2 ? 18 : -18}
          duration={active ? 1.6 : 4}
          delay={i * 0.4}
          pathColor={active ? 'rgba(217,142,104,0.45)' : 'rgba(255,255,255,0.10)'}
        />
      </div>
      <div className="gpx-city to"><span>{r.d[0]}</span><small>{r.d[1]}</small></div>
      <span className="gpx-ccy">{r.ccy}</span>
      <span className="gpx-time">{r.t}</span>
      <span className="gpx-rail">{r.rail}</span>
    </li>
  )
}

export default function GlobalPaymentsPage() {
  const { lang } = useI18n()
  const c = COPY[lang] || COPY.pt
  const [hover, setHover] = useState(-1)

  return (
    <div data-c="GlobalPaymentsPage" className="gpx">
      <section className="gpx-hero">
        <div ref={parallax(-0.12)} className="gpx-globe" aria-hidden="true">
          <CobeGlobe markers={MARKERS} arcs={ARCS} maxWidth={1180} theta={0.3} phi={5.4} speed={0.002} />
        </div>
        <div className="gpx-vignette" aria-hidden="true" />
        <div className="gpx-copy">
          <span className="gpx-badge"><i />{c.badge}</span>
          <h1 className="gpx-h1"><span>{c.l1}</span><span>{c.l2}</span></h1>
          <p className="gpx-sub">{c.sub}</p>
          <div className="gpx-ctas">
            <a href="#contato" className="btn btn-primary">{c.cta1}</a>
            <a href="#corredores" className="btn btn-ghost">{c.cta2}</a>
          </div>
        </div>
        <div ref={parallax(0.18)} className="gpx-float a">
          <small><i />{c.quote.toUpperCase()}</small>
          <strong>BRL → USD</strong>
          <span>{c.quoteSub}</span>
        </div>
        <div ref={parallax(0.32)} className="gpx-float b">
          <small><i />{c.settled.toUpperCase()}</small>
          <strong>USD / local rail</strong>
          <span>{c.settledSub}</span>
        </div>
      </section>

      <section className="gpx-rails" aria-label={c.railsLabel}>
        <span className="gpx-rails-label">{c.railsLabel}</span>
        <div className="gpx-marquee" aria-hidden="true">
          <div className="gpx-marquee-track">
            {[0, 1].map((dup) => (
              <span key={dup} className="gpx-marquee-chunk">
                {c.rails.map((r) => (
                  <span key={`${dup}-${r}`} className="gpx-marquee-item">
                    {r}<b>·</b>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
        <ul className="gpx-marquee-static">{c.rails.map((r) => <li key={r}>{r}</li>)}</ul>
      </section>

      <section id="corredores" className="gpx-sec">
        <div className="container">
          <header className="gpx-board-head reveal">
            <div>
              <span className="gpx-eyebrow">{c.cEyebrow}</span>
              <h2>{c.cTitle}</h2>
            </div>
            <p>{c.cText}</p>
          </header>
          <div className="gpx-board reveal" role="group" aria-label={c.boardLabel}>
            <div className="gpx-cols" aria-hidden="true">
              <span>{c.colFrom}</span><span /><span>{c.colTo}</span><span>{c.colCcy}</span><span>{c.colTime}</span><span>{c.colRail}</span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {ROUTES.map((r, i) => (
                <RouteRow key={i} i={i} r={r} active={hover === i} onOn={() => setHover(i)} onOff={() => setHover(-1)} />
              ))}
            </ul>
          </div>
          <p className="gpx-note">{c.boardNote}</p>
        </div>
      </section>

      <section className="gpx-flow">
        <div className="container">
          <ol className="gpx-steps">
            {c.corridors.map(([n, d, w]) => (
              <li key={n} className="gpx-step reveal">
                <em>{w}</em>
                <h3>{n}</h3>
                <p>{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="gpx-feats">
        <div className="container">
          <span className="gpx-eyebrow">{c.fEyebrow}</span>
          <h2 className="reveal">{c.fTitle}</h2>
          <div className="gpx-fl">
            {c.feats.map(([t, d], i) => (
              <div key={t} className="gpx-fi reveal">
                <span>0{i + 1}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="gpx-close">
        <div className="container reveal">
          <h2>{c.closeA} <em>{c.closeB}</em></h2>
          <div className="gpx-ctas" style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
            <a href="#contato" className="btn btn-primary">{c.cta1}</a>
          </div>
        </div>
      </section>
    </div>
  )
}
