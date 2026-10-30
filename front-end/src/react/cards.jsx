import SpotlightCard from './bits/SpotlightCard'
import TiltedCard from './bits/TiltedCard'

const surface = {
  '--spotlight-card-surface': 'rgba(22, 23, 29, 0.72)',
  '--spotlight-card-border': 'rgba(255, 255, 255, 0.08)',
  '--spotlight-card-shadow': '0 20px 40px -24px rgba(0, 0, 0, 0.65)',
  backdropFilter: 'blur(20px)',
}
const glow = 'rgba(217, 142, 104, 1)'

/** 3D Tilted card for the 4 "How it works" steps (Receba, Cote, Converta, Liquide). */
export function StepTiltCard({ n, sub, title, text }) {
  return (
    <TiltedCard
      containerWidth="100%"
      containerHeight="224px"
      imageWidth="100%"
      imageHeight="224px"
      rotateAmplitude={8}
      scaleOnHover={1.02}
      glare={0.28}
      glareColor="#d98e68"
      radius={18}
      intro={false}
      showTooltip={false}
    >
      <div style={{
        height: '100%', width: '100%', padding: 24,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        background: 'linear-gradient(155deg, rgba(27, 29, 38, 0.92), rgba(16, 17, 23, 0.95))',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{
            fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 500, color: 'var(--accent)',
          }}>{n}</span>
          <span style={{
            fontSize: 12, color: 'var(--muted)',
          }}>{sub}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <h3 style={{ margin: 0, fontSize: 20, lineHeight: '26px', fontWeight: 600, letterSpacing: '-0.02em', color: '#fff' }}>{title}</h3>
          <p style={{ margin: 0, fontSize: 13.5, lineHeight: '20px', fontWeight: 400, color: 'var(--muted)' }}>{text}</p>
        </div>
      </div>
    </TiltedCard>
  )
}

/** Product card with a subtle copper spotlight that follows the cursor. */
export function ModuleCard({ title, text }) {
  return (
    <SpotlightCard
      spotlightColor={glow}
      intensity={0.18}
      style={{
        ...surface, padding: '26px 28px', borderRadius: 18,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 14, height: '100%',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <h3 style={{ margin: 0, fontSize: 19, lineHeight: '25px', fontWeight: 600, letterSpacing: '-0.02em', color: '#fff' }}>{title}</h3>
        <p style={{ margin: 0, fontSize: 14, lineHeight: '21.5px', fontWeight: 400, color: 'var(--muted)' }}>{text}</p>
      </div>
      <span style={{ color: 'var(--accent-soft)', fontSize: 13, fontWeight: 500 }}>ALL X</span>
    </SpotlightCard>
  )
}

/** Application / use-case article card. */
export function ArticleCard({ tag, title, text }) {
  return (
    <SpotlightCard
      spotlightColor={glow}
      intensity={0.18}
      style={{ ...surface, padding: 26, borderRadius: 16, display: 'flex', flexDirection: 'column', gap: 10, height: '100%' }}
    >
      <small style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--accent-soft)' }}>{tag}</small>
      <h3 style={{ margin: 0, fontSize: 17, lineHeight: '23px', fontWeight: 600, letterSpacing: '-0.015em' }}>{title}</h3>
      <p style={{ margin: 0, fontSize: 13.5, lineHeight: '20.5px', fontWeight: 400, color: 'var(--muted)' }}>{text}</p>
    </SpotlightCard>
  )
}
