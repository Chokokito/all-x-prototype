import type { CollectionConfig } from 'payload'

// Limite simples de envios por IP (em memória; suficiente para uma instância única).
const WINDOW_MS = 60 * 60 * 1000
const MAX_PER_WINDOW = 5
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

const isAdmin = ({ req }: { req: { user?: { role?: string } | null } }) =>
  req.user?.role === 'admin'

export const ContactRequests: CollectionConfig = {
  slug: 'contact-requests',
  labels: {
    singular: 'Solicitação de Contato',
    plural: 'Solicitações de Contato',
  },
  admin: {
    hideAPIURL: true,
    useAsTitle: 'company',
    defaultColumns: ['name', 'company', 'email', 'interest', 'status', 'createdAt'],
    group: 'Comercial',
    hidden: ({ user }) => (user as { role?: string } | null)?.role !== 'admin',
    components: {
      beforeList: ['/components/admin/ContactRequestsHint#default'],
    },
    description:
      'Solicitações enviadas pelo formulário de contato do site. Apenas administradores conseguem ver e tratar estes registros.',
  },
  access: {
    // O público só pode ENVIAR; ler, editar e apagar é exclusivo de administradores.
    create: () => true,
    read: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  timestamps: true,
  hooks: {
    beforeValidate: [
      ({ data, req, operation }) => {
        if (!data || operation !== 'create' || req.user) return data

        // Honeypot: bots preenchem o campo escondido; humanos não.
        if (data.website) {
          throw new Error('Solicitação inválida.')
        }
        delete data.website

        if (rateLimited(clientIp(req))) {
          throw new Error('Muitas solicitações. Tente novamente mais tarde.')
        }

        // Visitantes não definem estado interno.
        data.status = 'new'
        delete data.internalNotes
        return data
      },
    ],
  },
  fields: [
    { name: 'name', type: 'text', label: 'Nome', required: true, maxLength: 120, admin: { readOnly: true } },
    {
      name: 'email',
      type: 'email',
      label: 'E-mail corporativo',
      required: true,
      admin: { readOnly: true },
    },
    { name: 'company', type: 'text', label: 'Empresa / CNPJ', maxLength: 160, admin: { readOnly: true } },
    { name: 'role', type: 'text', label: 'Cargo / área', maxLength: 120, admin: { readOnly: true } },
    { name: 'interest', type: 'text', label: 'Interesse principal', maxLength: 160, admin: { readOnly: true } },
    { name: 'volume', type: 'text', label: 'Volume mensal estimado', maxLength: 120, admin: { readOnly: true } },
    { name: 'corridors', type: 'text', label: 'Moedas e corredores', maxLength: 240, admin: { readOnly: true } },
    { name: 'message', type: 'textarea', label: 'Mensagem', required: true, maxLength: 4000, admin: { readOnly: true } },
    {
      name: 'lang',
      type: 'select',
      label: 'Idioma do site',
      defaultValue: 'pt',
      admin: { readOnly: true },
      options: [
        { label: 'Português', value: 'pt' },
        { label: 'English', value: 'en' },
      ],
    },
    // Campo isca anti-bot (não é salvo: removido no hook).
    {
      name: 'website',
      type: 'text',
      virtual: true,
      admin: { hidden: true },
    },
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      defaultValue: 'new',
      options: [
        { label: 'Nova', value: 'new' },
        { label: 'Em andamento', value: 'in-progress' },
        { label: 'Respondida', value: 'done' },
        { label: 'Descartada', value: 'archived' },
      ],
      access: { create: isAdmin, update: isAdmin },
      admin: { position: 'sidebar' },
    },
    {
      name: 'internalNotes',
      type: 'textarea',
      label: 'Observações internas',
      access: { create: isAdmin, read: isAdmin, update: isAdmin },
      admin: { position: 'sidebar' },
    },
  ],
}
