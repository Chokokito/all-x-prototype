'use client'

import { useI18n, navigateTo } from '../i18n'
import './ProductGrid.css'

const productIcons = [
  // Global Accounts (Wallet / IBAN)
  'M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7zm0 3h18M15 14h2',
  // Global Payments (Globe / Cross-border)
  'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3.6 9h16.8M3.6 15h16.8M12 3a14.5 14.5 0 0 1 0 18M12 3a14.5 14.5 0 0 0 0 18',
  // Stablecoin Gateway (Coins / Bridge)
  'M9.5 9.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11zM14.5 4a5.5 5.5 0 0 1 0 11',
  // Treasury (Layers / Dashboard)
  'M12 3 3 7.5 12 12l9-4.5L12 3zM3 12l9 4.5 9-4.5M3 16.5 12 21l9-4.5',
  // API / White-Label (Code brackets)
  'm16 18 6-6-6-6M8 6l-6 6 6 6',
  // Payables (Invoice / Check)
  'M6 3h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm3 6h6m-6 4h6m-6 4h4',
]

const cardPages = [
  'global-accounts',
  'global-payments',
  'stablecoins',
  null,
  'cms',
  null,
]

export default function ProductGrid() {
  const { t } = useI18n()
  const cards = t('stack.cards') || []

  return (
    <section data-c="ProductGrid" className="stack container">
      <header className="section-head reveal">
        <div className="title-block">
          <span className="eyebrow">{t('stack.eyebrow')}</span>
          <h2 className="section-title">{t('stack.title')}</h2>
        </div>
        <p>{t('stack.text')}</p>
      </header>
      <div className="cards">
        {cards.map((c, i) => {
          const targetPage = cardPages[i]
          return (
            <article
              key={i}
              className="card reveal"
              style={targetPage ? { cursor: 'pointer' } : undefined}
              onClick={() => {
                if (targetPage) navigateTo(targetPage)
              }}
            >
              <div className="card-top">
                <span className="card-ico" aria-hidden="true">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d={productIcons[i]} />
                  </svg>
                </span>
                <span className="n mono">{'0' + (i + 1)}</span>
              </div>
              <h3>{c.t}</h3>
              <p>{c.d}</p>
            </article>
          )
        })}
      </div>
    </section>
  )
}
