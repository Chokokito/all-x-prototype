import React from 'react'
import Link from 'next/link'

type Props = {
  variant?: 'nav' | 'header'
  kind?: 'home' | 'site'
  payload?: any
  user?: any
}

/**
 * Atalhos do painel (server component).
 *  - kind="home": volta para o inicio do proprio CMS (dashboard) e injeta o badge
 *    de novas solicitacoes de contato no item da sidebar sem precisar abrir a colecao.
 *  - kind="site": abre o site publico em nova aba (FRONTEND_URL).
 */
export default async function SiteLink({ variant = 'nav', kind = 'home', payload, user }: Props) {
  const cls = `allx-site-link allx-site-link--${variant}`

  if (kind === 'home') {
    let newContacts = 0
    if (payload && user?.role === 'admin') {
      try {
        const res = await payload.count({
          collection: 'contact-requests',
          where: { status: { equals: 'new' } },
          overrideAccess: false,
          user,
        })
        newContacts = res.totalDocs || 0
      } catch {
        newContacts = 0
      }
    }

    const badgeText = newContacts > 99 ? '99+' : String(newContacts)

    return (
      <>
        {newContacts > 0 && (
          <style>{`
            html body .nav__link[href$='/collections/contact-requests']::after {
              content: '${badgeText}';
              margin-left: auto;
              min-width: 20px;
              height: 20px;
              padding: 0 6px;
              border-radius: 999px;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              background: #d98e68;
              color: #1a0e07;
              font-family: var(--font-mono);
              font-size: 11px;
              font-weight: 700;
              line-height: 1;
              box-shadow: 0 0 12px rgba(217, 142, 104, 0.5);
            }
          `}</style>
        )}
        <Link className={cls} href="/admin" aria-label="Voltar ao início do painel">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 11l9-8 9 8" />
            <path d="M5 10v10a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1V10" />
          </svg>
          <span>Início do painel</span>
        </Link>
      </>
    )
  }

  const url = process.env.FRONTEND_URL || 'http://localhost:3000'
  return (
    <a
      className={cls}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Abrir o site da ALL X em uma nova aba"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M15 3h6v6" />
        <path d="M10 14L21 3" />
        <path d="M18 14v5a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h5" />
      </svg>
      <span>Ver site</span>
    </a>
  )
}
