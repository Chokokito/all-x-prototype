'use client'

import { useI18n } from '../i18n'
import './ComplianceMatrix.css'

const compIcons = [
  // KYB & UBO (Building)
  'M4 21h16M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16M10 9h4M10 13h4',
  // KYC (User check)
  'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm7 0 2 2 4-4',
  // Sanctions / PEP (Shield alert)
  'M12 3l7 3v5c0 4.5-3 8.3-7 9.5-4-1.2-7-5-7-9.5V6l7-3zm0 5v4m0 4h.01',
  // Source of Funds (File check)
  'M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-6-6zm-4 11 2 2 4-4',
  // Monitoring (Pulse / Activity)
  'M22 12h-4l-3 9L9 3l-3 9H2',
  // Blockchain Screening (Nodes)
  'M12 5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM6 16a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm12 0a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM10.5 9.5 7 16m6.5-6.5L17 16',
  // Security (Lock)
  'M5 11h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2zm3 0V7a4 4 0 1 1 8 0v4',
  // Fraud Controls (Sliders)
  'M4 21v-7m0-4V3m8 18v-9m0-4V3m8 18v-5m0-4V3M2 14h4m4-6h4m4 8h4',
]

export default function ComplianceMatrix() {
  const { t } = useI18n()
  const items = t('compliance.items') || []

  return (
    <section data-c="ComplianceMatrix" className="comp container">
      <header className="section-head reveal">
        <div className="title-block">
          <span className="eyebrow">{t('compliance.eyebrow')}</span>
          <h2 className="section-title">{t('compliance.title')}</h2>
        </div>
        <p>{t('compliance.text')}</p>
      </header>

      <dl className="grid reveal">
        {items.map((item, i) => (
          <div key={item.t} className="cell">
            <span className="cell-ico" aria-hidden="true">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d={compIcons[i]} />
              </svg>
            </span>
            <dt>{item.t}</dt>
            <dd>{item.d}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
