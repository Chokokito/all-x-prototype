import type { Block } from 'payload'
import { BLOCK_THUMBNAILS } from './blockThumbnails'

export const CalloutBlock: Block = {
  slug: 'callout',
  imageURL: BLOCK_THUMBNAILS.callout,
  imageAltText: 'Prévia visual do bloco de Aviso em Destaque (Banner com ícone e borda cobre)',
  labels: {
    singular: '1. Aviso em Destaque (Banner)',
    plural: 'Avisos em Destaque (Banners)',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: '🇧🇷 Conteúdo em Português',
          description: 'Caixa de destaque com ícone para avisos importantes ou resumos no topo da página.',
          fields: [
            {
              name: 'boldPt',
              type: 'text',
              required: true,
              label: 'Frase Inicial em Negrito',
              admin: {
                placeholder: 'Ex: Carteiras Multi-Moeda Programáveis:',
                description: 'Aparece destacada em negrito no início do aviso.',
              },
            },
            {
              name: 'textPt',
              type: 'textarea',
              required: true,
              label: 'Texto Complementar do Aviso',
              admin: {
                placeholder: 'Ex: A infraestrutura de Managed Wallets da ALL X permite criar contas segregadas...',
                description: 'Explicação clara que acompanha o título em negrito.',
              },
            },
          ],
        },
        {
          label: '🇺🇸 Tradução em Inglês (Opcional)',
          description: 'Se você deixar em branco, o sistema copiará automaticamente o texto em português.',
          fields: [
            {
              name: 'boldEn',
              type: 'text',
              label: 'Frase Inicial em Negrito (Inglês)',
              admin: { placeholder: 'Ex: Programmable Multi-Currency Wallets:' },
            },
            {
              name: 'textEn',
              type: 'textarea',
              label: 'Texto Complementar (Inglês)',
            },
          ],
        },
      ],
    },
  ],
}

export const IntroPillarsBlock: Block = {
  slug: 'introPillars',
  imageURL: BLOCK_THUMBNAILS.introPillars,
  imageAltText: 'Prévia visual do bloco de Introdução + Lista de Pilares com marcadores',
  labels: {
    singular: '2. Introdução + Lista de Pilares',
    plural: 'Introduções & Listas de Pilares',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: '🇧🇷 Conteúdo em Português',
          description: 'Parágrafo introdutório seguido de uma lista de pontos principais (pilares).',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'p1BeforePt',
                  type: 'text',
                  required: true,
                  label: 'Início do Parágrafo',
                  admin: {
                    width: '40%',
                    placeholder: 'Ex: Cada carteira (identificada por ',
                  },
                },
                {
                  name: 'p1Code',
                  type: 'text',
                  defaultValue: 'wl_...',
                  label: 'Termo / Código em Destaque (Opcional)',
                  admin: {
                    width: '25%',
                    placeholder: 'Ex: wl_...',
                    description: 'Destaque técnico no meio da frase.',
                  },
                },
                {
                  name: 'p1AfterPt',
                  type: 'textarea',
                  required: true,
                  label: 'Continuação do Parágrafo',
                  admin: {
                    width: '35%',
                    placeholder: 'Ex: ) opera como um livro-razão isolado...',
                  },
                },
              ],
            },
            {
              name: 'pillars',
              type: 'array',
              label: 'Lista de Pilares / Destaques',
              labels: {
                singular: 'Item da Lista',
                plural: 'Itens da Lista',
              },
              admin: {
                description: 'Adicione tópicos curtos com título em negrito e explicação.',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'boldPt',
                      type: 'text',
                      required: true,
                      label: 'Título do Item (Negrito)',
                      admin: { width: '35%', placeholder: 'Ex: Liquidez Unificada:' },
                    },
                    {
                      name: 'textPt',
                      type: 'text',
                      required: true,
                      label: 'Explicação do Item',
                      admin: { width: '65%', placeholder: 'Ex: Mantenha saldos em BRL, USD e USDT...' },
                    },
                  ],
                },
                {
                  type: 'collapsible',
                  label: 'Tradução em Inglês deste Item (Opcional)',
                  admin: { initCollapsed: true },
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        { name: 'boldEn', type: 'text', label: 'Título em Inglês' },
                        { name: 'textEn', type: 'text', label: 'Explicação em Inglês' },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: '🇺🇸 Tradução em Inglês (Opcional)',
          description: 'Se deixado em branco, usa automaticamente o texto em português.',
          fields: [
            { name: 'p1BeforeEn', type: 'text', label: 'Início do Parágrafo (Inglês)' },
            { name: 'p1AfterEn', type: 'textarea', label: 'Continuação do Parágrafo (Inglês)' },
          ],
        },
      ],
    },
  ],
}

