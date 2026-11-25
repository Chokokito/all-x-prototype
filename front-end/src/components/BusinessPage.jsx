'use client'


import { navigateTo, useI18n } from '../i18n'
import BusinessView from './pages/business/BusinessView'
import './pages/business.css'

const COPY = {
  pt: {
    badge: 'Soluções para empresas · Treasury & Payables',
    l1: 'Reduza a fragmentação',
    l2: 'do seu financeiro global.',
    sub: 'Organize fluxos de tesouraria e pagamentos internacionais em uma única visão. Contas, rotas e serviços dependem de elegibilidade e disponibilidade dos parceiros.',
    cta1: 'Agendar demonstração executiva',
    cta2: 'Ver casos de uso',
    panel: 'ALL X · Operação financeira',
    panelStatus: 'Demonstração · dados fictícios',
    tabs: ['Treasury', 'Payables'],
    boardLabel: 'FLUXO OPERACIONAL',
    boardItems: [
      ['01', 'Decidir', 'Saldos, quotes e exposição em contexto'],
      ['02', 'Validar', 'Escopo, elegibilidade e rota disponível'],
      ['03', 'Acompanhar', 'Status e informações da operação'],
    ],
    treasury: {
      title: 'Uma visão consolidada para decidir e acompanhar.',
      description: 'Consulte saldos, cotações e informações da operação. Disponibilidade e condições dependem da rota aplicável.',
      rows: [
        ['Saldos', 'Fiat e stablecoins em uma única visão', 'Treasury'],
        ['Pagamentos', 'Consulte opções para fornecedores e beneficiários', 'Payables'],
        ['Conversão', 'Consulte cotações e condições antes de confirmar', 'FX'],
      ],
    },
    payables: {
      title: 'Pague invoices, fornecedores e parceiros globais.',
      description: 'Organize obrigações a partir de saldos globais ou stablecoins, usando o trilho aplicável ao fornecedor e à jurisdição.',
      rows: [
        ['Invoices', 'Referências e documentos para apoiar o fluxo', 'Payables'],
        ['Obrigações', 'Organize pagamentos conforme a rota disponível', 'Payables'],
        ['Informações', 'Consulte registros disponíveis para a operação', 'Records'],
      ],
    },
    useEyebrow: 'Casos de uso',
    useTitle: 'Uma visão para diferentes fluxos internacionais.',
    useText: 'A ALL X adapta contas, pagamentos, conversão e liquidação ao fluxo financeiro da sua empresa.',
    uses: [
      ['Importação & exportação', 'Pague fornecedores internacionais e receba compradores no exterior conforme as rotas disponíveis.'],
      ['SaaS & tecnologia', 'Organize receitas em USD ou EUR e pagamentos ligados à operação internacional.'],
      ['Serviços profissionais', 'Centralize fluxos de consultorias, agências e escritórios que atendem múltiplos países.'],
      ['Payroll & contractors', 'Consulte opções para pagamentos internacionais conforme rota e elegibilidade.'],
      ['Marketplaces', 'Organize payouts para vendedores, criadores e parceiros dentro do fluxo do seu produto.'],
      ['Tesouraria corporativa', 'Acompanhe liquidez multimoeda e movimentações entre operações globais.'],
    ],
    controlEyebrow: 'Controle',
    controlTitle: 'Clareza operacional para cada decisão financeira.',
    controlText: 'Consulte o escopo, a disponibilidade e as informações aplicáveis a cada operação.',
    controls: [
      ['Saldos em contexto', 'Fiat, stablecoins, ordens em trânsito e exposição no mesmo painel.'],
      ['Disponibilidade por rota', 'Confirme elegibilidade, jurisdição e parceiros envolvidos.'],
      ['Conciliação e integração', 'Webhooks e informações de liquidação dependem do escopo acordado.'],
    ],
    finalTitle: 'Avalie as opções para a sua operação internacional.',
    finalText: 'Converse com a equipe sobre contas, pagamentos, disponibilidade e escopo de integração.',
    finalCta: 'Conversar com nosso time comercial',
  },
  en: {
    badge: 'Solutions for business · Treasury & Payables',
    l1: 'Reduce the fragmentation',
    l2: 'of your global finance team.',
    sub: 'Organize treasury and international payment flows in one view. Accounts, routes, and services depend on eligibility and partner availability.',
    cta1: 'Book an executive demo',
    cta2: 'View use cases',
    panel: 'ALL X · Financial operations',
    panelStatus: 'Demonstration · fictional data',
    tabs: ['Treasury', 'Payables'],
    boardLabel: 'OPERATIONAL FLOW',
    boardItems: [
      ['01', 'Decide', 'Balances, quotes, and exposure in context'],
      ['02', 'Validate', 'Scope, eligibility, and available route'],
      ['03', 'Follow', 'Status and operational information'],
    ],
    treasury: {
      title: 'One consolidated view to decide and follow through.',
      description: 'Review balances, quotes, and operational information. Availability and conditions depend on the applicable route.',
      rows: [
        ['Balances', 'Fiat and stablecoins in one view', 'Treasury'],
        ['Payments', 'Review options for suppliers and beneficiaries', 'Payables'],
        ['Conversion', 'Review quotes and conditions before confirming', 'FX'],
      ],
    },
    payables: {
      title: 'Pay invoices, suppliers, and global partners.',
      description: 'Organize obligations from global balances or stablecoins, using the rail applicable to the supplier and jurisdiction.',
      rows: [
        ['Invoices', 'References and documents to support the flow', 'Payables'],
        ['Obligations', 'Organize payments according to available routes', 'Payables'],
        ['Information', 'Review records available for the operation', 'Records'],
      ],
    },
    useEyebrow: 'Use cases',
    useTitle: 'One view for different international flows.',
    useText: 'ALL X adapts accounts, payments, conversion, and settlement to your company’s financial flow.',
    uses: [
      ['Import & export', 'Pay international suppliers and receive buyers abroad according to available routes.'],
      ['SaaS & technology', 'Organize USD or EUR revenue and payments linked to international operations.'],
      ['Professional services', 'Centralize flows for consultancies, agencies, and firms serving multiple countries.'],
      ['Payroll & contractors', 'Review international payment options according to route and eligibility.'],
      ['Marketplaces', 'Organize payouts for sellers, creators, and logistics partners within your product flow.'],
      ['Corporate treasury', 'Follow multi-currency liquidity and movements across global operations.'],
    ],
    controlEyebrow: 'Control',
    controlTitle: 'Operational clarity for every financial decision.',
    controlText: 'Review the scope, availability, and information applicable to each operation.',
    controls: [
      ['Balances in context', 'Fiat, stablecoins, in-flight orders, and exposure in the same panel.'],
      ['Route availability', 'Confirm eligibility, jurisdiction, and the partners involved.'],
      ['Reconciliation and integration', 'Webhooks and settlement information depend on the agreed scope.'],
    ],
    finalTitle: 'Evaluate options for your international operation.',
    finalText: 'Talk to the team about accounts, payments, availability, and integration scope.',
    finalCta: 'Talk to our commercial team',
  },
}

export default function BusinessPage() {
  const { lang } = useI18n()
  const c = COPY[lang] || COPY.pt
  return <BusinessView c={c} lang={lang} navigateTo={navigateTo} />
}

