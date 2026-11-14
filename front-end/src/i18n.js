import { useSyncExternalStore, useCallback } from 'react'

const messages = {
  pt: {
    skip: 'Pular para o conteúdo',
    nav: {
      main: 'Principal', menu: 'Menu', lang: 'Idioma', home: 'ALL X — Início',
      links: ['Pagamentos', 'Contas', 'Stablecoins', 'Como funciona', 'Compliance', 'Desenvolvedor'],
      docs: 'Docs & CMS',
      sandbox: 'API', contact: 'Fale com a ALL X',
    },
    hero: {
      badge: 'Pagamentos globais, contas e stablecoins',
      l1: 'Dinheiro global.', l2: 'Uma única camada', l3: 'operacional.',
      sub: 'Uma plataforma para receber, converter e movimentar dinheiro corporativo globalmente conectando stablecoins, contas internacionais e trilhos de pagamento locais.',
      proofLabel: 'Moedas e trilhos suportados',
      cta1: 'Fale com a ALL X', cta2: 'Explore a plataforma',
    },
    showcase: {
      label: 'Operação ALL X', title: 'ALL X — Visão Operacional', connected: 'Operação ativa',
      origin: 'Origem (BRL)', settled: 'Liquidado', originNote: 'Recebimento local via Pix',
      dest: 'Destino (USDC)', network: 'Conversão e envio', destNote: 'Liquidação direta na conta de destino',
      feedTag: 'COTAÇÃO E ROTA', feedExec: 'Liquidação:',
      scrollHint: 'Ver operação',
    },
    manifesto: {
      eyebrow: 'Uma plataforma. Múltiplos trilhos.',
      title: 'Conectamos stablecoins, contas globais e trilhos bancários locais.',
      text: 'Receba em moedas tradicionais ou stablecoins. Converta com cotação transparente. Pague fornecedores e beneficiários usando os trilhos locais de cada mercado. Acompanhe tudo em uma única interface.',
    },
    stats: ['Moedas fiduciárias', 'Stablecoins integradas', 'Trilhos bancários locais', 'Operação unificada'],
    features: [
      {
        tag: 'Global Payments', title: 'Receba e pague em qualquer mercado',
        text: 'Receba em uma moeda e liquide em outra, com cotação, tarifas e prazo visíveis antes de confirmar.',
        bullets: ['Conectado a Pix, ACH, SEPA, SWIFT e Fedwire', 'USDC e USDT em múltiplas redes', 'Câmbio em tempo real e rastreio de ponta a ponta'],
      },
      {
        tag: 'Global Accounts', title: 'Contas virtuais e carteiras no mesmo lugar',
        text: 'Receba como um player local em cada mercado e acompanhe saldos em USD, EUR e stablecoins em uma única visão.',
        bullets: ['Contas dedicadas em USD e EUR', 'Conciliação centralizada'],
      },
      {
        tag: 'Compliance', title: 'Onboarding de empresas com controles claros',
        text: 'KYB/UBO, KYC, screening de sanções e PEP e monitoramento contínuo integrados a cada fluxo.',
        bullets: ['KYB e KYC via API ou fluxo hospedado', 'Screening contínuo de clientes e contrapartes'],
      },
    ],
    vis: {
      crossBorder: 'Remessa Internacional', instant: 'Cotação travada',
      send: 'Origem', receive: 'Liquidação no destino',
      multi: 'Contas Globais', custody: 'Saldos unificados',
      subUsd: 'Conta USD', subEur: 'Conta EUR', unified: 'Saldo consolidado', stable: 'Disponível para conversão',
      screening: 'Verificação Corporativa', regulated: 'Concluído', kyb: 'KYB & UBO verificados',
      sanctions: 'Sanctions / PEP:', alerts: 'Sem ocorrências', risk: 'Source of Funds:', low: 'Documentado',
    },
    how: {
      eyebrow: 'Como funciona',
      title: 'Quatro passos visíveis. Infraestrutura coordenada por trás.',
      text: 'Stablecoin é infraestrutura. O cliente compra velocidade, previsibilidade, alcance global e controle.',
      steps: [
        { n: '01', t: 'Receba', sub: 'Entrada', d: 'Moeda fiduciária (USD, EUR, BRL) ou USDC/USDT direto na conta.' },
        { n: '02', t: 'Cote', sub: 'Cotação', d: 'Taxa, fees e prazo estimado de liquidação antes de confirmar.' },
        { n: '03', t: 'Converta', sub: 'Conversão', d: 'Stablecoin ou moeda tradicional conforme a rota e a necessidade.' },
        { n: '04', t: 'Liquide', sub: 'Liquidação', d: 'Trilho bancário local até a conta final do beneficiário.' },
      ],
      behindTitle: 'Por trás da experiência',
      behindText: 'KYB/KYC, sanctions/PEP, transaction monitoring, blockchain screening, webhooks, reconciliação e controles de risco operam sem transformar a experiência do cliente em uma aula de infraestrutura.',
      useCasesTitle: 'Casos de uso',
      useCases: [
        'Importação / Exportação',
        'SaaS e tecnologia',
        'Serviços profissionais globais',
        'Payroll e contractors',
        'Marketplaces',
        'Fintechs e embedded finance',
        'Equipes de tesouraria',
      ],
    },
    stack: {
      eyebrow: 'Produtos', title: 'Cada produto traduz infraestrutura complexa em uma operação simples.',
      text: 'Contas internacionais, pagamentos globais, stablecoins e tesouraria em uma única camada operacional.',
      cards: [
        { t: 'Global Accounts', d: 'Contas globais para empresas que operam além da fronteira. Receba pagamentos internacionais e organize saldos sem multiplicar fornecedores.' },
        { t: 'Global Payments', d: 'Envie e receba pagamentos internacionais por uma experiência única. Quotes, status e liquidação local sem trocar de plataforma.' },
        { t: 'Stablecoin Gateway', d: 'Stablecoins quando aceleram a operação. Moeda local quando o dinheiro chega ao destino, sem exigir gestão de complexidade técnica.' },
        { t: 'Treasury', d: 'Visualize saldos, moedas, quotes e movimentações para reduzir a fragmentação operacional do financeiro global.' },
        { t: 'API / White-Label', d: 'Leve contas e pagamentos globais para dentro do seu produto por API, webhooks e componentes de integração.' },
        { t: 'Payables', d: 'Pague invoices, fornecedores e obrigações locais a partir de saldos globais ou stablecoins, conforme os rails disponíveis.' },
      ],
    },
    compliance: {
      eyebrow: 'Compliance',
      title: 'Controles claros em cada etapa da operação.',
      text: 'Transparência sobre verificações, responsabilidades e governança junto a parceiros regulados.',
      items: [
        { t: 'KYB & UBO', d: 'Verificação corporativa, UBOs e documentação relevante.' },
        { t: 'KYC', d: 'Verificação das pessoas relevantes ao relacionamento.' },
        { t: 'Sanctions / PEP', d: 'Screening e regras de escalonamento.' },
        { t: 'Source of Funds', d: 'Revisão proporcional ao perfil e risco.' },
        { t: 'Monitoring', d: 'Transaction monitoring e alertas.' },
        { t: 'Blockchain Screening', d: 'Controles aplicáveis a stablecoin rails.' },
        { t: 'Security', d: 'MFA, permissões por função e audit trail.' },
        { t: 'Fraud Controls', d: 'Limites, sinais de risco e revisão operacional.' },
      ],
    },
    api: {
      eyebrow: 'Developers', title: 'API e integração White-Label',
      text: 'Leve contas e pagamentos globais para dentro do seu produto por API, webhooks e componentes de integração.',
      bullets: ['APIs REST e webhooks de conciliação', 'Ambientes de teste e produção isolados', 'Documentação técnica gerenciada via CMS'],
      copy: 'Copiar', copied: 'Copiado ✓',
    },
    market: {
      eyebrow: 'Aplicações', title: 'Operações globais na prática', more: 'Fale com a equipe →',
      articles: [
        { tag: 'Comércio Exterior', t: 'Importação, exportação e pagamento a fornecedores', d: 'Receba e liquide compromissos internacionais usando o trilho mais eficiente para cada corredor.' },
        { tag: 'Tecnologia & SaaS', t: 'Recebimentos globais, payroll e contractors', d: 'Centralize receitas em USD ou EUR e liquide pagamentos locais sem multiplicar bancos e ferramentas.' },
        { tag: 'Embedded Finance', t: 'Infraestrutura para fintechs e marketplaces', d: 'Integre contas multimoeda, conversão e payouts diretamente ao fluxo do seu produto via API.' },
      ],
    },
    cta: {
      badge: 'Próximo passo',
      title: 'Mova o dinheiro da sua empresa globalmente com uma única camada operacional.',
      text: 'Receber. Converter. Enviar. Liquidar. Com clareza operacional, compliance e uma única experiência.',
      b1: 'Fale com a ALL X', b2: 'Documentação da API',
      corridorsLabel: 'Moedas e trilhos conectados',
      steps: ['Recebimento em fiat ou stablecoins', 'Conversão com cotação transparente', 'Liquidação nos trilhos locais'],
      metrics: [
        { k: 'Moedas', v: 'USD, EUR, BRL' },
        { k: 'Stablecoins', v: 'USDC, USDT' },
        { k: 'Trilhos', v: 'Pix, ACH, SWIFT, SEPA' },
      ],
    },
    footer: {
      desc: 'A camada operacional que conecta stablecoins, contas globais e trilhos bancários locais em uma única experiência para empresas.',
      disclosure: 'A ALL X é uma plataforma de tecnologia financeira. Determinados serviços de pagamento, conta, custódia, conversão ou liquidação podem ser prestados por parceiros terceiros regulados e estão sujeitos a disponibilidade, elegibilidade e restrições jurisdicionais.',
      cols: [
        { h: 'Produtos', items: ['Global Accounts', 'Global Payments', 'Stablecoin Gateway', 'Treasury', 'Payables'] },
        { h: 'Developers', items: ['API / White-Label', 'Webhooks', 'Documentação', 'Status'] },
        { h: 'Institucional', items: ['Compliance', 'Empresa', 'Termos de Uso', 'Privacidade'] },
      ],
      rights: '© 2026 ALL X.',
    },
    cms: {
      top: {
        badge: 'DOCS',
        backHome: '← Site Institucional',
        searchPlaceholder: 'Buscar documentação, APIs, métodos...',
        contact: 'Fale conosco',
      },
      sidebar: {
        switcherSub: 'API & ENGINE',
        switcherTitle: 'Corporate Treasury',
        modules: [
          { id: 'treasury', sub: 'API & ENGINE • v2.4', title: 'Corporate Treasury', status: 'ONLINE' },
          { id: 'gateway', sub: 'ON-CHAIN RAILS • T+0', title: 'Stablecoin Gateway API', status: 'ONLINE' },
          { id: 'compliance', sub: 'GOVERNANCE & AML', title: 'KYB / Screening Engine', status: 'ACTIVE' },
          { id: 'whitelabel', sub: 'EMBEDDED FINANCE', title: 'White-Label Core SDK', status: 'v2.4' },
        ],
        sections: [
          {
            title: 'PRIMEIROS PASSOS',
            items: [
              { id: 'overview', label: 'Visão Geral', method: 'DOC' },
              { id: 'quickstart', label: 'Quickstart & Ambientes', method: 'CLI' },
              { id: 'hmac', label: 'Autenticação HMAC', method: 'AUTH' },
            ],
          },
          {
            title: 'INFRAESTRUTURA & CUSTÓDIA',
            accent: true,
            items: [
              { id: 'managed-wallets', label: 'Managed Wallets', badge: 'v2.4', method: 'POST', active: true },
              { id: 'multi-currency', label: 'Global Multi-Currency Accounts', method: 'GET' },
              { id: 'fx-engine', label: 'Motor FX & Cotações T+0', method: 'POST' },
              { id: 'reserves', label: 'Saldos & Reservas Operacionais', method: 'GET' },
            ],
          },
          {
            title: 'TRILHOS & LIQUIDAÇÃO (APIs)',
            items: [
              { id: 'pix', label: 'Pix Instantâneo (Pay-ins/outs)', method: 'POST' },
              { id: 'global-rails', label: 'Trilhos Globais (ACH, FedNow, SEPA)', method: 'POST' },
              { id: 'stablecoin', label: 'Stablecoin Gateway (USDC / USDT)', method: 'POST' },
              { id: 'webhooks', label: 'Webhook Events & Retries', method: 'WSS' },
            ],
          },
          {
            title: 'COMPLIANCE & SEGURANÇA',
            items: [
              { id: 'kyc-kyb', label: 'KYC & KYB Automatizado', method: 'POST' },
              { id: 'sanctions', label: 'Sanctions & AML Screening', method: 'GET' },
              { id: 'idempotency', label: 'Idempotência & Rate Limits', method: 'CORE' },
            ],
          },
          {
            title: 'DESENVOLVEDOR & CMS',
            items: [
              { id: 'cms-headless', label: 'CMS Headless Integration', method: 'REST' },
              { id: 'sdks', label: 'SDKs (Node, Python, Go)', method: 'SDK' },
              { id: 'changelog', label: 'Changelog da API', method: 'v2.4' },
            ],
          },
        ],
        version: 'v2.4.1 (Stable Release)',
        status: 'Status',
      },
      breadcrumbs: ['Documentação', 'Core Infrastructure', 'Managed Wallets'],
      hero: {
        title: 'Managed Wallets',
        copyLink: 'Copiar Link',
        copiedLink: 'Link copiado ✓',
        subtitle: 'Crie uma carteira gerenciada na ALL X, consulte saldos multimoedas e transacione entre trilhos locais e stablecoins sem gerenciar nós ou custódia manual de chaves privadas.',
      },
      callout: {
        bold: 'Disponibilidade Geral v2.4 (Enterprise Rails):',
        text: 'Managed Wallets contam com suporte nativo a liquidação instantânea T+0 via Pix (Banco Central do Brasil) e redes Base, Polygon e Ethereum com arquitetura MPC Segregada.',
      },
      intro: {
        p1Before: 'Uma carteira gerenciada (',
        p1Code: 'wl_...',
        p1After: ') é uma estrutura de saldo e custódia isolada que a ALL X provê para seus clientes institucionais ou corporativos. A comunicação é realizada em três pilares simplificados:',
        pillars: [
          { b: 'Criação em lote ou sob demanda:', t: ' provisionamento de endereços de liquidação em menos de 100ms.' },
          { b: 'Saldos unificados em multi-ativos:', t: ' consulta em tempo real de saldos em BRL, USD, EUR e stablecoins.' },
          { b: 'Trilhos de saída automatizados:', t: ' liquidação de payouts sem necessidade de assinar transações gas ou gerenciar nonces.' },
        ],
      },
      prereq: {
        title: 'Pré-requisitos',
        boxTitle: 'ANTES DE INICIAR SUA INTEGRAÇÃO:',
        step1Before: 'Criar uma conta corporativa institucional no ',
        step1Link: 'Portal de Governança ALL X',
        step2Before: 'Instanciar um ambiente Sandbox (',
        step2Code: 'in_dev_...',
        step2After: ') pelo painel de controle.',
        step3: 'Gerar sua chave de API com assinatura de cabeçalho HMAC e chave simétrica de ambiente.',
        compTitle: 'Regra de Compliance & Status KYC',
        compBefore: 'O cliente titular ou sub-conta deve possuir o status de conformidade ',
        compOr: ' ou ',
        compAfter: '. Caso esteja em análise preventiva, pay-ins operam com retenção temporária até a liberação automática do motor AML.',
      },
      create: {
        title: 'Criar uma carteira gerenciada',
        sub: 'Provisione uma carteira multi-ativos associada à instância de cliente com identificador idempotente.',
        noteBefore: 'Substitua ',
        noteMid: ' pela chave de autenticação e ',
        noteAfter: ' pela sua instância sandbox/produção.',
        copy: 'Copiar',
        copied: 'Copiado ✓',
        copyJson: 'Copiar JSON',
        respLabel: 'Response 201 Created',
      },
      balance: {
        title: 'Consultar saldo e reservas',
        sub: 'Recupere a composição completa dos saldos disponíveis, recursos alocados em reservas e liquidações pendentes.',
        reqLabel: 'cURL GET /v1/wallets/:id/balances',
        respLabel: 'Response 200 OK',
        respSub: 'Multicurrency Payload',
      },
      receivePayout: {
        title: 'Recebimento e Liquidação T+0',
        sub: 'Operações de Pay-in e Pay-out fluem pelas mesmas chaves sem necessidade de orquestração manual entre bancos locais e redes on-chain.',
        payinTitle: 'Recebimento (Pay-in)',
        payinBefore: 'Utilize o identificador ',
        payinAfter: ' ao gerar uma cotação de payin via Pix ou stablecoin. O saldo entra em status disponível assim que a transação confirma.',
        payinEvent: 'Event: payment.received',
        payoutTitle: 'Envio (Pay-out)',
        payoutText: 'Execute transferências instantâneas para contas bancárias nacionais ou endereços de terceiros através de uma única chamada de API autenticada com chave privada institucional.',
        payoutEvent: 'Event: payout.settled',
      },
      metadata: {
        title: 'Metadados no CMS & Webhooks',
        sub: 'Conecte metadados customizados do seu sistema ERP/CMS corporativo à carteira gerenciada.',
        boxBefore: 'Você pode anexar chaves arbitrárias como ',
        boxMid: ', ',
        boxAnd: ' e ',
        boxAfter: 'tags de conciliação fiscal. Todos os metadados são devolvidos nos disparos de webhooks em tempo real.',
      },
      pagination: {
        prevLabel: '← Anterior',
        prevTitle: 'Global Multi-Currency Accounts',
        nextLabel: 'Próximo →',
        nextTitle: 'Motor FX & Cotações T+0',
      },
      toc: {
        title: 'NESTA PÁGINA',
        items: [
          { id: 'sec-prereq', label: 'Pré-requisitos' },
          { id: 'sec-create', label: 'Criar uma carteira gerenciada' },
          { id: 'sec-balance', label: 'Consultar saldo e reservas' },
          { id: 'sec-settlement', label: 'Recebimento e liquidação' },
          { id: 'sec-cms', label: 'Metadados no CMS' },
        ],
        feedbackTitle: 'Esta documentação ajudou?',
        yes: 'Sim',
        no: 'Não',
        thanks: 'Obrigado pelo seu feedback institucional!',
        editCms: 'Editar conteúdo no CMS Hub',
        support: 'Falar com suporte técnico',
      },
    },
  },

  en: {
    skip: 'Skip to content',
    nav: {
      main: 'Main', menu: 'Menu', lang: 'Language', home: 'ALL X — Home',
      links: ['Payments', 'Accounts', 'Stablecoins', 'How It Works', 'Compliance', 'Developers'],
      docs: 'Docs & CMS',
      sandbox: 'API', contact: 'Talk to ALL X',
    },
    hero: {
      badge: 'Global payments, corporate accounts and stablecoins',
      l1: 'Global money.', l2: 'One single', l3: 'operational layer.',
      sub: 'A platform to receive, convert and move corporate money globally by connecting stablecoins, international accounts and local payment rails.',
      proofLabel: 'Supported currencies and rails',
      cta1: 'Talk to ALL X', cta2: 'Explore the platform',
    },
    showcase: {
      label: 'ALL X Operation', title: 'ALL X — Operational View', connected: 'Active operation',
      origin: 'Source (BRL)', settled: 'Settled', originNote: 'Local inbound via Pix',
      dest: 'Destination (USDC)', network: 'Conversion & settlement', destNote: 'Direct settlement to destination account',
      feedTag: 'QUOTE & ROUTE', feedExec: 'Settlement:',
      scrollHint: 'View operation',
    },
    manifesto: {
      eyebrow: 'One platform. Multiple rails.',
      title: 'We connect stablecoins, global accounts and local banking rails.',
      text: 'Receive in traditional currencies or stablecoins. Convert with transparent quotes. Pay suppliers and beneficiaries using local rails in every market. Track everything in a single interface.',
    },
    stats: ['Fiat currencies', 'Integrated stablecoins', 'Local banking rails', 'Unified operation'],
    features: [
      {
        tag: 'Global Payments', title: 'Move money in and out of any market',
        text: 'Collect in one currency and settle in another, with the quote, fees and timeline visible before you confirm.',
        bullets: ['Connected to Pix, ACH, SEPA, SWIFT and Fedwire', 'USDC and USDT across multiple networks', 'Live FX rates and end-to-end tracking'],
      },
      {
        tag: 'Global Accounts', title: 'Virtual accounts and wallets in one place',
        text: 'Receive like a local in every market you operate in, and keep USD, EUR and stablecoin balances in a single view.',
        bullets: ['Dedicated USD and EUR accounts', 'Centralized reconciliation'],
      },
      {
        tag: 'Compliance', title: 'Onboard companies with clear controls',
        text: 'KYB/UBO, KYC, sanctions and PEP screening, and continuous monitoring built into every flow.',
        bullets: ['Hosted or API-based KYB and KYC', 'Ongoing customer and counterparty screening'],
      },
    ],
    vis: {
      crossBorder: 'International Transfer', instant: 'Locked quote',
      send: 'Origin', receive: 'Destination settlement',
      multi: 'Global Accounts', custody: 'Unified balances',
      subUsd: 'USD Account', subEur: 'EUR Account', unified: 'Consolidated balance', stable: 'Available for conversion',
      screening: 'Corporate Verification', regulated: 'Verified', kyb: 'KYB & UBO verified',
      sanctions: 'Sanctions / PEP:', alerts: 'Clear', risk: 'Source of Funds:', low: 'Documented',
    },
    how: {
      eyebrow: 'How it works',
      title: 'Four visible steps. Coordinated infrastructure behind the scenes.',
      text: 'Stablecoin is infrastructure. Clients buy speed, predictability, global reach and control.',
      steps: [
        { n: '01', t: 'Receive', sub: 'Inbound', d: 'Fiat currency (USD, EUR, BRL) or USDC/USDT directly into your account.' },
        { n: '02', t: 'Quote', sub: 'Quote', d: 'Rate, fees and estimated settlement time before confirming.' },
        { n: '03', t: 'Convert', sub: 'Conversion', d: 'Stablecoin or fiat according to route and operational need.' },
        { n: '04', t: 'Settle', sub: 'Settlement', d: 'Local banking rail straight to the beneficiary account.' },
      ],
      behindTitle: 'Behind the experience',
      behindText: 'KYB/KYC, sanctions/PEP, transaction monitoring, blockchain screening, webhooks, reconciliation and risk controls operate without turning the client experience into an infrastructure lecture.',
      useCasesTitle: 'Use cases',
      useCases: [
        'Import / Export',
        'SaaS & technology',
        'Global professional services',
        'Payroll & contractors',
        'Marketplaces',
        'Fintechs & embedded finance',
        'Treasury teams',
      ],
    },
    stack: {
      eyebrow: 'Products', title: 'Each product translates complex infrastructure into a simple operation.',
      text: 'International accounts, global payments, stablecoins and treasury in a single operational layer.',
      cards: [
        { t: 'Global Accounts', d: 'Global accounts for companies operating across borders. Receive international payments and manage balances without multiplying providers.' },
        { t: 'Global Payments', d: 'Send and receive international payments in a single experience. Quotes, status and local settlement without switching platforms.' },
        { t: 'Stablecoin Gateway', d: 'Stablecoins when they speed up operations. Local currency when money reaches its destination, without managing technical complexity.' },
        { t: 'Treasury', d: 'View balances, currencies, quotes and movements to reduce operational fragmentation in global finance.' },
        { t: 'API / White-Label', d: 'Embed global accounts and payments into your product via API, webhooks and integration components.' },
        { t: 'Payables', d: 'Pay invoices, suppliers and local obligations from global balances or stablecoins across available rails.' },
      ],
    },
    compliance: {
      eyebrow: 'Compliance',
      title: 'Clear controls across every step of the operation.',
      text: 'Transparency on checks, responsibilities and governance alongside regulated partners.',
      items: [
        { t: 'KYB & UBO', d: 'Corporate verification, UBOs and relevant documentation.' },
        { t: 'KYC', d: 'Verification of key individuals in the relationship.' },
        { t: 'Sanctions / PEP', d: 'Screening and escalation rules.' },
        { t: 'Source of Funds', d: 'Review proportional to profile and risk.' },
        { t: 'Monitoring', d: 'Transaction monitoring and alerts.' },
        { t: 'Blockchain Screening', d: 'Controls applicable to stablecoin rails.' },
        { t: 'Security', d: 'MFA, role-based permissions and audit trail.' },
        { t: 'Fraud Controls', d: 'Limits, risk signals and operational review.' },
      ],
    },
    api: {
      eyebrow: 'Developers', title: 'API & White-Label integration',
      text: 'Bring global accounts and payments into your product through API, webhooks and integration components.',
      bullets: ['REST APIs and reconciliation webhooks', 'Isolated sandbox and production environments', 'Technical documentation managed via CMS'],
      copy: 'Copy', copied: 'Copied ✓',
    },
    market: {
      eyebrow: 'Applications', title: 'Global operations in practice', more: 'Talk to the team →',
      articles: [
        { tag: 'Foreign Trade', t: 'Import, export and supplier payments', d: 'Receive and settle international obligations using the most efficient rail for each corridor.' },
        { tag: 'Technology & SaaS', t: 'Global collections, payroll and contractors', d: 'Centralize USD or EUR revenue and settle local payouts without multiplying banks and tools.' },
        { tag: 'Embedded Finance', t: 'Infrastructure for fintechs and marketplaces', d: 'Integrate multi-currency accounts, conversion and payouts directly into your product flow via API.' },
      ],
    },
    cta: {
      badge: 'Next step',
      title: 'Move your company’s money globally with a single operational layer.',
      text: 'Receive. Convert. Send. Settle. With operational clarity, compliance and one unified experience.',
      b1: 'Talk to ALL X', b2: 'API Documentation',
      corridorsLabel: 'Connected currencies and rails',
      steps: ['Inbound in fiat or stablecoins', 'Conversion with transparent quotes', 'Settlement on local banking rails'],
      metrics: [
        { k: 'Currencies', v: 'USD, EUR, BRL' },
        { k: 'Stablecoins', v: 'USDC, USDT' },
        { k: 'Rails', v: 'Pix, ACH, SWIFT, SEPA' },
      ],
    },
    footer: {
      desc: 'The operational layer connecting stablecoins, global accounts and local banking rails in a single experience for businesses.',
      disclosure: 'ALL X is a financial technology platform. Certain payment, account, custody, conversion or settlement services may be provided by regulated third-party partners and are subject to availability, eligibility and jurisdictional restrictions.',
      cols: [
        { h: 'Products', items: ['Global Accounts', 'Global Payments', 'Stablecoin Gateway', 'Treasury', 'Payables'] },
        { h: 'Developers', items: ['API / White-Label', 'Webhooks', 'Documentation', 'Status'] },
        { h: 'Company', items: ['Compliance', 'About', 'Terms of Use', 'Privacy'] },
      ],
      rights: '© 2026 ALL X.',
    },
    cms: {
      top: {
        badge: 'DOCS',
        backHome: '← Institutional Site',
        searchPlaceholder: 'Search documentation, APIs, methods...',
        contact: 'Talk to us',
      },
      sidebar: {
        switcherSub: 'API & ENGINE',
        switcherTitle: 'Corporate Treasury',
        modules: [
          { id: 'treasury', sub: 'API & ENGINE • v2.4', title: 'Corporate Treasury', status: 'ONLINE' },
          { id: 'gateway', sub: 'ON-CHAIN RAILS • T+0', title: 'Stablecoin Gateway API', status: 'ONLINE' },
          { id: 'compliance', sub: 'GOVERNANCE & AML', title: 'KYB / Screening Engine', status: 'ACTIVE' },
          { id: 'whitelabel', sub: 'EMBEDDED FINANCE', title: 'White-Label Core SDK', status: 'v2.4' },
        ],
        sections: [
          {
            title: 'GETTING STARTED',
            items: [
              { id: 'overview', label: 'Overview', method: 'DOC' },
              { id: 'quickstart', label: 'Quickstart & Environments', method: 'CLI' },
              { id: 'hmac', label: 'HMAC Authentication', method: 'AUTH' },
            ],
          },
          {
            title: 'INFRASTRUCTURE & CUSTODY',
            accent: true,
            items: [
              { id: 'managed-wallets', label: 'Managed Wallets', badge: 'v2.4', method: 'POST', active: true },
              { id: 'multi-currency', label: 'Global Multi-Currency Accounts', method: 'GET' },
              { id: 'fx-engine', label: 'FX Engine & T+0 Quotes', method: 'POST' },
              { id: 'reserves', label: 'Operational Balances & Reserves', method: 'GET' },
            ],
          },
          {
            title: 'RAILS & SETTLEMENT (APIs)',
            items: [
              { id: 'pix', label: 'Instant Pix (Pay-ins/outs)', method: 'POST' },
              { id: 'global-rails', label: 'Global Rails (ACH, FedNow, SEPA)', method: 'POST' },
              { id: 'stablecoin', label: 'Stablecoin Gateway (USDC / USDT)', method: 'POST' },
              { id: 'webhooks', label: 'Webhook Events & Retries', method: 'WSS' },
            ],
          },
          {
            title: 'COMPLIANCE & SECURITY',
            items: [
              { id: 'kyc-kyb', label: 'Automated KYC & KYB', method: 'POST' },
              { id: 'sanctions', label: 'Sanctions & AML Screening', method: 'GET' },
              { id: 'idempotency', label: 'Idempotency & Rate Limits', method: 'CORE' },
            ],
          },
          {
            title: 'DEVELOPER & CMS',
            items: [
              { id: 'cms-headless', label: 'CMS Headless Integration', method: 'REST' },
              { id: 'sdks', label: 'SDKs (Node, Python, Go)', method: 'SDK' },
              { id: 'changelog', label: 'API Changelog', method: 'v2.4' },
            ],
          },
        ],
        version: 'v2.4.1 (Stable Release)',
        status: 'Status',
      },
      breadcrumbs: ['Documentation', 'Core Infrastructure', 'Managed Wallets'],
      hero: {
        title: 'Managed Wallets',
        copyLink: 'Copy Link',
        copiedLink: 'Link copied ✓',
        subtitle: 'Create a managed wallet on ALL X, query multi-currency balances and transact across local rails and stablecoins without running nodes or managing private keys manually.',
      },
      callout: {
        bold: 'General Availability v2.4 (Enterprise Rails):',
        text: 'Managed Wallets feature native support for T+0 instant settlement via Pix (Central Bank of Brazil) and Base, Polygon and Ethereum networks with Segregated MPC architecture.',
      },
      intro: {
        p1Before: 'A managed wallet (',
        p1Code: 'wl_...',
        p1After: ') is an isolated balance and custody structure that ALL X provides for institutional or corporate clients. Communication is built around three simplified pillars:',
        pillars: [
          { b: 'Batch or on-demand creation:', t: ' settlement address provisioning in under 100ms.' },
          { b: 'Unified multi-asset balances:', t: ' real-time balance queries across BRL, USD, EUR and stablecoins.' },
          { b: 'Automated outbound rails:', t: ' payout settlement with no need to sign gas transactions or manage nonces.' },
        ],
      },
      prereq: {
        title: 'Prerequisites',
        boxTitle: 'BEFORE STARTING YOUR INTEGRATION:',
        step1Before: 'Create an institutional corporate account in the ',
        step1Link: 'ALL X Governance Portal',
        step2Before: 'Instantiate a Sandbox environment (',
        step2Code: 'in_dev_...',
        step2After: ') from the control panel.',
        step3: 'Generate your API key with HMAC header signature and symmetric environment key.',
        compTitle: 'Compliance Rule & KYC Status',
        compBefore: 'The primary account holder or sub-account must hold a compliance status of ',
        compOr: ' or ',
        compAfter: '. If under preventive review, pay-ins operate with temporary hold until automatic AML engine clearance.',
      },
      create: {
        title: 'Create a managed wallet',
        sub: 'Provision a multi-asset wallet bound to the customer instance with an idempotent identifier.',
        noteBefore: 'Replace ',
        noteMid: ' with your authentication key and ',
        noteAfter: ' with your sandbox/production instance.',
        copy: 'Copy',
        copied: 'Copied ✓',
        copyJson: 'Copy JSON',
        respLabel: 'Response 201 Created',
      },
      balance: {
        title: 'Query balance and reserves',
        sub: 'Retrieve the full breakdown of available balances, liquidity reserves and pending settlements.',
        reqLabel: 'cURL GET /v1/wallets/:id/balances',
        respLabel: 'Response 200 OK',
        respSub: 'Multicurrency Payload',
      },
      receivePayout: {
        title: 'Receiving & T+0 Settlement',
        sub: 'Pay-in and Pay-out operations flow through the same keys without manual orchestration between local banks and on-chain networks.',
        payinTitle: 'Receiving (Pay-in)',
        payinBefore: 'Use the ',
        payinAfter: ' identifier when generating a pay-in quote via Pix or stablecoin. Funds enter available status as soon as the transaction confirms.',
        payinEvent: 'Event: payment.received',
        payoutTitle: 'Sending (Pay-out)',
        payoutText: 'Execute instant transfers to domestic bank accounts or third-party addresses through a single API call authenticated with an institutional private key.',
        payoutEvent: 'Event: payout.settled',
      },
      metadata: {
        title: 'CMS Metadata & Webhooks',
        sub: 'Connect custom metadata from your corporate ERP/CMS system directly to the managed wallet.',
        boxBefore: 'You can attach arbitrary keys such as ',
        boxMid: ', ',
        boxAnd: ' and ',
        boxAfter: 'tax reconciliation tags. All metadata fields are returned in real-time webhook dispatches.',
      },
      pagination: {
        prevLabel: '← Previous',
        prevTitle: 'Global Multi-Currency Accounts',
        nextLabel: 'Next →',
        nextTitle: 'FX Engine & T+0 Quotes',
      },
      toc: {
        title: 'ON THIS PAGE',
        items: [
          { id: 'sec-prereq', label: 'Prerequisites' },
          { id: 'sec-create', label: 'Create a managed wallet' },
          { id: 'sec-balance', label: 'Query balance and reserves' },
          { id: 'sec-settlement', label: 'Receiving & settlement' },
          { id: 'sec-cms', label: 'CMS metadata' },
        ],
        feedbackTitle: 'Was this documentation helpful?',
        yes: 'Yes',
        no: 'No',
        thanks: 'Thank you for your institutional feedback!',
        editCms: 'Edit content in CMS Hub',
        support: 'Talk to technical support',
      },
    },
  },
}

