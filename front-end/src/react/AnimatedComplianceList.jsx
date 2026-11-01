import React, { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

const ITEMS_PT = [
  {
    id: 'kyb',
    title: 'Atlas Global Trade S.A.',
    sub: 'KYB & Quadro Societário (UBO) validados',
    badge: 'KYB Verificado',
    tone: 'ok',
    time: 'agora',
    icon: 'M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6zM8.5 12l2.5 2.5 4.5-5',
  },
  {
    id: 'aml',
    title: 'Screening OFAC, ONU & PEP',
    sub: 'Monitoramento contínuo KYT · 0 alertas',
    badge: 'Aprovado',
    tone: 'ok',
    time: '1,2s',
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z',
  },
  {
    id: 'fx',
    title: 'Cotação Travada BRL → USDC',
    sub: 'Taxa 5,0418 · Spread institucional 0,28%',
    badge: 'Travada',
    tone: 'copper',
    time: 'T+0',
    icon: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6',
  },
  {
    id: 'rail',
    title: 'Liquidação Pix → Rede Solana',
    sub: 'R$ 504.180,00 → 100.000,00 USDC',
    badge: 'Liquidado',
    tone: 'ok',
    time: '1,8s',
    icon: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
  },
  {
    id: 'iban',
    title: 'Trilho SEPA Instant & ACH Ativos',
    sub: 'Reconciliação automática via Webhook',
    badge: 'Ativo',
    tone: 'copper',
    time: '24/7',
    icon: 'M3 10h18M5 10v8M9 10v8M15 10v8M19 10v8M3 20h18M12 3l9 5H3z',
  },
]

const ITEMS_EN = [
  {
    id: 'kyb',
    title: 'Atlas Global Trade S.A.',
    sub: 'Corporate KYB & UBO structure validated',
    badge: 'KYB Verified',
    tone: 'ok',
    time: 'now',
    icon: 'M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6zM8.5 12l2.5 2.5 4.5-5',
  },
  {
    id: 'aml',
    title: 'OFAC, UN & PEP Screening',
    sub: 'Continuous KYT monitoring · 0 hits',
    badge: 'Cleared',
    tone: 'ok',
    time: '1.2s',
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z',
  },
  {
    id: 'fx',
    title: 'Locked Quote BRL → USDC',
    sub: 'Rate 5.0418 · Institutional spread 0.28%',
    badge: 'Locked',
    tone: 'copper',
    time: 'T+0',
    icon: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6',
  },
  {
    id: 'rail',
    title: 'Pix → Solana Settlement',
    sub: 'R$ 504,180.00 → 100,000.00 USDC',
    badge: 'Settled',
    tone: 'ok',
    time: '1.8s',
    icon: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
  },
  {
    id: 'iban',
    title: 'SEPA Instant & ACH Rails Active',
    sub: 'Automated reconciliation via Webhook',
    badge: 'Active',
    tone: 'copper',
    time: '24/7',
    icon: 'M3 10h18M5 10v8M9 10v8M15 10v8M19 10v8M3 20h18M12 3l9 5H3z',
  },
]

export function AnimatedListItem({ children }) {
  const animations = {
    initial: { scale: 0.94, opacity: 0, y: -12 },
    animate: { scale: 1, opacity: 1, y: 0, originY: 0 },
    exit: { scale: 0.94, opacity: 0, y: 10 },
    transition: { type: 'spring', stiffness: 350, damping: 38 },
  }

  return (
    <motion.div {...animations} layout style={{ width: '100%' }}>
      {children}
    </motion.div>
  )
}

export default function AnimatedComplianceList({ lang = 'pt', delay = 2400 }) {
  const baseItems = lang === 'pt' ? ITEMS_PT : ITEMS_EN
  const [step, setStep] = useState(3)

  useEffect(() => {
    const id = setInterval(() => {
      setStep((s) => s + 1)
    }, delay)
    return () => clearInterval(id)
  }, [delay])

  // Keep top 4 items visible in a rolling window so the Magic UI list continuously animates
  const visibleItems = useMemo(() => {
    const list = []
    for (let i = 0; i < 4; i++) {
      const idx = (step - i + baseItems.length * 100) % baseItems.length
      const item = baseItems[idx]
      list.push({ ...item, uid: `${item.id}-${step - i}` })
    }
    return list
  }, [step, baseItems])

  return (
    <div
      style={{
        position: 'relative',
        width: 'min(430px, 100%)',
        height: '316px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        padding: '4px 2px',
        maskImage: 'linear-gradient(180deg, #000 72%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(180deg, #000 72%, transparent 100%)',
      }}
    >
      <AnimatePresence initial={false} mode="popLayout">
        {visibleItems.map((it) => {
          const isOk = it.tone === 'ok'
          return (
            <AnimatedListItem key={it.uid}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  background: '#111114',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 14px 28px -16px rgba(0, 0, 0, 0.65)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                  <span
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '9px',
                      background: '#18181c',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#e5a888',
                      display: 'grid',
                      placeItems: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d={it.icon} />
                    </svg>
                  </span>
                  <div style={{ minWidth: 0 }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '13.5px',
                        fontWeight: 500,
                        color: '#f4f4f5',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      <span>{it.title}</span>
                      <span
                        style={{
                          fontFamily: 'var(--mono)',
                          fontSize: '10.5px',
                          color: '#71717a',
                        }}
                      >
                        · {it.time}
                      </span>
                    </div>
                    <div
                      style={{
                        marginTop: '2px',
                        fontSize: '12px',
                        color: '#a1a1aa',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {it.sub}
                    </div>
                  </div>
                </div>

                <span
                  style={{
                    padding: '4px 9px',
                    borderRadius: '999px',
                    fontSize: '11.5px',
                    fontWeight: 500,
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                    background: isOk
                      ? 'rgba(74, 222, 128, 0.12)'
                      : 'rgba(217, 142, 104, 0.14)',
                    border: isOk
                      ? '1px solid rgba(74, 222, 128, 0.28)'
                      : '1px solid rgba(217, 142, 104, 0.3)',
                    color: isOk ? '#86efac' : '#e5a888',
                  }}
                >
                  {it.badge}
                </span>
              </div>
            </AnimatedListItem>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
