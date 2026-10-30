import Magnet from './bits/Magnet'
import StarBorder from './bits/StarBorder'
import ClickSpark from './bits/ClickSpark'

/**
 * Interactive Stage CTA panel:
 * Executive institutional presentation without decorative filler badges.
 */
export default function StageCtaIsland({
  badge = 'Próximo passo',
  title = 'Mova o dinheiro da sua empresa globalmente com uma única camada operacional.',
  text = 'Receber. Converter. Enviar. Liquidar. Com clareza operacional, compliance e uma única experiência.',
  primaryLabel = 'Fale com a ALL X',
  secondaryLabel = 'Documentação da API',
  corridorsLabel = 'Moedas e trilhos conectados',
  steps = ['Recebimento em fiat ou stablecoins', 'Conversão com cotação transparente', 'Liquidação nos trilhos locais'],
  metrics = [
    { k: 'Moedas', v: 'USD, EUR, BRL' },
    { k: 'Stablecoins', v: 'USDC, USDT' },
    { k: 'Trilhos', v: 'Pix, ACH, SWIFT, SEPA' },
  ],
}) {
  return (
    <ClickSpark
      sparkColor={['#e8a983', '#d98e68', '#ffffff']}
      sparkSize={10}
      sparkRadius={36}
      sparkCount={10}
      duration={520}
      shape="line"
      glow={0.5}
    >
      <div className="stage-card">
        <div className="stage-card__mesh" aria-hidden="true" />
        <div className="stage-card__halo" aria-hidden="true" />

        <div className="stage-card__grid">
          <div className="stage-card__pitch">
            <span className="eyebrow">{badge}</span>

            <h2 className="stage-card__title">{title}</h2>
            <p className="stage-card__sub">{text}</p>

            <div className="stage-card__actions">
              <Magnet padding={80} magnetStrength={2} scale={1.03} tilt={4}>
                <StarBorder
                  as="a"
                  href="mailto:contato@allx.global"
                  color="#ffdcc6"
                  trailColor="#d98e68"
                  backgroundColor="linear-gradient(165deg, #e8a983 0%, #d98e68 100%)"
                  textColor="#1a0e07"
                  borderColor="rgba(255, 220, 198, 0.4)"
                  radius={12}
                  thickness={1.5}
                  duration={3.8}
                  stars={1}
                  glow={0.6}
                  style={{
                    boxShadow: '0 14px 40px -10px rgba(217, 142, 104, 0.45)',
                    padding: '14px 28px',
                  }}
                >
                  <span>{primaryLabel}</span>
                </StarBorder>
              </Magnet>

              <Magnet padding={60} magnetStrength={2.5} scale={1.02}>
                <StarBorder
                  as="a"
                  href="#cms"
                  color="#d98e68"
                  trailColor="#64748b"
                  backgroundColor="rgba(255, 255, 255, 0.04)"
                  textColor="#ffffff"
                  borderColor="rgba(255, 255, 255, 0.14)"
                  radius={12}
                  thickness={1}
                  duration={5}
                  stars={1}
                  glow={0.35}
                  hover="reveal"
                  style={{ padding: '14px 24px', fontWeight: 500 }}
                >
                  <span>{secondaryLabel}</span>
                </StarBorder>
              </Magnet>
            </div>

            <ul className="stage-card__steps">
              {steps.map((s) => (
                <li key={s}>
                  <span className="stage-card__check" aria-hidden="true">—</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="stage-card__telemetry" aria-label={corridorsLabel}>
            <div className="stage-card__tel-head">
              <span>{corridorsLabel}</span>
            </div>

            <div className="stage-card__routes">
              <div className="stage-card__route">
                <div>
                  <small>Global Accounts</small>
                  <strong>Recebimento internacional em USD e EUR</strong>
                </div>
                <span className="stage-card__pill">ACH · SWIFT · SEPA</span>
              </div>
              <div className="stage-card__route">
                <div>
                  <small>Stablecoin Gateway</small>
                  <strong>Conversão entre fiat e USDC / USDT</strong>
                </div>
                <span className="stage-card__pill">Cotação transparente</span>
              </div>
              <div className="stage-card__route">
                <div>
                  <small>Global Payments & Payables</small>
                  <strong>Liquidação local para fornecedores e parceiros</strong>
                </div>
                <span className="stage-card__pill">Pix · Wire · SEPA</span>
              </div>
            </div>

            <dl className="stage-card__metrics">
              {metrics.map((m) => (
                <div key={m.k}>
                  <dt>{m.k}</dt>
                  <dd>{m.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </ClickSpark>
  )
}
