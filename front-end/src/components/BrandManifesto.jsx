'use client'

import { useEffect, useRef, useState } from 'react'
import { useI18n } from '../i18n'
import './BrandManifesto.css'

export default function BrandManifesto() {
  const { t } = useI18n()
  const root = useRef(null)
  const [progress, setProgress] = useState(0)

  const titleWords = (t('manifesto.title') || '').split(/\s+/)
  const bodyWords = (t('manifesto.text') || '').split(/\s+/)
  const totalWords = titleWords.length + bodyWords.length

  useEffect(() => {
    function onScroll() {
      const el = root.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      const p = (vh * 0.85 - r.top) / (r.height + vh * 0.25)
      setProgress(Math.min(1, Math.max(0, p)))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const stats = t('stats') || []

  return (
    <section data-c="BrandManifesto" className="manifesto">
      <div className="container">
        <span className="eyebrow">{t('manifesto.eyebrow')}</span>
        <div ref={root} className="statement-group">
          <p className="statement">
            {titleWords.map((w, i) => (
              <span
                key={'t-' + i}
                className={`w ${i / totalWords < progress ? 'lit' : ''}`.trim()}
              >
                {w + ' '}
              </span>
            ))}
          </p>
          <p className="statement sub-statement">
            {bodyWords.map((w, i) => (
              <span
                key={'b-' + i}
                className={`w ${(titleWords.length + i) / totalWords < progress ? 'lit' : ''}`.trim()}
              >
                {w + ' '}
              </span>
            ))}
          </p>
        </div>

        <dl className="stats">
          <div className="stat"><dt>{stats[0]}</dt><dd>USD · EUR · BRL</dd></div>
          <div className="stat"><dt>{stats[1]}</dt><dd>USDC · USDT</dd></div>
          <div className="stat"><dt>{stats[2]}</dt><dd>Pix · ACH · SEPA</dd></div>
          <div className="stat"><dt>{stats[3]}</dt><dd>SWIFT · Wire</dd></div>
        </dl>
      </div>
    </section>
  )
}
