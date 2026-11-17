// Modelos iniciais de página: pré-montam os blocos para quem não é técnico.
// Os textos são exemplos para serem substituídos pelo editor.
export const PAGE_TEMPLATES: Record<string, Array<Record<string, any>>> = {
  guide: [
    {
      blockType: 'callout',
      boldPt: 'Resumo rápido:',
      textPt: 'Explique em uma frase o que o leitor vai aprender nesta página.',
    },
    {
      blockType: 'prerequisites',
      titlePt: 'Pré-requisitos',
      boxTitlePt: 'Antes de começar, certifique-se de que:',
      steps: [{ beforePt: 'Descreva o primeiro requisito.', highlightType: 'none' }],
      compTitlePt: 'Validação de Identidade (KYB/KYC):',
      compBeforePt: 'Explique a condição de compliance.',
      compAfterPt: 'Complemente a explicação.',
    },
    {
      blockType: 'featureGrid',
      titlePt: 'Como funciona',
      subPt: 'Resuma as etapas ou os recursos principais.',
      cards: [
        { titlePt: 'Etapa 1', textBeforePt: 'Descreva a primeira etapa.', variant: 'green', eventBadge: 'NOVO' },
        { titlePt: 'Etapa 2', textBeforePt: 'Descreva a segunda etapa.', variant: 'copper', eventBadge: 'NOVO' },
      ],
    },
  ],
  endpoint: [
    {
      blockType: 'callout',
      boldPt: 'Atenção:',
      textPt: 'Destaque aqui uma regra importante deste endpoint.',
    },
    {
      blockType: 'prerequisites',
      titlePt: 'Pré-requisitos',
      boxTitlePt: 'Antes de chamar este endpoint:',
      steps: [{ beforePt: 'Tenha uma chave de API válida.', highlightType: 'none' }],
      compTitlePt: 'Validação de Identidade (KYB/KYC):',
      compBeforePt: 'Explique a condição de compliance.',
      compAfterPt: 'Complemente a explicação.',
    },
    {
      blockType: 'apiEndpoint',
      titlePt: 'Chamada da API',
      subPt: 'Descreva o que este endpoint faz.',
      mode: 'create',
    },
  ],
  overview: [
    {
      blockType: 'introPillars',
      p1BeforePt: 'Apresente o produto: ',
      p1AfterPt: 'continue o texto de apresentação.',
      pillars: [
        { boldPt: 'Pilar 1', textPt: 'Explique o primeiro diferencial.' },
        { boldPt: 'Pilar 2', textPt: 'Explique o segundo diferencial.' },
      ],
    },
    {
      blockType: 'featureGrid',
      titlePt: 'Principais recursos',
      subPt: 'Liste o que o produto oferece.',
      cards: [
        { titlePt: 'Recurso 1', textBeforePt: 'Descreva o recurso.', variant: 'green', eventBadge: 'NOVO' },
      ],
    },
  ],
}
