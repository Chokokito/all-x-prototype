'use client'

import { useState } from 'react'
import { useI18n } from '../i18n'
import './ProductPage.css'

const COPY = {
  pt: {
    badge: 'Mesa comercial & onboarding institucional',
    l1: 'Mova o dinheiro da sua empresa',
    l2: 'com uma única camada operacional.',
    sub: 'Conte quais moedas, corredores e volumes sua empresa movimenta. Um especialista desenhará a rota ideal de contas, pagamentos ou integração via API.',
    cta1: 'Falar com a ALL X',
    cta2: 'Conhecer nossas soluções',
    formEyebrow: 'Qualificação corporativa',
    formTitle: 'Fale com a ALL X',
    formText: 'Compartilhe o contexto da sua operação para receber uma orientação mais precisa.',
    fields: {
      name: 'Nome completo',
      email: 'E-mail corporativo',
      company: 'Empresa e CNPJ / Tax ID',
      role: 'Cargo / área',
      interest: 'Interesse principal',
      volume: 'Volume mensal estimado',
      corridors: 'Corredores e moedas',
      message: 'Mensagem / contexto da operação',
    },
    placeholders: {
      name: 'Ex.: Henrique Marinho',
      email: 'voce@suaempresa.com',
      company: 'Ex.: Empresa Global S.A.',
      corridors: 'Ex.: BRL, USD, Pix, ACH, USDC',
      message: 'Descreva brevemente seu fluxo atual de recebimentos ou pagamentos internacionais.',
    },
    options: {
      role: ['Selecione seu cargo', 'CFO / Diretor Financeiro', 'Tesouraria / Operações', 'CEO / Fundador', 'CTO / Engenharia & Produto', 'Compliance / Jurídico', 'Outro'],
      interest: ['Selecione uma solução', 'Global Payments', 'Global Accounts', 'Stablecoin Gateway', 'Treasury & Payables', 'API / White-Label'],
      volume: ['Selecione uma faixa', 'Até US$ 100 mil/mês', 'US$ 100 mil a US$ 500 mil/mês', 'US$ 500 mil a US$ 2 milhões/mês', 'Acima de US$ 2 milhões/mês'],
    },
    submit: 'Enviar solicitação para a mesa ALL X',
    privacy: 'Seus dados são tratados sob sigilo corporativo. Nossa equipe responde em até 1 dia útil.',
    status: 'Seu cliente de e-mail será aberto com os dados da solicitação.',
    channelsEyebrow: 'Atendimento especializado',
    channelsTitle: 'A conversa certa para cada etapa da sua operação.',
    channels: [
      ['Mesa Comercial & Tesouraria', 'Contas globais, corredores, liquidez e cotações de alto volume.'],
      ['Engenharia de Soluções', 'API, white-label, Sandbox e integrações técnicas.'],
      ['Compliance & Parcerias', 'Due Diligence, documentação KYB e parcerias reguladas.'],
    ],
    nextEyebrow: 'O que acontece depois',
    nextTitle: 'Da primeira conversa à operação global.',
    next: [
      ['01', 'Entendemos o fluxo', 'Mapeamos moedas, corredores, volumes e restrições da operação.'],
      ['02', 'Desenhamos a rota', 'Indicamos contas, pagamentos, Gateway ou API para o seu caso.'],
      ['03', 'Validamos elegibilidade', 'Alinhamos requisitos de compliance e disponibilidade por jurisdição.'],
      ['04', 'Começamos a operação', 'Onboarding, Sandbox ou ativação do primeiro corredor.'],
    ],
  },
  en: {
    badge: 'Commercial desk & institutional onboarding',
    l1: 'Move your company’s money',
    l2: 'with one operating layer.',
    sub: 'Tell us which currencies, corridors, and volumes your business operates. A specialist will design the right account, payment, or API setup.',
    cta1: 'Talk to ALL X',
    cta2: 'Explore our solutions',
    formEyebrow: 'Corporate qualification',
    formTitle: 'Talk to ALL X',
    formText: 'Share your operating context so our team can provide a more precise recommendation.',
    fields: {
      name: 'Full name',
      email: 'Corporate email',
      company: 'Company and Tax ID',
      role: 'Role / department',
      interest: 'Primary interest',
      volume: 'Estimated monthly volume',
      corridors: 'Corridors and currencies',
      message: 'Message / operating context',
    },
    placeholders: {
      name: 'E.g. Henrique Marinho',
      email: 'you@yourcompany.com',
      company: 'E.g. Global Company Inc.',
      corridors: 'E.g. BRL, USD, Pix, ACH, USDC',
      message: 'Briefly describe your current international collection or payment flow.',
    },
    options: {
      role: ['Select your role', 'CFO / Finance Director', 'Treasury / Operations', 'CEO / Founder', 'CTO / Engineering & Product', 'Compliance / Legal', 'Other'],
      interest: ['Select a solution', 'Global Payments', 'Global Accounts', 'Stablecoin Gateway', 'Treasury & Payables', 'API / White-Label'],
      volume: ['Select a range', 'Up to US$ 100k/month', 'US$ 100k to US$ 500k/month', 'US$ 500k to US$ 2m/month', 'Above US$ 2m/month'],
    },
    submit: 'Submit request to ALL X Desk',
    privacy: 'Your information is handled confidentially. Our team responds within one business day.',
    status: 'Your email client will open with the request details.',
    channelsEyebrow: 'Specialized support',
    channelsTitle: 'The right conversation for every stage of your operation.',
    channels: [
      ['Commercial Desk & Treasury', 'Global accounts, corridors, liquidity, and high-volume quotes.'],
      ['Solutions Engineering', 'API, white-label, Sandbox, and technical integrations.'],
      ['Compliance & Partnerships', 'Due diligence, KYB documentation, and regulated partnerships.'],
    ],
    nextEyebrow: 'What happens next',
    nextTitle: 'From the first conversation to global operations.',
    next: [
      ['01', 'Understand the flow', 'Map currencies, corridors, volumes, and operating constraints.'],
      ['02', 'Design the route', 'Recommend accounts, payments, Gateway, or API for your case.'],
      ['03', 'Validate eligibility', 'Align compliance requirements and availability by jurisdiction.'],
      ['04', 'Start the operation', 'Onboarding, Sandbox, or activation of the first corridor.'],
    ],
  },
}

