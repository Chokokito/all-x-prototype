'use client'

import { useEffect, useRef, useState } from 'react'
import { useI18n, navigateTo } from '../i18n'
import ApiTerminal from '../react/ApiTerminal.jsx'
import CobeGlobe from '../react/CobeGlobe.jsx'
import CountUp from '../react/bits/CountUp'
import { parallax } from '../parallax'
import './pages/developers.css'

const COPY = {
  pt: {
    badge: 'API & infraestrutura white-label',
    l1: 'Leve contas e pagamentos',
    l2: 'globais para o seu produto.',
    sub: 'APIs RESTful previsíveis, webhooks assinados e carteiras gerenciadas para construir fluxos de recebimento, conversão e liquidação internacional com poucas linhas de código.',
    cta1: 'Ler documentação da API',
    cta2: 'Solicitar chaves de Sandbox',
    terminalLabel: 'ALL X · API Sandbox',
    terminalStatus: 'Ambiente ativo',
    primitivesEyebrow: 'API primitives',
    primitivesTitle: 'Infraestrutura financeira pronta para integrar.',
    primitivesText: 'Contas, cotações, pagamentos e eventos em uma única camada operacional para sua equipe de produto.',
    primitives: [
      ['Managed Wallets & Accounts', 'Provisione contas e carteiras segregadas para clientes ou centros de custo em BRL, USD, EUR, USDC e USDT.'],
      ['Quotes & FX Engine', 'Consulte cotações em tempo real e trave a taxa para conversões entre moedas fiat e stablecoins.'],
      ['Payouts & Rails', 'Dispare pagamentos via Pix, ACH, Fedwire, SEPA, SWIFT ou redes blockchain com Idempotency-Key.'],
      ['Webhooks & Reconciliação', 'Receba eventos assinados por HMAC-SHA256 para cada mudança de estado da transação.'],
    ],
    engineeringEyebrow: 'Built for engineering',
    engineeringTitle: 'Menos infraestrutura para manter. Mais produto para construir.',
    engineeringText: 'Uma fundação previsível para equipes que precisam operar pagamentos sem abrir mão de controle, observabilidade e segurança.',
    feats: [
      ['Idempotência nativa', 'Proteção contra ordens duplicadas em retentativas de rede.'],
      ['Metadados de ERP', 'Anexe invoice_id, centro de custo e IDs internos às transações.'],
      ['Sandbox completo', 'Simule KYB, depósitos, FX e liquidações antes da produção.'],
      ['SDKs e referência interativa', 'Exemplos claros para acelerar a primeira integração.'],
    ],
    copy: 'Copiar',
    copied: 'Copiado ✓',
    flowLabel: 'Fluxo de integração',
    stepWord: 'Passo',
    panelLabel: 'Exemplo de código do passo ativo',
    stepsNav: 'Passos da integração',
    metricsLabel: 'Indicadores da plataforma',
    metrics: ['latência p95 (ms)', 'uptime (%)', 'rails conectados', 'endpoints'],
    quickEyebrow: 'Quickstart',
    quickTitle: 'Da chave ao primeiro payout em minutos.',
    quickText: 'Rode no terminal, use sua chave de Sandbox e acompanhe os eventos chegarem.',
    endpointsLabel: 'Endpoints disponíveis',
  },
  en: {
    badge: 'API & white-label infrastructure',
    l1: 'Embed global accounts',
    l2: 'and payments into your product.',
    sub: 'Predictable RESTful APIs, signed webhooks, and managed wallets to build collection, conversion, and cross-border settlement flows with minimal code.',
    cta1: 'Read API documentation',
    cta2: 'Request Sandbox keys',
    terminalLabel: 'ALL X · API Sandbox',
    terminalStatus: 'Environment active',
    primitivesEyebrow: 'API primitives',
    primitivesTitle: 'Financial infrastructure ready to integrate.',
    primitivesText: 'Accounts, quotes, payments, and events in one operating layer for your product team.',
    primitives: [
      ['Managed Wallets & Accounts', 'Provision segregated accounts and wallets for customers or cost centers in BRL, USD, EUR, USDC, and USDT.'],
      ['Quotes & FX Engine', 'Query real-time quotes and lock rates for conversions between fiat currencies and stablecoins.'],
      ['Payouts & Rails', 'Trigger payments through Pix, ACH, Fedwire, SEPA, SWIFT, or blockchain rails with Idempotency-Key.'],
      ['Webhooks & Reconciliation', 'Receive HMAC-SHA256-signed events for every transaction state change.'],
    ],
    engineeringEyebrow: 'Built for engineering',
    engineeringTitle: 'Less infrastructure to maintain. More product to build.',
    engineeringText: 'A predictable foundation for teams that need to operate payments without giving up control, observability, or security.',
    feats: [
      ['Native idempotency', 'Protection against duplicate orders during network retries.'],
      ['ERP metadata', 'Attach invoice_id, cost center, and internal IDs to transactions.'],
      ['Complete Sandbox', 'Simulate KYB, deposits, FX, and settlements before production.'],
      ['SDKs and interactive reference', 'Clear examples to accelerate the first integration.'],
    ],
    copy: 'Copy',
    copied: 'Copied ✓',
    flowLabel: 'Integration flow',
    stepWord: 'Step',
    panelLabel: 'Code sample for the active step',
    stepsNav: 'Integration steps',
    metricsLabel: 'Platform indicators',
    metrics: ['p95 latency (ms)', 'uptime (%)', 'connected rails', 'endpoints'],
    quickEyebrow: 'Quickstart',
    quickTitle: 'From key to first payout in minutes.',
    quickText: 'Run it in your terminal, use your Sandbox key, and watch events arrive.',
    endpointsLabel: 'Available endpoints',
  },
}

