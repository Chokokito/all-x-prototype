'use client'
import { useEffect, useRef, useState } from 'react'
import { useI18n } from '../i18n'
import CobeGlobe from '../react/CobeGlobe.jsx'
import BlurText from '../react/bits/BlurText'
import AnimatedBeam from '../react/fx/AnimatedBeam'
import OrbitingCircles from '../react/fx/OrbitingCircles'
import './pages/stablecoins.css'

const SP = [-23.5505, -46.6333]
const NY = [40.7128, -74.006]
const ZH = [47.3769, 8.5417]
const SG = [1.3521, 103.8198]
const DXB = [25.2048, 55.2708]
const MARKERS = [
  { location: SP, size: 0.08 },
  { location: NY, size: 0.08 },
  { location: ZH, size: 0.07 },
  { location: SG, size: 0.07 },
  { location: DXB, size: 0.06 },
]
const ARCS = [
  { from: SP, to: ZH },
  { from: NY, to: SG },
  { from: ZH, to: DXB },
  { from: DXB, to: SG },
]

const COPY = {
  pt: {
    badge: 'Stablecoin Gateway',
    l1: 'Stablecoins quando aceleram.',
    l2: 'Moeda local no destino.',
    sub: 'A ALL X pode conectar USDC e USDT a trilhos bancários locais conforme a rota, a disponibilidade e os parceiros envolvidos.',
    cta1: 'Integrar o Gateway',
    cta2: 'Ver os fluxos',
    modes: [
      { tab: 'On-ramp', from: ['Pix · ACH · SEPA', 'BRL, USD ou EUR da sua conta'], to: ['USDC · USDT', 'Na carteira gerenciada ou no destino'], note: 'Cotação, conversão e liquidação conforme a rota disponível.' },
      { tab: 'Off-ramp', from: ['USDC · USDT', 'Depósito em carteira ou endereço aplicável'], to: ['Pix · ACH · SEPA', 'Liquidação em moeda local conforme disponibilidade'], note: 'Blockchain screening e informações da liquidação ao longo da operação.' },
      { tab: 'Cross-border', from: ['BRL ou USD', 'Sua tesouraria opera em moeda local'], to: ['USD · EUR · BRL', 'O fornecedor recebe no trilho disponível'], note: 'A stablecoin conecta a operação aos trilhos locais disponíveis.' },
    ],
    engine: 'ALL X',
    availability: 'Disponibilidade conforme rota',
    eEyebrow: 'Stablecoin é infraestrutura',
    eTitle: 'Você compra velocidade e controle, não uma aula de blockchain.',
    eText: 'A experiência fica com o seu financeiro. A complexidade técnica é abstraída na operação.',
    visible: 'O que sua equipe vê',
    hidden: 'O que a ALL X orquestra',
    vis: ['Cotação apresentada antes da confirmação', 'Status da operação', 'Moedas e stablecoins', 'Informações para conciliação'],
    hid: ['Regras e controles de risco', 'Carteiras e liquidação conforme escopo aplicável', 'Conexão com trilhos locais', 'Blockchain screening'],
    tlKicker: 'Etapas possíveis', tlTitle: 'Um fluxo sujeito à rota e ao escopo.', tlText: 'Exemplo ilustrativo. A sequência, as condições e os prazos variam conforme a operação.',
    tl: [['Etapa 1', 'Consultar cotação', 'Condições aplicáveis antes de confirmar.'], ['Etapa 2', 'Conversão', 'Conversão entre fiat e stablecoin, conforme a rota.'], ['Etapa 3', 'Verificações', 'Controles aplicáveis ao serviço e aos parceiros envolvidos.'], ['Etapa 4', 'Liquidação', 'Trilho e destino dependem da disponibilidade da operação.']],
    cKicker: 'Comparativo', cTitle: 'O mesmo pagamento, dois caminhos.', oldT: 'Tradicional', newT: 'Com a ALL X',
    old: ['Cadeia de bancos correspondentes', 'Taxas e câmbio pouco claros', 'Conciliação manual', 'Janelas bancárias limitadas'],
    nw: ['Stablecoin pode conectar trilhos locais', 'Consulte a cotação antes de confirmar', 'Informações para apoiar a conciliação', 'Disponibilidade conforme rota e parceiros'],
    closeT: 'Mova valor na velocidade da stablecoin.', closeS: 'Fale com o time e conecte o Gateway aos seus trilhos locais.', fiat: 'Fiat', stable: 'Stablecoin',
  },
  en: {
    badge: 'Stablecoin Gateway',
    l1: 'Stablecoins when they speed up.',
    l2: 'Local currency at destination.',
    sub: 'ALL X may connect USDC and USDT to local banking rails, subject to route, availability, and partners involved.',
    cta1: 'Integrate the Gateway',
    cta2: 'View the flows',
    modes: [
      { tab: 'On-ramp', from: ['Pix · ACH · SEPA', 'BRL, USD or EUR from your account'], to: ['USDC · USDT', 'In the managed wallet or at destination'], note: 'Quotes, conversion and settlement according to the available route.' },
      { tab: 'Off-ramp', from: ['USDC · USDT', 'Deposit to the applicable wallet or address'], to: ['Pix · ACH · SEPA', 'Local currency settlement subject to availability'], note: 'Blockchain screening and settlement information throughout the operation.' },
      { tab: 'Cross-border', from: ['BRL or USD', 'Your treasury operates in local currency'], to: ['USD · EUR · BRL', 'The supplier is paid through the available rail'], note: 'Stablecoin connects the operation to available local rails.' },
    ],
    engine: 'ALL X',
    availability: 'Availability according to route',
    eEyebrow: 'Stablecoin is infrastructure',
    eTitle: 'You buy speed and control, not a blockchain lecture.',
    eText: 'The experience stays with your finance team. Technical complexity is abstracted in the operation.',
    visible: 'What your team sees',
    hidden: 'What ALL X orchestrates',
    vis: ['Quote presented before confirmation', 'Operational status', 'Fiat and stablecoins', 'Information to support reconciliation'],
    hid: ['Risk rules and controls', 'Wallets and settlement within applicable scope', 'Connection to local rails', 'Blockchain screening'],
    tlKicker: 'Possible steps', tlTitle: 'A flow subject to route and scope.', tlText: 'Illustrative example. Sequence, conditions, and timing vary by operation.',
    tl: [['Step 1', 'Review a quote', 'Applicable conditions before confirmation.'], ['Step 2', 'Conversion', 'Conversion between fiat and stablecoin, depending on the route.'], ['Step 3', 'Checks', 'Controls applicable to the service and partners involved.'], ['Step 4', 'Settlement', 'Rail and destination depend on operational availability.']],
    cKicker: 'Comparison', cTitle: 'The same payment, two paths.', oldT: 'Traditional', newT: 'With ALL X',
    old: ['Chain of correspondent banks', 'Unclear fees and FX', 'Manual reconciliation', 'Limited banking windows'],
    nw: ['Stablecoins may connect local rails', 'Review the quote before confirming', 'Information to support reconciliation', 'Availability depends on route and partners'],
    closeT: 'Move value at stablecoin speed.', closeS: 'Talk to the team and connect the Gateway to your local rails.', fiat: 'Fiat', stable: 'Stablecoin',
  },
}

