'use client'

import { useI18n, navigateTo } from '../i18n'
import './SiteFooter.css'

const FOOTER_PAGE_MAP = {
  'Global Accounts': 'global-accounts',
  'Global Payments': 'global-payments',
  'Stablecoin Gateway': 'stablecoins',
  Documentação: 'cms',
  Documentation: 'cms',
  'API / White-Label': 'cms',
}

export default function SiteFooter() {
  const { t, lang } = useI18n()
  const cols = t('footer.cols') || []

  return (
    <footer data-c="SiteFooter" className="footer">
      <div className="container">
        <div className="grid">
          <div className="brand">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault()
                navigateTo('home')
              }}
            >
              <img src="/logo.png" alt="ALL X" width="92" height="22" />
            </a>
            <p>{t('footer.desc')}</p>
            <div className="status-pill">
              <span className="status-dot" aria-hidden="true" />
              <span>{lang === 'pt' ? 'Todos os sistemas operacionais' : 'All systems operational'}</span>
            </div>
          </div>
          {cols.map((c) => (
            <nav key={c.h} aria-label={c.h}>
              <h4>{c.h}</h4>
              <ul>
                {(c.items || []).map((i) => {
                  const targetPage = FOOTER_PAGE_MAP[i]
                  const href =
                    targetPage === 'cms'
                      ? '#cms'
                      : targetPage
                        ? `/${targetPage}`
                        : '#'
                  return (
                    <li key={i}>
                      <a
                        href={href}
                        onClick={(e) => {
                          if (targetPage) {
                            e.preventDefault()
                            navigateTo(targetPage)
                          }
                        }}
                      >
                        {i}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </nav>
          ))}
        </div>
        <p className="disclosure">{t('footer.disclosure')}</p>
        <div className="legal">
          <span>{t('footer.rights')}</span>
          <div className="social">
            <a href="#cms" onClick={(e) => { e.preventDefault(); navigateTo('cms') }}>API Docs</a>
            <a href="#compliance" onClick={(e) => { e.preventDefault(); navigateTo('home', '#compliance') }}>Compliance</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
