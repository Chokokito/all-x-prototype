import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  access: {
    // Admin ve e gerencia todos; editor so le e edita a propria conta (/admin/account).
    read: ({ req }) =>
      req.user ? (req.user.role === 'admin' ? true : { id: { equals: req.user.id } }) : false,
    create: ({ req }) => (req.user ? req.user.role === 'admin' : false),
    update: ({ req, id }) =>
      req.user ? (req.user.role === 'admin' ? true : req.user.id === id) : false,
    delete: ({ req }) => req.user?.role === 'admin',
  },
  labels: {
    singular: 'Membro da Equipe',
    plural: 'Equipe & Acessos',
  },
  admin: {
    hideAPIURL: true,
    hidden: ({ user }) => (user as { role?: string } | null)?.role !== 'admin',
    useAsTitle: 'email',
    group: 'Administração',
    description: 'Gerencie quem pode acessar e editar o conteúdo da documentação da ALL X.',
  },
  fields: [
    {
      name: 'avatar',
      type: 'text',
      label: 'Foto de Perfil',
      admin: {
        components: {
          Field: '/components/admin/AvatarField#default',
        },
      },
    },
    {
      name: 'name',
      type: 'text',
      label: 'Nome Completo',
    },
    {
      name: 'role',
      type: 'select',
      defaultValue: 'admin',
      label: 'Perfil de Acesso',
      access: {
        // Ninguem (alem de admin) altera perfis, evitando escalada de privilegio.
        update: ({ req }) => req.user?.role === 'admin',
      },
      options: [
        { label: 'Administrador Geral', value: 'admin' },
        { label: 'Editor de Conteúdo', value: 'editor' },
      ],
    },
  ],
}
