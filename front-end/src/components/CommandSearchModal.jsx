'use client'
import { useState, useEffect, useRef, useMemo } from 'react'
import { useI18n, closeSearchModal, openSearchModal, navigateTo, getState } from '../i18n'
import Transition from '../Transition'
import './CommandSearchModal.css'

const ITEMS = {
  pt: [
    {
      id: 'sec-create',
      badge: 'POST',
      badgeClass: 'post',
      title: 'Criar uma carteira gerenciada',
      sub: '/v1/instances/:id/customers/:id/wallets • Provisionamento MPC <100ms',
    },
    {
      id: 'sec-balance',
      badge: 'GET',
      badgeClass: 'get',
      title: 'Consultar saldo e reservas',
      sub: '/v1/wallets/:id/balances • Multicurrency Payload (USDC, BRL, EUR)',
    },
    {
      id: 'sec-prereq',
      badge: 'DOCS',
      badgeClass: 'docs',
      title: 'Pré-requisitos & Regra de Compliance KYC',
      sub: 'kyc_status: approved, compliance_request e assinatura HMAC',
    },
    {
      id: 'sec-settlement',
      badge: 'RAILS',
      badgeClass: 'rails',
      title: 'Recebimento e Liquidação T+0',
      sub: 'Event: payment.received & Event: payout.settled via Pix e Stablecoins',
    },
    {
      id: 'sec-cms',
      badge: 'WEBHOOK',
      badgeClass: 'docs',
      title: 'Metadados no CMS & Webhooks',
      sub: 'Chaves customizadas customer_internal_id e ledger_account',
    },
  ],
  en: [
    {
      id: 'sec-create',
      badge: 'POST',
      badgeClass: 'post',
      title: 'Create a managed wallet',
      sub: '/v1/instances/:id/customers/:id/wallets • MPC provisioning <100ms',
    },
    {
      id: 'sec-balance',
      badge: 'GET',
      badgeClass: 'get',
      title: 'Query balance and reserves',
      sub: '/v1/wallets/:id/balances • Multicurrency Payload (USDC, BRL, EUR)',
    },
    {
      id: 'sec-prereq',
      badge: 'DOCS',
      badgeClass: 'docs',
      title: 'Prerequisites & KYC Compliance Rule',
      sub: 'kyc_status: approved, compliance_request and HMAC signature',
    },
    {
      id: 'sec-settlement',
      badge: 'RAILS',
      badgeClass: 'rails',
      title: 'Receiving & T+0 Settlement',
      sub: 'Event: payment.received & Event: payout.settled via Pix and Stablecoins',
    },
    {
      id: 'sec-cms',
      badge: 'WEBHOOK',
      badgeClass: 'docs',
      title: 'CMS Metadata & Webhooks',
      sub: 'Custom keys customer_internal_id and ledger_account',
    },
  ],
}

function selectItem(item) {
  closeSearchModal()
  navigateTo('cms', `#${item.id}`)
  setTimeout(() => {
    document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, 60)
}

export default function CommandSearchModal() {
  const { lang, searchModalOpen } = useI18n()
  const [query, setQuery] = useState('')
  const [activeIdx, setActiveIdx] = useState(0)
  const inputEl = useRef(null)

  const items = lang === 'pt' ? ITEMS.pt : ITEMS.en

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items
    return items.filter(
      (it) =>
        it.title.toLowerCase().includes(q) ||
        it.sub.toLowerCase().includes(q) ||
        it.badge.toLowerCase().includes(q)
    )
  }, [query, items])

  // latest values for the window keydown listener
  const live = useRef({})
  live.current = { filtered, activeIdx }

  useEffect(() => {
    if (searchModalOpen) {
      setQuery('')
      setActiveIdx(0)
      const id = requestAnimationFrame(() => inputEl.current?.focus())
      return () => cancelAnimationFrame(id)
    }
  }, [searchModalOpen])

  useEffect(() => {
    function onKeydown(e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        if (getState().searchModalOpen) closeSearchModal()
        else openSearchModal()
        return
      }
      if (!getState().searchModalOpen) return
      const { filtered, activeIdx } = live.current
      if (e.key === 'Escape') {
        e.preventDefault()
        closeSearchModal()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        if (filtered.length) setActiveIdx((activeIdx + 1) % filtered.length)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        if (filtered.length) setActiveIdx((activeIdx - 1 + filtered.length) % filtered.length)
      } else if (e.key === 'Enter' && filtered[activeIdx]) {
        e.preventDefault()
        selectItem(filtered[activeIdx])
      }
    }
    window.addEventListener('keydown', onKeydown)
    return () => window.removeEventListener('keydown', onKeydown)
  }, [])

  return (
    <div data-c="CommandSearchModal" style={{ display: 'contents' }}>
      <Transition name="cmd-fade" show={searchModalOpen}>
        <div
          className="cmd-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label="Search Documentation"
          onMouseDown={(e) => e.target === e.currentTarget && closeSearchModal()}
        >
          <div className="cmd-modal">
            {/* Center Search Input */}
            <div className="cmd-input-row">
              <svg className="cmd-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                ref={inputEl}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                className="cmd-input"
                placeholder={lang === 'pt' ? 'Buscar documentação, APIs, endpoints, métodos...' : 'Search documentation, APIs, endpoints, methods...'}
              />
              <button type="button" className="cmd-esc mono" onClick={closeSearchModal}>ESC</button>
            </div>

            {/* Results List */}
            <div className="cmd-body">
              <div className="cmd-group-label mono">
                {lang === 'pt' ? 'DOCUMENTAÇÃO & ENDPOINTS RECOMENDADOS' : 'RECOMMENDED DOCUMENTATION & ENDPOINTS'}
              </div>

              {filtered.length ? (
                <ul className="cmd-list">
                  {filtered.map((item, idx) => (
                    <li
                      key={item.id}
                      className={`cmd-item${idx === activeIdx ? ' active' : ''}`}
                      onMouseEnter={() => setActiveIdx(idx)}
                      onClick={() => selectItem(item)}
                    >
                      <div className="cmd-item-left">
                        <span className={`cmd-badge mono ${item.badgeClass}`}>{item.badge}</span>
                        <div className="cmd-item-text">
                          <span className="cmd-item-title">{item.title}</span>
                          <span className="cmd-item-sub mono">{item.sub}</span>
                        </div>
                      </div>
                      <span className="cmd-enter mono" aria-hidden="true">↵</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="cmd-empty">
                  {lang === 'pt' ? 'Nenhum resultado encontrado para' : 'No results found for'} "{query}"
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="cmd-footer mono">
              <div className="cmd-shortcuts">
                <span><kbd>↑</kbd><kbd>↓</kbd> {lang === 'pt' ? 'navegar' : 'navigate'}</span>
                <span><kbd>↵</kbd> {lang === 'pt' ? 'abrir' : 'open'}</span>
                <span><kbd>esc</kbd> {lang === 'pt' ? 'fechar' : 'close'}</span>
              </div>
              <span className="cmd-brand">ALL X DOCS • v2.4</span>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  )
}
