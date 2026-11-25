'use client'

import { useEffect, useRef, useState } from 'react'
import CobeGlobe from '../../../react/CobeGlobe.jsx'
import { parallax } from '../../../parallax'

const UI_COPY = {
  pt: {
    metrics: [
      { value: 'USD · EUR', label: 'Contas globais', sub: 'Sujeitas à elegibilidade e disponibilidade' },
      { value: 'USDC · USDT', label: 'Stablecoins', sub: 'Conforme rota e escopo aplicáveis' },
      { value: 'Pix · ACH · SWIFT · SEPA', label: 'Trilhos mencionados', sub: 'Disponibilidade varia por jurisdição e parceiro' },
      { value: 'API · Webhooks', label: 'Integrações', sub: 'Escopo sujeito à validação' },
    ],
    balancesLabel: 'VISÃO DEMONSTRATIVA',
    chartLabel: 'FLUXO ILUSTRATIVO',
    approvalsBadge: 'DEMO',
    approvalsOff: 'EXEMPLO',
    toggleLabels: [
      'Exemplo de acompanhamento de saldos',
      'Exemplo de validação de disponibilidade',
      'Exemplo de informações para conciliação',
    ],
    crossLabel: 'EXPLORE A PLATAFORMA',
  },
  en: {
    metrics: [
      { value: 'USD · EUR', label: 'Global accounts', sub: 'Subject to eligibility and availability' },
      { value: 'USDC · USDT', label: 'Stablecoins', sub: 'According to route and applicable scope' },
      { value: 'Pix · ACH · SWIFT · SEPA', label: 'Rails mentioned', sub: 'Availability varies by jurisdiction and partner' },
      { value: 'API · Webhooks', label: 'Integrations', sub: 'Scope subject to validation' },
    ],
    balancesLabel: 'ILLUSTRATIVE VIEW',
    chartLabel: 'ILLUSTRATIVE FLOW',
    approvalsBadge: 'DEMO',
    approvalsOff: 'EXAMPLE',
    toggleLabels: [
      'Example of balance monitoring',
      'Example of availability validation',
      'Example of reconciliation information',
    ],
    crossLabel: 'EXPLORE THE PLATFORM',
  },
}

const BALANCES = [
  { code: 'USD', rail: 'ACH / SWIFT', amount: '—', delta: '—', pct: 78 },
  { code: 'EUR', rail: 'SEPA / SWIFT', amount: '—', delta: '—', pct: 56 },
  { code: 'BRL', rail: 'Pix · route dependent', amount: '—', delta: '—', pct: 68 },
  { code: 'USDC', rail: 'USDC / USDT · route dependent', amount: '—', delta: '—', pct: 62 },
]

const TREASURY_MARKERS = [
  { location: [-23.5505, -46.6333], size: 0.09 },
  { location: [40.7128, -74.006], size: 0.085 },
  { location: [50.1109, 8.6821], size: 0.075 },
  { location: [51.5072, -0.1276], size: 0.07 },
  { location: [1.3521, 103.8198], size: 0.065 },
]

