'use client'

import ScrollVelocity from '../react/bits/ScrollVelocity'
import './RailsTicker.css'

const lines = [
  'ALL X = any currency × any rail × any market × any business  —',
  'USD / EUR / BRL  ·  USDC / USDT  ·  Pix / ACH / SWIFT / SEPA  —',
]

export default function RailsTicker() {
  return (
    <aside data-c="RailsTicker" className="ticker" aria-label="Brand Thesis">
      <div>
        <ScrollVelocity
          texts={lines}
          velocity={42}
          numCopies={5}
          fadeEdges={true}
          pauseOnHover={true}
          skewWithVelocity={6}
          fontSize="15px"
          fontWeight={600}
          color="#d98e68"
          gap={28}
        />
      </div>
    </aside>
  )
}