export const PrerequisitesBlock: Block = {
  slug: 'prerequisites',
  imageURL: BLOCK_THUMBNAILS.prerequisites,
  imageAltText: 'Prévia visual do bloco de Passo a Passo + Regra de Compliance com tags coloridas',
  labels: {
    singular: '3. Passo a Passo + Regra de Compliance',
    plural: 'Seções de Passo a Passo',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: '🇧🇷 Conteúdo em Português',
          description: 'Lista numerada de passos (1, 2, 3...) + caixa visual de status de aprovação/compliance.',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'titlePt',
                  type: 'text',
                  required: true,
                  defaultValue: 'Pré-requisitos',
                  label: 'Título da Seção',
                  admin: { width: '50%', placeholder: 'Ex: Pré-requisitos' },
                },
                {
                  name: 'boxTitlePt',
                  type: 'text',
                  required: true,
                  defaultValue: 'Antes de começar, certifique-se de que:',
                  label: 'Frase Acima da Lista Numerada',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              name: 'steps',
              type: 'array',
              label: 'Lista de Passos Numerados',
              labels: { singular: 'Passo', plural: 'Passos' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'beforePt',
                      type: 'text',
                      required: true,
                      label: 'Texto Inicial do Passo',
                      admin: { width: '40%', placeholder: 'Ex: Você possui uma ' },
                    },
                    {
                      name: 'highlightPt',
                      type: 'text',
                      label: 'Palavra Destacada (Opcional)',
                      admin: { width: '25%', placeholder: 'Ex: Chave de API' },
                    },
                    {
                      name: 'highlightType',
                      type: 'select',
                      defaultValue: 'none',
                      label: 'Estilo do Destaque',
                      admin: { width: '35%' },
                      options: [
                        { label: 'Sem destaque extra', value: 'none' },
                        { label: 'Link sublinhado', value: 'link' },
                        { label: 'Tag de código', value: 'code' },
                      ],
                    },
                  ],
                },
                {
                  name: 'afterPt',
                  type: 'text',
                  label: 'Complemento Final da Frase (Opcional)',
                  admin: { placeholder: 'Ex: ativa no painel de produção ou sandbox.' },
                },
                {
                  type: 'collapsible',
                  label: 'Tradução em Inglês deste Passo (Opcional)',
                  admin: { initCollapsed: true },
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        { name: 'beforeEn', type: 'text', label: 'Texto Inicial (EN)' },
                        { name: 'highlightEn', type: 'text', label: 'Destaque (EN)' },
                        { name: 'afterEn', type: 'text', label: 'Complemento (EN)' },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'collapsible',
              label: 'Caixa de Regra de Compliance / Status (Etiquetas Verde e Âmbar)',
              admin: { initCollapsed: false },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'compTitlePt',
                      type: 'text',
                      required: true,
                      defaultValue: 'Validação de Identidade (KYB/KYC):',
                      label: 'Título da Caixa',
                    },
                    {
                      name: 'compBeforePt',
                      type: 'text',
                      required: true,
                      defaultValue: 'A carteira só é liberada quando o titular possui ',
                      label: 'Texto Antes das Etiquetas',
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'pillGreen',
                      type: 'text',
                      defaultValue: 'kyc_status: approved',
                      label: 'Etiqueta Verde (Aprovado)',
                    },
                    {
                      name: 'compOrPt',
                      type: 'text',
                      defaultValue: ' ou ',
                      label: 'Conector ("ou")',
                    },
                    {
                      name: 'pillAmber',
                      type: 'text',
                      defaultValue: 'compliance_request',
                      label: 'Etiqueta Âmbar (Em Análise)',
                    },
                  ],
                },
                {
                  name: 'compAfterPt',
                  type: 'textarea',
                  required: true,
                  defaultValue: ' validado pelo motor de risco da ALL X.',
                  label: 'Texto Final da Caixa',
                },
              ],
            },
          ],
        },
        {
          label: '🇺🇸 Tradução em Inglês (Opcional)',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'titleEn', type: 'text', defaultValue: 'Prerequisites', label: 'Título (EN)' },
                { name: 'boxTitleEn', type: 'text', label: 'Frase Acima da Lista (EN)' },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'compTitleEn', type: 'text', label: 'Título Compliance (EN)' },
                { name: 'compBeforeEn', type: 'text', label: 'Texto Antes das Etiquetas (EN)' },
                { name: 'compOrEn', type: 'text', defaultValue: ' or ', label: 'Conector (EN)' },
              ],
            },
            { name: 'compAfterEn', type: 'textarea', label: 'Texto Final Compliance (EN)' },
          ],
        },
        {
          label: '⚙️ Índice Lateral (Automático)',
          description: 'Configuração automática para o menu direito "Nesta página". Não precisa alterar.',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'anchorId', type: 'text', defaultValue: 'sec-prereq', label: 'ID da Âncora (Automático)' },
                { name: 'tocLabelPt', type: 'text', defaultValue: 'Pré-requisitos', label: 'Nome no Índice (PT)' },
                { name: 'tocLabelEn', type: 'text', defaultValue: 'Prerequisites', label: 'Nome no Índice (EN)' },
              ],
            },
          ],
        },
      ],
    },
  ],
}

