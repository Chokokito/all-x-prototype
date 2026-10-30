import { useState } from 'react'
import ClickSpark from './bits/ClickSpark.tsx'

const CREATE_SNIPPETS = {
  cURL: `curl --request POST \\
  --url https://api.allx.io/v1/instances/in_000000000000/customers/re_000000000000/wallets \\
  --header 'Authorization: Bearer YOUR_API_KEY' \\
  --header 'Content-Type: application/json' \\
  --header 'Idempotency-Key: 7b3125e9-cfd0-4bf6-b516-724d27163c45' \\
  --data '{
    "network": "base",
    "name": "Corporate Liquidity Balance",
    "supported_assets": ["USDC", "BRL_PIX"],
    "settlement_rail": "instant_t0"
  }'`,
  'Node.js': `import { AllXClient } from '@allx/sdk';

const allx = new AllXClient({ apiKey: process.env.ALLX_API_KEY });

const wallet = await allx.wallets.create(
  'in_000000000000',
  're_000000000000',
  {
    network: 'base',
    name: 'Corporate Liquidity Balance',
    supported_assets: ['USDC', 'BRL_PIX'],
    settlement_rail: 'instant_t0',
  },
  { idempotencyKey: '7b3125e9-cfd0-4bf6-b516-724d27163c45' }
);`,
  Python: `from allx import AllXClient

client = AllXClient(api_key="YOUR_API_KEY")

wallet = client.wallets.create(
    instance_id="in_000000000000",
    customer_id="re_000000000000",
    network="base",
    name="Corporate Liquidity Balance",
    supported_assets=["USDC", "BRL_PIX"],
    settlement_rail="instant_t0",
    idempotency_key="7b3125e9-cfd0-4bf6-b516-724d27163c45",
)`,
  Go: `package main

import (
  "context"
  "github.com/allx-global/allx-go"
)

func createWallet(client *allx.Client) (*allx.Wallet, error) {
  return client.Wallets.Create(context.Background(), &allx.CreateWalletParams{
    InstanceID:      "in_000000000000",
    CustomerID:      "re_000000000000",
    Network:         "base",
    Name:            "Corporate Liquidity Balance",
    SupportedAssets: []string{"USDC", "BRL_PIX"},
    SettlementRail:  "instant_t0",
  })
}`,
}

const CREATE_RESPONSE = `{
  "id": "wl_allx_99042",
  "network": "base",
  "address": "0x1234567890abcdef1234567890abcdef12345678",
  "name": "Corporate Liquidity Balance",
  "status": "active",
  "supported_assets": ["USDC", "BRL_PIX"],
  "created_at": "2026-03-30T14:22:00.000Z"
}`

const BALANCE_REQ = `curl --request GET \\
  --url https://api.allx.io/v1/wallets/wl_allx_99042/balances \\
  --header 'Authorization: Bearer YOUR_API_KEY'`

const BALANCE_RESPONSE = `{
  "wallet_id": "wl_allx_99042",
  "balances": {
    "USDC": {
      "amount": 254000.50,
      "idle_amount": 4000.50,
      "earning_amount": 250000.00,
      "currency": "USD",
      "yield_apr": 0.052
    },
    "BRL": {
      "amount": 1289450.00,
      "rail": "pix_instant",
      "status": "settled_t0"
    },
    "EUR": {
      "amount": 85400.00,
      "rail": "sepa_instant"
    }
  }
}`

const CopyIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
)

