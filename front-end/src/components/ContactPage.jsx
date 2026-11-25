'use client'

import { useState } from 'react'
import { useI18n } from '../i18n'
import { parallax } from '../parallax.js'
import CobeGlobe from '../react/CobeGlobe.jsx'
import './pages/contact.css'

const COPY = {
  pt: {
    badge: 'Contato com a ALL X',
    l1: 'Mova o dinheiro da sua empresa',
    l2: 'com uma única camada operacional.',
    sub: 'Conte quais moedas, rotas e volumes sua empresa movimenta para conversarmos sobre as opções e a disponibilidade aplicáveis.',
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
    submit: 'Enviar solicitação',
    privacy: 'Ao enviar, você solicita contato da ALL X sobre o tema informado.',
    sending: 'Enviando…',
    status: 'Solicitação enviada. Obrigado por entrar em contato.',
    error: 'Não foi possível enviar agora. Abrimos seu e-mail para você enviar diretamente.',
    channelsEyebrow: 'Temas para conversar',
    channelsTitle: 'Direcione sua solicitação.',
    channels: [
      ['Produtos e operações', 'Contas, pagamentos, rotas, moedas e disponibilidade.'],
      ['Integrações', 'API, webhooks e possibilidades de integração.'],
      ['Compliance e parceiros', 'Elegibilidade, documentação e escopo aplicável.'],
    ],
    nextEyebrow: 'Possíveis próximos passos',
    nextTitle: 'O escopo depende da sua operação.',
    next: [
      ['01', 'Entender o contexto', 'Compartilhe moedas, rotas, volumes e necessidades da operação.'],
      ['02', 'Avaliar possibilidades', 'A equipe pode discutir contas, pagamentos ou integração.'],
      ['03', 'Verificar elegibilidade', 'Requisitos e disponibilidade dependem da rota e da jurisdição.'],
      ['04', 'Definir próximos passos', 'A continuidade depende do escopo e das validações necessárias.'],
    ],
  },
  en: {
    badge: 'Contact ALL X',
    l1: 'Move your company’s money',
    l2: 'with one operating layer.',
    sub: 'Tell us which currencies, routes, and volumes your business operates so we can discuss applicable options and availability.',
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
    submit: 'Send request',
    privacy: 'By submitting, you are asking ALL X to contact you about the topic provided.',
    sending: 'Sending…',
    status: 'Request sent. Thank you for getting in touch.',
    error: 'We could not send it right now. We opened your email client so you can send it directly.',
    channelsEyebrow: 'Topics to discuss',
    channelsTitle: 'Direct your request.',
    channels: [
      ['Products and operations', 'Accounts, payments, routes, currencies, and availability.'],
      ['Integrations', 'API, webhooks, and integration possibilities.'],
      ['Compliance and partners', 'Eligibility, documentation, and applicable scope.'],
    ],
    nextEyebrow: 'Possible next steps',
    nextTitle: 'Scope depends on your operation.',
    next: [
      ['01', 'Understand the context', 'Share currencies, routes, volumes, and operating needs.'],
      ['02', 'Review options', 'The team can discuss accounts, payments, or integration.'],
      ['03', 'Check eligibility', 'Requirements and availability depend on route and jurisdiction.'],
      ['04', 'Define next steps', 'Progress depends on scope and required validations.'],
    ],
  },
}

