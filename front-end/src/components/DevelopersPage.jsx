'use client'

import { useI18n, navigateTo } from '../i18n'
import ApiTerminal from '../react/ApiTerminal.jsx'
import ProductCrossNav from './ProductCrossNav'
import './ProductPage.css'

const COPY = {
  pt: {
    badge: 'API & infraestrutura white-label',
    l1: 'Leve contas e pagamentos',
    l2: 'globais para o seu produto.',
    sub: 'APIs REST previsíveis, webhooks assinados e carteiras gerenciadas para construir fluxos de recebimento, conversão e liquidação internacional com poucas linhas de código.',
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
      ['Webhooks & Reconciliação', 'Receba eventos assinados para cada mudança de estado da transação e mantenha seu ledger sincronizado.'],
    ],
    engineeringEyebrow: 'Built for engineering',
    engineeringTitle: 'Menos infraestrutura para manter. Mais produto para construir.',
    engineeringText: 'Uma fundação previsível para equipes que precisam operar pagamentos sem abrir mão de controle, observabilidade e segurança.',
    feats: [
      ['Idempotência nativa', 'Proteção contra ordens duplicadas em retentativas de rede.'],
      ['Metadados de ERP', 'Anexe invoice_id, centro de custo e IDs internos às transações.'],
      ['Sandbox completo', 'Simule KYB, depósitos, FX e liquidações antes da produção.'],
    ],
    copy: 'Copiar',
    copied: 'Copiado ✓',
  },
  en: {
    badge: 'API & white-label infrastructure',
    l1: 'Embed global accounts',
    l2: 'and payments into your product.',
    sub: 'Predictable REST APIs, signed webhooks, and managed wallets to build collection, conversion, and cross-border settlement flows with minimal code.',
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
      ['Webhooks & Reconciliation', 'Receive signed events for every transaction state change and keep your ledger synchronized.'],
    ],
    engineeringEyebrow: 'Built for engineering',
    engineeringTitle: 'Less infrastructure to maintain. More product to build.',
    engineeringText: 'A predictable foundation for teams that need to operate payments without giving up control, observability, or security.',
    feats: [
      ['Native idempotency', 'Protection against duplicate orders during network retries.'],
      ['ERP metadata', 'Attach invoice_id, cost center, and internal IDs to transactions.'],
      ['Complete Sandbox', 'Simulate KYB, deposits, FX, and settlements before production.'],
    ],
    copy: 'Copy',
    copied: 'Copied ✓',
  },
}

export default function DevelopersPage() {
  const { lang } = useI18n()
  const c = COPY[lang] || COPY.pt

  const openDocs = (event) => {
    event.preventDefault()
    navigateTo('cms')
  }

  return (
    <div data-c="ProductPage">
      <section className="pp-hero">
        <div className="pp-grid-bg" aria-hidden="true" />
        <div className="container pp-split">
          <div className="pp-copy">
            <span className="pp-badge"><i />{c.badge}</span>
            <h1 className="pp-h1"><span>{c.l1}</span><span>{c.l2}</span></h1>
            <p className="pp-sub">{c.sub}</p>
            <div className="pp-ctas">
              <a href="#docs" className="btn btn-primary" onClick={openDocs}>{c.cta1}</a>
              <a href="#api-primitives" className="btn btn-ghost">{c.cta2}</a>
            </div>
          </div>
          <div className="pp-globe-wrap">
            <div className="pp-api-visual">
              <div className="pp-panel-top">
                <span>{c.terminalLabel}</span>
                <span className="pp-live"><i />{c.terminalStatus}</span>
              </div>
              <ApiTerminal copyLabel={c.copy} copiedLabel={c.copied} />
            </div>
          </div>
        </div>
      </section>

      <section id="api-primitives" className="pp-sec">
        <div className="container">
          <header className="section-head pp-head reveal">
            <div className="title-block">
              <span className="eyebrow">{c.primitivesEyebrow}</span>
              <h2 className="section-title">{c.primitivesTitle}</h2>
            </div>
            <p>{c.primitivesText}</p>
          </header>
          <div className="pp-rows reveal">
            {c.primitives.map(([title, description]) => (
              <div key={title} className="pp-row">
                <strong>{title}</strong>
                <p>{description}</p>
                <em>API</em>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pp-sec">
        <div className="container">
          <header className="section-head pp-head reveal">
            <div className="title-block">
              <span className="eyebrow">{c.engineeringEyebrow}</span>
              <h2 className="section-title">{c.engineeringTitle}</h2>
            </div>
            <p>{c.engineeringText}</p>
          </header>
          <div className="pp-cols">
            {c.feats.map(([title, description], index) => (
              <div key={title} className="pp-col reveal">
                <span className="n">0{index + 1}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pp-sec">
        <div className="container"><ProductCrossNav current="developers" /></div>
      </section>
    </div>
  )
}
