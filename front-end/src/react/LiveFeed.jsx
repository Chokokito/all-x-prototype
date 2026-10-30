import { useEffect, useState } from 'react'

const wrap = {
  display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center', justifyContent: 'space-between',
  padding: 16, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 12,
  fontFamily: 'var(--mono)', fontSize: 12,
}

/** Realtime FX routing feed — ticks a new tx id and execution time. */
export default function LiveFeed({ tag = 'ROTEAMENTO FX', exec = 'Tempo de execução:' }) {
  const [tx, setTx] = useState(88942)
  const [ms, setMs] = useState(1.4)

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => {
      setTx((n) => n + 1)
      setMs(+(1.2 + Math.random() * 0.5).toFixed(1))
    }, 3500)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={wrap} role="status" aria-live="off">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <span style={{
          padding: '2px 8px', borderRadius: 4, background: 'rgba(217,142,104,0.15)',
          color: 'var(--accent)', fontWeight: 600, fontSize: 11,
        }}>{tag}</span>
        <span style={{ color: 'var(--muted)' }}>tx_{tx} • USD/BRL/EUR multi-rail</span>
      </div>
      <span style={{ color: 'var(--text-2)' }}>
        {exec} <b style={{ fontWeight: 600, color: 'var(--ok)' }}>{ms}s</b>
      </span>
    </div>
  )
}
