import React from 'react'
import type { ServerProps } from 'payload'

/**
 * Mensagem de status exibida acima da lista de Solicitações de Contato.
 * Garante feedback claro mesmo quando não há nenhuma solicitação nova.
 */
export default async function ContactRequestsHint({ payload, user }: ServerProps) {
  let total = 0
  let fresh = 0
  try {
    const opts = { collection: 'contact-requests' as const, overrideAccess: false, user }
    const [all, news] = await Promise.all([
      payload.count({ ...opts }),
      payload.count({ ...opts, where: { status: { equals: 'new' } } }),
    ])
    total = all.totalDocs
    fresh = news.totalDocs
  } catch {
    return null
  }

  let tone: 'empty' | 'clear' | 'new' = 'new'
  let title = ''
  let text = ''

  if (total === 0) {
    tone = 'empty'
    title = 'Nenhuma solicitação por enquanto'
    text =
      'Quando alguém preencher o formulário da página Contato do site, o pedido aparece aqui automaticamente.'
  } else if (fresh === 0) {
    tone = 'clear'
    title = 'Tudo em dia'
    text = `Nenhuma solicitação nova. Você já tratou todos os ${total} pedido${total > 1 ? 's' : ''} recebido${total > 1 ? 's' : ''}.`
  } else {
    tone = 'new'
    title = `${fresh} solicitação${fresh > 1 ? 'ões' : ''} nova${fresh > 1 ? 's' : ''} aguardando resposta`
    text = 'Abra cada pedido, responda ao cliente e atualize o status para acompanhar o atendimento.'
  }

  return (
    <div className={`allx-hint allx-hint--${tone}`} role="status">
      <span className="allx-hint__dot" aria-hidden="true" />
      <div>
        <strong>{title}</strong>
        <p>{text}</p>
      </div>
    </div>
  )
}
