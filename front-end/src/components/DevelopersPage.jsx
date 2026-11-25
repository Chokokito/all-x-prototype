'use client'

import { useEffect, useRef, useState } from 'react'
import { useI18n, navigateTo } from '../i18n'
import ApiTerminal from '../react/ApiTerminal.jsx'
import CobeGlobe from '../react/CobeGlobe.jsx'
import { parallax } from '../parallax'
import './pages/developers.css'

const COPY = {
  pt: {
    badge: 'API e integração',
    l1: 'Leve contas e pagamentos',
    l2: 'globais para o seu produto.',
    sub: 'Conheça as possibilidades de integrar contas e pagamentos internacionais ao seu produto. O escopo técnico e a disponibilidade devem ser validados com a equipe.',
    cta1: 'Ver informações de integração',
    cta2: 'Conversar sobre integração',
    terminalLabel: 'ALL X · Exemplo de integração',
    terminalStatus: 'Exemplo conceitual',
    terminalDisclaimer: 'Não é uma especificação de API',
    primitivesEyebrow: 'API primitives',
    primitivesTitle: 'Infraestrutura financeira pronta para integrar.',
    primitivesText: 'Contas, cotações, pagamentos e webhooks podem fazer parte do escopo de integração, conforme validação.',
    primitives: [
      ['Accounts & balances', 'Avalie contas em USD e EUR e saldos em stablecoins, sujeitos à elegibilidade e disponibilidade.'],
      ['Quotes & conversion', 'Consulte condições de conversão aplicáveis antes de confirmar uma operação.'],
      ['Payments & rails', 'Pix, ACH, SEPA e SWIFT podem estar disponíveis conforme rota, parceiro e jurisdição.'],
      ['Webhooks & reconciliation', 'Webhooks e informações de liquidação podem apoiar a integração, conforme o escopo acordado.'],
    ],
    engineeringEyebrow: 'Built for engineering',
    engineeringTitle: 'Menos infraestrutura para manter. Mais produto para construir.',
    engineeringText: 'Endpoints, autenticação, eventos, prazos e disponibilidade precisam ser confirmados para cada integração.',
    feats: [
      ['Escopo da API', 'Confirme endpoints, autenticação e requisitos com a equipe.'],
      ['Disponibilidade por rota', 'Moedas e trilhos dependem de parceiro e jurisdição.'],
      ['Eventos e webhooks', 'Formatos e eventos disponíveis devem ser validados.'],
      ['Apoio à integração', 'Converse com a equipe sobre os requisitos técnicos aplicáveis.'],
    ],
    copy: 'Copiar',
    copied: 'Copiado ✓',
    flowLabel: 'Exemplos conceituais',
    stepWord: 'Passo',
    panelLabel: 'Exemplo de código do passo ativo',
    stepsNav: 'Passos da integração',
    metricsLabel: 'Informações a confirmar',
    metrics: [
      { value: 'A validar', label: 'Escopo da API' },
      { value: 'Por rota', label: 'Trilhos disponíveis' },
      { value: 'A confirmar', label: 'Prazos e condições' },
      { value: 'Sob consulta', label: 'Acesso técnico' },
    ],
    quickEyebrow: 'Próximo passo',
    quickTitle: 'Valide o escopo técnico antes de integrar.',
    quickText: 'Converse com a equipe para confirmar acesso, requisitos e disponibilidade para o seu caso.',
    endpointsLabel: 'Tópicos de integração',
  },
  en: {
    badge: 'API and integration',
    l1: 'Embed global accounts',
    l2: 'and payments into your product.',
    sub: 'Explore ways to integrate international accounts and payments into your product. Technical scope and availability must be confirmed with the team.',
    cta1: 'View integration information',
    cta2: 'Discuss an integration',
    terminalLabel: 'ALL X · Integration example',
    terminalStatus: 'Conceptual example',
    terminalDisclaimer: 'Not an API specification',
    primitivesEyebrow: 'API primitives',
    primitivesTitle: 'Financial infrastructure ready to integrate.',
    primitivesText: 'Accounts, quotes, payments, and webhooks may be part of an integration scope, subject to validation.',
    primitives: [
      ['Accounts & balances', 'Review USD and EUR accounts and stablecoin balances, subject to eligibility and availability.'],
      ['Quotes & conversion', 'Review applicable conversion conditions before confirming an operation.'],
      ['Payments & rails', 'Pix, ACH, SEPA, and SWIFT may be available depending on route, partner, and jurisdiction.'],
      ['Webhooks & reconciliation', 'Webhooks and settlement information may support integration, depending on the agreed scope.'],
    ],
    engineeringEyebrow: 'Built for engineering',
    engineeringTitle: 'Less infrastructure to maintain. More product to build.',
    engineeringText: 'Endpoints, authentication, events, timing, and availability must be confirmed for each integration.',
    feats: [
      ['API scope', 'Confirm endpoints, authentication, and requirements with the team.'],
      ['Route availability', 'Currencies and rails depend on partner and jurisdiction.'],
      ['Events and webhooks', 'Available formats and events must be validated.'],
      ['Integration support', 'Discuss applicable technical requirements with the team.'],
    ],
    copy: 'Copy',
    copied: 'Copied ✓',
    flowLabel: 'Conceptual examples',
    stepWord: 'Step',
    panelLabel: 'Code sample for the active step',
    stepsNav: 'Integration steps',
    metricsLabel: 'Details to confirm',
    metrics: [
      { value: 'To validate', label: 'API scope' },
      { value: 'By route', label: 'Available rails' },
      { value: 'To confirm', label: 'Timing and conditions' },
      { value: 'On request', label: 'Technical access' },
    ],
    quickEyebrow: 'Next step',
    quickTitle: 'Validate the technical scope before integration.',
    quickText: 'Talk to the team to confirm access, requirements, and availability for your use case.',
    endpointsLabel: 'Integration topics',
  },
}

