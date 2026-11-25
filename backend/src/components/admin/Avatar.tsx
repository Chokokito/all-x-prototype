import React from 'react'

/**
 * Avatar exibido no topo direito do painel CMS.
 * Mostra a foto escolhida pelo usuário ou as iniciais em destaque cobre.
 */
export default function Avatar({ user }: { user?: { avatar?: string; name?: string; email?: string } }) {
  const src = user?.avatar
  const label = (user?.name || user?.email || 'AX').trim()
  const parts = label.split(/[\s@._-]+/).filter(Boolean)
  const initials =
    parts.length >= 2
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : label.slice(0, 2).toUpperCase()

  return (
    <span className="allx-avatar" title={label}>
      {src ? <img src={src} alt={label} /> : <span>{initials}</span>}
    </span>
  )
}
