import React from 'react'
import { Gutter } from '@payloadcms/ui'

const ADMIN = '/admin'

const steps = [
  {
    n: '1',
    title: 'Escolha ou crie uma seção',
    text: 'As seções organizam o menu lateral da documentação (ex.: Primeiros Passos, Segurança).',
    href: ADMIN + '/collections/categories',
    cta: 'Ver seções',
  },
  {
    n: '2',
    title: 'Crie uma página',
    text: 'Comece por um modelo pronto (Guia, Endpoint de API ou Visão geral) e só troque os textos.',
    href: ADMIN + '/collections/docs-pages/create',
    cta: 'Criar página',
    primary: true,
  },
  {
    n: '3',
    title: 'Revise e publique',
    text: 'Salve como rascunho para revisar com calma. Só o que estiver publicado aparece no site.',
    href: ADMIN + '/collections/docs-pages',
    cta: 'Ver páginas',
  },
  {
    n: '4',
    title: 'Confira no site',
    text: 'Abra a documentação como o cliente vê e use Ctrl+K para testar a busca.',
    href: (process.env.FRONTEND_URL || 'http://localhost:3000') + '/docs',
    cta: 'Abrir documentação',
    external: true,
  },
]

const tips = [
  'O endereço (URL) da página é gerado sozinho a partir do título.',
  'O inglês é opcional: se ficar em branco, o site usa o texto em português.',
  'Arraste os blocos para reordenar o conteúdo da página.',
  'O botão de pré-visualização aparece depois do primeiro salvamento.',
]

async function getStats(payload: any) {
  try {
    const [pages, drafts, cats, newContacts, feedbacks] = await Promise.all([
      payload.count({ collection: 'docs-pages', overrideAccess: true }),
      payload.count({
        collection: 'docs-pages',
        draft: true,
        where: { _status: { equals: 'draft' } },
        overrideAccess: true,
      }),
      payload.count({ collection: 'categories', overrideAccess: true }),
      payload.count({
        collection: 'contact-requests',
        where: { status: { equals: 'new' } },
        overrideAccess: true,
      }),
      payload.count({ collection: 'doc-feedback', overrideAccess: true }),
    ])
    return {
      pages: pages.totalDocs,
      drafts: drafts.totalDocs,
      cats: cats.totalDocs,
      newContacts: newContacts.totalDocs,
      feedbacks: feedbacks.totalDocs,
    }
  } catch {
    return null
  }
}

export default async function Welcome(props: any) {
  const user = props?.user || props?.initPageResult?.req?.user
  const payload = props?.payload || props?.initPageResult?.req?.payload
  const isAdmin = user?.role === 'admin'
  const name = (user?.name || user?.email || '').split('@')[0].split(' ')[0]
  const stats = payload ? await getStats(payload) : null

  return (
    <Gutter>
      <div className="allx-onb">
        <header className="allx-onb__hero">
          <p className="allx-onb__eyebrow">Painel de Conteúdo ALL X</p>
          <h1>{name ? `Olá, ${name}` : 'Bem-vindo'}</h1>
          <p className="allx-onb__lead">
            Aqui você cria e atualiza a documentação da ALL X, acompanha solicitações comerciais e lê avaliações das
            páginas — sem precisar programar.
          </p>
          <div className="allx-onb__actions">
            <a className="allx-onb__btn allx-onb__btn--primary" href={ADMIN + '/collections/docs-pages/create'}>
              + Nova página
            </a>
            <a className="allx-onb__btn" href={ADMIN + '/collections/docs-pages'}>
              Ver todas as páginas
            </a>
            {isAdmin && (
              <a className="allx-onb__btn" href={ADMIN + '/collections/contact-requests'}>
                Solicitações de contato
                {stats && stats.newContacts > 0 ? ` (${stats.newContacts})` : ''}
              </a>
            )}
          </div>
        </header>

        {stats && (
          <div className="allx-onb__stats">
            <a className="allx-onb__stat" href={ADMIN + '/collections/docs-pages'}>
              <strong>{stats.pages}</strong>
              <span>páginas</span>
            </a>
            <a className="allx-onb__stat" href={ADMIN + '/collections/docs-pages'}>
              <strong>{stats.drafts}</strong>
              <span>rascunhos</span>
            </a>
            <a className="allx-onb__stat" href={ADMIN + '/collections/categories'}>
              <strong>{stats.cats}</strong>
              <span>seções do menu</span>
            </a>
            {isAdmin && (
              <a
                className={'allx-onb__stat' + (stats.newContacts > 0 ? ' is-alert' : '')}
                href={ADMIN + '/collections/contact-requests'}
              >
                <strong>{stats.newContacts}</strong>
                <span>{stats.newContacts === 1 ? 'solicitação nova' : 'solicitações novas'}</span>
              </a>
            )}
            <a className="allx-onb__stat" href={ADMIN + '/collections/doc-feedback'}>
              <strong>{stats.feedbacks}</strong>
              <span>avaliações das docs</span>
            </a>
          </div>
        )}

        <h2 className="allx-onb__title">Como publicar uma página</h2>
        <ol className="allx-onb__steps">
          {steps.map((s) => (
            <li key={s.n} className={'allx-onb__step' + (s.primary ? ' is-primary' : '')}>
              <span className="allx-onb__num">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <a href={s.href} {...(s.external ? { target: '_blank', rel: 'noreferrer' } : {})}>
                {s.cta} →
              </a>
            </li>
          ))}
        </ol>

        <div className="allx-onb__grid">
          <section className="allx-onb__panel">
            <h2 className="allx-onb__title">Dicas rápidas</h2>
            <ul>
              {tips.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </section>
          <section className="allx-onb__panel">
            <h2 className="allx-onb__title">Atalhos</h2>
            <div className="allx-onb__links">
              <a href={ADMIN + '/collections/docs-pages'}>Páginas da documentação</a>
              <a href={ADMIN + '/collections/categories'}>Seções do menu</a>
              {isAdmin && (
                <a href={ADMIN + '/collections/contact-requests'}>
                  Solicitações de contato
                  {stats && stats.newContacts > 0 ? (
                    <span className="allx-onb__pill">{stats.newContacts}</span>
                  ) : null}
                </a>
              )}
              <a href={ADMIN + '/collections/doc-feedback'}>Feedback da documentação</a>
              <a href={ADMIN + '/collections/users'}>Equipe &amp; acessos</a>
            </div>
          </section>
        </div>
      </div>
    </Gutter>
  )
}
