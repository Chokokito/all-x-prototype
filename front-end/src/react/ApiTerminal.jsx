import { useState } from 'react'

/** API terminal with a working "copy" action. */
export default function ApiTerminal({
  title = 'Exemplo conceitual',
  disclaimer = 'Não é uma especificação de API',
  lang = 'pt',
  copyLabel = 'Copiar',
  copiedLabel = 'Copiado ✓',
}) {
  const [copied, setCopied] = useState(false)
  const payload = lang === 'pt'
    ? `{
  "tipo": "exemplo conceitual",
  "disponibilidade": "a confirmar",
  "escopo_tecnico": "a validar"
}`
    : `{
  "type": "conceptual example",
  "availability": "to be confirmed",
  "technical_scope": "to be validated"
}`

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(payload)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch { /* clipboard unavailable */ }
  }

  return (
    <div className="glass" style={{ padding: 'clamp(18px, 4vw, 32px)', display: 'flex', flexDirection: 'column', gap: 16, minWidth: 0, maxWidth: '100%' }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap',
        paddingBottom: 16, borderBottom: '1px solid var(--line)', fontFamily: 'var(--mono)', fontSize: 12,
      }}>
        <span style={{ color: 'var(--muted)' }}>{title}</span>
        <span style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <button onClick={copy} style={{
            background: 'none', border: '1px solid var(--line-2)', color: 'var(--muted)', borderRadius: 6,
            padding: '2px 8px', font: 'inherit', cursor: 'pointer',
          }}>{copied ? copiedLabel : copyLabel}</button>
          <span style={{ color: 'var(--accent)' }}>{disclaimer}</span>
        </span>
      </div>
      <pre style={{
        margin: 0, overflowX: 'auto', fontFamily: 'var(--mono)', fontSize: 12, lineHeight: '19.5px',
        color: 'var(--text-2)',
      }}><code>{payload}</code></pre>
    </div>
  )
}
