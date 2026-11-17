'use client'

import { useState } from 'react'
import { navigateTo, useI18n } from '../i18n'
import ProductCrossNav from './ProductCrossNav'
import './ProductPage.css'

const COPY = {
  pt: {
    badge: 'Soluções para empresas · Treasury & Payables',
    l1: 'Reduza a fragmentação',
    l2: 'do seu financeiro global.',
    sub: 'Da gestão de tesouraria multimoeda ao pagamento de fornecedores e obrigações internacionais: acompanhe saldos, cotações, aprovações e conciliação em uma única camada operacional.',
    cta1: 'Agendar demonstração executiva',
    cta2: 'Ver casos de uso',
    panel: 'ALL X · Operação financeira',
    panelStatus: 'Visão operacional',
    tabs: ['Treasury', 'Payables'],
    boardLabel: 'FLUXO OPERACIONAL',
    boardItems: [
      ['01', 'Decidir', 'Saldos, quotes e exposição em contexto'],
      ['02', 'Aprovar', 'Alçadas e responsabilidades por função'],
      ['03', 'Liquidar', 'Trilho aplicável e registro da operação'],
    ],
    treasury: {
      title: 'Uma visão consolidada para decidir e acompanhar.',
      description: 'Organize saldos, ordens em trânsito, quotes e exposição cambial sem consolidar informações de diferentes ferramentas.',
      rows: [
        ['Saldos', 'Fiat e stablecoins em uma única visão', 'Treasury'],
        ['Ordens', 'Acompanhe entradas, saídas e operações pendentes', 'Operations'],
        ['Conversão', 'Consulte cotações e condições antes de confirmar', 'FX'],
      ],
    },
    payables: {
      title: 'Pague invoices, fornecedores e parceiros globais.',
      description: 'Organize obrigações a partir de saldos globais ou stablecoins, usando o trilho aplicável ao fornecedor e à jurisdição.',
      rows: [
        ['Invoices', 'Referências e documentos para apoiar o fluxo', 'Payables'],
        ['Lotes', 'Estruture pagamentos recorrentes e obrigações', 'Batches'],
        ['Comprovantes', 'Mantenha informações padronizadas da operação', 'Records'],
      ],
    },
    useEyebrow: 'Casos de uso',
    useTitle: 'Uma camada operacional para cada tipo de operação global.',
    useText: 'A ALL X adapta contas, pagamentos, conversão e liquidação ao fluxo financeiro da sua empresa.',
    uses: [
      ['Importação & exportação', 'Pague fornecedores internacionais e receba compradores no exterior conforme as rotas disponíveis.'],
      ['SaaS & tecnologia', 'Organize receitas em USD ou EUR e pagamentos ligados à operação internacional.'],
      ['Serviços profissionais', 'Centralize fluxos de consultorias, agências e escritórios que atendem múltiplos países.'],
      ['Payroll & contractors', 'Estruture pagamentos recorrentes por trilhos locais ou stablecoins, conforme aplicável.'],
      ['Marketplaces', 'Organize payouts para vendedores, criadores e parceiros dentro do fluxo do seu produto.'],
      ['Tesouraria corporativa', 'Acompanhe liquidez multimoeda e movimentações entre operações globais.'],
    ],
    controlEyebrow: 'Controle',
    controlTitle: 'Clareza operacional para cada decisão financeira.',
    controlText: 'Da primeira consulta ao registro final, cada etapa tem contexto, responsabilidade e referência operacional.',
    controls: [
      ['Saldos em contexto', 'Fiat, stablecoins, ordens em trânsito e exposição no mesmo painel.'],
      ['Aprovações por função', 'Organize responsabilidades e alçadas para os diferentes perfis da operação.'],
      ['Conciliação pronta', 'Use IDs de invoice, centros de custo, webhooks e exportação para ERP.'],
    ],
    finalTitle: 'Sua operação financeira merece uma infraestrutura à altura da sua escala global.',
    finalText: 'Converse com a equipe para avaliar contas, pagamentos e integrações aplicáveis ao seu fluxo.',
    finalCta: 'Conversar com nosso time comercial',
  },
  en: {
    badge: 'Solutions for business · Treasury & Payables',
    l1: 'Reduce the fragmentation',
    l2: 'of your global finance team.',
    sub: 'From multi-currency treasury to supplier payables and cross-border obligations: follow balances, quotes, approvals, and reconciliation in one operating layer.',
    cta1: 'Book an executive demo',
    cta2: 'View use cases',
    panel: 'ALL X · Financial operations',
    panelStatus: 'Operational view',
    tabs: ['Treasury', 'Payables'],
    boardLabel: 'OPERATIONAL FLOW',
    boardItems: [
      ['01', 'Decide', 'Balances, quotes, and exposure in context'],
      ['02', 'Approve', 'Approval levels and role-based responsibility'],
      ['03', 'Settle', 'Applicable rail and operational record'],
    ],
    treasury: {
      title: 'One consolidated view to decide and follow through.',
      description: 'Organize balances, in-flight orders, quotes, and FX exposure without consolidating information from different tools.',
      rows: [
        ['Balances', 'Fiat and stablecoins in one view', 'Treasury'],
        ['Orders', 'Follow inbound, outbound, and pending operations', 'Operations'],
        ['Conversion', 'Review quotes and conditions before confirming', 'FX'],
      ],
    },
    payables: {
      title: 'Pay invoices, suppliers, and global partners.',
      description: 'Organize obligations from global balances or stablecoins, using the rail applicable to the supplier and jurisdiction.',
      rows: [
        ['Invoices', 'References and documents to support the flow', 'Payables'],
        ['Batches', 'Structure recurring payments and obligations', 'Batches'],
        ['Receipts', 'Keep standardized operational information', 'Records'],
      ],
    },
    useEyebrow: 'Use cases',
    useTitle: 'One operating layer for every global operation.',
    useText: 'ALL X adapts accounts, payments, conversion, and settlement to your company’s financial flow.',
    uses: [
      ['Import & export', 'Pay international suppliers and receive buyers abroad according to available routes.'],
      ['SaaS & technology', 'Organize USD or EUR revenue and payments linked to international operations.'],
      ['Professional services', 'Centralize flows for consultancies, agencies, and firms serving multiple countries.'],
      ['Payroll & contractors', 'Structure recurring payments through local rails or stablecoins where applicable.'],
      ['Marketplaces', 'Organize payouts for sellers, creators, and logistics partners within your product flow.'],
      ['Corporate treasury', 'Follow multi-currency liquidity and movements across global operations.'],
    ],
    controlEyebrow: 'Control',
    controlTitle: 'Operational clarity for every financial decision.',
    controlText: 'From the first query to the final record, every stage has context, ownership, and an operational reference.',
    controls: [
      ['Balances in context', 'Fiat, stablecoins, in-flight orders, and exposure in the same panel.'],
      ['Role-based approvals', 'Organize responsibilities and approval levels for different operational profiles.'],
      ['Reconciliation-ready', 'Use invoice IDs, cost centers, webhooks, and ERP exports.'],
    ],
    finalTitle: 'Your finance operation deserves infrastructure built for global scale.',
    finalText: 'Talk to the team to evaluate accounts, payments, and integrations applicable to your flow.',
    finalCta: 'Talk to our commercial team',
  },
}

