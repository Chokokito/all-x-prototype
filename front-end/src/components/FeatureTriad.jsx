'use client'

import { useI18n } from '../i18n'
import { parallax } from '../parallax'
import CobeGlobe from '../react/CobeGlobe.jsx'
import AnimatedComplianceList from '../react/AnimatedComplianceList.jsx'
import './FeatureTriad.css'

const ids = ['pagamentos', 'contas', 'compliance']
const icons = [
  // globe
  'M12 2a10 10 0 1 0 0 20a10 10 0 1 0 0-20zM2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20',
  // bank
  'M3 10h18M5 10v8M9 10v8M15 10v8M19 10v8M3 20h18M12 3l9 5H3z',
  // shield
  'M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6zM8.5 12l2.5 2.5 4.5-5',
]

export default function FeatureTriad() {
  const { t, lang } = useI18n()

  const rawFeatures = t('features') || []
  const features = rawFeatures.map((f, i) => ({ ...f, id: ids[i], icon: icons[i], flip: i % 2 === 1 }))

  const head = lang === 'pt'
    ? { title: 'Uma plataforma completa para operar dinheiro entre países', text: 'Orquestramos compliance, liquidez, stablecoins e trilhos locais por baixo — para que a sua operação não precise.' }
    : { title: 'A complete platform to move money across borders', text: 'We orchestrate compliance, liquidity, stablecoins and local rails underneath — so your operation doesn’t have to.' }

  const ui = lang === 'pt'
    ? {
        corridors: 'Corredores ativos 24/7',
        select: 'Saldos multimoeda',
        accTitle: 'Contas corporativas nominais & Wallets',
        usd: 'Conta comercial USD',
        usdSub: 'Routing ACH & Fedwire ·· 4820',
        eur: 'Conta corporativa EUR',
        eurSub: 'SEPA Instant IBAN ·· 9104',
        usdc: 'Carteira Tesouraria USDC',
        usdcSub: 'Solana · Polygon · Ethereum',
      }
    : {
        corridors: '24/7 active corridors',
        select: 'Multi-currency balances',
        accTitle: 'Named corporate accounts & Wallets',
        usd: 'USD commercial account',
        usdSub: 'ACH & Fedwire routing ·· 4820',
        eur: 'EUR corporate account',
        eurSub: 'SEPA Instant IBAN ·· 9104',
        usdc: 'USDC Treasury Wallet',
        usdcSub: 'Solana · Polygon · Ethereum',
      }

  return (
    <section data-c="FeatureTriad" className="features container">
      <header className="section-head reveal">
        <h2 className="section-title">{head.title}</h2>
        <p>{head.text}</p>
      </header>

      {features.map((f) => (
        <article id={f.id} key={f.id} className={`panel reveal ${f.flip ? 'flip' : ''}`.trim()}>
          <div className="copy">
            <span className="eyebrow">
              <svg className="ico" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={f.icon} /></svg>
              {f.tag}
            </span>
            <h3>{f.title}</h3>
            <p>{f.text}</p>
            <ul className="checks">
              {(f.bullets || []).map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>

          <div className="visual">
            <div className="visual-bg" aria-hidden="true" />

            {/* Pagamentos: Cobe Interactive WebGL Globe */}
            {f.id === 'pagamentos' && (
              <div className="globe-wrap">
                <div className="globe-island">
                  <CobeGlobe />
                </div>
                <div className="globe-pill">
                  <span className="pulse-dot" aria-hidden="true" />
                  <span>{ui.corridors}</span>
                  <span className="sep">·</span>
                  <code>Pix · ACH · SEPA · USDC</code>
                </div>
              </div>
            )}

            {/* Contas: Solid minimalist multi-currency account selector */}
            {f.id === 'contas' && (
              <div ref={parallax(0.06)} className="acc">
                <span className="select">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></svg>
                  {ui.select}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="m6 9 6 6 6-6" /></svg>
                </span>
                <div className="acc-box">
                  <small>{ui.accTitle}</small>
                  <div className="acc-row">
                    <span className="ccy-badge">USD</span>
                    <div className="acc-meta"><b>{ui.usd}</b><small>{ui.usdSub}</small></div>
                    <span className="acc-status">Ativa</span>
                  </div>
                  <div className="acc-row">
                    <span className="ccy-badge">EUR</span>
                    <div className="acc-meta"><b>{ui.eur}</b><small>{ui.eurSub}</small></div>
                    <span className="acc-status">Ativa</span>
                  </div>
                  <div className="acc-row">
                    <span className="ccy-badge copper">USDC</span>
                    <div className="acc-meta"><b>{ui.usdc}</b><small>{ui.usdcSub}</small></div>
                    <span className="acc-status">T+0</span>
                  </div>
                </div>
              </div>
            )}

            {/* Compliance: Magic UI AnimatedList */}
            {f.id !== 'pagamentos' && f.id !== 'contas' && (
              <div className="compliance-wrap">
                <div className="list-island">
                  <AnimatedComplianceList lang={lang} />
                </div>
                <ul className="rails">
                  <li className="on">Pix</li><li className="on">SEPA</li><li className="on">ACH</li><li className="on">USDC</li><li>SWIFT</li>
                </ul>
              </div>
            )}
          </div>
        </article>
      ))}
    </section>
  )
}
