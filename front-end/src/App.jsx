'use client'
import { useEffect, useState } from 'react'
import { useI18n, navigateTo } from './i18n'
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
import LangSwitchStage from './components/LangSwitchStage'
import GlobalPaymentsPage from './components/GlobalPaymentsPage'
import GlobalAccountsPage from './components/GlobalAccountsPage'
import StablecoinsPage from './components/StablecoinsPage'
import DevelopersPage from './components/DevelopersPage'
import ContactPage from './components/ContactPage'
import CompliancePage from './components/CompliancePage'
import BusinessPage from './components/BusinessPage'

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
  const { t, lang, currentPage } = useI18n()
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
    if (initialPage && initialPage !== currentPage) {
      navigateTo(initialPage)
    }
  }, [initialPage])

  const activePage = hydrated
    ? currentPage || initialPage || 'home'
    : initialPage || currentPage || 'home'

  useEffect(() => {
    const io = observeReveals()
    return () => io.disconnect()
  }, [activePage, lang])

  return (
    <>
      <a href="#main" className="sr-only">{t('skip')}</a>
      <CommandSearchModal />

      <LangSwitchStage>
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
                ) : activePage === 'contact' ? (
                  <ContactPage />
                ) : activePage === 'compliance' ? (
                  <CompliancePage />
                ) : activePage === 'business' ? (
                  <BusinessPage />
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
      </LangSwitchStage>
    </>
  )
}
