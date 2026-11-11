'use client'

import { useI18n } from '../i18n'
import './MarketInsights.css'

export default function MarketInsights() {
  const { t } = useI18n()
  const articles = t('market.articles') || []

  return (
    <section id="mercado" data-c="MarketInsights" className="market container">
      <header className="head reveal">
        <div className="title-block">
          <span className="eyebrow">{t('market.eyebrow')}</span>
          <h2 className="section-title">{t('market.title')}</h2>
        </div>
        <a href="#contato" className="more">{t('market.more')}</a>
      </header>
      <div className="list">
        {articles.map((a, i) => (
          <article key={i} className="art reveal">
            <div className={`thumb t${i}`} aria-hidden="true">
              <span>{a.tag}</span>
            </div>
            <h3>{a.t}</h3>
            <p>{a.d}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
