'use client'


import { navigateTo, useI18n } from '../i18n'
import BusinessView from './pages/business/BusinessView'
import './pages/business.css'

const COPY = {
  pt: {
    badge: 'Soluções para empresas · Treasury & Payables',
    l1: 'Reduza a fragmentação',
    l2: 'do seu financeiro global.',
    sub: 'Da gestão de tesouraria multimoeda ao pagamento de fornecedores e obrigações internacionais: acompanhe saldos, cotações, aprovações e conciliação em uma única camada operacional.',
    cta1: 'Agendar demonstração executiva',
    cta2: 'Ver casos de uso',
    panel: 'ALL X · Operação financeira',
    panelStatus: 'Visão operacional',
    tabs: ['Treasury', 'Payables'],
    boardLabel: 'FLUXO OPERACIONAL',
    boardItems: [
      ['01', 'Decidir', 'Saldos, quotes e exposição em contexto'],
      ['02', 'Aprovar', 'Alçadas e responsabilidades por função'],
      ['03', 'Liquidar', 'Trilho aplicável e registro da operação'],
    ],
    treasury: {
      title: 'Uma visão consolidada para decidir e acompanhar.',
      description: 'Organize saldos, ordens em trânsito, quotes e exposição cambial sem consolidar informações de diferentes ferramentas.',
      rows: [
        ['Saldos', 'Fiat e stablecoins em uma única visão', 'Treasury'],
        ['Ordens', 'Acompanhe entradas, saídas e operações pendentes', 'Operations'],
        ['Conversão', 'Consulte cotações e condições antes de confirmar', 'FX'],
      ],
    },
    payables: {
      title: 'Pague invoices, fornecedores e parceiros globais.',
      description: 'Organize obrigações a partir de saldos globais ou stablecoins, usando o trilho aplicável ao fornecedor e à jurisdição.',
      rows: [
        ['Invoices', 'Referências e documentos para apoiar o fluxo', 'Payables'],
        ['Lotes', 'Estruture pagamentos recorrentes e obrigações', 'Batches'],
        ['Comprovantes', 'Mantenha informações padronizadas da operação', 'Records'],
      ],
    },
    useEyebrow: 'Casos de uso',
    useTitle: 'Uma camada operacional para cada tipo de operação global.',
    useText: 'A ALL X adapta contas, pagamentos, conversão e liquidação ao fluxo financeiro da sua empresa.',
    uses: [
      ['Importação & exportação', 'Pague fornecedores internacionais e receba compradores no exterior conforme as rotas disponíveis.'],
      ['SaaS & tecnologia', 'Organize receitas em USD ou EUR e pagamentos ligados à operação internacional.'],
      ['Serviços profissionais', 'Centralize fluxos de consultorias, agências e escritórios que atendem múltiplos países.'],
      ['Payroll & contractors', 'Estruture pagamentos recorrentes por trilhos locais ou stablecoins, conforme aplicável.'],
      ['Marketplaces', 'Organize payouts para vendedores, criadores e parceiros dentro do fluxo do seu produto.'],
      ['Tesouraria corporativa', 'Acompanhe liquidez multimoeda e movimentações entre operações globais.'],
    ],
    controlEyebrow: 'Controle',
    controlTitle: 'Clareza operacional para cada decisão financeira.',
    controlText: 'Da primeira consulta ao registro final, cada etapa tem contexto, responsabilidade e referência operacional.',
    controls: [
      ['Saldos em contexto', 'Fiat, stablecoins, ordens em trânsito e exposição no mesmo painel.'],
      ['Aprovações por função', 'Organize responsabilidades e alçadas para os diferentes perfis da operação.'],
      ['Conciliação pronta', 'Use IDs de invoice, centros de custo, webhooks e exportação para ERP.'],
    ],
    finalTitle: 'Sua operação financeira merece uma infraestrutura à altura da sua escala global.',
    finalText: 'Converse com a equipe para avaliar contas, pagamentos e integrações aplicáveis ao seu fluxo.',
    finalCta: 'Conversar com nosso time comercial',
  },
  en: {
    badge: 'Solutions for business · Treasury & Payables',
    l1: 'Reduce the fragmentation',
    l2: 'of your global finance team.',
    sub: 'From multi-currency treasury to supplier payables and cross-border obligations: follow balances, quotes, approvals, and reconciliation in one operating layer.',
    cta1: 'Book an executive demo',
    cta2: 'View use cases',
    panel: 'ALL X · Financial operations',
    panelStatus: 'Operational view',
    tabs: ['Treasury', 'Payables'],
    boardLabel: 'OPERATIONAL FLOW',
    boardItems: [
      ['01', 'Decide', 'Balances, quotes, and exposure in context'],
      ['02', 'Approve', 'Approval levels and role-based responsibility'],
      ['03', 'Settle', 'Applicable rail and operational record'],
    ],
    treasury: {
      title: 'One consolidated view to decide and follow through.',
      description: 'Organize balances, in-flight orders, quotes, and FX exposure without consolidating information from different tools.',
      rows: [
        ['Balances', 'Fiat and stablecoins in one view', 'Treasury'],
        ['Orders', 'Follow inbound, outbound, and pending operations', 'Operations'],
        ['Conversion', 'Review quotes and conditions before confirming', 'FX'],
      ],
    },
    payables: {
      title: 'Pay invoices, suppliers, and global partners.',
      description: 'Organize obligations from global balances or stablecoins, using the rail applicable to the supplier and jurisdiction.',
      rows: [
        ['Invoices', 'References and documents to support the flow', 'Payables'],
        ['Batches', 'Structure recurring payments and obligations', 'Batches'],
        ['Receipts', 'Keep standardized operational information', 'Records'],
      ],
    },
    useEyebrow: 'Use cases',
    useTitle: 'One operating layer for every global operation.',
    useText: 'ALL X adapts accounts, payments, conversion, and settlement to your company’s financial flow.',
    uses: [
      ['Import & export', 'Pay international suppliers and receive buyers abroad according to available routes.'],
      ['SaaS & technology', 'Organize USD or EUR revenue and payments linked to international operations.'],
      ['Professional services', 'Centralize flows for consultancies, agencies, and firms serving multiple countries.'],
      ['Payroll & contractors', 'Structure recurring payments through local rails or stablecoins where applicable.'],
      ['Marketplaces', 'Organize payouts for sellers, creators, and logistics partners within your product flow.'],
      ['Corporate treasury', 'Follow multi-currency liquidity and movements across global operations.'],
    ],
    controlEyebrow: 'Control',
    controlTitle: 'Operational clarity for every financial decision.',
    controlText: 'From the first query to the final record, every stage has context, ownership, and an operational reference.',
    controls: [
      ['Balances in context', 'Fiat, stablecoins, in-flight orders, and exposure in the same panel.'],
      ['Role-based approvals', 'Organize responsibilities and approval levels for different operational profiles.'],
      ['Reconciliation-ready', 'Use invoice IDs, cost centers, webhooks, and ERP exports.'],
    ],
    finalTitle: 'Your finance operation deserves infrastructure built for global scale.',
    finalText: 'Talk to the team to evaluate accounts, payments, and integrations applicable to your flow.',
    finalCta: 'Talk to our commercial team',
  },
}

export default function BusinessPage() {
  const { lang } = useI18n()
  const c = COPY[lang] || COPY.pt
  return <BusinessView c={c} lang={lang} navigateTo={navigateTo} />
}