const STEP_TAGS = ['Auth', 'Quote', 'Payout', 'Webhook']

const SNIPPETS = [
  `curl https://api.allx.com/v1/auth/token \\
  -u $ALLX_KEY:$ALLX_SECRET \\
  -d scope="wallets quotes payouts"

// 200 OK
{ "access_token": "ax_live_8f2c…",
  "expires_in": 3600 }`,
  `POST /v1/quotes
{
  "from": "BRL", "to": "USDC",
  "amount": 500000.00,
  "lock_seconds": 30
}

// 200 OK
{ "quote_id": "qt_41ab", "rate": 0.1832 }`,
  `POST /v1/payouts
Idempotency-Key: 7c1e-44ab-9d20
{
  "quote_id": "qt_41ab",
  "rail": "SOLANA",
  "metadata": { "invoice_id": "INV-2041" }
}

// 202 ACCEPTED  status: PENDING`,
  `POST https://you.app/hooks/allx
X-AllX-Signature: sha256=3b9f…

{ "event": "payout.settled",
  "id": "po_9d20",
  "status": "SETTLED_T0" }`,
]

const ENDPOINTS = [
  'GET /v1/accounts', 'POST /v1/quotes', 'POST /v1/payouts', 'GET /v1/payouts/{id}',
  'POST /v1/wallets', 'GET /v1/balances', 'POST /v1/webhooks', 'GET /v1/rates',
  'POST /v1/kyb/sandbox', 'GET /v1/events',
]

const PING_MARKERS = [
  { location: [-23.5505, -46.6333], size: 0.09 },
  { location: [40.7128, -74.006], size: 0.07 },
  { location: [50.1109, 8.6821], size: 0.07 },
  { location: [1.3521, 103.8198], size: 0.06 },
]
const PING_ARCS = [
  { from: [-23.5505, -46.6333], to: [40.7128, -74.006] },
  { from: [40.7128, -74.006], to: [50.1109, 8.6821] },
  { from: [50.1109, 8.6821], to: [1.3521, 103.8198] },
]

const QUICK_CMD = 'curl -X POST https://sandbox.allx.com/v1/payouts -H "Authorization: Bearer $ALLX_KEY"'