const STEP_TAGS = ['Auth', 'Quote', 'Payout', 'Webhook']

const SNIPPETS = [
  `// Exemplo conceitual — não é uma especificação de API.
// Confirme autenticação e acesso com a equipe ALL X.`,
  `// Cotações
// Condições e moedas disponíveis dependem da rota.`,
  `// Pagamentos
// Trilhos, dados necessários e prazos devem ser confirmados.`,
  `// Webhooks
// Eventos e formatos disponíveis dependem da integração.`,
]

const ENDPOINTS = [
  'DOC API scope', 'DOC Accounts', 'DOC Quotes', 'DOC Payments',
  'DOC Webhooks', 'DOC Availability',
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

export default function DevelopersPage() {
  const { lang } = useI18n()
  const c = COPY[lang] || COPY.pt
  const quickNote = lang === 'pt'
    ? 'Confirme acesso à API, requisitos e disponibilidade de rota com a equipe ALL X.'
    : 'Confirm API access, requirements, and route availability with the ALL X team.'
  const [active, setActive] = useState(0)
  const [cmdCopied, setCmdCopied] = useState(false)
  const stepRefs = useRef([])

  const openDocs = (event) => {
    event.preventDefault()
    navigateTo('cms')
  }

  const copyCmd = async () => {
    try {
      await navigator.clipboard.writeText(quickNote)
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
              <a href="/docs" className="btn btn-primary" onClick={openDocs}>{c.cta1}</a>
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
              <ApiTerminal
                title={c.flowLabel}
                disclaimer={c.terminalDisclaimer}
                lang={lang}
                copyLabel={c.copy}
                copiedLabel={c.copied}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ENDPOINT MARQUEE */}
      <div className="dx-marquee" role="region" aria-label={c.endpointsLabel}>
        <div className="dx-track" aria-hidden="true">
          {loop.map((e, i) => {
            const [m, ...rest] = e.split(' ')
            return <span key={i} className="dx-ep"><b className="get">{m}</b>{rest.join(' ')}</span>
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
            {c.metrics.map((m, i) => (
              <div key={i} className="dx-metric">
                <strong>{m.value}</strong>
                <span>{m.label}</span>
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
              <a href="/docs" className="btn btn-primary" onClick={openDocs}>{c.cta1}</a>
              <a href="#api-primitives" className="btn btn-ghost">{c.cta2}</a>
            </div>
          </div>
          <div className="dx-cmd reveal">
            <span className="dx-cmd-prompt" aria-hidden="true">i</span>
            <code>{quickNote}</code>
            <button type="button" onClick={copyCmd} className="dx-cmd-btn" aria-live="polite">
              {cmdCopied ? c.copied : c.copy}
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
