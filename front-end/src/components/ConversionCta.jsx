'use client'

import { useI18n, navigateTo } from '../i18n'
import './ConversionCta.css'

const badges = [
  { top: 'PIX · BACEN', sub: 'Liquidação local BRL' },
  { top: 'ACH · FEDWIRE', sub: 'Clearing doméstico USD' },
  { top: 'SEPA · SWIFT', sub: 'Corredores EUR & Global' },
  { top: 'KYB · AML · KYT', sub: 'Screening contínuo' },
  { top: 'USDC · USDT', sub: 'Liquidez multichain' },
  { top: 'REST API · WEBHOOKS', sub: 'Integração white-label' },
]

export default function ConversionCta() {
  const { t } = useI18n()

  return (
    <section id="contato" data-c="ConversionCta" className="cta-band">
      <div className="container cta-grid">
        <div className="pitch">
          <h2>{t('cta.title')}</h2>
          <p>{t('cta.text')}</p>
          <div className="actions">
            <a href="mailto:contato@allx.global" className="btn btn-primary">{t('cta.b1')}</a>
            <a href="#cms" className="btn btn-ghost" onClick={(e) => { e.preventDefault(); navigateTo('cms') }}>{t('cta.b2')}</a>
          </div>
        </div>

        <div className="rail-badges" aria-label={t('cta.corridorsLabel')}>
          {badges.map((b) => (
            <div key={b.top} className="badge-cell">
              <strong className="mono">{b.top}</strong>
              <span>{b.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
