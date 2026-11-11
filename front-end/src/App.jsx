'use client'
import { useEffect } from 'react'
import { useI18n, navigateTo } from './i18n'
import Transition from './Transition'
import SiteHeader from './components/SiteHeader'
import HeroSection from './components/HeroSection'
import DashboardShowcase from './components/DashboardShowcase'
import BrandManifesto from './components/BrandManifesto'
import FeatureTriad from './components/FeatureTriad'
import HowItWorks from './components/HowItWorks'
import ProductGrid from './components/ProductGrid'
import ComplianceMatrix from './components/ComplianceMatrix'
import DeveloperApi from './components/DeveloperApi'
import MarketInsights from './components/MarketInsights'
import ConversionCta from './components/ConversionCta'
import SiteFooter from './components/SiteFooter'
import RevealStage from './components/RevealStage'
import CmsDocsPage from './components/CmsDocsPage'
import CommandSearchModal from './components/CommandSearchModal'
import GlobalPaymentsPage from './components/GlobalPaymentsPage'
import GlobalAccountsPage from './components/GlobalAccountsPage'
import StablecoinsPage from './components/StablecoinsPage'
import DevelopersPage from './components/DevelopersPage'

function observeReveals() {
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible')
          io.unobserve(e.target)
        }
      }),
    { threshold: 0.12 },
  )
  document.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => io.observe(el))
  return io
}

export default function App({ initialPage }) {
  const { t, lang, targetLang, currentPage, langTransitioning } = useI18n()

  useEffect(() => {
    if (initialPage && initialPage !== currentPage) {
      navigateTo(initialPage)
    }
  }, [initialPage])

  const activePage = currentPage === 'home' && initialPage ? initialPage : currentPage || initialPage || 'home'

  useEffect(() => {
    const io = observeReveals()
    return () => io.disconnect()
  }, [activePage, lang])

  return (
    <>
      <a href="#main" className="sr-only">{t('skip')}</a>
      <CommandSearchModal />

      {/* Smooth full-viewport veil when switching language */}
      <Transition name="lang-veil" show={langTransitioning}>
        <div className="lang-switch-veil" aria-hidden="true">
          <div className="lang-switch-card mono">
            <div className="lang-switch-top">
              <svg className="lang-veil-globe" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <span>ALL X • {targetLang === 'pt' ? 'PORTUGUÊS (BR)' : 'ENGLISH (US)'}</span>
            </div>
            <div className="lang-switch-bar">
              <span className="lang-switch-fill" />
            </div>
          </div>
        </div>
      </Transition>

      <div className={`lang-stage${langTransitioning ? ' is-switching' : ''}`}>
        {activePage === 'cms' ? (
          <CmsDocsPage />
        ) : (
          <>
            <div className="page-top">
              <SiteHeader />
              <main id="main">
                {activePage === 'global-payments' ? (
                  <GlobalPaymentsPage />
                ) : activePage === 'global-accounts' ? (
                  <GlobalAccountsPage />
                ) : activePage === 'stablecoins' ? (
                  <StablecoinsPage />
                ) : activePage === 'developers' ? (
                  <DevelopersPage />
                ) : (
                  <>
                    <HeroSection />
                    <DashboardShowcase />
                    <BrandManifesto />
                    <FeatureTriad />
                    <HowItWorks />
                    <ProductGrid />
                    <ComplianceMatrix />
                    <DeveloperApi />
                    <MarketInsights />
                  </>
                )}
              </main>
            </div>
            {/* Pinned behind the page and uncovered on scroll */}
            <RevealStage>
              <ConversionCta />
              <SiteFooter />
            </RevealStage>
          </>
        )}
      </div>
    </>
  )
}