// ---- React store (replaces Vue refs) ----
const PRODUCT_PAGES = ['global-payments', 'global-accounts', 'stablecoins', 'developers', 'contact', 'compliance']
const isCmsHash = (h) => h === '#cms' || h === '#docs' || h.startsWith('#sec-')
const hasWin = typeof window !== 'undefined'

function detectCurrentPage() {
  if (!hasWin) return 'home'
  const path = window.location.pathname.replace(/^\/+|\/+$/g, '')
  if (PRODUCT_PAGES.includes(path)) return path
  const h = window.location.hash
  if (isCmsHash(h)) return 'cms'
  const cleanHash = h.replace(/^#/, '')
  if (PRODUCT_PAGES.includes(cleanHash)) return cleanHash
  return 'home'
}

const stored = hasWin ? localStorage.getItem('lang') : null
const guess = hasWin && navigator.language?.startsWith('en') ? 'en' : 'pt'
const initLang = stored === 'en' || stored === 'pt' ? stored : guess

let snap = {
  lang: initLang,
  targetLang: initLang,
  langTransitioning: false,
  currentPage: detectCurrentPage(),
  searchModalOpen: false,
}
const subs = new Set()
function set(patch) {
  snap = { ...snap, ...patch }
  if (patch.lang && hasWin) {
    document.documentElement.lang = patch.lang === 'pt' ? 'pt-BR' : 'en'
    localStorage.setItem('lang', patch.lang)
  }
  subs.forEach((f) => f())
}
const subscribe = (f) => (subs.add(f), () => subs.delete(f))
export const getState = () => snap

/** t(lang, 'hero.sub') → string | array | object */
export const tr = (l, path) => path.split('.').reduce((o, k) => o?.[k], messages[l]) ?? path

const serverSnap = {
  lang: 'pt',
  targetLang: 'pt',
  langTransitioning: false,
  currentPage: 'home',
  searchModalOpen: false,
}
const getServerState = () => serverSnap

/** Hook: { t, lang, targetLang, langTransitioning, currentPage, searchModalOpen } (reactive). */
export function useI18n() {
  const s = useSyncExternalStore(subscribe, getState, getServerState)
  const t = useCallback((path) => tr(s.lang, path), [s.lang])
  return { ...s, t }
}

let langTimer1 = null
let langTimer2 = null
export const setLang = (l) => {
  if (l === snap.lang && !snap.langTransitioning) return
  clearTimeout(langTimer1)
  clearTimeout(langTimer2)
  set({ targetLang: l, langTransitioning: true })
  langTimer1 = setTimeout(() => set({ lang: l }), 480)
  langTimer2 = setTimeout(() => set({ langTransitioning: false }), 1050)
}

export const openSearchModal = () => set({ searchModalOpen: true })
export const closeSearchModal = () => set({ searchModalOpen: false })

if (hasWin) {
  document.documentElement.lang = initLang === 'pt' ? 'pt-BR' : 'en'
  window.addEventListener('hashchange', () => {
    const h = window.location.hash
    if (isCmsHash(h)) {
      const wasHome = snap.currentPage !== 'cms'
      set({ currentPage: 'cms' })
      if (wasHome && (h === '#cms' || h === '#docs')) window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      const next = detectCurrentPage()
      set({ currentPage: next })
    }
  })
  window.addEventListener('popstate', () => {
    set({ currentPage: detectCurrentPage() })
  })
}

export function navigateTo(page, anchor = '') {
  set({ currentPage: page })
  if (!hasWin) return
  if (PRODUCT_PAGES.includes(page)) {
    const targetUrl = `/${page}${anchor || ''}`
    if (window.location.pathname !== `/${page}`) {
      window.history.pushState({}, '', targetUrl)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  if (page === 'cms') {
    window.location.hash = anchor || '#cms'
    if (!anchor) window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  // Navigating to home
  const targetUrl = `/${anchor || ''}`
  if (window.location.pathname !== '/' || window.location.hash !== (anchor || '')) {
    window.history.pushState({}, '', targetUrl)
  }
  if (anchor && anchor.startsWith('#')) {
    setTimeout(() => {
      const el = document.querySelector(anchor)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 60)
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