export default function StablecoinsPage() {
  const { lang } = useI18n()
  const c = COPY[lang] || COPY.pt
  const [m, setM] = useState(0)
  const mode = c.modes[m]

  const stageRef = useRef(null)
  const innerRef = useRef(null)
  const flowRef = useRef(null)
  const aRef = useRef(null)
  const bRef = useRef(null)
  const cRef = useRef(null)

  useEffect(() => {
    const el = stageRef.current
    if (!el || !innerRef.current) return
    const fit = () => innerRef.current && innerRef.current.style.setProperty('--sx-s', String(Math.min(1, el.clientWidth / 640)))
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(el)

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    const updateParallax = () => {
      raf = 0
      if (reduced || !stageRef.current) return
      const rect = stageRef.current.getBoundingClientRect()
      const vh = window.innerHeight || 800
      const p = Math.min(1, Math.max(0, (vh - rect.top) / (vh + rect.height)))
      const offset = 40 - p * 90
      stageRef.current.style.translate = `0 ${offset.toFixed(1)}px`
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(updateParallax)
    }
    if (!reduced) {
      updateParallax()
      window.addEventListener('scroll', onScroll, { passive: true })
    }

    return () => {
      ro.disconnect()
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const goContact = (e) => {
    if (typeof document === 'undefined') return
    const t = document.getElementById('contato')
    if (t) {
      e.preventDefault()
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      t.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
    }
  }

  return (
    <div data-c="StablecoinsPage" className="sx">
      <section className="sx-hero">
        <div className="sx-aurora" aria-hidden="true" />
        <div className="container">
          <span className="sx-badge"><i />{c.badge}</span>
          <div className="sx-h1" role="heading" aria-level={1}>
            <BlurText text={c.l1} delay={60} animateBy="words" direction="top" />
            <span className="sx-h1-2">{c.l2}</span>
          </div>
          <p className="sx-sub">{c.sub}</p>
          <div className="sx-ctas">
            <a href="#contato" className="btn btn-primary" onClick={goContact}>{c.cta1}</a>
            <a href="#fluxos" className="btn btn-ghost">{c.cta2}</a>
          </div>
          <div ref={stageRef} className="sx-stage">
            <div ref={innerRef} className="sx-stage-inner">
              <div className="sx-globe">
                <CobeGlobe markers={MARKERS} arcs={ARCS} maxWidth={330} theta={-0.15} phi={1.2} speed={0.0045} />
              </div>
              <div className="sx-orbit-wrap" aria-hidden="true">
                <OrbitingCircles radius={235} duration={30}>
                  <span className="sx-token"><b>$</b>USDC</span>
                  <span className="sx-token t2"><b>₮</b>USDT</span>
                  <span className="sx-token t3"><b>R$</b>BRL</span>
                </OrbitingCircles>
              </div>
              <div className="sx-orbit-wrap" aria-hidden="true">
                <OrbitingCircles radius={310} duration={42} reverse startAngle={60}>
                  <span className="sx-token t3"><b>€</b>EUR</span>
                  <span className="sx-token"><b>$</b>USD</span>
                </OrbitingCircles>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="fluxos" className="sx-flow-wrap" aria-label="On/off-ramp">
        <div className="container">
          <div className="sx-tabs reveal" role="tablist">
            {c.modes.map((x, k) => (
              <button key={x.tab} role="tab" type="button" aria-selected={m === k} className={m === k ? 'on' : ''} onClick={() => setM(k)}>{x.tab}</button>
            ))}
          </div>
          <div ref={flowRef} className="sx-flow reveal">
            <div ref={aRef} className="sx-node">
              <small>{c.fiat}</small>
              <strong>{mode.from[0]}</strong>
              <p>{mode.from[1]}</p>
            </div>
            <div ref={bRef} className="sx-node core">
              <small>{c.stable}</small>
              <strong>{c.engine}</strong>
              <p>USDC · USDT</p>
            </div>
            <div ref={cRef} className="sx-node dest">
              <small>{c.fiat}</small>
              <strong>{mode.to[0]}</strong>
              <p>{mode.to[1]}</p>
            </div>
            <AnimatedBeam containerRef={flowRef} fromRef={aRef} toRef={bRef} curvature={-30} duration={3} />
            <AnimatedBeam containerRef={flowRef} fromRef={bRef} toRef={cRef} curvature={30} duration={3} delay={1.2} />
          </div>
          <div className="sx-flow-note">
            <span aria-live="polite">{mode.note}</span>
            <span className="sx-live"><i />{c.availability}</span>
          </div>
        </div>
      </section>

      <section className="sx-sec">
        <div className="container sx-tl-grid">
          <div className="sx-tl-sticky reveal">
            <span className="sx-kicker">{c.tlKicker}</span>
            <h2 className="sx-h2">{c.tlTitle}</h2>
            <p className="sx-lead">{c.tlText}</p>
          </div>
          <ol className="sx-tl">
            {c.tl.map(([t, h, p]) => (
              <li key={h} className="reveal">
                <time>{t}</time>
                <h3>{h}</h3>
                <p>{p}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="sx-sec" style={{ paddingTop: 0 }}>
        <div className="container">
          <span className="sx-kicker">{c.cKicker}</span>
          <h2 className="sx-h2">{c.cTitle}</h2>
          <div className="sx-cmp reveal">
            <div className="sx-cmp-col old">
              <h3>{c.oldT}</h3>
              <ul>{c.old.map((it) => <li key={it}>{it}</li>)}</ul>
            </div>
            <div className="sx-cmp-col new">
              <h3>{c.newT}</h3>
              <ul>{c.nw.map((it) => <li key={it}>{it}</li>)}</ul>
            </div>
          </div>
        </div>
      </section>

      <section className="sx-sec" style={{ paddingTop: 0 }}>
        <div className="container">
          <span className="sx-kicker">{c.eEyebrow}</span>
          <h2 className="sx-h2">{c.eTitle}</h2>
          <p className="sx-lead">{c.eText}</p>
          <div className="sx-abs">
            {[[c.visible, c.vis, false], [c.hidden, c.hid, true]].map(([title, items, hid]) => (
              <div key={title} className={`sx-abs-card reveal${hid ? ' hid' : ''}`}>
                <h3>{title}</h3>
                <ul className="checks" style={{ marginTop: 6 }}>
                  {items.map((it) => <li key={it}>{it}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sx-sec" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="sx-close reveal">
            <h2>{c.closeT}</h2>
            <p>{c.closeS}</p>
            <div className="sx-ctas">
              <a href="#contato" className="btn btn-primary" onClick={goContact}>{c.cta1}</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
