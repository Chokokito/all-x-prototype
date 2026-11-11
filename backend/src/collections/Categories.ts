import type { CollectionConfig } from 'payload'

function slugifyText(input: string): string {
  return String(input || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
    singular: 'Seção do Menu Lateral',
    plural: '1. Seções do Menu Lateral',
  },
  admin: {
    useAsTitle: 'titlePt',
    defaultColumns: ['titlePt', 'moduleId', 'order', 'accent'],
    group: 'Documentação ALL X',
    description:
      'Organize as divisões principais que aparecem na barra lateral esquerda da documentação (ex: Primeiros Passos, Core Infrastructure, Segurança).',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (!data) return data
        if (!data.slug && data.titlePt) {
          data.slug = slugifyText(data.titlePt)
        }
        if (!data.titleEn && data.titlePt) {
          data.titleEn = data.titlePt
        }
        return data
      },
    ],
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'titlePt',
          type: 'text',
          required: true,
          label: 'Nome da Seção (Português)',
          admin: {
            width: '50%',
            placeholder: 'Ex: Primeiros Passos',
            description: 'Nome visível no menu lateral da documentação.',
          },
        },
        {
          name: 'titleEn',
          type: 'text',
          label: 'Nome da Seção em Inglês (Opcional)',
          admin: {
            width: '50%',
            placeholder: 'Ex: Getting Started (Se vazio, usa o nome em português)',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'moduleId',
          type: 'select',
          required: true,
          defaultValue: 'treasury',
          label: 'Produto / Módulo Principal',
          admin: {
            width: '45%',
            description: 'Define em qual aba superior esta seção aparece.',
          },
          options: [
            { label: 'Corporate Treasury (API & Tesouraria)', value: 'treasury' },
            { label: 'Stablecoin Gateway (Conversão & Liquidez)', value: 'gateway' },
            { label: 'Compliance & KYB (Risco & Validação)', value: 'compliance' },
          ],
        },
        {
          name: 'order',
          type: 'number',
          required: true,
          defaultValue: 1,
          label: 'Posição no Menu (1 = Primeiro)',
          admin: {
            width: '25%',
            description: 'Ordem de exibição de cima para baixo.',
          },
        },
        {
          name: 'slug',
          type: 'text',
          unique: true,
          index: true,
          label: 'Identificador Automático (Slug)',
          admin: {
            width: '30%',
            placeholder: 'Gerado automaticamente',
            description: 'Deixe em branco para gerar automaticamente a partir do nome.',
          },
        },
      ],
    },
    {
      name: 'accent',
      type: 'checkbox',
      defaultValue: false,
      label: 'Destacar esta seção com a cor Cobre no menu lateral',
    },
  ],
}