export default function DocsCodeCard({
  mode = 'create',
  copyLabel = 'Copiar',
  copiedLabel = 'Copiado ✓',
  copyJsonLabel = 'Copiar JSON',
  respLabel = 'Response 201 Created',
  reqLabel = 'cURL GET /v1/wallets/:id/balances',
  respSub = 'Multicurrency Payload',
}) {
  const [tab, setTab] = useState('cURL')
  const [copiedReq, setCopiedReq] = useState(false)
  const [copiedRes, setCopiedRes] = useState(false)

  const copyText = (text, setter) => {
    navigator.clipboard?.writeText(text)
    setter(true)
    setTimeout(() => setter(false), 1800)
  }

  if (mode === 'balance') {
    return (
      <ClickSpark sparkColor="#EBAA89" sparkRadius={18} sparkCount={7}>
        <div className="docs-code-stack">
          {/* Request Balance Card (#2:175) */}
          <div className="docs-code-card">
            <div className="docs-code-head">
              <span className="docs-code-title mono">{reqLabel}</span>
              <button
                type="button"
                className="docs-copy-btn mono"
                onClick={() => copyText(BALANCE_REQ, setCopiedReq)}
              >
                <CopyIcon />
                <span>{copiedReq ? copiedLabel : copyLabel}</span>
              </button>
            </div>
            <pre className="docs-code-pre mono">
              <code>
                <span className="tk-em">curl</span> <span className="tk-sl">--request GET \</span>{'\n'}
                <span className="tk-sl">{'  '}--url https://api.allx.io/v1/wallets/</span>
                <span className="tk-cp">wl_allx_99042</span>
                <span className="tk-sl">/balances \</span>{'\n'}
                <span className="tk-sl">{'  '}--header </span>
                <span className="tk-am">'Authorization: Bearer YOUR_API_KEY'</span>
              </code>
            </pre>
          </div>

          {/* Response Balance Card (#2:185) */}
          <div className="docs-code-card">
            <div className="docs-code-head">
              <span className="docs-resp-ok mono">{respLabel}</span>
              <div className="docs-head-right">
                <span className="docs-resp-sub mono">{respSub}</span>
                <button
                  type="button"
                  className="docs-copy-link mono"
                  onClick={() => copyText(BALANCE_RESPONSE, setCopiedRes)}
                >
                  {copiedRes ? copiedLabel : copyJsonLabel}
                </button>
              </div>
            </div>
            <pre className="docs-code-pre mono">
              <code>
                {'{\n'}
                {'  '}<span className="tk-cp">"wallet_id"</span>: <span className="tk-em">"wl_allx_99042"</span>,{'\n'}
                {'  '}<span className="tk-cp">"balances"</span>: {'{\n'}
                {'    '}<span className="tk-cp">"USDC"</span>: {'{\n'}
                {'      '}<span className="tk-cp">"amount"</span>: <span className="tk-sk">254000.50</span>,{'\n'}
                {'      '}<span className="tk-cp">"idle_amount"</span>: <span className="tk-sk">4000.50</span>,{'\n'}
                {'      '}<span className="tk-cp">"earning_amount"</span>: <span className="tk-sk">250000.00</span>,{'\n'}
                {'      '}<span className="tk-cp">"currency"</span>: <span className="tk-em">"USD"</span>,{'\n'}
                {'      '}<span className="tk-cp">"yield_apr"</span>: <span className="tk-sk">0.052</span>{'\n'}
                {'    },\n'}
                {'    '}<span className="tk-cp">"BRL"</span>: {'{\n'}
                {'      '}<span className="tk-cp">"amount"</span>: <span className="tk-sk">1289450.00</span>,{'\n'}
                {'      '}<span className="tk-cp">"rail"</span>: <span className="tk-em">"pix_instant"</span>,{'\n'}
                {'      '}<span className="tk-cp">"status"</span>: <span className="tk-em">"settled_t0"</span>{'\n'}
                {'    },\n'}
                {'    '}<span className="tk-cp">"EUR"</span>: {'{\n'}
                {'      '}<span className="tk-cp">"amount"</span>: <span className="tk-sk">85400.00</span>,{'\n'}
                {'      '}<span className="tk-cp">"rail"</span>: <span className="tk-em">"sepa_instant"</span>{'\n'}
                {'    }\n'}
                {'  }\n'}
                {'}'}
              </code>
            </pre>
          </div>
        </div>
      </ClickSpark>
    )
  }

  return (
    <ClickSpark sparkColor="#EBAA89" sparkRadius={18} sparkCount={7}>
      <div className="docs-code-stack">
        {/* Create Wallet Request Card (#2:139) */}
        <div className="docs-code-card docs-code-elevated">
          <div className="docs-code-head">
            <div className="docs-code-tabs" role="tablist" aria-label="SDK Language">
              {Object.keys(CREATE_SNIPPETS).map((langKey) => (
                <button
                  key={langKey}
                  type="button"
                  role="tab"
                  aria-selected={tab === langKey}
                  className={`docs-tab mono ${tab === langKey ? 'is-active' : ''}`}
                  onClick={() => setTab(langKey)}
                >
                  {langKey}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="docs-copy-btn mono"
              onClick={() => copyText(CREATE_SNIPPETS[tab], setCopiedReq)}
            >
              <CopyIcon />
              <span>{copiedReq ? copiedLabel : copyLabel}</span>
            </button>
          </div>
          <pre className="docs-code-pre mono">
            {tab === 'cURL' ? (
              <code>
                <span className="tk-em">curl</span> <span className="tk-sl">--request POST \</span>{'\n'}
                <span className="tk-sl">{'  '}--url https://api.allx.io/v1/instances/</span>
                <span className="tk-cp">in_000000000000</span>
                <span className="tk-sl">/customers/</span>
                <span className="tk-cp">re_000000000000</span>
                <span className="tk-sl">/wallets \</span>{'\n'}
                <span className="tk-sl">{'  '}--header </span>
                <span className="tk-am">'Authorization: Bearer YOUR_API_KEY'</span>
                <span className="tk-sl"> \</span>{'\n'}
                <span className="tk-sl">{'  '}--header </span>
                <span className="tk-am">'Content-Type: application/json'</span>
                <span className="tk-sl"> \</span>{'\n'}
                <span className="tk-sl">{'  '}--header </span>
                <span className="tk-am">'Idempotency-Key: 7b3125e9-cfd0-4bf6-b516-724d27163c45'</span>
                <span className="tk-sl"> \</span>{'\n'}
                <span className="tk-sl">{'  '}--data </span>
                <span className="tk-tx">{`'{\n    "network": "base",\n    "name": "Corporate Liquidity Balance",\n    "supported_assets": ["USDC", "BRL_PIX"],\n    "settlement_rail": "instant_t0"\n  }'`}</span>
              </code>
            ) : (
              <code className="tk-tx">{CREATE_SNIPPETS[tab]}</code>
            )}
          </pre>
        </div>

        {/* Create Wallet JSON Response Card (#2:158) */}
        <div className="docs-code-card">
          <div className="docs-code-head">
            <div className="docs-resp-status">
              <span className="docs-dot-green" />
              <span className="docs-resp-label mono">{respLabel}</span>
            </div>
            <button
              type="button"
              className="docs-copy-link mono"
              onClick={() => copyText(CREATE_RESPONSE, setCopiedRes)}
            >
              {copiedRes ? copiedLabel : copyJsonLabel}
            </button>
          </div>
          <pre className="docs-code-pre mono">
            <code>
              {'{\n'}
              {'  '}<span className="tk-cp">"id"</span>: <span className="tk-em">"wl_allx_99042"</span>,{'\n'}
              {'  '}<span className="tk-cp">"network"</span>: <span className="tk-em">"base"</span>,{'\n'}
              {'  '}<span className="tk-cp">"address"</span>: <span className="tk-em">"0x1234567890abcdef1234567890abcdef12345678"</span>,{'\n'}
              {'  '}<span className="tk-cp">"name"</span>: <span className="tk-em">"Corporate Liquidity Balance"</span>,{'\n'}
              {'  '}<span className="tk-cp">"status"</span>: <span className="tk-em">"active"</span>,{'\n'}
              {'  '}<span className="tk-cp">"supported_assets"</span>: [<span className="tk-em">"USDC"</span>, <span className="tk-em">"BRL_PIX"</span>],{'\n'}
              {'  '}<span className="tk-cp">"created_at"</span>: <span className="tk-em">"2026-03-30T14:22:00.000Z"</span>{'\n'}
              {'}'}
            </code>
          </pre>
        </div>
      </div>
    </ClickSpark>
  )
}