export const ApiEndpointBlock: Block = {
  slug: 'apiEndpoint',
  imageURL: BLOCK_THUMBNAILS.apiEndpoint,
  imageAltText: 'Prévia visual do bloco de Exemplo de API & Código com abas cURL, Node.js, Python e Go',
  labels: {
    singular: '4. Exemplo de API & Código Interativo',
    plural: 'Exemplos de API & Código',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: '🇧🇷 Explicação & Layout',
          description: 'Adiciona uma seção com título, explicação e painel interativo de código + resposta.',
          fields: [
            {
              name: 'titlePt',
              type: 'text',
              required: true,
              label: 'Título da Seção',
              admin: { placeholder: 'Ex: 1. Criar uma Carteira (Create Wallet)' },
            },
            {
              name: 'subPt',
              type: 'textarea',
              required: true,
              label: 'Explicação Simples do que esta chamada faz',
              admin: {
                placeholder: 'Ex: Envie uma requisição POST para provisionar uma nova carteira segregada...',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'mode',
                  type: 'select',
                  required: true,
                  defaultValue: 'create',
                  label: 'Estilo Visual do Painel de Código',
                  admin: { width: '50%' },
                  options: [
                    { label: 'Painel com Abas de Linguagens (cURL, Node, Python, Go)', value: 'create' },
                    { label: 'Painel Compacto de Consulta de Saldo / Status', value: 'balance' },
                  ],
                },
                {
                  name: 'respLabel',
                  type: 'text',
                  defaultValue: 'Response 201 Created',
                  label: 'Selo de Sucesso da Resposta',
                  admin: { width: '50%', placeholder: 'Ex: Response 200 OK' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'reqLabel',
                  type: 'text',
                  label: 'Rótulo da Requisição (Opcional)',
                  admin: { width: '50%', placeholder: 'Ex: cURL GET /v1/wallets/:id/balances' },
                },
                {
                  name: 'respSubPt',
                  type: 'text',
                  label: 'Resumo Curto ao Lado da Resposta (Opcional)',
                  admin: { width: '50%', placeholder: 'Ex: Saldos disponíveis e bloqueados por moeda' },
                },
              ],
            },
            {
              name: 'hasNote',
              type: 'checkbox',
              defaultValue: false,
              label: 'Mostrar dica de ajuda logo abaixo do código (Ex: lembrete de chave de API)',
            },
            {
              type: 'collapsible',
              label: 'Configurar Texto da Dica de Ajuda',
              admin: {
                initCollapsed: true,
                condition: (_, siblingData) => Boolean(siblingData?.hasNote),
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'noteBeforePt', type: 'text', defaultValue: 'Substitua ', label: 'Texto Inicial' },
                    { name: 'noteCode1', type: 'text', defaultValue: 'YOUR_API_KEY', label: '1º Código' },
                    { name: 'noteMidPt', type: 'text', defaultValue: ' pela sua chave real e ', label: 'Texto do Meio' },
                    { name: 'noteCode2', type: 'text', defaultValue: 'in_000000000000', label: '2º Código' },
                  ],
                },
                { name: 'noteAfterPt', type: 'text', defaultValue: ' pelo ID do cliente.', label: 'Texto Final' },
              ],
            },
          ],
        },
        {
          label: '💻 Códigos de Exemplo (Opcional)',
          description: 'Se você deixar em branco, o painel exibirá automaticamente um exemplo padrão da ALL X.',
          fields: [
            {
              name: 'snippets',
              type: 'group',
              label: 'Exemplos de Código (Preencha apenas se quiser customizar)',
              fields: [
                { name: 'curl', type: 'code', admin: { language: 'shell' }, label: 'Exemplo cURL' },
                { name: 'nodejs', type: 'code', admin: { language: 'typescript' }, label: 'Exemplo Node.js' },
                { name: 'python', type: 'code', admin: { language: 'python' }, label: 'Exemplo Python' },
                { name: 'go', type: 'code', admin: { language: 'go' }, label: 'Exemplo Go' },
                { name: 'responseJson', type: 'code', admin: { language: 'json' }, label: 'JSON de Resposta da API' },
              ],
            },
          ],
        },
        {
          label: '🇺🇸 Tradução em Inglês (Opcional)',
          fields: [
            { name: 'titleEn', type: 'text', label: 'Título da Seção (EN)' },
            { name: 'subEn', type: 'textarea', label: 'Explicação (EN)' },
            { name: 'respSubEn', type: 'text', label: 'Resumo da Resposta (EN)' },
            {
              type: 'row',
              fields: [
                { name: 'noteBeforeEn', type: 'text', label: 'Nota Inicial (EN)' },
                { name: 'noteMidEn', type: 'text', label: 'Nota Meio (EN)' },
                { name: 'noteAfterEn', type: 'text', label: 'Nota Final (EN)' },
              ],
            },
          ],
        },
        {
          label: '⚙️ Índice Lateral (Automático)',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'anchorId', type: 'text', label: 'ID da Âncora (Gerado Automaticamente se vazio)' },
                { name: 'tocLabelPt', type: 'text', label: 'Nome no Índice Direito (PT)' },
                { name: 'tocLabelEn', type: 'text', label: 'Nome no Índice Direito (EN)' },
              ],
            },
          ],
        },
      ],
    },
  ],
}