export default function ContactPage() {
  const { lang } = useI18n()
  const c = COPY[lang] || COPY.pt
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const subject = encodeURIComponent(`${c.formTitle} · ${form.get('company') || form.get('name')}`)
    const body = encodeURIComponent(
      Object.entries(Object.fromEntries(form.entries()))
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n'),
    )
    setSubmitted(true)
    window.location.href = `mailto:contato@allx.global?subject=${subject}&body=${body}`
  }

  return (
    <div data-c="ProductPage">
      <section className="pp-hero">
        <div className="pp-grid-bg" aria-hidden="true" />
        <div className="contact-globe" aria-hidden="true">
          <svg viewBox="0 0 520 520" role="presentation">
            <circle className="contact-globe-surface" cx="260" cy="260" r="132" />
            <ellipse className="contact-globe-line contact-globe-line-a" cx="260" cy="260" rx="132" ry="48" />
            <ellipse className="contact-globe-line contact-globe-line-b" cx="260" cy="260" rx="132" ry="86" />
            <ellipse className="contact-globe-line contact-globe-line-c" cx="260" cy="260" rx="54" ry="132" />
            <ellipse className="contact-globe-line contact-globe-line-d" cx="260" cy="260" rx="94" ry="132" />
            <path className="contact-globe-orbit contact-globe-orbit-a" d="M66 244C140 89 370 47 454 190" />
            <path className="contact-globe-orbit contact-globe-orbit-b" d="M74 333C184 432 386 420 466 281" />
            <circle className="contact-globe-node node-a" cx="93" cy="226" r="5" />
            <circle className="contact-globe-node node-b" cx="419" cy="177" r="4" />
            <circle className="contact-globe-node node-c" cx="390" cy="372" r="4" />
            <circle className="contact-globe-core" cx="260" cy="260" r="8" />
          </svg>
        </div>
        <div className="container pp-center">
          <span className="pp-badge"><i />{c.badge}</span>
          <h1 className="pp-h1"><span>{c.l1}</span><span>{c.l2}</span></h1>
          <p className="pp-sub">{c.sub}</p>
          <div className="pp-ctas">
            <a href="#contact-form" className="btn btn-primary">{c.cta1}</a>
            <a href="#solutions" className="btn btn-ghost">{c.cta2}</a>
          </div>
        </div>
      </section>

      <section id="contact-form" className="pp-sec">
        <div className="container">
          <header className="section-head pp-head reveal">
            <div className="title-block">
              <span className="eyebrow">{c.formEyebrow}</span>
              <h2 className="section-title">{c.formTitle}</h2>
            </div>
            <p>{c.formText}</p>
          </header>

          <div className="contact-grid">
            <div className="pp-panel reveal">
              <div className="pp-panel-top">
                <span>ALL X · INTAKE</span>
                <span className="pp-live"><i />PRIVATE</span>
              </div>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="contact-fields">
                  <label>
                    <span>{c.fields.name}</span>
                    <input name="name" type="text" placeholder={c.placeholders.name} required />
                  </label>
                  <label>
                    <span>{c.fields.email}</span>
                    <input name="email" type="email" placeholder={c.placeholders.email} aria-describedby="email-help" required />
                    <small id="email-help">{c.privacy}</small>
                  </label>
                  <label>
                    <span>{c.fields.company}</span>
                    <input name="company" type="text" placeholder={c.placeholders.company} />
                  </label>
                  <label>
                    <span>{c.fields.role}</span>
                    <select name="role" defaultValue="" required>
                      {c.options.role.map((option, index) => <option key={option} value={index === 0 ? '' : option} disabled={index === 0}>{option}</option>)}
                    </select>
                  </label>
                  <label>
                    <span>{c.fields.interest}</span>
                    <select name="interest" defaultValue="" required>
                      {c.options.interest.map((option, index) => <option key={option} value={index === 0 ? '' : option} disabled={index === 0}>{option}</option>)}
                    </select>
                  </label>
                  <label>
                    <span>{c.fields.volume}</span>
                    <select name="volume" defaultValue="" required>
                      {c.options.volume.map((option, index) => <option key={option} value={index === 0 ? '' : option} disabled={index === 0}>{option}</option>)}
                    </select>
                  </label>
                  <label className="contact-full">
                    <span>{c.fields.corridors}</span>
                    <input name="corridors" type="text" placeholder={c.placeholders.corridors} required />
                  </label>
                  <label className="contact-full">
                    <span>{c.fields.message}</span>
                    <textarea name="message" rows="5" placeholder={c.placeholders.message} required />
                  </label>
                </div>
                <button className="btn btn-primary" type="submit">{c.submit}</button>
                <p className="contact-privacy">{c.privacy}</p>
                <p className="contact-status" role="status" aria-live="polite">{submitted ? c.status : ''}</p>
              </form>
            </div>

            <aside id="solutions" className="contact-side reveal">
              <span className="eyebrow">{c.channelsEyebrow}</span>
              <h2 className="section-title">{c.channelsTitle}</h2>
              <div className="contact-channel-list">
                {c.channels.map(([title, description], index) => (
                  <div className="contact-channel" key={title}>
                    <span className="n">0{index + 1}</span>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="pp-sec">
        <div className="container">
          <header className="section-head pp-head reveal">
            <div className="title-block">
              <span className="eyebrow">{c.nextEyebrow}</span>
              <h2 className="section-title">{c.nextTitle}</h2>
            </div>
          </header>
          <div className="pp-cols">
            {c.next.map(([number, title, description]) => (
              <div className="pp-col reveal" key={number}>
                <span className="n">{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
