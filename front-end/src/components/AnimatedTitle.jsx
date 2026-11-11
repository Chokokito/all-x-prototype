'use client'

import './AnimatedTitle.css'

// Section heading: a real semantic heading with a quiet fade-up (no per-word blur).
export default function AnimatedTitle({ text, level = 2, center = true, delay = 90, trigger = 'view' }) {
  const Tag = `h${level}`
  return (
    <Tag data-c="AnimatedTitle" className={`animated-title reveal ${center ? 'centered' : ''}`.trim()}>
      {text}
    </Tag>
  )
}
