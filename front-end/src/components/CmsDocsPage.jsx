'use client'
import { useRef, useState } from 'react'
import { AnchorProvider, ScrollProvider, TOCItem, useActiveAnchor } from 'fumadocs-core/toc'
import { useI18n, setLang, navigateTo, openSearchModal } from '../i18n'
import Transition from '../Transition'
import { usePayloadFumadocs, CMS_BASE_URL } from '../docs/payloadSource'
import PayloadBlocksRenderer from '../docs/PayloadBlocksRenderer'
import './CmsDocsPage.css'

function methodClass(m) {
  if (!m) return 'm-doc'
  const u = m.toUpperCase()
  if (u === 'POST') return 'm-post'
  if (u === 'GET') return 'm-get'
  if (u === 'WSS') return 'm-wss'
  return 'm-doc'
}

/**
 * Right-hand TOC list powered by Fumadocs `useActiveAnchor()` and `<TOCItem>`.
 */
function FumadocsTocList({ toc = [], fallbackSection }) {
  const activeAnchor = useActiveAnchor() || fallbackSection

  return (
    <ul className="cms-toc-list">
      {toc.map((item) => {
        const id = item.url.replace(/^#/, '')
        const isActive = activeAnchor === id
        return (
          <li key={item.url}>
            <TOCItem
              href={item.url}
              className={`cms-toc-link${isActive ? ' active' : ''}`}
            >
              {item.title}
            </TOCItem>
          </li>
        )
      })}
    </ul>
  )
}

export default function CmsDocsPage({ initialSlug = 'managed-wallets' }) {
  const { t, lang } = useI18n()
  const [activeNavId, setActiveNavId] = useState(initialSlug)
  const [copiedLink, setCopiedLink] = useState(false)
  const [feedbackGiven, setFeedbackGiven] = useState(false)
  const [switcherOpen, setSwitcherOpen] = useState(false)
  const [selectedModuleIdx, setSelectedModuleIdx] = useState(0)
  const [sidebarFilter, setSidebarFilter] = useState('')
  const [collapsedGroups, setCollapsedGroups] = useState({})
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const tocContainerRef = useRef(null)

  const {
    source,
    pageTree,
    currentPageDoc,
    toc,
    neighbours,
    breadcrumbs,
  } = usePayloadFumadocs({
    activeSlug: activeNavId,
    lang,
    sidebarFilter,
  })

  const mods = t('cms.sidebar.modules')
  const currentModule = Array.isArray(mods)
    ? mods[selectedModuleIdx] || mods[0]
    : { sub: 'API & ENGINE', title: 'Corporate Treasury' }

  function toggleGroup(title) {
    setCollapsedGroups((g) => ({ ...g, [title]: !g[title] }))
  }

  function selectModule(idx) {
    setSelectedModuleIdx(idx)
    setSwitcherOpen(false)
    if (idx === 0) setActiveNavId('managed-wallets')
    else if (idx === 1) setActiveNavId('stablecoin')
    else if (idx === 2) setActiveNavId('kyc-kyb')
  }

  function handleSelectPage(slug) {
    setActiveNavId(slug)
    setMobileSidebarOpen(false)
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  function copyPageLink() {
    navigator.clipboard?.writeText(window.location.href)
    setCopiedLink(true)
    setTimeout(() => {
      setCopiedLink(false)
    }, 1800)
  }

  const isPt = lang === 'pt'
  const pageTitle = (isPt ? currentPageDoc?.titlePt : currentPageDoc?.titleEn) || t('cms.hero.title')
  const pageSub = (isPt ? currentPageDoc?.subtitlePt : currentPageDoc?.subtitleEn) || t('cms.hero.subtitle')

  const prevSlug = currentPageDoc?.prevSlug || neighbours?.previous?.$slug || 'multi-currency'
  const prevTitle =
    (isPt ? currentPageDoc?.prevTitlePt : currentPageDoc?.prevTitleEn) ||
    neighbours?.previous?.name ||
    t('cms.pagination.prevTitle')

  const nextSlug = currentPageDoc?.nextSlug || neighbours?.next?.$slug || 'fx-engine'
  const nextTitle =
    (isPt ? currentPageDoc?.nextTitlePt : currentPageDoc?.nextTitleEn) ||
    neighbours?.next?.name ||
    t('cms.pagination.nextTitle')

  const defaultAnchor = toc[0]?.url?.replace(/^#/, '') || 'sec-prereq'

  return (
    <AnchorProvider toc={toc}>
      <div className="cms-page" data-c="CmsDocsPage">
        {/* TopNavigationBar (#2:4) */}
        <header className="cms-topbar">
          <div className="cms-topbar-left">
            <a
              href="#"
              className="cms-logo-link"
              onClick={(e) => {
                e.preventDefault()
                navigateTo('home')
              }}
              aria-label={t('nav.home')}
            >
              <img src="/logo.png" alt="ALL X" width="84" height="20" />
            </a>
            <span className="cms-divider" aria-hidden="true" />
            <span className="cms-docs-badge mono">{t('cms.top.badge')}</span>
            <a
              href="#"
              className="cms-back-home"
              onClick={(e) => {
                e.preventDefault()
                navigateTo('home')
              }}
            >
              {t('cms.top.backHome')}
            </a>
          </div>

          {/* Desktop Search Bar */}
          <div className="cms-search-wrap">
            <button type="button" className="cms-search-box" onClick={() => openSearchModal()}>
              <svg className="cms-search-ico" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <span className="cms-search-placeholder">{t('cms.top.searchPlaceholder')}</span>
              <kbd className="cms-kbd mono">Ctrl + K</kbd>
            </button>
          </div>

          <div className="cms-topbar-right">
            {/* Mobile Magnifying Glass Button ("Lupinha") */}
            <button
              type="button"
              className="cms-mobile-search-btn"
              aria-label={t('cms.top.searchPlaceholder')}
              onClick={() => openSearchModal()}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>

            {/* Animated Sliding Pill Language Switcher */}
            <div className="cms-lang-switch" role="group" aria-label={t('nav.lang')} data-lang={lang}>
              <svg className="cms-lang-globe" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <div className="cms-lang-track">
                <span className="cms-lang-thumb" aria-hidden="true" />
                <button type="button" className={lang === 'pt' ? 'on' : ''} aria-pressed={lang === 'pt'} onClick={() => setLang('pt')}>PT</button>
                <button type="button" className={lang === 'en' ? 'on' : ''} aria-pressed={lang === 'en'} onClick={() => setLang('en')}>EN</button>
              </div>
            </div>

            <a
              href="#contato"
              className="cms-contact-btn"
              onClick={(e) => {
                e.preventDefault()
                navigateTo('home', '#contato')
              }}
            >
              {t('cms.top.contact')}
            </a>

            {/* Animated Mobile Hamburger for API Sidebar */}
            <button
              type="button"
              className={`cms-burger${mobileSidebarOpen ? ' is-open' : ''}`}
              aria-expanded={mobileSidebarOpen}
              aria-label="Menu API"
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            >
              <span className="bar-line line-1" />
              <span className="bar-line line-2" />
              <span className="bar-line line-3" />
            </button>
          </div>
        </header>

        {/* MainDocumentationLayout (#2:32) — 3-Column Fumadocs Shell */}
        <div className="cms-layout">
          {/* Column 1: LeftSidebarNav (#2:249) — Fumadocs PageTree from Payload CMS */}
          <aside className={`cms-sidebar-left${mobileSidebarOpen ? ' is-mobile-open' : ''}`} aria-label="Documentation Navigation">
            {/* Context Switcher / API Engine Selector */}
            <div className="cms-switcher-wrap">
              <button
                type="button"
                className={`cms-switcher-btn${switcherOpen ? ' is-open' : ''}`}
                aria-expanded={switcherOpen}
                onClick={() => setSwitcherOpen(!switcherOpen)}
              >
                <div className="cms-switcher-left">
                  <span className="cms-switcher-icon">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#D98E68" strokeWidth="2" aria-hidden="true">
                      <polygon points="12 2 2 7 12 12 22 7 12 2" />
                      <polyline points="2 17 12 22 22 17" />
                      <polyline points="2 12 12 17 22 12" />
                    </svg>
                  </span>
                  <div className="cms-switcher-text">
                    <span className="cms-switcher-sub mono">{currentModule.sub}</span>
                    <span className="cms-switcher-title">{currentModule.title}</span>
                  </div>
                </div>
                <svg className="cms-switcher-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              <Transition name="dropdown-slide" show={switcherOpen}>
                <ul className="cms-switcher-menu">
                  {(Array.isArray(mods) ? mods : []).map((mod, idx) => (
                    <li
                      key={mod.id}
                      className={`cms-switcher-option${idx === selectedModuleIdx ? ' selected' : ''}`}
                      onClick={() => selectModule(idx)}
                    >
                      <div>
                        <small className="mono">{mod.sub}</small>
                        <strong>{mod.title}</strong>
                      </div>
                      <span className="cms-mod-pill mono">{mod.status}</span>
                    </li>
                  ))}
                </ul>
              </Transition>

              {/* Quick inline API endpoint filter */}
              <div className="cms-side-filter">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                </svg>
                <input
                  value={sidebarFilter}
                  onChange={(e) => setSidebarFilter(e.target.value)}
                  type="text"
                  className="cms-side-filter-input mono"
                  placeholder={lang === 'pt' ? 'Filtrar APIs (ex: POST, Pix...)' : 'Filter APIs (e.g. POST, Pix...)'}
                />
              </div>
            </div>

            <nav className="cms-nav-tree">
              {pageTree.children.map((folder) => {
                const folderTitle = String(folder.name)
                const isCollapsed = !!collapsedGroups[folderTitle]
                return (
                  <div key={folder.$slug || folderTitle} className="cms-nav-group">
                    <button
                      type="button"
                      className={`cms-nav-heading${folder.$accent ? ' accent' : ''}${isCollapsed ? ' collapsed' : ''}`}
                      onClick={() => toggleGroup(folderTitle)}
                    >
                      <span>{folderTitle}</span>
                      <svg className="cms-group-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>

                    <ul className="cms-nav-list" style={isCollapsed ? { display: 'none' } : undefined}>
                      {folder.children.map((item) => (
                        <li key={item.$slug}>
                          <a
                            href={`#cms`}
                            className={`cms-nav-item${currentPageDoc?.slug === item.$slug ? ' active' : ''}`}
                            onClick={(e) => {
                              e.preventDefault()
                              handleSelectPage(item.$slug)
                            }}
                          >
                            <span className="cms-nav-item-left">
                              <span className={`cms-method-tag mono ${methodClass(item.$method)}`}>
                                {item.$method || 'DOC'}
                              </span>
                              <span className="cms-nav-label">{item.name}</span>
                            </span>
                            {item.$badge && <span className="cms-nav-badge mono">{item.$badge}</span>}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </nav>

            <div className="cms-sidebar-footer">
              <div className="cms-version-info mono">
                <span className="cms-version-dot" />
                <span>{source === 'payload-live' ? 'Payload CMS • Fumadocs' : t('cms.sidebar.version')}</span>
              </div>
              <a
                href={`${CMS_BASE_URL}/admin`}
                target="_blank"
                rel="noreferrer"
                className="cms-status-link"
              >
                CMS Admin
              </a>
            </div>
          </aside>

          {/* Column 2: MainContentCenter (#2:33) — Dynamic Payload CMS Blocks */}
          <main id="main" className="cms-main">
            <div className="cms-bg-grid" aria-hidden="true" />
            <div className="cms-article">
              {/* Breadcrumbs (#2:35) */}
              <nav className="cms-breadcrumbs" aria-label="Breadcrumb">
                {breadcrumbs.map((crumb, idx) => (
                  <span key={idx} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    {idx > 0 && <span className="crumb-sep">&gt;</span>}
                    <span className={idx === breadcrumbs.length - 1 ? 'crumb-current' : ''}>{crumb}</span>
                  </span>
                ))}
              </nav>

              {/* Hero Header (#2:46) */}
              <div className="cms-hero">
                <div className="cms-hero-top">
                  <h1>{pageTitle}</h1>
                  <button type="button" className="cms-copy-link-btn" onClick={copyPageLink}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                    <span>{copiedLink ? t('cms.hero.copiedLink') : t('cms.hero.copyLink')}</span>
                  </button>
                </div>
                <p className="cms-hero-sub">{pageSub}</p>
              </div>

              {/* Dynamic Blocks from Payload CMS */}
              <PayloadBlocksRenderer
                blocks={currentPageDoc?.blocks || []}
                lang={lang}
                t={t}
              />

              {/* Pagination Controls (#2:240) — Fumadocs PageTree Neighbours */}
              <nav className="cms-pagination" aria-label="Pagination">
                <a
                  href="#cms"
                  className="cms-page-card prev"
                  onClick={(e) => {
                    e.preventDefault()
                    handleSelectPage(prevSlug)
                  }}
                >
                  <span className="cms-page-dir">{t('cms.pagination.prevLabel')}</span>
                  <span className="cms-page-title">{prevTitle}</span>
                </a>
                <a
                  href="#cms"
                  className="cms-page-card next"
                  onClick={(e) => {
                    e.preventDefault()
                    handleSelectPage(nextSlug)
                  }}
                >
                  <span className="cms-page-dir">{t('cms.pagination.nextLabel')}</span>
                  <span className="cms-page-title">{nextTitle}</span>
                </a>
              </nav>
            </div>
          </main>

          {/* Column 3: RightSidebarOnThisPage (#2:328) — Fumadocs TOC & ScrollSpy */}
          <aside className="cms-sidebar-right" aria-label="Table of contents">
            <div className="cms-toc-sticky" ref={tocContainerRef}>
              <ScrollProvider containerRef={tocContainerRef}>
                <div className="cms-toc-block">
                  <div className="cms-toc-head">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <line x1="8" y1="6" x2="21" y2="6" />
                      <line x1="8" y1="12" x2="21" y2="12" />
                      <line x1="8" y1="18" x2="21" y2="18" />
                      <line x1="3" y1="6" x2="3.01" y2="6" />
                      <line x1="3" y1="12" x2="3.01" y2="12" />
                      <line x1="3" y1="18" x2="3.01" y2="18" />
                    </svg>
                    <span>{t('cms.toc.title')}</span>
                  </div>
                  <FumadocsTocList toc={toc} fallbackSection={defaultAnchor} />
                </div>
              </ScrollProvider>

              {/* Feedback Widget (#2:346) */}
              <div className="cms-feedback-card">
                <p className="cms-feedback-title">{t('cms.toc.feedbackTitle')}</p>
                {!feedbackGiven ? (
                  <div className="cms-feedback-btns">
                    <button type="button" className="cms-fb-btn" onClick={() => setFeedbackGiven(true)}>
                      <span aria-hidden="true">👍</span>
                      <span>{t('cms.toc.yes')}</span>
                    </button>
                    <button type="button" className="cms-fb-btn" onClick={() => setFeedbackGiven(true)}>
                      <span aria-hidden="true">👎</span>
                      <span>{t('cms.toc.no')}</span>
                    </button>
                  </div>
                ) : (
                  <p className="cms-feedback-thanks">{t('cms.toc.thanks')}</p>
                )}
              </div>

              {/* Quick Developer Actions (#2:358) */}
              <div className="cms-quick-actions">
                <a
                  href={`${CMS_BASE_URL}/admin/collections/docs-pages`}
                  target="_blank"
                  rel="noreferrer"
                  className="cms-quick-link"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                  <span>{t('cms.toc.editCms')}</span>
                </a>
                <a
                  href="#contato"
                  className="cms-quick-link"
                  onClick={(e) => {
                    e.preventDefault()
                    navigateTo('home', '#contato')
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  <span>{t('cms.toc.support')}</span>
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </AnchorProvider>
  )
}
