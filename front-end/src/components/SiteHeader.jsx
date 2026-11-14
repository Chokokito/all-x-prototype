'use client'
import { useState, useEffect, useRef } from 'react'
import { useI18n, setLang, navigateTo } from '../i18n'
import Transition from '../Transition'
import './SiteHeader.css'

const hrefs = [
  '/global-payments',
  '/global-accounts',
  '/stablecoins',
  '#como-funciona',
  '/compliance',
  '/developers',
]

const MEGA = {
  pt: {
    products: {
      leftTitle: 'Produtos Principais (Páginas Dedicadas)',
      rightTitle: 'Cross-Border & Tesouraria',
      left: [
        { title: 'Global Payments', desc: 'Envie e receba pagamentos internacionais entre moedas', href: '/global-payments', page: 'global-payments', icon: 'network' },
        { title: 'Global Accounts', desc: 'Contas corporativas nomeadas em USD, EUR, BRL e carteiras', href: '/global-accounts', page: 'global-accounts', icon: 'wallet' },
        { title: 'Stablecoin Gateway', desc: 'Liquidez 24/7 em USDC e USDT conectada aos trilhos locais', href: '/stablecoins', page: 'stablecoins', icon: 'coins' },
      ],
      right: [
        { title: 'SWIFT & Trilhos Locais', desc: 'Pix, ACH, SEPA e Fedwire integrados à mesma operação', href: '/global-payments', page: 'global-payments', icon: 'globe' },
        { title: 'Compliance & Governança', desc: 'Escale globalmente com KYB, KYC e KYT integrados', href: '/compliance', page: 'compliance', icon: 'shield' },
      ],
    },
    platform: {
      leftTitle: 'Arquitetura Operacional',
      rightTitle: 'Governança & Controle',
      left: [
        { title: 'Como Funciona', desc: 'Quatro etapas claras com infraestrutura coordenada', href: '#como-funciona', icon: 'layers' },
        { title: 'Console em Tempo Real', desc: 'Acompanhe cotações, saldos e liquidações T+0', href: '#console', icon: 'terminal' },
        { title: 'Aplicações Setoriais', desc: 'Comércio exterior, SaaS global e embedded finance', href: '#mercado', icon: 'briefcase' },
      ],
      right: [
        { title: 'Matriz de Compliance', desc: 'Screening contínuo OFAC, PEP, UBO e monitoramento', href: '/compliance', page: 'compliance', icon: 'check-shield' },
        { title: 'Status dos Corredores', desc: 'Verifique a disponibilidade dos trilhos em tempo real', href: '#contato', icon: 'status' },
      ],
    },
    devs: {
      leftTitle: 'Comece a Integrar',
      rightTitle: 'Integre com',
      left: [
        { title: 'Documentação', desc: 'Construa sobre a infraestrutura da API ALL X', href: '#cms', icon: 'doc' },
        { title: 'Referência da API', desc: 'Explore nossos endpoints REST para integração', href: '#api', icon: 'branch' },
        { title: 'Webhooks & Eventos', desc: 'Conciliação automática de recebimentos e payouts', href: '#cms', icon: 'webhook' },
      ],
      sdks: ['TS', 'Py', 'Go', 'PHP', 'cURL'],
      cards: [
        { title: 'White-Label Core', desc: 'Embuta contas e pagamentos no seu produto', href: '#cms' },
        { title: 'API', desc: 'Ambiente isolado para testes de liquidação', href: '#cms' },
      ],
    },
  },
  en: {
    products: {
      leftTitle: 'Core Products (Dedicated Pages)',
      rightTitle: 'Cross-Border & Treasury',
      left: [
        { title: 'Global Payments', desc: 'Send and receive money across borders seamlessly', href: '/global-payments', page: 'global-payments', icon: 'network' },
        { title: 'Global Accounts', desc: 'Create named corporate accounts in multiple currencies', href: '/global-accounts', page: 'global-accounts', icon: 'wallet' },
        { title: 'Stablecoin Gateway', desc: '24/7 USDC and USDT liquidity bridged to local rails', href: '/stablecoins', page: 'stablecoins', icon: 'coins' },
      ],
      right: [
        { title: 'SWIFT & Local Rails', desc: 'Pix, ACH, SEPA and Fedwire in a unified experience', href: '/global-payments', page: 'global-payments', icon: 'globe' },
        { title: 'Compliance & Governance', desc: 'Scale globally with built-in KYC, KYB and KYT', href: '/compliance', page: 'compliance', icon: 'shield' },
      ],
    },
    platform: {
      leftTitle: 'Operational Architecture',
      rightTitle: 'Governance & Control',
      left: [
        { title: 'How It Works', desc: 'Four visible steps with coordinated infrastructure', href: '#como-funciona', icon: 'layers' },
        { title: 'Live Console', desc: 'Track locked quotes, balances and T+0 settlements', href: '#console', icon: 'terminal' },
        { title: 'Use Cases', desc: 'Global trade, SaaS payroll and embedded finance', href: '#mercado', icon: 'briefcase' },
      ],
      right: [
        { title: 'Compliance Matrix', desc: 'Continuous OFAC, PEP, UBO and KYT monitoring', href: '/compliance', page: 'compliance', icon: 'check-shield' },
        { title: 'System Status', desc: 'Check real-time payment rail performance', href: '#contato', icon: 'status' },
      ],
    },
    devs: {
      leftTitle: 'Start Building',
      rightTitle: 'Integrate With',
      left: [
        { title: 'Documentation', desc: 'Build on the ALL X API infrastructure', href: '#cms', icon: 'doc' },
        { title: 'API Reference', desc: 'Explore and master our REST API for integration', href: '#api', icon: 'branch' },
        { title: 'Webhooks & Events', desc: 'Automated reconciliation for pay-ins and payouts', href: '#cms', icon: 'webhook' },
      ],
      sdks: ['TS', 'Py', 'Go', 'PHP', 'cURL'],
      cards: [
        { title: 'White-Label Core', desc: 'Embed global accounts & payments into your app', href: '#cms' },
        { title: 'API Sandbox', desc: 'Isolated environment for end-to-end testing', href: '#cms' },
      ],
    },
  },
}

