'use client'
import { Children } from 'react'
import './fx.css'

/**
 * OrbitingCircles — itens em órbita em torno de um centro.
 * Uso:
 *   <OrbitingCircles radius={120} duration={24}> <Chip>USD</Chip> <Chip>EUR</Chip> </OrbitingCircles>
 * Os filhos são distribuídos uniformemente na órbita e mantêm-se sempre "em pé" (sem girar o texto).
 * Coloque o conteúdo central como filho de um wrapper relativo (ver `.fx-orbit-center`).
 */
export default function OrbitingCircles({
  children,
  radius = 120,
  duration = 24,
  reverse = false,
  showPath = true,
  startAngle = 0,
}) {
  const items = Children.toArray(children)
  const size = radius * 2
  return (
    <div className="fx-orbit" style={{ width: size, height: size }} aria-hidden="false">
      {showPath && <span className="fx-orbit-path" />}
      {items.map((child, i) => {
        const angle = startAngle + (360 / items.length) * i
        return (
          <div
            key={i}
            className="fx-orbit-item"
            style={{
              '--r': `${radius}px`,
              '--a': `${angle}deg`,
              animationDuration: `${duration}s`,
              animationDirection: reverse ? 'reverse' : 'normal',
            }}
          >
            {child}
          </div>
        )
      })}
    </div>
  )
}
