import { useState } from 'react'
import ClickSpark from './bits/ClickSpark.tsx'

const ILLUSTRATIVE_SNIPPET =
  '// Exemplo conceitual. Endpoints, autenticação e parâmetros devem ser confirmados com a ALL X.'

const ILLUSTRATIVE_RESPONSE = `{
  "example": "illustrative only",
  "technical_scope": "to be confirmed"
}`

const BALANCE_REQ = '// Exemplo conceitual. Não representa uma chamada real.'

const BALANCE_RESPONSE = `{
  "example": "illustrative only",
  "response_schema": "to be confirmed"
}`

const CopyIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
)

export default function DocsCodeCard({
  mode = 'create',
  snippets = null,
  copyLabel = 'Copiar',
  copiedLabel = 'Copiado ✓',
  copyJsonLabel = 'Copiar JSON',
  respLabel = 'Response 201 Created',
  reqLabel = 'cURL GET /v1/wallets/:id/balances',
  respSub = 'Multicurrency Payload',
}) {
  const [tab, setTab] = useState('Example')
  const [copiedReq, setCopiedReq] = useState(false)
  const [copiedRes, setCopiedRes] = useState(false)

  const customCurl = snippets?.curl?.trim() || ''
  const customNode = snippets?.nodejs?.trim() || ''
  const customPython = snippets?.python?.trim() || ''
  const customGo = snippets?.go?.trim() || ''
  const customResp = snippets?.responseJson?.trim() || ''

  const mergedSnippets = {
    ...(customCurl ? { cURL: customCurl } : {}),
    ...(customNode ? { 'Node.js': customNode } : {}),
    ...(customPython ? { Python: customPython } : {}),
    ...(customGo ? { Go: customGo } : {}),
    ...(!customCurl && !customNode && !customPython && !customGo
      ? { Example: ILLUSTRATIVE_SNIPPET }
      : {}),
  }
  const activeTab = mergedSnippets[tab] ? tab : Object.keys(mergedSnippets)[0]

  const copyText = (text, setter) => {
    navigator.clipboard?.writeText(text)
    setter(true)
    setTimeout(() => setter(false), 1800)
  }

  if (mode === 'balance') {
    const balanceReqText = customCurl || BALANCE_REQ
    const balanceRespText = customResp || BALANCE_RESPONSE
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
                onClick={() => copyText(balanceReqText, setCopiedReq)}
              >
                <CopyIcon />
                <span>{copiedReq ? copiedLabel : copyLabel}</span>
              </button>
            </div>
            <pre className="docs-code-pre mono">
              <code className="tk-tx">{balanceReqText}</code>
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
                  onClick={() => copyText(balanceRespText, setCopiedRes)}
                >
                  {copiedRes ? copiedLabel : copyJsonLabel}
                </button>
              </div>
            </div>
            <pre className="docs-code-pre mono">
              <code className="tk-tx">{balanceRespText}</code>
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
              {Object.keys(mergedSnippets).map((langKey) => (
                <button
                  key={langKey}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === langKey}
                  className={`docs-tab mono ${activeTab === langKey ? 'is-active' : ''}`}
                  onClick={() => setTab(langKey)}
                >
                  {langKey}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="docs-copy-btn mono"
              onClick={() => copyText(mergedSnippets[activeTab], setCopiedReq)}
            >
              <CopyIcon />
              <span>{copiedReq ? copiedLabel : copyLabel}</span>
            </button>
          </div>
          <pre className="docs-code-pre mono">
            <code className="tk-tx">{mergedSnippets[activeTab]}</code>
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
              onClick={() => copyText(customResp || ILLUSTRATIVE_RESPONSE, setCopiedRes)}
            >
              {copiedRes ? copiedLabel : copyJsonLabel}
            </button>
          </div>
          <pre className="docs-code-pre mono">
            <code className="tk-tx">{customResp || ILLUSTRATIVE_RESPONSE}</code>
          </pre>
        </div>
      </div>
    </ClickSpark>
  )
}