export default function BusinessPage() {
  const { lang } = useI18n()
  const c = COPY[lang] || COPY.pt
  const [activeTab, setActiveTab] = useState(0)
  const data = activeTab === 0 ? c.treasury : c.payables

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
              <a href="/contact" className="btn btn-primary" onClick={(event) => { event.preventDefault(); navigateTo('contact') }}>{c.cta1}</a>
              <a href="#casos-de-uso" className="btn btn-ghost">{c.cta2}</a>
            </div>
          </div>
          <div className="pp-globe-wrap">
            <div className="pp-panel">
              <div className="pp-panel-top">
                <span>{c.panel}</span>
                <span className="pp-live"><i />{c.panelStatus}</span>
              </div>
              <div className="pp-seg" style={{ margin: '20px 20px 0' }} role="tablist" aria-label={c.panel}>
                {c.tabs.map((tab, index) => (
                  <button key={tab} type="button" role="tab" aria-selected={activeTab === index} className={activeTab === index ? 'on' : ''} onClick={() => setActiveTab(index)}>
                    {tab}
                  </button>
                ))}
              </div>
              <div style={{ padding: '24px 28px 8px' }}>
                <h2 style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 500, letterSpacing: '-0.03em' }}>{data.title}</h2>
                <p style={{ marginTop: 10, color: 'var(--muted)', fontSize: 13.5, lineHeight: 1.55 }}>{data.description}</p>
              </div>
              <div className="business-board-meta">
                <span>{c.boardLabel}</span>
                <span className="mono">TREASURY / PAYABLES</span>
              </div>
              <div style={{ padding: '8px 28px 24px' }}>
                <div className="pp-rows">
                  {data.rows.map(([label, description, tag]) => (
                    <div key={label} className="pp-row" style={{ gridTemplateColumns: '90px 1fr auto', padding: '14px 4px', alignItems: 'center' }}>
                      <span className="mono" style={{ fontSize: 12, color: 'var(--muted)' }}>{label}</span>
                      <strong style={{ fontSize: 14 }}>{description}</strong>
                      <em>{tag}</em>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pp-sec business-flow">
        <div className="container">
          <header className="section-head pp-head reveal">
            <div className="title-block">
              <span className="eyebrow">{c.boardLabel}</span>
              <h2 className="section-title">{lang === 'pt' ? 'Do contexto à conciliação, sem perder o fio da operação.' : 'From context to reconciliation, without losing the thread.'}</h2>
            </div>
            <p>{lang === 'pt' ? 'Uma camada operacional aproxima a decisão financeira da execução: o time entende o que está disponível, quem aprova e como a operação será registrada.' : 'An operating layer brings financial decisions closer to execution: the team sees what is available, who approves, and how the operation will be recorded.'}</p>
          </header>
          <div className="business-flow-grid">
            {c.boardItems.map(([number, title, description]) => (
              <article key={number} className="business-flow-step reveal">
                <span className="n">{number}</span>
                <div className="business-flow-line" aria-hidden="true" />
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="casos-de-uso" className="pp-sec">
        <div className="container">
          <header className="section-head pp-head reveal">
            <div className="title-block">
              <span className="eyebrow">{c.useEyebrow}</span>
              <h2 className="section-title">{c.useTitle}</h2>
            </div>
            <p>{c.useText}</p>
          </header>
          <div className="pp-cols">
            {c.uses.map(([title, description], index) => (
              <div key={title} className="pp-col reveal">
                <span className="n">{String(index + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pp-sec">
        <div className="container">
          <header className="section-head pp-head reveal">
            <div className="title-block">
              <span className="eyebrow">{c.controlEyebrow}</span>
              <h2 className="section-title">{c.controlTitle}</h2>
            </div>
            <p>{c.controlText}</p>
          </header>
          <div className="pp-rows reveal">
            {c.controls.map(([title, description], index) => (
              <div key={title} className="pp-row business-control-row">
                <strong><span className="compliance-index">{String(index + 1).padStart(2, '0')}</span>{title}</strong>
                <p>{description}</p>
                <em>{lang === 'pt' ? 'CONTROLE' : 'CONTROL'}</em>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pp-sec compliance-final">
        <div className="container">
          <div className="compliance-final-copy reveal">
            <span className="eyebrow">{c.panel}</span>
            <h2 className="section-title">{c.finalTitle}</h2>
            <p>{c.finalText}</p>
            <a href="/contact" className="btn btn-primary" onClick={(event) => { event.preventDefault(); navigateTo('contact') }}>{c.finalCta}</a>
          </div>
        </div>
      </section>

      <section className="pp-sec">
        <div className="container"><ProductCrossNav current="business" /></div>
      </section>
    </div>
  )
}
