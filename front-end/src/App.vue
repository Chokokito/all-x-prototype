<script setup>
import { onMounted, watch, nextTick } from 'vue'
import { t, lang, targetLang, currentPage, langTransitioning } from './i18n'
import SiteHeader from './components/SiteHeader.vue'
import HeroSection from './components/HeroSection.vue'
import DashboardShowcase from './components/DashboardShowcase.vue'
import RailsTicker from './components/RailsTicker.vue'
import BrandManifesto from './components/BrandManifesto.vue'
import FeatureTriad from './components/FeatureTriad.vue'
import HowItWorks from './components/HowItWorks.vue'
import ProductGrid from './components/ProductGrid.vue'
import ComplianceMatrix from './components/ComplianceMatrix.vue'
import DeveloperApi from './components/DeveloperApi.vue'
import MarketInsights from './components/MarketInsights.vue'
import ConversionCta from './components/ConversionCta.vue'
import SiteFooter from './components/SiteFooter.vue'
import RevealStage from './components/RevealStage.vue'
import CmsDocsPage from './components/CmsDocsPage.vue'
import CommandSearchModal from './components/CommandSearchModal.vue'

function observeReveals() {
  const els = document.querySelectorAll('.reveal')
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target) }
    }),
    { threshold: 0.12 },
  )
  els.forEach((el) => io.observe(el))
}

onMounted(observeReveals)
watch([currentPage, lang], async () => {
  await nextTick()
  observeReveals()
})
</script>

<template>
  <a href="#main" class="sr-only">{{ t('skip') }}</a>
  <CommandSearchModal />

  <!-- Smooth full-viewport veil when switching language -->
  <Transition name="lang-veil">
    <div v-if="langTransitioning" class="lang-switch-veil" aria-hidden="true">
      <div class="lang-switch-card mono">
        <div class="lang-switch-top">
          <svg class="lang-veil-globe" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          <span>ALL X • {{ targetLang === 'pt' ? 'PORTUGUÊS (BR)' : 'ENGLISH (US)' }}</span>
        </div>
        <div class="lang-switch-bar">
          <span class="lang-switch-fill" />
        </div>
      </div>
    </div>
  </Transition>

  <div class="lang-stage" :class="{ 'is-switching': langTransitioning }" :key="lang">
    <CmsDocsPage v-if="currentPage === 'cms'" />
    <template v-else>
      <div class="page-top">
        <div class="orb orb-a" v-parallax="0.3" aria-hidden="true" />
        <div class="orb orb-b" v-parallax="0.22" aria-hidden="true" />
        <div class="orb orb-c" v-parallax="0.28" aria-hidden="true" />
        <SiteHeader />
        <main id="main">
          <HeroSection />
          <!-- Emerges from behind the Hero card as the user scrolls down -->
          <DashboardShowcase />
          <RailsTicker />
          <BrandManifesto />
          <FeatureTriad />
          <HowItWorks />
          <ProductGrid />
          <ComplianceMatrix />
          <DeveloperApi />
          <MarketInsights />
        </main>
      </div>
      <!-- Pinned behind the page and uncovered on scroll -->
      <RevealStage>
        <ConversionCta />
        <SiteFooter />
      </RevealStage>
    </template>
  </div>
</template>

<style>
/* Decorative page-level parallax orbs, behind the content */
#app { position: relative; overflow-x: hidden; max-width: 100vw; }
.orb { position: absolute; z-index: -1; border-radius: 50%; pointer-events: none; filter: blur(80px); }
.orb-a { top: 1100px; left: -180px; width: 460px; height: 460px; background: rgba(217, 142, 104, 0.1); }
.orb-b { top: 2600px; right: -200px; width: 520px; height: 520px; background: rgba(229, 170, 140, 0.08); }
.orb-c { top: 4200px; left: 8%; width: 420px; height: 420px; background: rgba(52, 211, 153, 0.05); }
@media (max-width: 720px) { .orb { display: none; } }

/* Language switch page transition */
.lang-stage {
  transition: opacity 0.42s cubic-bezier(0.22, 1, 0.36, 1), filter 0.42s cubic-bezier(0.22, 1, 0.36, 1), transform 0.42s cubic-bezier(0.22, 1, 0.36, 1);
}
.lang-stage.is-switching {
  opacity: 0.14;
  filter: blur(12px);
  transform: scale(0.988);
}

.lang-switch-veil {
  position: fixed;
  inset: 0;
  z-index: 300;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at 50% 45%, rgba(217, 142, 104, 0.16), rgba(10, 12, 16, 0.78));
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}
.lang-switch-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 240px;
  padding: 14px 22px;
  border-radius: 14px;
  background: rgba(17, 21, 30, 0.94);
  border: 1px solid rgba(217, 142, 104, 0.45);
  color: #ebaa89;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.12em;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.7), 0 0 36px rgba(217, 142, 104, 0.28);
  animation: langCardPop 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}
.lang-switch-top {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
.lang-veil-globe {
  color: #ebaa89;
  animation: langGlobeSpin 1s cubic-bezier(0.22, 1, 0.36, 1) infinite;
}
.lang-switch-bar {
  width: 100%;
  height: 3px;
  border-radius: 99px;
  background: rgba(255, 255, 255, 0.08);
  overflow: hidden;
}
.lang-switch-fill {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #d98e68, #ffdcc6, #d98e68);
  transform-origin: left;
  animation: langBarFill 0.95s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

@keyframes langCardPop {
  from { opacity: 0; transform: translateY(10px) scale(0.92); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes langGlobeSpin {
  from { transform: rotate(0deg); }
  to { transform: rotate(180deg); }
}
@keyframes langBarFill {
  from { transform: scaleX(0.08); }
  to { transform: scaleX(1); }
}

.lang-veil-enter-active,
.lang-veil-leave-active {
  transition: opacity 0.36s cubic-bezier(0.22, 1, 0.36, 1);
}
.lang-veil-enter-from,
.lang-veil-leave-to {
  opacity: 0;
}
</style>
