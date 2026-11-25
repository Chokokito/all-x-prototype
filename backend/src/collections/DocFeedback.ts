import type { CollectionConfig } from 'payload'

const WINDOW_MS = 60 * 60 * 1000
const MAX_PER_WINDOW = 20
const hits = new Map<string, number[]>()

function clientIp(req: { headers?: Headers }): string {
  const fwd = req.headers?.get?.('x-forwarded-for')
  return (fwd ? fwd.split(',')[0] : req.headers?.get?.('x-real-ip') || 'unknown').trim()
}

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS)
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent)
    return true
  }
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (!v.some((t) => now - t < WINDOW_MS)) hits.delete(k)
  }
  return false
}

const adminOnly = ({ req }: { req: { user?: unknown } }) => Boolean(req.user)

export const DocFeedback: CollectionConfig = {
  slug: 'doc-feedback',
  labels: {
    singular: 'Feedback de Documentação',
    plural: '3. Feedback da Documentação',
  },
  admin: {
    useAsTitle: 'pageTitle',
    defaultColumns: ['pageTitle', 'pageSlug', 'helpful', 'lang', 'createdAt'],
    group: 'Documentação ALL X',
    description:
      'Avaliações enviadas pelos visitantes no widget de feedback de cada página da documentação.',
  },
  access: {
    create: () => true,
    read: adminOnly,
    update: adminOnly,
    delete: adminOnly,
  },
  timestamps: true,
  hooks: {
    beforeValidate: [
      ({ data, req, operation }) => {
        if (!data || operation !== 'create' || req.user) return data
        if (rateLimited(clientIp(req))) {
          throw new Error('Limite de avaliações atingido. Tente novamente mais tarde.')
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'pageSlug',
      type: 'text',
      label: 'Slug da Página',
      required: true,
      index: true,
      maxLength: 160,
    },
    {
      name: 'pageTitle',
      type: 'text',
      label: 'Título da Página',
      maxLength: 200,
    },
    {
      name: 'helpful',
      type: 'select',
      label: 'Foi útil?',
      required: true,
      options: [
        { label: 'Sim (Útil)', value: 'yes' },
        { label: 'Não (Precisa melhorar)', value: 'no' },
      ],
    },
    {
      name: 'lang',
      type: 'select',
      label: 'Idioma',
      defaultValue: 'pt',
      options: [
        { label: 'Português', value: 'pt' },
        { label: 'English', value: 'en' },
      ],
    },
    {
      name: 'comment',
      type: 'textarea',
      label: 'Comentário (opcional)',
      maxLength: 1000,
    },
  ],
}
