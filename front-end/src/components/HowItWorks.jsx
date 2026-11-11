'use client'

import { useI18n } from '../i18n'
import './HowItWorks.css'

const stepIcons = [
  // 01 Receba: Arrow down into tray
  'M12 3v12m0 0-4-4m4 4 4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2',
  // 02 Cote: Sliders / quote lock
  'M4 8h9m4 0h3M13 8a2 2 0 1 0 4 0 2 2 0 0 0-4 0zM4 16h3m4 0h9M7 16a2 2 0 1 0 4 0 2 2 0 0 0-4 0z',
  // 03 Converta: Swap arrows
  'M7 10h14l-4-4M17 14H3l4 4',
  // 04 Liquide: Check circle / bank
  'M20 6 9 17l-5-5',
]

export default function HowItWorks() {
  const { t } = useI18n()
  const steps = t('how.steps') || []
  const useCases = t('how.useCases') || []

  return (
    <section id="como-funciona" data-c="HowItWorks" className="how container">
      <header className="section-head reveal">
        <div className="title-block">
          <span className="eyebrow">{t('how.eyebrow')}</span>
          <h2 className="section-title">{t('how.title')}</h2>
        </div>
        <p>{t('how.text')}</p>
      </header>

      <ol className="steps reveal">
        {steps.map((s, i) => (
          <li key={s.n} className="step">
            <div className="step-top">
              <span className="step-ico" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d={stepIcons[i]} />
                </svg>
              </span>
              <span className="n mono">{s.n} · {s.sub}</span>
            </div>
            <h3>{s.t}</h3>
            <p>{s.d}</p>
          </li>
        ))}
      </ol>

      <div className="meta reveal">
        <div className="behind">
          <h3>{t('how.behindTitle')}</h3>
          <p>{t('how.behindText')}</p>
        </div>
        <div className="cases">
          <h3>{t('how.useCasesTitle')}</h3>
          <ul>
            {useCases.map((u) => (
              <li key={u}>{u}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
