'use client'

import ApiTerminal from '../react/ApiTerminal.jsx'
import { useI18n, navigateTo } from '../i18n'
import './DeveloperApi.css'

export default function DeveloperApi() {
  const { t } = useI18n()
  const bullets = t('api.bullets') || []

  return (
    <section id="api" data-c="DeveloperApi" className="api container reveal">
      <div className="copy">
        <span className="eyebrow">{t('api.eyebrow')}</span>
        <h2 className="section-title">{t('api.title')}</h2>
        <p>{t('api.text')}</p>
        <ul className="checks">
          {bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
        <a href="#cms" className="btn btn-ghost docs-btn" onClick={(e) => { e.preventDefault(); navigateTo('cms') }}>
          {t('cta.b2')}
        </a>
      </div>
      <div>
        <ApiTerminal copyLabel={t('api.copy')} copiedLabel={t('api.copied')} />
      </div>
    </section>
  )
}
