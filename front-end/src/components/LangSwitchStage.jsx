'use client'
import { useI18n } from '../i18n'
import Transition from '../Transition'

/**
 * Shared language-switch overlay and stage blur wrapper used by App and /docs routes.
 */
export default function LangSwitchStage({ children }) {
  const { targetLang, langTransitioning } = useI18n()

  return (
    <>
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
        {children}
      </div>
    </>
  )
}
