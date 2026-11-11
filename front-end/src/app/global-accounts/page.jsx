import App from '../../App'

export const metadata = {
  title: 'Global Accounts — ALL X',
  description:
    'Contas globais para empresas que operam além da fronteira. Receba pagamentos internacionais e organize saldos e movimentações sem multiplicar fornecedores.',
}

export default function GlobalAccountsRoute() {
  return <App initialPage="global-accounts" />
}
