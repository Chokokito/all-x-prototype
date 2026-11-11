import '../style.css'
import '../bits.css'
import '../App.css'

export const metadata = {
  title: 'ALL X — Dinheiro global. Uma única camada operacional.',
  description:
    'ALL X — Uma plataforma para receber, converter e movimentar dinheiro corporativo globalmente conectando stablecoins, contas internacionais e trilhos de pagamento locais.',
}
export const viewport = { themeColor: '#0d0e13' }

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div id="app">{children}</div>
      </body>
    </html>
  )
}