const sv = {
  width: '18',
  height: '18',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: '1.6',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

function LeftIcon({ icon }) {
  if (icon === 'network')
    return (
      <svg {...sv}>
        <circle cx="12" cy="5" r="2.5" />
        <circle cx="5" cy="19" r="2.5" />
        <circle cx="19" cy="19" r="2.5" />
        <path d="M10.5 7.2 6.5 16.8M13.5 7.2l4 9.6M7.5 19h9" />
      </svg>
    )
  if (icon === 'wallet')
    return (
      <svg {...sv}>
        <rect x="3" y="5" width="18" height="14" rx="3" />
        <path d="M3 10h18M16 14h2" />
      </svg>
    )
  if (icon === 'coins')
    return (
      <svg {...sv}>
        <circle cx="9.5" cy="9.5" r="5.5" />
        <path d="M14.5 9.5a5.5 5.5 0 1 1-5 5" />
      </svg>
    )
  if (icon === 'shield')
    return (
      <svg {...sv}>
        <path d="M12 3l7 3v5c0 4.5-3 8.3-7 9.5-4-1.2-7-5-7-9.5V6l7-3z" />
        <path d="M12 8v5M12 16h.01" />
      </svg>
    )
  if (icon === 'layers')
    return (
      <svg {...sv}>
        <path d="m12 3 9 4.5-9 4.5-9-4.5L12 3zM3 12l9 4.5 9-4.5M3 16.5 12 21l9-4.5" />
      </svg>
    )
  if (icon === 'terminal')
    return (
      <svg {...sv}>
        <rect x="3" y="4" width="18" height="16" rx="3" />
        <path d="m8 10 3 2.5L8 15M13 15h3" />
      </svg>
    )
  return (
    <svg {...sv}>
      <rect x="3" y="7" width="18" height="13" rx="2.5" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18" />
    </svg>
  )
}

function RightIcon({ icon }) {
  if (icon === 'globe')
    return (
      <svg {...sv}>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a14.5 14.5 0 0 1 0 18M12 3a14.5 14.5 0 0 0 0 18" />
      </svg>
    )
  if (icon === 'coins')
    return (
      <svg {...sv}>
        <circle cx="9.5" cy="9.5" r="5.5" />
        <path d="M14.5 9.5a5.5 5.5 0 1 1-5 5" />
      </svg>
    )
  if (icon === 'shield' || icon === 'check-shield')
    return (
      <svg {...sv}>
        <path d="M12 3l7 3v5c0 4.5-3 8.3-7 9.5-4-1.2-7-5-7-9.5V6l7-3z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    )
  return (
    <svg {...sv}>
      <rect x="3" y="4" width="18" height="16" rx="3" />
      <path d="M8.5 14.5a5 5 0 0 1 7 0M6 12a8.5 8.5 0 0 1 12 0M12 17h.01" />
    </svg>
  )
}

function DevIcon({ icon }) {
  if (icon === 'doc')
    return (
      <svg {...sv}>
        <rect x="5" y="3" width="14" height="18" rx="2.5" />
        <path d="M9 8h6M9 12h6M9 16h4" />
      </svg>
    )
  if (icon === 'branch')
    return (
      <svg {...sv}>
        <circle cx="6" cy="6" r="2.5" />
        <circle cx="18" cy="8" r="2.5" />
        <circle cx="6" cy="18" r="2.5" />
        <path d="M6 8.5v7M8.5 6H13a2.5 2.5 0 0 1 2.5 2.5" />
      </svg>
    )
  return (
    <svg {...sv}>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="M9 12h6M12 9v6" />
    </svg>
  )
}

export default function SiteHeader() {
  const { t, lang, currentPage } = useI18n()
  const links = t('nav.links').map((label, i) => ({ label, href: hrefs[i] }))
  const [open, setOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState(null)
  const [activeNavItem, setActiveNavItem] = useState(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const closeTimer = useRef(null)
  const lastMenu = useRef(null)
  if (activeMenu) lastMenu.current = activeMenu
  const menu = activeMenu || lastMenu.current

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function openMenu(key) {
    clearTimeout(closeTimer.current)
    setActiveMenu(key)
  }
  function focusNavItem(item) {
    setActiveNavItem(item)
  }
  function scheduleClose() {
    clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => {
      setActiveMenu(null)
      setActiveNavItem(null)
    }, 140)
  }
  function handleNavClick(e, href, page) {
    e.preventDefault()
    setActiveMenu(null)
    setActiveNavItem(null)
    setOpen(false)
    if (page) {
      navigateTo(page)
      return
    }
    if (href.startsWith('/')) {
      const slug = href.replace(/^\//, '')
      navigateTo(slug || 'home')
      return
    }
    if (href === '#cms') {
      navigateTo('cms')
      return
    }
    navigateTo('home', href)
  }

  const goCms = (e) => {
    e.preventDefault()
    setActiveMenu(null)
    navigateTo('cms')
  }

  const megaMenus = lang === 'pt' ? MEGA.pt : MEGA.en

  return (
    <header
      data-c="SiteHeader"
      className={`header${isScrolled ? ' is-scrolled' : ''}`}
      onMouseLeave={scheduleClose}
    >
      <div className="bar container-wide">
        <a
          href="/"
          aria-label={t('nav.home')}
          onClick={(e) => {
            e.preventDefault()
            setActiveMenu(null)
            navigateTo('home')
          }}
        >
          <img src="/logo.png" alt="ALL X" width="100" height="24" />
        </a>

        <nav className="links" aria-label={t('nav.main')}>
          {/* Page 1: Global Payments */}
          <a
            href={links[0].href}
            className={`nav-item${currentPage === 'global-payments' || activeNavItem === 'global-payments' ? ' active' : ''}`}
            onMouseEnter={() => openMenu('products')}
            onFocus={() => openMenu('products')}
            onMouseMove={() => focusNavItem('global-payments')}
            onFocusCapture={() => focusNavItem('global-payments')}
            onClick={(e) => handleNavClick(e, links[0].href, 'global-payments')}
          >
            {links[0].label}
          </a>

          {/* Page 2: Global Accounts */}
          <a
            href={links[1].href}
            className={`nav-item${currentPage === 'global-accounts' || activeNavItem === 'global-accounts' ? ' active' : ''}`}
            onMouseEnter={() => openMenu('products')}
            onFocus={() => openMenu('products')}
            onMouseMove={() => focusNavItem('global-accounts')}
            onFocusCapture={() => focusNavItem('global-accounts')}
            onClick={(e) => handleNavClick(e, links[1].href, 'global-accounts')}
          >
            {links[1].label}
          </a>

          {/* Page 3: Stablecoins */}
          <a
            href={links[2].href}
            className={`nav-item${currentPage === 'stablecoins' || activeNavItem === 'stablecoins' ? ' active' : ''}`}
            onMouseEnter={() => openMenu('products')}
            onFocus={() => openMenu('products')}
            onMouseMove={() => focusNavItem('stablecoins')}
            onFocusCapture={() => focusNavItem('stablecoins')}
            onClick={(e) => handleNavClick(e, links[2].href, 'stablecoins')}
          >
            {links[2].label}
          </a>

          {/* Trigger 2: Como funciona & Compliance (Platform Mega-Menu) */}
          <a
            href={links[3].href}
            className={`nav-item${activeNavItem === 'how-it-works' ? ' active' : ''}`}
            onMouseEnter={() => openMenu('platform')}
            onFocus={() => openMenu('platform')}
            onMouseMove={() => focusNavItem('how-it-works')}
            onFocusCapture={() => focusNavItem('how-it-works')}
            onClick={(e) => handleNavClick(e, links[3].href)}
          >
            {links[3].label}
          </a>

          <a
            href={links[4].href}
            className={`nav-item${activeNavItem === 'compliance' ? ' active' : ''}`}
            onMouseEnter={() => openMenu('platform')}
            onFocus={() => openMenu('platform')}
            onMouseMove={() => focusNavItem('compliance')}
            onFocusCapture={() => focusNavItem('compliance')}
            onClick={(e) => handleNavClick(e, links[4].href)}
          >
            {links[4].label}
          </a>

          {/* Trigger 3: API & Developers Mega-Menu */}
          <a
            href={links[5].href}
            className={`nav-item${activeNavItem === 'developers' ? ' active' : ''}`}
            onMouseEnter={() => openMenu('devs')}
            onFocus={() => openMenu('devs')}
            onMouseMove={() => focusNavItem('developers')}
            onFocusCapture={() => focusNavItem('developers')}
            onClick={(e) => handleNavClick(e, links[5].href)}
          >
            {links[5].label}
          </a>
        </nav>

        <div className="actions">
          {/* Animated sliding pill language switcher */}
          <div
            className="lang-switch"
            role="group"
            aria-label={t('nav.lang')}
            data-lang={lang}
          >
            <svg
              className="lang-globe"
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.9"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            <div className="lang-track">
              <span className="lang-thumb" aria-hidden="true" />
              <button
                type="button"
                className={lang === 'pt' ? 'on' : undefined}
                aria-pressed={lang === 'pt'}
                lang="pt"
                onClick={() => setLang('pt')}
              >
                PT
              </button>
              <button
                type="button"
                className={lang === 'en' ? 'on' : undefined}
                aria-pressed={lang === 'en'}
                lang="en"
                onClick={() => setLang('en')}
              >
                EN
              </button>
            </div>
          </div>

          <a href="#cms" className="sandbox" onClick={(e) => { e.preventDefault(); navigateTo('cms') }}>
            {t('nav.sandbox')}
          </a>
          <a href="/contact" className="cta" onClick={(e) => handleNavClick(e, '/contact', 'contact')}>{t('nav.contact')}</a>

          {/* Animated Hamburger Button */}
          <button
            type="button"
            className={`burger${open ? ' is-open' : ''}`}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={t('nav.menu')}
            onClick={() => setOpen(!open)}
          >
            <span className="bar-line line-1" />
            <span className="bar-line line-2" />
            <span className="bar-line line-3" />
          </button>
        </div>
      </div>

      {/* Hover Mega-Menu */}
      <Transition name="mega-pop" show={!!activeMenu}>
        <div
          className="mega-wrap"
          onMouseEnter={() => openMenu(menu)}
          onMouseLeave={scheduleClose}
        >
          <div className="mega-card">
            {(menu === 'products' || menu === 'platform') && (
              <>
                <div className="mega-col">
                  <span className="mega-heading">{megaMenus[menu].leftTitle}</span>
                  {megaMenus[menu].left.map((item) => (
                    <a
                      key={item.title}
                      href={item.href}
                      className="mega-item"
                      onClick={(e) => handleNavClick(e, item.href, item.page)}
                    >
                      <span className="mega-icon" aria-hidden="true">
                        <LeftIcon icon={item.icon} />
                      </span>
                      <div className="mega-copy">
                        <strong>{item.title}</strong>
                        <span>{item.desc}</span>
                      </div>
                    </a>
                  ))}
                </div>

                <div className="mega-col mega-col-right">
                  <span className="mega-heading">{megaMenus[menu].rightTitle}</span>
                  {megaMenus[menu].right.map((item) => (
                    <a
                      key={item.title}
                      href={item.href}
                      className="mega-item"
                      onClick={(e) => handleNavClick(e, item.href, item.page)}
                    >
                      <span className="mega-icon" aria-hidden="true">
                        <RightIcon icon={item.icon} />
                      </span>
                      <div className="mega-copy">
                        <strong>{item.title}</strong>
                        <span>{item.desc}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </>
            )}

            {menu === 'devs' && (
              <>
                <div className="mega-col">
                  <span className="mega-heading">{megaMenus.devs.leftTitle}</span>
                  {megaMenus.devs.left.map((item) => (
                    <a
                      key={item.title}
                      href={item.href}
                      className="mega-item"
                      onClick={(e) => handleNavClick(e, item.href, item.page)}
                    >
                      <span className="mega-icon" aria-hidden="true">
                        <DevIcon icon={item.icon} />
                      </span>
                      <div className="mega-copy">
                        <strong>{item.title}</strong>
                        <span>{item.desc}</span>
                      </div>
                    </a>
                  ))}
                </div>

                <div className="mega-col mega-col-right">
                  <span className="mega-heading">{megaMenus.devs.rightTitle}</span>
                  <div className="sdk-row">
                    {megaMenus.devs.sdks.map((sdk) => (
                      <a key={sdk} href="#cms" className="sdk-box mono" onClick={goCms}>
                        {sdk}
                      </a>
                    ))}
                  </div>
                  <div className="dev-cards">
                    {megaMenus.devs.cards.map((card) => (
                      <a key={card.title} href={card.href} className="dev-subcard" onClick={goCms}>
                        <strong>{card.title}</strong>
                        <span>{card.desc}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </Transition>

      <Transition name="mobile-drawer" show={open}>
        <nav id="mobile-nav" className="mobile" aria-label="Mobile">
          {links.map((l, idx) => (
            <a
              key={l.href}
              href={l.href}
              style={{ '--i': idx }}
              onClick={(e) => handleNavClick(e, l.href)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#cms"
            style={{ '--i': links.length }}
            onClick={(e) => {
              e.preventDefault()
              setOpen(false)
              navigateTo('cms')
            }}
          >
            {t('nav.sandbox')}
          </a>
          <div className="mobile-bottom" style={{ '--i': links.length + 1 }}>
            <a href="/contact" className="cta mobile-cta" onClick={(e) => { handleNavClick(e, '/contact', 'contact') }}>
              {t('nav.contact')}
            </a>
          </div>
        </nav>
      </Transition>
    </header>
  )
}
