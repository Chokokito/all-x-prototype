'use client'

import { useEffect, useRef, useState } from 'react'
import { useI18n, navigateTo } from '../i18n'
import { parallax } from '../parallax'
import CobeGlobe from '../react/CobeGlobe'
import './pages/compliance.css'

const COPY = {
  pt: {
    badge: 'Governança, risco & conformidade',
    l1: 'Confiança institucional',
    l2: 'precisa ser explícita.',
    sub: 'Velocidade operacional nunca substitui o rigor regulatório. Cada conta, contraparte e transação opera sob verificação societária, prevenção a ilícitos e rastreabilidade contínua.',
    cta1: 'Falar com Compliance',
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
    regulatoryLabel: 'Brasil · Marco regulatório',
    regulatoryNote: 'A referência regulatória inclui o regime SPSAV/BCB e a Resolução BCB nº 520/2025. O enquadramento aplicável à ALL X depende do papel efetivo da empresa e deve ser validado por assessoria jurídica local.',
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

const ICONS = [
  <><path d="M4 20V8l8-4 8 4v12" /><path d="M9 20v-5h6v5M8 10h.01M12 10h.01M16 10h.01" /></>,
  <><circle cx="12" cy="8" r="3.5" /><path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" /></>,
  <><circle cx="12" cy="12" r="8" /><path d="M5.5 5.5l13 13" /></>,
  <><path d="M4 8h16M4 8v10h16V8M8 8V5h8v3" /><circle cx="12" cy="13" r="2" /></>,
  <><path d="M3 12h4l2-6 4 12 2-6h6" /></>,
  <><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z" /><path d="M12 12l8-4.5M12 12v9M12 12L4 7.5" /></>,
  <><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 018 0v3M12 15v2" /></>,
  <><path d="M12 3l8 3v6c0 4.5-3.2 7.5-8 9-4.8-1.5-8-4.5-8-9V6z" /><path d="M9 12l2 2 4-4" /></>,
]

const Check = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>

const MARKERS = [
  { location: [47.3769, 8.5417], size: 0.07 },
  { location: [51.5072, -0.1276], size: 0.07 },
  { location: [40.7128, -74.006], size: 0.08 },
  { location: [-23.5505, -46.6333], size: 0.085 },
  { location: [1.3521, 103.8198], size: 0.065 },
  { location: [25.2048, 55.2708], size: 0.06 },
]
const ARCS = [
  { from: [47.3769, 8.5417], to: [51.5072, -0.1276] },
  { from: [51.5072, -0.1276], to: [40.7128, -74.006] },
  { from: [40.7128, -74.006], to: [-23.5505, -46.6333] },
  { from: [47.3769, 8.5417], to: [25.2048, 55.2708] },
  { from: [25.2048, 55.2708], to: [1.3521, 103.8198] },
]

const SPAN = ['w4 tall', '', '', 'w4', '', '', '', 'w6']

export default function CompliancePage() {
  const { lang } = useI18n()
  const c = COPY[lang] || COPY.pt
  const [active, setActive] = useState(0)
  const bentoRef = useRef(null)

  const goContact = (event) => {
    event.preventDefault()
    navigateTo('contact')
  }

  useEffect(() => {
    const root = bentoRef.current
    if (!root) return
    const total = 8
    let raf = 0
    const update = () => {
      raf = 0
      const rect = root.getBoundingClientRect()
      const vh = window.innerHeight || 800
      const start = vh * 0.62
      const end = vh * 0.32 - rect.height
      const span = start - end
      if (span <= 0) return
      const p = Math.min(0.9999, Math.max(0, (start - rect.top) / span))
      const idx = Math.floor(p * total)
      setActive((prev) => (prev === idx ? prev : idx))
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

  const scrollTo = (i) => {
    setActive(i)
    const el = bentoRef.current?.querySelector(`[data-i="${i}"]`)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <div data-c="CompliancePage" className="cx">
      <section className="cx-hero">
        <div className="cx-grid" aria-hidden="true" ref={parallax(0.08)} />
        <div className="cx-layer" aria-hidden="true">
          <div className="cx-rings" ref={parallax(-0.12)}>
            <i className="cx-ring r3" />
            <i className="cx-ring r2" />
            <i className="cx-ring r1" />
          </div>
        </div>
        <div className="cx-horizon" aria-hidden="true">
          <div ref={parallax(0.1)}>
            <CobeGlobe maxWidth={1100} markers={MARKERS} arcs={ARCS} theta={0.35} phi={0.4} speed={0.0018} />
          </div>
        </div>
        <div className="cx-hero-copy" ref={parallax(0.06)}>
          <span className="cx-badge"><i />{c.badge}</span>
          <h1 className="cx-h1"><span>{c.l1}</span><span>{c.l2}</span></h1>
          <p className="cx-sub">{c.sub}</p>
          <div className="cx-ctas">
            <a href="/contact" className="btn btn-primary" onClick={goContact}>{c.cta1}</a>
          </div>
        </div>
      </section>

      <section id="controls" className="cx-sec">
        <div className="cx-wrap cx-split">
          <aside className="cx-side reveal">
            <span className="cx-eyebrow">{c.controlsEyebrow}</span>
            <h2>{c.controlsTitle}</h2>
            <p>{c.controlsText}</p>
            <ul className="cx-nav" aria-label={c.controlsEyebrow}>
              {c.controls.map(([title], i) => (
                <li key={title} className={i === active ? 'on' : ''}>
                  <span>0{i + 1}</span>
                  <a href={`#cx-c${i}`} onClick={(e) => { e.preventDefault(); scrollTo(i) }} style={{ color: 'inherit' }}>{title}</a>
                </li>
              ))}
            </ul>
          </aside>
          <div className="cx-bento" ref={bentoRef}>
            {c.controls.map(([title, description], i) => (
              <article
                id={`cx-c${i}`}
                data-i={i}
                key={title}
                className={`cx-card ${SPAN[i]} ${i === active ? 'on' : ''}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
              >
                <span className="cx-num" aria-hidden="true">0{i + 1}</span>
                <div className="cx-ico"><svg viewBox="0 0 24 24" aria-hidden="true">{ICONS[i]}</svg></div>
                <div>
                  <h3>{title}</h3>
                  <p style={{ marginTop: 10 }}>{description}</p>
                </div>
                <span className="cx-card-foot"><Check />CONTROL</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cx-sec cx-trans">
        <div className="cx-wrap">
          <header className="cx-trans-head reveal">
            <div>
              <span className="cx-eyebrow">{c.transparencyEyebrow}</span>
              <h2>{c.transparencyTitle}</h2>
            </div>
            <p>{c.transparencyText}</p>
          </header>
          <div className="cx-disc reveal">
            <div className="cx-disc-tag"><b>ALL X · DISCLOSURE</b><span>SCOPE &amp; ELIGIBILITY</span></div>
            <blockquote>{c.disclosure}</blockquote>
            {lang === 'pt' && c.regulatoryNote && (
              <p className="cx-regulatory-note">
                <strong>{c.regulatoryLabel}</strong>
                {c.regulatoryNote}
              </p>
            )}
          </div>
        </div>
      </section>

      <div className="cx-seals">
        <ul aria-label="Compliance">
          {c.controls.map(([title]) => (
            <li key={title}><Check />{title}</li>
          ))}
        </ul>
      </div>

      <section className="cx-final">
        <div className="cx-final-in reveal">
          <div className="cx-shield" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M12 3l8 3v6c0 4.5-3.2 7.5-8 9-4.8-1.5-8-4.5-8-9V6z" /><path d="M9 12l2 2 4-4" /></svg>
          </div>
          <span className="cx-eyebrow">ALL X · {lang === 'pt' ? 'PRÓXIMO PASSO' : 'NEXT STEP'}</span>
          <h2>{c.finalTitle}</h2>
          <p>{c.finalText}</p>
          <a href="/contact" className="btn btn-primary" onClick={goContact}>{c.finalCta}</a>
        </div>
      </section>
    </div>
  )
}