export default function BusinessView({ c, lang, navigateTo }) {
  const ui = UI_COPY[lang] || UI_COPY.pt
  const [activeTab, setActiveTab] = useState(0)
  const [policies, setPolicies] = useState([true, true, true])
  const flowRef = useRef(null)
  const barRef = useRef(null)

  useEffect(() => {
    const section = flowRef.current
    const bar = barRef.current
    if (!section || !bar) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      bar.style.transform = 'scaleX(1)'
      return
    }
    let raf = 0
    const update = () => {
      raf = 0
      const rect = section.getBoundingClientRect()
      const vh = window.innerHeight || 800
      const start = vh * 0.85
      const end = vh * 0.35 - rect.height
      const p = Math.min(1, Math.max(0.08, (start - rect.top) / Math.max(1, start - end)))
      bar.style.transform = `scaleX(${p.toFixed(3)})`
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const panelData = activeTab === 0 ? c.treasury : c.payables

  const togglePolicy = (index) => {
    setPolicies((prev) => prev.map((v, i) => (i === index ? !v : v)))
  }

  const goContact = (e) => {
    e.preventDefault()
    navigateTo('contact')
  }

  return (
    <div data-c="BusinessPage" className="bz">
      {/* HERO: Wide editorial intro + 3D perspective Treasury Dashboard over atmospheric CobeGlobe */}
      <section className="bz-hero">
        <div className="bz-grid-bg" aria-hidden="true" />
        <div ref={parallax(-0.14)} className="bz-globe-backdrop" aria-hidden="true">
          <CobeGlobe
            maxWidth={640}
            theta={0.28}
            phi={0.9}
            speed={0.0025}
            markers={TREASURY_MARKERS}
          />
        </div>

        <div className="container bz-hero-inner">
          <div className="bz-hero-copy">
            <span className="bz-badge">
              <i aria-hidden="true" />
              {c.badge}
            </span>
            <h1 className="bz-h1">
              <span>{c.l1}</span>
              <span className="bz-h1-muted">{c.l2}</span>
            </h1>
            <p className="bz-sub">{c.sub}</p>
            <div className="bz-ctas">
              <a href="/contact" className="btn btn-primary" onClick={goContact}>
                {c.cta1}
              </a>
              <a href="#use-cases" className="btn btn-ghost">
                {c.cta2}
              </a>
            </div>
          </div>

          {/* Floating 3D Treasury & Payables Panel */}
          <div ref={parallax(0.07)} className="bz-stage">
            <div className="bz-board">
              <div className="bz-board-top">
                <div className="bz-board-id">
                  <span className="bz-dots" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span>{c.panel}</span>
                </div>
                <div className="bz-board-actions">
                  <div className="bz-tabs" role="tablist" aria-label={c.panel}>
                    {c.tabs.map((tab, idx) => (
                      <button
                        key={tab}
                        type="button"
                        role="tab"
                        aria-selected={activeTab === idx}
                        className={activeTab === idx ? 'is-on' : ''}
                        onClick={() => setActiveTab(idx)}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                  <span className="bz-live">
                    <i aria-hidden="true" />
                    {c.panelStatus}
                  </span>
                </div>
              </div>

              <div className="bz-board-body">
                {/* Left: multi-currency liquidity balances + SVG area sparkline */}
                <div className="bz-liquidity">
                  <div className="bz-col-head">
                    <span>{ui.balancesLabel}</span>
                    <span className="bz-mono-accent">USD · EUR · BRL · USDC</span>
                  </div>

                  <div className="bz-bal-grid">
                    {BALANCES.map((b) => (
                      <div key={b.code} className="bz-bal-card">
                        <div className="bz-bal-top">
                          <strong>{b.code}</strong>
                          <span>{b.delta}</span>
                        </div>
                        <div className="bz-bal-val">{b.amount}</div>
                        <small>{b.rail}</small>
                        <div className="bz-bal-bar" aria-hidden="true">
                          <span style={{ width: `${b.pct}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bz-chart-box">
                    <div className="bz-col-head">
                      <span>{ui.chartLabel}</span>
                      <span>{lang === 'pt' ? 'Dados de exemplo' : 'Example data'}</span>
                    </div>
                    <svg
                      viewBox="0 0 420 104"
                      className="bz-chart-svg"
                      role="img"
                      aria-label={ui.chartLabel}
                    >
                      <defs>
                        <linearGradient id="bzChartFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#d98e68" stopOpacity="0.34" />
                          <stop offset="100%" stopColor="#d98e68" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <line x1="0" y1="26" x2="420" y2="26" className="bz-chart-grid" />
                      <line x1="0" y1="58" x2="420" y2="58" className="bz-chart-grid" />
                      <line x1="0" y1="90" x2="420" y2="90" className="bz-chart-grid" />
                      <path
                        d={
                          activeTab === 0
                            ? 'M0 84 C45 78, 70 64, 115 62 C160 60, 188 42, 232 45 C276 48, 308 26, 354 22 C384 19, 404 14, 420 12 L420 104 L0 104 Z'
                            : 'M0 72 C48 66, 86 76, 130 58 C172 41, 206 52, 248 38 C292 24, 332 30, 372 18 C394 12, 408 16, 420 10 L420 104 L0 104 Z'
                        }
                        fill="url(#bzChartFill)"
                      />
                      <path
                        d={
                          activeTab === 0
                            ? 'M0 84 C45 78, 70 64, 115 62 C160 60, 188 42, 232 45 C276 48, 308 26, 354 22 C384 19, 404 14, 420 12'
                            : 'M0 72 C48 66, 86 76, 130 58 C172 41, 206 52, 248 38 C292 24, 332 30, 372 18 C394 12, 408 16, 420 10'
                        }
                        fill="none"
                        stroke="#d98e68"
                        strokeWidth="2"
                      />
                      <circle cx="354" cy={activeTab === 0 ? '22' : '22'} r="4" fill="#e2a383" />
                    </svg>
                  </div>
                </div>

                {/* Right: Active Tab Details (Treasury or Payables) */}
                <div className="bz-ledger" role="tabpanel">
                  <div className="bz-ledger-head">
                    <h2>{panelData.title}</h2>
                    <p>{panelData.description}</p>
                  </div>
                  <ul className="bz-ledger-rows">
                    {panelData.rows.map(([label, desc, tag], i) => (
                      <li key={label} className="bz-ledger-row">
                        <span className="bz-ledger-idx">0{i + 1}</span>
                        <div className="bz-ledger-copy">
                          <strong>{label}</strong>
                          <p>{desc}</p>
                        </div>
                        <em className="bz-ledger-tag">{tag}</em>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* METRICS STRIP (CountUp) */}
      <section className="bz-metrics reveal" aria-label={ui.balancesLabel}>
        <div className="container">
          <div className="bz-metrics-grid">
            {ui.metrics.map((m) => (
              <div key={m.label} className="bz-metric">
                <div className="bz-metric-num">{m.value}</div>
                <strong>{m.label}</strong>
                <span>{m.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCROLL-DRIVEN HORIZONTAL OPERATIONAL FLOW */}
      <section ref={flowRef} className="bz-sec bz-flow reveal">
        <div className="container">
          <div className="bz-flow-head">
            <span className="bz-eyebrow">{c.boardLabel}</span>
            <p className="bz-flow-note">{c.controlText}</p>
          </div>

          <div className="bz-flow-track-wrap">
            <div className="bz-flow-rail" aria-hidden="true">
              <div ref={barRef} className="bz-flow-rail-fill" />
            </div>

            <ol className="bz-flow-steps">
              {c.boardItems.map(([num, title, desc]) => (
                <li key={num} className="bz-flow-step">
                  <div className="bz-flow-node">
                    <span>{num}</span>
                  </div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* USE CASES MODULAR MATRIX */}
      <section id="use-cases" className="bz-sec bz-uses">
        <div className="container">
          <header className="section-head bz-head reveal">
            <div className="title-block">
              <span className="bz-eyebrow">{c.useEyebrow}</span>
              <h2 className="section-title">{c.useTitle}</h2>
            </div>
            <p>{c.useText}</p>
          </header>

          <div className="bz-use-grid">
            {c.uses.map(([title, desc], idx) => (
              <article key={title} className="bz-use-card reveal">
                <div className="bz-use-top">
                  <span className="bz-use-num">0{idx + 1}</span>
                  <span className="bz-use-dot" aria-hidden="true" />
                </div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CONTROLS & APPROVALS WITH INTERACTIVE POLICY TOGGLES */}
      <section className="bz-sec bz-controls">
        <div className="container bz-controls-grid">
          <div className="bz-controls-sticky reveal">
            <span className="bz-eyebrow">{c.controlEyebrow}</span>
            <h2 className="section-title">{c.controlTitle}</h2>
            <p>{c.controlText}</p>
          </div>

          <div className="bz-policy-list reveal">
            {c.controls.map(([title, desc], idx) => {
              const active = policies[idx]
              return (
                <div key={title} className={`bz-policy-card ${active ? 'is-active' : ''}`}>
                  <div className="bz-policy-head">
                    <div className="bz-policy-id">
                      <span className="bz-policy-idx">0{idx + 1}</span>
                      <span className="bz-policy-pill">
                        {active ? ui.approvalsBadge : ui.approvalsOff}
                      </span>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={active}
                      aria-label={ui.toggleLabels[idx] || title}
                      className={`bz-switch ${active ? 'is-on' : ''}`}
                      onClick={() => togglePolicy(idx)}
                    >
                      <span className="bz-switch-thumb" />
                    </button>
                  </div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                  <div className="bz-policy-foot">
                    <span>{ui.toggleLabels[idx]}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* FINAL EXECUTIVE CTA CARD WITH ORBITING COPPER EMBLEM */}
      <section className="bz-sec bz-final">
        <div className="container">
          <div className="bz-cta-card reveal">
            <div className="bz-cta-copy">
              <span className="bz-eyebrow">{c.panel}</span>
              <h2>{c.finalTitle}</h2>
              <p>{c.finalText}</p>
              <a href="/contact" className="btn btn-primary" onClick={goContact}>
                {c.finalCta}
              </a>
            </div>

            <div className="bz-cta-orb" aria-hidden="true">
              <svg viewBox="0 0 240 240" className="bz-orb-svg">
                <circle cx="120" cy="120" r="96" className="bz-orb-ring bz-orb-ring-a" />
                <circle cx="120" cy="120" r="68" className="bz-orb-ring bz-orb-ring-b" />
                <ellipse cx="120" cy="120" rx="96" ry="38" className="bz-orb-meridian" />
                <ellipse cx="120" cy="120" rx="44" ry="96" className="bz-orb-meridian" />
                <circle cx="120" cy="120" r="6" className="bz-orb-core" />
                <circle cx="216" cy="120" r="4" className="bz-orb-node" />
                <circle cx="52" cy="120" r="3.5" className="bz-orb-node" />
              </svg>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
