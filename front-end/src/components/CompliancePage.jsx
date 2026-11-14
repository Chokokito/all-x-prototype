'use client'

import { useI18n, navigateTo } from '../i18n'
import './ProductPage.css'

const COPY = {
  pt: {
    badge: 'Governança, risco & conformidade',
    l1: 'Confiança institucional',
    l2: 'precisa ser explícita.',
    sub: 'Velocidade operacional nunca substitui o rigor regulatório. Cada conta, contraparte e transação opera sob verificação societária, prevenção a ilícitos e rastreabilidade contínua.',
    cta1: 'Falar com Compliance',
    cta2: 'Solicitar pacote de Due Diligence',
    controlsEyebrow: 'Controles ALL X',
    controlsTitle: 'Compliance por design, da ativação à liquidação.',
    controlsText: 'Controles proporcionais ao risco, responsabilidades claras e evidências disponíveis para cada etapa da operação.',
    controls: [
      ['KYB & UBO', 'Verificação corporativa, estrutura societária, beneficiários finais e documentação antes da ativação.'],
      ['KYC', 'Verificação documental e biométrica de diretores, representantes e pessoas relevantes.'],
      ['Sanctions & PEP', 'Screening contínuo contra listas restritivas e bases de PEP, com escalonamento definido.'],
      ['Source of Funds & Wealth', 'Revisão proporcional da origem dos recursos e da capacidade financeira do cliente.'],
      ['Transaction Monitoring', 'Detecção de padrões atípicos, desvios de perfil, velocidade e fragmentação de remessas.'],
      ['Blockchain Screening / KYT', 'Análise de risco on-chain para fluxos de USDC e USDT, incluindo origem e destino.'],
      ['Security & Access', 'MFA, RBAC, aprovação dupla e trilha de auditoria para cada ação.'],
      ['Fraud Controls', 'Limites dinâmicos, whitelist de beneficiários, sinais de risco e revisão preventiva.'],
    ],
    transparencyEyebrow: 'Transparência',
    transparencyTitle: 'Infraestrutura clara. Responsabilidades claras.',
    transparencyText: 'Antes da ativação de qualquer corredor ou serviço, a equipe apresenta o escopo aplicável à jurisdição, os critérios de elegibilidade e os requisitos documentais.',
    disclosure: 'A ALL X é uma plataforma de tecnologia financeira. Determinados serviços de pagamento, conta, custódia, conversão ou liquidação podem ser prestados por parceiros terceiros regulados e estão sujeitos a disponibilidade, elegibilidade e restrições jurisdicionais.',
    finalTitle: 'Estruture sua operação global com confiança institucional.',
    finalText: 'Converse com nossa equipe para entender o escopo, os requisitos e os controles aplicáveis à sua operação.',
    finalCta: 'Falar com a ALL X',
  },
  en: {
    badge: 'Governance, risk & compliance',
    l1: 'Institutional trust',
    l2: 'must be explicit.',
    sub: 'Operational speed never replaces regulatory rigor. Every account, counterparty, and transaction operates under corporate verification, AML controls, and continuous auditability.',
    cta1: 'Contact Compliance',
    cta2: 'Request Due Diligence Pack',
    controlsEyebrow: 'ALL X controls',
    controlsTitle: 'Compliance by design, from onboarding to settlement.',
    controlsText: 'Risk-proportionate controls, clear responsibilities, and evidence available at every stage of the operation.',
    controls: [
      ['KYB & UBO', 'Corporate verification, ownership structure, ultimate beneficial owners, and documentation before activation.'],
      ['KYC', 'Documentary and biometric verification of directors, representatives, and relevant individuals.'],
      ['Sanctions & PEP', 'Continuous screening against sanctions lists and PEP databases, with defined escalation.'],
      ['Source of Funds & Wealth', 'Review of source of funds and financial capacity proportional to the customer profile.'],
      ['Transaction Monitoring', 'Detection of atypical patterns, profile deviations, velocity, and payment fragmentation.'],
      ['Blockchain Screening / KYT', 'On-chain risk analysis for USDC and USDT flows, including origin and destination.'],
      ['Security & Access', 'MFA, RBAC, dual approval, and an audit trail for every action.'],
      ['Fraud Controls', 'Dynamic limits, beneficiary whitelists, risk signals, and preventive review.'],
    ],
    transparencyEyebrow: 'Transparency',
    transparencyTitle: 'Clear infrastructure. Clear responsibilities.',
    transparencyText: 'Before any corridor or service is activated, our team explains the jurisdictional scope, eligibility criteria, and documentation requirements.',
    disclosure: 'ALL X is a financial technology platform. Certain payment, account, custody, conversion, or settlement services may be provided by regulated third-party partners and are subject to availability, eligibility, and jurisdictional restrictions.',
    finalTitle: 'Build your global operation on institutional trust.',
    finalText: 'Talk to our team to understand the scope, requirements, and controls applicable to your operation.',
    finalCta: 'Talk to ALL X',
  },
}

export default function CompliancePage() {
  const { lang } = useI18n()
  const c = COPY[lang] || COPY.pt

  const goContact = (event) => {
    event.preventDefault()
    navigateTo('contact')
  }

  return (
    <div data-c="ProductPage">
      <section className="pp-hero">
        <div className="pp-grid-bg" aria-hidden="true" />
        <div className="container pp-center">
          <span className="pp-badge"><i />{c.badge}</span>
          <h1 className="pp-h1"><span>{c.l1}</span><span>{c.l2}</span></h1>
          <p className="pp-sub">{c.sub}</p>
          <div className="pp-ctas">
            <a href="/contact" className="btn btn-primary" onClick={goContact}>{c.cta1}</a>
            <a href="#controls" className="btn btn-ghost">{c.cta2}</a>
          </div>
        </div>
      </section>

      <section id="controls" className="pp-sec">
        <div className="container">
          <header className="section-head pp-head reveal">
            <div className="title-block">
              <span className="eyebrow">{c.controlsEyebrow}</span>
              <h2 className="section-title">{c.controlsTitle}</h2>
            </div>
            <p>{c.controlsText}</p>
          </header>
          <div className="pp-rows reveal">
            {c.controls.map(([title, description], index) => (
              <div className="pp-row" key={title}>
                <strong><span className="compliance-index">0{index + 1}</span>{title}</strong>
                <p>{description}</p>
                <em>CONTROL</em>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pp-sec">
        <div className="container">
          <header className="section-head pp-head reveal">
            <div className="title-block">
              <span className="eyebrow">{c.transparencyEyebrow}</span>
              <h2 className="section-title">{c.transparencyTitle}</h2>
            </div>
            <p>{c.transparencyText}</p>
          </header>
          <div className="pp-panel compliance-disclosure reveal">
            <div className="pp-panel-top">
              <span>ALL X · DISCLOSURE</span>
              <span className="pp-live"><i />SCOPE &amp; ELIGIBILITY</span>
            </div>
            <p>{c.disclosure}</p>
          </div>
        </div>
      </section>

      <section className="pp-sec compliance-final">
        <div className="container">
          <div className="compliance-final-copy reveal">
            <span className="eyebrow">ALL X · {lang === 'pt' ? 'PRÓXIMO PASSO' : 'NEXT STEP'}</span>
            <h2 className="section-title">{c.finalTitle}</h2>
            <p>{c.finalText}</p>
            <a href="/contact" className="btn btn-primary" onClick={goContact}>{c.finalCta}</a>
          </div>
        </div>
      </section>
    </div>
  )
}
