'use client'
import { useState, useEffect, useRef, useMemo } from 'react'
import { useI18n, navigateTo } from '../i18n'
import { parallax } from '../parallax'
import './HeroSection.css'

const rails = ['Pix', 'ACH', 'SWIFT', 'SEPA', 'USDC', 'USDT']

export default function HeroSection() {
  const { lang, t } = useI18n()
  const heroEl = useRef(null)
  const [activePillar, setActivePillar] = useState(0)

  const pillars = useMemo(() =>
    lang === 'pt'
      ? [
          {
            icon: 'network',
            title: 'Mova dinheiro entre fronteiras',
            desc: 'Consulte cotações, tarifas e prazo estimado. Rotas e disponibilidade dependem do serviço e dos parceiros envolvidos.',
            href: '/global-payments',
            page: 'global-payments',
          },
          {
            icon: 'wallet',
            title: 'Contas virtuais nomeadas',
            desc: 'Consulte a disponibilidade de contas em USD e EUR e organize fluxos com stablecoins, conforme a rota.',
            href: '/global-accounts',
            page: 'global-accounts',
          },
          {
            icon: 'shield',
            title: 'Stablecoin Gateway',
            desc: 'A ALL X conecta stablecoins e trilhos locais conforme a disponibilidade da rota.',
            href: '/stablecoins',
            page: 'stablecoins',
          },
        ]
      : [
          {
            icon: 'network',
            title: 'Move money across borders',
            desc: 'Review quotes, fees, and estimated timing. Routes and availability depend on the service and partners involved.',
            href: '/global-payments',
            page: 'global-payments',
          },
          {
            icon: 'wallet',
            title: 'Launch named virtual accounts',
            desc: 'Check the availability of USD and EUR accounts and organize stablecoin flows, depending on the route.',
            href: '/global-accounts',
            page: 'global-accounts',
          },
          {
            icon: 'shield',
            title: 'Stablecoin Gateway',
            desc: 'ALL X connects stablecoins and local rails subject to route availability.',
            href: '/stablecoins',
            page: 'stablecoins',
          },
        ],
    [lang]
  )

  useEffect(() => {
    function onScroll() {
      const el = heroEl.current
      if (!el) return
      if (window.innerWidth < 768) {
        el.style.setProperty('--hero-p', '0')
        return
      }
      const p = Math.min(1, Math.max(0, window.scrollY / 560))
      el.style.setProperty('--hero-p', p.toFixed(3))
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <section ref={heroEl} data-c="HeroSection" className="hero">
      {/* Subtle architectural grid plane moving at a slower parallax speed */}
      <div ref={parallax(0.22)} className="hero-grid" aria-hidden="true" />
      <div ref={parallax(0.38)} className="hero-horizon" aria-hidden="true" />

      <div className="container inner">
        <div className="hero-title-layer">
          <span className="hero-badge">
            <i className="hero-badge-dot" aria-hidden="true" />
            {t('hero.badge')}
          </span>

          <h1 className="h1">
            <span className="l1">{t('hero.l1')}</span>
            <span className="l2">{t('hero.l2')} {t('hero.l3')}</span>
          </h1>

          <p className="sub">{t('hero.sub')}</p>

          <div className="ctas">
            <a href="#contato" className="btn btn-primary">{t('hero.cta1')}</a>
            <a href="#como-funciona" className="btn btn-ghost">
              {t('hero.cta2')}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
        </div>

        {/* BlindPay-inspired Functional 3-Pillar Strip with Minimalist Solid Icon Boxes */}
        <div className="pillars-strip" role="list">
          {pillars.map((p, idx) => (
            <a
              key={p.title}
              href={p.href}
              role="listitem"
              className={`pillar-cell${activePillar === idx ? ' active' : ''}`}
              onMouseEnter={() => setActivePillar(idx)}
              onFocus={() => setActivePillar(idx)}
              onClick={(e) => {
                if (p.page) {
                  e.preventDefault()
                  navigateTo(p.page)
                }
              }}
            >
              <span className="pillar-ico" aria-hidden="true">
                {p.icon === 'network' && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="5" r="2.5" /><circle cx="5" cy="19" r="2.5" /><circle cx="19" cy="19" r="2.5" />
                    <path d="M10.5 7.2 6.5 16.8M13.5 7.2l4 9.6M7.5 19h9" />
                  </svg>
                )}
                {p.icon === 'wallet' && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="5" width="18" height="14" rx="3" />
                    <path d="M3 10h18M15 14.5h3" />
                  </svg>
                )}
                {p.icon !== 'network' && p.icon !== 'wallet' && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3l7 3v5c0 4.5-3 8.3-7 9.5-4-1.2-7-5-7-9.5V6l7-3z" />
                    <path d="m9.5 12 1.8 1.8 3.7-3.8" />
                  </svg>
                )}
              </span>
              <strong>{p.title}</strong>
              <p>{p.desc}</p>
            </a>
          ))}
        </div>

        <div ref={parallax(-0.08)} className="rails" aria-label={t('hero.proofLabel')}>
          <span className="rails-label">
            {lang === 'pt' ? 'Moedas, stablecoins e trilhos conectados' : 'Connected currencies, stablecoins and rails'}
          </span>
          <ul className="rails-row">
            {rails.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
