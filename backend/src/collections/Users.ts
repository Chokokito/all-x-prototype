import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  labels: {
    singular: 'Membro da Equipe',
    plural: 'Equipe & Acessos',
  },
  admin: {
    useAsTitle: 'email',
    group: 'Administração',
    description: 'Gerencie quem pode acessar e editar o conteúdo da documentação da ALL X.',
  },
  fields: [
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
      options: [
        { label: 'Administrador Geral', value: 'admin' },
        { label: 'Editor de Conteúdo', value: 'editor' },
      ],
    },
  ],
}