export const FeatureGridBlock: Block = {
  slug: 'featureGrid',
  imageURL: BLOCK_THUMBNAILS.featureGrid,
  imageAltText: 'Prévia visual do bloco de Cartões Lado a Lado (2 Colunas Pay-in Verde e Pay-out Cobre)',
  labels: {
    singular: '5. Cartões Lado a Lado (2 Colunas)',
    plural: 'Grades de Cartões Lado a Lado',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: '🇧🇷 Conteúdo em Português',
          description: 'Ideal para comparar duas operações lado a lado (ex: Entrada Pay-in vs Saída Pay-out).',
          fields: [
            {
              name: 'titlePt',
              type: 'text',
              required: true,
              label: 'Título da Seção',
              admin: { placeholder: 'Ex: Fluxos de Liquidação (Pay-in & Pay-out)' },
            },
            {
              name: 'subPt',
              type: 'textarea',
              required: true,
              label: 'Subtítulo Explicativo',
              admin: { placeholder: 'Ex: Como os fundos entram e saem das carteiras gerenciadas.' },
            },
            {
              name: 'cards',
              type: 'array',
              label: 'Cartões Comparativos',
              labels: { singular: 'Cartão', plural: 'Cartões' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'variant',
                      type: 'select',
                      defaultValue: 'green',
                      label: 'Cor & Ícone do Cartão',
                      admin: { width: '35%' },
                      options: [
                        { label: '🟢 Verde (Entrada / Recebimento)', value: 'green' },
                        { label: '🟠 Cobre (Saída / Liquidação)', value: 'copper' },
                      ],
                    },
                    {
                      name: 'titlePt',
                      type: 'text',
                      required: true,
                      label: 'Título do Cartão',
                      admin: { width: '65%', placeholder: 'Ex: Recebimento Instantâneo (Pay-in)' },
                    },
                  ],
                },
                {
                  name: 'textBeforePt',
                  type: 'textarea',
                  required: true,
                  label: 'Descrição do Cartão',
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'codeHighlight',
                      type: 'text',
                      label: 'Termo em Destaque no Texto (Opcional)',
                      admin: { width: '40%', placeholder: 'Ex: wallet_id' },
                    },
                    {
                      name: 'eventBadge',
                      type: 'text',
                      required: true,
                      defaultValue: 'Event: payment.received',
                      label: 'Etiqueta no Rodapé do Cartão',
                      admin: { width: '60%', placeholder: 'Ex: Event: payment.received' },
                    },
                  ],
                },
                {
                  name: 'textAfterPt',
                  type: 'textarea',
                  label: 'Complemento Final do Texto (Opcional)',
                },
                {
                  type: 'collapsible',
                  label: 'Tradução em Inglês deste Cartão (Opcional)',
                  admin: { initCollapsed: true },
                  fields: [
                    { name: 'titleEn', type: 'text', label: 'Título do Cartão (EN)' },
                    { name: 'textBeforeEn', type: 'textarea', label: 'Descrição (EN)' },
                    { name: 'textAfterEn', type: 'textarea', label: 'Complemento (EN)' },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: '🇺🇸 Tradução em Inglês (Opcional)',
          fields: [
            { name: 'titleEn', type: 'text', label: 'Título da Seção (EN)' },
            { name: 'subEn', type: 'textarea', label: 'Subtítulo (EN)' },
          ],
        },
        {
          label: '⚙️ Índice Lateral (Automático)',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'anchorId', type: 'text', defaultValue: 'sec-settlement', label: 'ID da Âncora' },
                { name: 'tocLabelPt', type: 'text', label: 'Nome no Índice (PT)' },
                { name: 'tocLabelEn', type: 'text', label: 'Nome no Índice (EN)' },
              ],
            },
          ],
        },
      ],
    },
  ],
}

