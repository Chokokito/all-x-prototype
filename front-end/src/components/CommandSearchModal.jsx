'use client'
import { useState, useEffect, useRef, useMemo } from 'react'
import { useI18n, closeSearchModal, openSearchModal, getState } from '../i18n'
import { fetchDocsData, seedDocsData, buildSearchEntries } from '../docs/payloadSource'
import Transition from '../Transition'
import './CommandSearchModal.css'

function selectItem(item) {
  closeSearchModal()
  if (typeof window === 'undefined') return
  const onDocs = window.location.pathname.startsWith('/docs')
  if (!onDocs) {
    window.location.assign(`/docs/${item.slug}${item.anchor ? '#' + item.anchor : ''}`)
    return
  }
  window.history.replaceState({}, '', `/docs/${item.slug}${item.anchor ? '#' + item.anchor : ''}`)
  window.dispatchEvent(new CustomEvent('docs:navigate', { detail: { slug: item.slug, anchor: item.anchor } }))
}

export default function CommandSearchModal() {
  const { lang, searchModalOpen } = useI18n()
  const [query, setQuery] = useState('')
  const [activeIdx, setActiveIdx] = useState(0)
  const inputEl = useRef(null)

  const [docsData, setDocsData] = useState(() => seedDocsData())

  // Sempre que a busca abre, pega a versão mais recente do CMS (páginas novas aparecem na hora)
  useEffect(() => {
    if (!searchModalOpen) return
    let cancelled = false
    fetchDocsData().then((d) => {
      if (!cancelled && d) setDocsData(d)
    })
    return () => {
      cancelled = true
    }
  }, [searchModalOpen])

  const items = useMemo(() => buildSearchEntries(docsData.pages, lang), [docsData, lang])

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
                {lang === 'pt' ? 'PÁGINAS & SEÇÕES DA DOCUMENTAÇÃO' : 'DOCUMENTATION PAGES & SECTIONS'}
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