const SP = [-23.5505, -46.6333]
const MARKERS = [
  { location: SP, size: 0.1 },
  { location: [40.7128, -74.006], size: 0.07 },
  { location: [51.5072, -0.1276], size: 0.065 },
  { location: [25.2048, 55.2708], size: 0.055 },
  { location: [19.4326, -99.1332], size: 0.055 },
]
const ARCS = [
  { from: [40.7128, -74.006], to: SP },
  { from: [51.5072, -0.1276], to: SP },
  { from: [25.2048, 55.2708], to: SP },
  { from: [19.4326, -99.1332], to: SP },
]
const CMS_URL = (process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3001').replace(/\/+$/, '')
const FIELD_NAMES = ['name', 'email', 'company', 'role', 'interest', 'volume', 'corridors', 'message']

export default function ContactPage() {
  const { lang } = useI18n()
  const c = COPY[lang] || COPY.pt
  const [state, setState] = useState('idle')
  const [filled, setFilled] = useState(0)

  function handleChange(event) {
    const form = event.currentTarget
    const data = new FormData(form)
    setFilled(FIELD_NAMES.filter((name) => String(data.get(name) || '').trim() !== '').length)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (state === 'sending') return
    const formEl = event.currentTarget
    const form = new FormData(formEl)
    const payload = {
      ...Object.fromEntries(FIELD_NAMES.map((k) => [k, String(form.get(k) || '').trim()])),
      website: String(form.get('website') || ''),
      lang,
    }
    setState('sending')
    try {
      const res = await fetch(CMS_URL + '/api/contact-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('HTTP ' + res.status)
      setState('ok')
      formEl.reset()
      setFilled(0)
    } catch {
      setState('error')
      const subject = encodeURIComponent(c.formTitle + ' · ' + (payload.company || payload.name))
      const body = encodeURIComponent(FIELD_NAMES.map((k) => k + ': ' + payload[k]).join('\n'))
      window.location.href = 'mailto:contato@allx.global?subject=' + subject + '&body=' + body
    }
  }
  const pct = Math.round((filled / FIELD_NAMES.length) * 100)

  return (
    <div data-c="ContactPage" className="cx">
      <section className="cx-main">
        <div className="cx-wrap">
          <aside className="cx-left">
            <div className="cx-globe-clip" aria-hidden="true">
              <div className="cx-globe" ref={parallax(0.12)}>
                <CobeGlobe markers={MARKERS} arcs={ARCS} maxWidth={720} theta={0.25} phi={5.2} speed={0.0025} />
              </div>
            </div>
            <div className="cx-left-inner">
              <span className="cx-badge"><i />{c.badge}</span>
              <h1 className="cx-h1">
                <span className="reveal">{c.l1}</span>
                <em className="reveal">{c.l2}</em>
              </h1>
              <p className="cx-sub">{c.sub}</p>
              <div className="cx-ctas">
                <a href="#contact-form" className="btn btn-primary">{c.cta1}</a>
                <a href="#solutions" className="cx-link">{c.cta2} <span aria-hidden="true">→</span></a>
              </div>

              <nav id="solutions" className="cx-channels" aria-label={c.channelsTitle}>
                <span className="cx-eyebrow">{c.channelsEyebrow}</span>
                {c.channels.map(([title, description], index) => (
                  <a
                    className="cx-channel"
                    key={title}
                    href={`mailto:contato@allx.global?subject=${encodeURIComponent(title)}`}
                  >
                    <span className="cx-channel-n">0{index + 1}</span>
                    <span className="cx-channel-body">
                      <strong>{title}</strong>
                      <small>{description}</small>
                    </span>
                    <span className="cx-channel-arrow" aria-hidden="true">↗</span>
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <div className="cx-right">
            <div id="contact-form" className="cx-panel reveal">
              <div className="cx-panel-top">
                <span>ALL X · INTAKE</span>
                <span className="cx-live"><i />{lang === 'pt' ? 'CONTATO' : 'CONTACT'}</span>
              </div>
              <div className="cx-panel-head">
                <span className="cx-eyebrow">{c.formEyebrow}</span>
                <h2>{c.formTitle}</h2>
                <p>{c.formText}</p>
              </div>
              <div className="cx-progress" aria-hidden="true">
                <div className="cx-progress-bar"><b style={{ width: `${pct}%` }} /></div>
                <span>{String(filled).padStart(2, '0')}/{String(FIELD_NAMES.length).padStart(2, '0')}</span>
              </div>
              <form className="cx-form" onSubmit={handleSubmit} onChange={handleChange}>
                <input name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} />
                <div className="cx-fields">
                  <label className="cx-field">
                    <input name="name" type="text" placeholder={c.placeholders.name} required />
                    <span>{c.fields.name}</span>
                  </label>
                  <div className="cx-field-wrap">
                    <label className="cx-field">
                      <input name="email" type="email" placeholder={c.placeholders.email} aria-describedby="email-help" required />
                      <span>{c.fields.email}</span>
                    </label>
                    <small id="email-help" className="cx-help">{c.privacy}</small>
                  </div>
                  <label className="cx-field">
                    <input name="company" type="text" placeholder={c.placeholders.company} />
                    <span>{c.fields.company}</span>
                  </label>
                  <label className="cx-field cx-select">
                    <select name="role" defaultValue="" required>
                      {c.options.role.map((option, index) => <option key={option} value={index === 0 ? '' : option} disabled={index === 0}>{option}</option>)}
                    </select>
                    <span>{c.fields.role}</span>
                  </label>
                  <label className="cx-field cx-select">
                    <select name="interest" defaultValue="" required>
                      {c.options.interest.map((option, index) => <option key={option} value={index === 0 ? '' : option} disabled={index === 0}>{option}</option>)}
                    </select>
                    <span>{c.fields.interest}</span>
                  </label>
                  <label className="cx-field cx-select">
                    <select name="volume" defaultValue="" required>
                      {c.options.volume.map((option, index) => <option key={option} value={index === 0 ? '' : option} disabled={index === 0}>{option}</option>)}
                    </select>
                    <span>{c.fields.volume}</span>
                  </label>
                  <label className="cx-field cx-full">
                    <input name="corridors" type="text" placeholder={c.placeholders.corridors} required />
                    <span>{c.fields.corridors}</span>
                  </label>
                  <label className="cx-field cx-full cx-area">
                    <textarea name="message" rows="5" placeholder={c.placeholders.message} required />
                    <span>{c.fields.message}</span>
                  </label>
                </div>
                <button className="btn btn-primary cx-submit" type="submit" disabled={state === 'sending'}>{state === 'sending' ? c.sending : c.submit}</button>
                <p className="cx-privacy">{c.privacy}</p>
                <p className="cx-status" role="status" aria-live="polite">{state === 'ok' ? c.status : state === 'error' ? c.error : ''}</p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="cx-next" aria-labelledby="cx-next-title">
        <div className="cx-wrap cx-next-wrap">
          <header className="cx-next-head reveal">
            <span className="cx-eyebrow">{c.nextEyebrow}</span>
            <h2 id="cx-next-title">{c.nextTitle}</h2>
          </header>
          <ol className="cx-timeline">
            {c.next.map(([number, title, description]) => (
              <li className="cx-step reveal" key={number}>
                <span className="cx-step-dot" aria-hidden="true" />
                <span className="cx-step-n">{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <footer className="cx-end">
        <div className="cx-wrap cx-end-wrap">
          <span className="cx-end-word" aria-hidden="true">ALL X</span>
          <div className="cx-end-row reveal">
            <p>{c.formTitle}</p>
            <a className="cx-end-mail" href="mailto:contato@allx.global">contato@allx.global <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </footer>
    </div>
  )
}