export const MetadataBoxBlock: Block = {
  slug: 'metadataBox',
  imageURL: BLOCK_THUMBNAILS.metadataBox,
  imageAltText: 'Prévia visual do bloco de Caixa de Metadados & Webhooks com chaves em destaque',
  labels: {
    singular: '6. Caixa de Metadados & Conciliação',
    plural: 'Caixas de Metadados',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: '🇧🇷 Conteúdo em Português',
          description: 'Destaca campos personalizados (como ID do cliente ou conta contábil) para conciliação.',
          fields: [
            {
              name: 'titlePt',
              type: 'text',
              required: true,
              label: 'Título da Seção',
              admin: { placeholder: 'Ex: Metadados Customizados & Conciliação ERP' },
            },
            {
              name: 'subPt',
              type: 'textarea',
              required: true,
              label: 'Subtítulo Explicativo',
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'boxBeforePt',
                  type: 'text',
                  required: true,
                  defaultValue: 'Você pode anexar chaves como ',
                  label: 'Início da Frase na Caixa',
                },
                {
                  name: 'code1',
                  type: 'text',
                  defaultValue: 'customer_internal_id',
                  label: '1ª Chave Destacada',
                },
                {
                  name: 'boxMidPt',
                  type: 'text',
                  defaultValue: ', ',
                  label: 'Separador',
                },
                {
                  name: 'code2',
                  type: 'text',
                  defaultValue: 'ledger_account',
                  label: '2ª Chave Destacada',
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'boxAndPt',
                  type: 'text',
                  defaultValue: ' — ',
                  label: 'Conector antes do Texto Final',
                  admin: { width: '25%' },
                },
                {
                  name: 'boxAfterPt',
                  type: 'textarea',
                  required: true,
                  label: 'Explicação Final na Caixa',
                  admin: { width: '75%' },
                },
              ],
            },
          ],
        },
        {
          label: '🇺🇸 Tradução em Inglês (Opcional)',
          fields: [
            { name: 'titleEn', type: 'text', label: 'Título (EN)' },
            { name: 'subEn', type: 'textarea', label: 'Subtítulo (EN)' },
            {
              type: 'row',
              fields: [
                { name: 'boxBeforeEn', type: 'text', label: 'Início da Frase (EN)' },
                { name: 'boxMidEn', type: 'text', defaultValue: ', ', label: 'Separador (EN)' },
                { name: 'boxAndEn', type: 'text', defaultValue: ' and ', label: 'Conector (EN)' },
              ],
            },
            { name: 'boxAfterEn', type: 'textarea', label: 'Explicação Final (EN)' },
          ],
        },
        {
          label: '⚙️ Índice Lateral (Automático)',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'anchorId', type: 'text', defaultValue: 'sec-cms', label: 'ID da Âncora' },
                { name: 'tocLabelPt', type: 'text', label: 'Nome no Índice (PT)' },
                { name: 'tocLabelEn', type: 'text', label: 'Nome no Índice (EN)' },
              ],
            },
          ],
        },
      ],
    },
  ],
}

export const docsBlocks: Block[] = [
  CalloutBlock,
  IntroPillarsBlock,
  PrerequisitesBlock,
  ApiEndpointBlock,
  FeatureGridBlock,
  MetadataBoxBlock,
]