export default function DevelopersPage() {
  const { lang } = useI18n()
  const c = COPY[lang] || COPY.pt
  const [active, setActive] = useState(0)
  const [cmdCopied, setCmdCopied] = useState(false)
  const stepRefs = useRef([])

  const openDocs = (event) => {
    event.preventDefault()
    navigateTo('cms')
  }

  const copyCmd = async () => {
    try {
      await navigator.clipboard.writeText(QUICK_CMD)
      setCmdCopied(true)
      setTimeout(() => setCmdCopied(false), 1800)
    } catch { /* clipboard unavailable */ }
  }

  useEffect(() => {
    const els = stepRefs.current.filter(Boolean)
    if (!els.length || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) setActive(Number(e.target.dataset.i))
      })
    }, { rootMargin: '-35% 0px -45% 0px' })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const metricVals = [
    { to: 120, suffix: '', decimals: 0 },
    { to: 99.99, suffix: '', decimals: 2 },
    { to: 12, suffix: '+', decimals: 0 },
    { to: 40, suffix: '+', decimals: 0 },
  ]

  const loop = [...ENDPOINTS, ...ENDPOINTS]

  return (
    <div data-c="DevelopersPage" className="dx">
      {/* HERO */}
      <section className="dx-hero">
        <div className="dx-globe" aria-hidden="true" ref={parallax(-0.12)}>
          <CobeGlobe markers={PING_MARKERS} arcs={PING_ARCS} maxWidth={620} theta={0.35} phi={1.6} speed={0.002} />
        </div>
        <div className="dx-scan" aria-hidden="true" />
        <div className="container dx-hero-in">
          <div className="dx-hero-head">
            <span className="dx-badge"><i />{c.badge}</span>
            <h1 className="dx-h1">
              <span>{c.l1}</span>
              <span className="dx-h1-2">{c.l2}</span>
            </h1>
            <p className="dx-sub">{c.sub}</p>
            <div className="dx-ctas">
              <a href="#docs" className="btn btn-primary" onClick={openDocs}>{c.cta1}</a>
              <a href="#api-primitives" className="btn btn-ghost">{c.cta2}</a>
            </div>
          </div>

          <div className="dx-stack">
            <div className="dx-layer dx-layer-back" aria-hidden="true" ref={parallax(0.08)} />
            <div className="dx-layer dx-layer-mid" aria-hidden="true" ref={parallax(0.14)} />
            <div className="dx-term" ref={parallax(-0.04)}>
              <div className="dx-term-top">
                <span>{c.terminalLabel}</span>
                <span className="dx-live"><i />{c.terminalStatus}</span>
              </div>
              <ApiTerminal copyLabel={c.copy} copiedLabel={c.copied} />
            </div>
          </div>
        </div>
      </section>

      {/* ENDPOINT MARQUEE */}
      <div className="dx-marquee" role="region" aria-label={c.endpointsLabel}>
        <div className="dx-track" aria-hidden="true">
          {loop.map((e, i) => {
            const [m, ...rest] = e.split(' ')
            return <span key={i} className="dx-ep"><b className={m === 'GET' ? 'get' : 'post'}>{m}</b>{rest.join(' ')}</span>
          })}
        </div>
        <ul className="dx-sr">{ENDPOINTS.map((e) => <li key={e}>{e}</li>)}</ul>
      </div>

      {/* PINNED STEPS */}
      <section id="api-primitives" className="dx-flow">
        <div className="container">
          <header className="dx-flow-head reveal">
            <span className="dx-eyebrow">// {c.primitivesEyebrow}</span>
            <h2 className="dx-h2">{c.primitivesTitle}</h2>
            <p>{c.primitivesText}</p>
          </header>
          <div className="dx-flow-grid">
            <ol className="dx-steps" aria-label={c.stepsNav}>
              {c.primitives.map(([title, description], i) => (
                <li
                  key={title}
                  data-i={i}
                  ref={(el) => { stepRefs.current[i] = el }}
                  className={`dx-step${active === i ? ' on' : ''}`}
                  onClick={() => setActive(i)}
                >
                  <span className="dx-step-n">0{i + 1}<small>{c.stepWord} · {STEP_TAGS[i]}</small></span>
                  <strong>{title}</strong>
                  <p>{description}</p>
                </li>
              ))}
            </ol>
            <div className="dx-panel-wrap">
              <div className="dx-panel" role="region" aria-label={c.panelLabel}>
                <div className="dx-panel-top">
                  <span className="dots" aria-hidden="true"><i /><i /><i /></span>
                  <div className="dx-tabs" role="tablist">
                    {STEP_TAGS.map((t, i) => (
                      <button
                        key={t}
                        type="button"
                        role="tab"
                        aria-selected={active === i}
                        className={active === i ? 'on' : ''}
                        onClick={() => setActive(i)}
                      >
                        {t.toLowerCase()}.sh
                      </button>
                    ))}
                  </div>
                </div>
                <pre key={active} className="dx-code"><code>{SNIPPETS[active]}</code></pre>
                <div className="dx-bar" aria-hidden="true"><span style={{ width: `${((active + 1) / 4) * 100}%` }} /></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TECH GRID */}
      <section className="dx-eng">
        <div className="container">
          <header className="dx-eng-head reveal">
            <span className="dx-eyebrow">// {c.engineeringEyebrow}</span>
            <h2 className="dx-h2">{c.engineeringTitle}</h2>
            <p>{c.engineeringText}</p>
          </header>
          <div className="dx-metrics" role="group" aria-label={c.metricsLabel}>
            {metricVals.map((m, i) => (
              <div key={i} className="dx-metric">
                <strong>
                  <CountUp to={m.to} decimals={m.decimals} duration={1.6} />{m.suffix}
                </strong>
                <span>{c.metrics[i]}</span>
              </div>
            ))}
          </div>
          <div className="dx-feats">
            {c.feats.map(([title, description], i) => (
              <article key={title} className="dx-feat reveal">
                <span className="dx-feat-n">0{i + 1}</span>
                <h3>{title}</h3>
                <p>{description}</p>
                <span className="dx-corner" aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* QUICKSTART */}
      <section className="dx-quick">
        <div className="container dx-quick-in">
          <div className="dx-quick-copy reveal">
            <span className="dx-eyebrow">// {c.quickEyebrow}</span>
            <h2 className="dx-h2">{c.quickTitle}</h2>
            <p>{c.quickText}</p>
            <div className="dx-ctas">
              <a href="#docs" className="btn btn-primary" onClick={openDocs}>{c.cta1}</a>
              <a href="#api-primitives" className="btn btn-ghost">{c.cta2}</a>
            </div>
          </div>
          <div className="dx-cmd reveal">
            <span className="dx-cmd-prompt" aria-hidden="true">$</span>
            <code>{QUICK_CMD}</code>
            <button type="button" onClick={copyCmd} className="dx-cmd-btn" aria-live="polite">
              {cmdCopied ? c.copied : c.copy}
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
