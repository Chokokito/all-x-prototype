import type { CollectionConfig } from 'payload'
import { docsBlocks } from '../blocks/docsBlocks'

function slugifyText(input: string): string {
  return String(input || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const Pages: CollectionConfig = {
  slug: 'docs-pages',
  labels: {
    singular: 'Página da Documentação',
    plural: '2. Páginas da Documentação',
  },
  admin: {
    useAsTitle: 'titlePt',
    defaultColumns: ['titlePt', 'category', 'method', 'order', 'slug'],
    group: 'Documentação ALL X',
    description:
      'Crie ou edite páginas da documentação técnica e comercial da ALL X usando blocos visuais prontos — sem precisar programar.',
    preview: (doc) => {
      const slug = doc?.slug || 'managed-wallets'
      return `http://localhost:3000/docs/${slug}`
    },
    livePreview: {
      url: ({ data }) => {
        const slug = data?.slug || 'managed-wallets'
        return `http://localhost:3000/docs/${slug}`
      },
    },
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

        // 1. Auto-generate URL slug if blank
        if (!data.slug && data.titlePt) {
          data.slug = slugifyText(data.titlePt)
        }

        // 2. Auto-fill sidebar labels & English fallbacks if blank
        if (!data.navLabelPt && data.titlePt) {
          data.navLabelPt = data.titlePt
        }
        if (!data.titleEn && data.titlePt) {
          data.titleEn = data.titlePt
        }
        if (!data.navLabelEn) {
          data.navLabelEn = data.navLabelPt || data.titleEn || data.titlePt
        }
        if (!data.subtitleEn && data.subtitlePt) {
          data.subtitleEn = data.subtitlePt
        }

        // 3. Auto-fill breadcrumbs if blank
        if (!data.breadcrumbsPt || !Array.isArray(data.breadcrumbsPt) || data.breadcrumbsPt.length === 0) {
          data.breadcrumbsPt = ['Documentação', data.navLabelPt || data.titlePt || 'Página']
        }
        if (!data.breadcrumbsEn || !Array.isArray(data.breadcrumbsEn) || data.breadcrumbsEn.length === 0) {
          data.breadcrumbsEn = ['Documentation', data.navLabelEn || data.titleEn || 'Page']
        }

        // 4. Auto-fill English fallbacks & TOC anchors inside visual blocks
        if (Array.isArray(data.blocks)) {
          data.blocks = data.blocks.map((block: Record<string, any>, idx: number) => {
            const b = { ...block }

            if (b.titlePt && !b.titleEn) b.titleEn = b.titlePt
            if (b.subPt && !b.subEn) b.subEn = b.subPt
            if (b.boldPt && !b.boldEn) b.boldEn = b.boldPt
            if (b.textPt && !b.textEn) b.textEn = b.textPt
            if (b.p1BeforePt && !b.p1BeforeEn) b.p1BeforeEn = b.p1BeforePt
            if (b.p1AfterPt && !b.p1AfterEn) b.p1AfterEn = b.p1AfterPt
            if (b.boxTitlePt && !b.boxTitleEn) b.boxTitleEn = b.boxTitlePt
            if (b.compTitlePt && !b.compTitleEn) b.compTitleEn = b.compTitlePt
            if (b.compBeforePt && !b.compBeforeEn) b.compBeforeEn = b.compBeforePt
            if (b.compAfterPt && !b.compAfterEn) b.compAfterEn = b.compAfterPt
            if (b.respSubPt && !b.respSubEn) b.respSubEn = b.respSubPt
            if (b.noteBeforePt && !b.noteBeforeEn) b.noteBeforeEn = b.noteBeforePt
            if (b.noteMidPt && !b.noteMidEn) b.noteMidEn = b.noteMidPt
            if (b.noteAfterPt && !b.noteAfterEn) b.noteAfterEn = b.noteAfterPt
            if (b.boxBeforePt && !b.boxBeforeEn) b.boxBeforeEn = b.boxBeforePt
            if (b.boxMidPt && !b.boxMidEn) b.boxMidEn = b.boxMidPt
            if (b.boxAndPt && !b.boxAndEn) b.boxAndEn = b.boxAndPt
            if (b.boxAfterPt && !b.boxAfterEn) b.boxAfterEn = b.boxAfterPt

            // Auto-generate anchorId & tocLabel for sections that appear in the right-hand TOC
            if (['prerequisites', 'apiEndpoint', 'featureGrid', 'metadataBox'].includes(b.blockType)) {
              if (!b.tocLabelPt && b.titlePt) {
                b.tocLabelPt = b.titlePt.replace(/^\d+\.\s*/, '')
              }
              if (!b.tocLabelEn) {
                b.tocLabelEn = b.tocLabelPt || b.titleEn || b.titlePt || `Section ${idx + 1}`
              }
              if (!b.anchorId) {
                const base = slugifyText(b.tocLabelPt || b.titlePt || `secao-${idx + 1}`)
                b.anchorId = `sec-${base || idx + 1}`
              }
            }

            if (Array.isArray(b.pillars)) {
              b.pillars = b.pillars.map((item: Record<string, any>) => ({
                ...item,
                boldEn: item.boldEn || item.boldPt,
                textEn: item.textEn || item.textPt,
              }))
            }

            if (Array.isArray(b.steps)) {
              b.steps = b.steps.map((step: Record<string, any>) => ({
                ...step,
                beforeEn: step.beforeEn || step.beforePt,
                highlightEn: step.highlightEn || step.highlightPt,
                afterEn: step.afterEn || step.afterPt,
              }))
            }

            if (Array.isArray(b.cards)) {
              b.cards = b.cards.map((card: Record<string, any>) => ({
                ...card,
                titleEn: card.titleEn || card.titlePt,
                textBeforeEn: card.textBeforeEn || card.textBeforePt,
                textAfterEn: card.textAfterEn || card.textAfterPt,
              }))
            }

            return b
          })
        }

        return data
      },
    ],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: '1. Informações Principais',
          description: 'Defina o título, resumo e em qual seção do menu lateral esta página vai aparecer.',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'titlePt',
                  type: 'text',
                  required: true,
                  label: 'Título Principal da Página',
                  admin: {
                    width: '60%',
                    placeholder: 'Ex: Carteiras Gerenciadas (Managed Wallets)',
                    description: 'Título grande que aparece no topo da página.',
                  },
                },
                {
                  name: 'category',
                  type: 'relationship',
                  relationTo: 'categories',
                  required: true,
                  label: 'Seção do Menu Lateral',
                  admin: {
                    width: '40%',
                    description: 'Escolha em qual grupo da barra esquerda a página ficará.',
                  },
                },
              ],
            },
            {
              name: 'subtitlePt',
              type: 'textarea',
              required: true,
              label: 'Resumo / Descrição Inicial da Página',
              admin: {
                placeholder:
                  'Ex: Crie e gerencie contas multi-moeda (BRL, USD, EUR e Stablecoins) com liquidez instantânea...',
                description: 'Texto de boas-vindas exibido logo abaixo do título principal.',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'navLabelPt',
                  type: 'text',
                  label: 'Nome Curto para o Menu Lateral (Opcional)',
                  admin: {
                    width: '40%',
                    placeholder: 'Ex: Managed Wallets (Se vazio, usa o título)',
                    description: 'Como esta página será chamada na lista à esquerda.',
                  },
                },
                {
                  name: 'method',
                  type: 'select',
                  required: true,
                  defaultValue: 'DOC',
                  label: 'Etiqueta Visual no Menu Lateral',
                  admin: {
                    width: '35%',
                    description: 'Pequeno selo exibido ao lado do nome da página no menu.',
                  },
                  options: [
                    { label: '📄 DOC (Guia / Conceito Geral)', value: 'DOC' },
                    { label: '🟢 POST (Criação / Envio de Dados)', value: 'POST' },
                    { label: '🔵 GET (Consulta de Dados)', value: 'GET' },
                    { label: '🟣 WSS (Webhooks / Tempo Real)', value: 'WSS' },
                    { label: '🟠 CORE (Infraestrutura Principal)', value: 'CORE' },
                    { label: '⚡ REST (Referência de API)', value: 'REST' },
                    { label: '📦 SDK (Bibliotecas & Código)', value: 'SDK' },
                    { label: '🏷️ v2.4 (Versão / Novidade)', value: 'v2.4' },
                  ],
                },
                {
                  name: 'order',
                  type: 'number',
                  required: true,
                  defaultValue: 1,
                  label: 'Ordem na Seção (1, 2, 3...)',
                  admin: {
                    width: '25%',
                    description: 'Posição dentro da seção escolhida.',
                  },
                },
              ],
            },
          ],
        },
        {
          label: '2. Conteúdo da Página (Blocos Visuais)',
          description:
            'Monte o corpo da página adicionando blocos visuais. Ao clicar em "+ Adicionar Bloco", você verá uma miniatura ilustrativa de cada formato.',
          fields: [
            {
              name: 'blocks',
              type: 'blocks',
              label: 'Seções Visuais da Página',
              labels: {
                singular: 'Bloco Visual',
                plural: 'Blocos Visuais',
              },
              admin: {
                initCollapsed: false,
                description:
                  'Clique no botão abaixo para escolher entre 6 modelos visuais prontos (Com miniatura de pré-visualização). Você pode reordenar arrastando.',
              },
              blocks: docsBlocks,
            },
          ],
        },
        {
          label: '3. Tradução em Inglês (Opcional)',
          description:
            'Preencha apenas se desejar um texto específico em inglês. Caso deixe em branco, o sistema usa automaticamente o conteúdo em português.',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'titleEn',
                  type: 'text',
                  label: 'Título Principal em Inglês',
                  admin: { width: '60%', placeholder: 'Se vazio, usa o título em português' },
                },
                {
                  name: 'navLabelEn',
                  type: 'text',
                  label: 'Nome Curto no Menu em Inglês',
                  admin: { width: '40%' },
                },
              ],
            },
            {
              name: 'subtitleEn',
              type: 'textarea',
              label: 'Resumo / Descrição em Inglês',
            },
          ],
        },
        {
          label: '4. Endereço URL & Avançado (Automático)',
          description:
            'Estes campos são preenchidos sozinhos pelo sistema. Altere apenas se quiser personalizar o endereço da página.',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'slug',
                  type: 'text',
                  unique: true,
                  index: true,
                  label: 'Endereço da Página (Slug URL)',
                  admin: {
                    width: '60%',
                    placeholder: 'Gerado automaticamente a partir do título (ex: managed-wallets)',
                    description: 'Define o link final: /docs/seu-endereco',
                  },
                },
                {
                  name: 'badge',
                  type: 'text',
                  label: 'Selo Extra de Versão (Opcional)',
                  admin: {
                    width: '40%',
                    placeholder: 'Ex: v2.4',
                  },
                },
              ],
            },
            {
              type: 'collapsible',
              label: 'Configurações Avançadas de Navegação (Rodapé Anterior/Próximo e Trilha)',
              admin: {
                initCollapsed: true,
                description: 'O Fumadocs já calcula automaticamente os botões Anterior e Próximo pela ordem do menu.',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'prevSlug', type: 'text', label: 'Link Página Anterior (Opcional)' },
                    { name: 'prevTitlePt', type: 'text', label: 'Título Anterior (PT)' },
                    { name: 'prevTitleEn', type: 'text', label: 'Título Anterior (EN)' },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'nextSlug', type: 'text', label: 'Link Próxima Página (Opcional)' },
                    { name: 'nextTitlePt', type: 'text', label: 'Próximo Título (PT)' },
                    { name: 'nextTitleEn', type: 'text', label: 'Próximo Título (EN)' },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'breadcrumbsPt', type: 'json', label: 'Trilha de Navegação (PT)' },
                    { name: 'breadcrumbsEn', type: 'json', label: 'Trilha de Navegação (EN)' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
