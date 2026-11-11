'use client'
import { useI18n, navigateTo } from '../i18n'

const ALL = {
  'global-payments': { t: 'Global Payments', pt: 'Pagamentos internacionais com liquidação local', en: 'Cross-border payments with local settlement' },
  'global-accounts': { t: 'Global Accounts', pt: 'Contas corporativas em USD, EUR, BRL e stablecoins', en: 'Corporate accounts in USD, EUR, BRL and stablecoins' },
  stablecoins: { t: 'Stablecoin Gateway', pt: 'On/off-ramp institucional em USDC e USDT', en: 'Institutional on/off-ramp in USDC and USDT' },
  developers: { t: 'Developers', pt: 'API e infraestrutura white-label', en: 'API and white-label infrastructure' },
}

export default function ProductCrossNav({ current }) {
  const { lang } = useI18n()
  const entries = Object.entries(ALL).filter(([k]) => k !== current && (current === 'developers' || k !== 'developers'))
  return (
    <div className="pp-next">
      {entries.map(([k, v]) => (
          <a
            key={k}
            href={`/${k}`}
            onClick={(e) => {
              e.preventDefault()
              navigateTo(k)
            }}
          >
            <div>
              <strong>{v.t}</strong>
              <span>{v[lang] || v.pt}</span>
            </div>
            <b aria-hidden="true">→</b>
          </a>
        ))}
    </div>
  )
}
