'use client'
import DocsCodeCard from '../react/DocsCodeCard.jsx'

const prevent = (e) => e.preventDefault()

/**
 * Renders the dynamic documentation blocks configured in Payload CMS (`docsBlocks`).
 */
export default function PayloadBlocksRenderer({ blocks = [], lang = 'pt', t }) {
  const isPt = lang === 'pt'

  return (
    <>
      {blocks.map((block, idx) => {
        const key = block.id || `${block.blockType}-${idx}`

        switch (block.blockType) {
          case 'callout':
            return (
              <div key={key} className="cms-callout">
                <div className="cms-callout-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D98E68" strokeWidth="2" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4M12 8h.01" />
                  </svg>
                </div>
                <p className="cms-callout-text">
                  <strong>{isPt ? block.boldPt : block.boldEn}</strong>{' '}
                  {isPt ? block.textPt : block.textEn}
                </p>
              </div>
            )

          case 'introPillars':
            return (
              <div key={key} className="cms-tech-desc">
                <p className="cms-body-p">
                  {isPt ? block.p1BeforePt : block.p1BeforeEn}
                  <code className="cms-inline-code mono">{block.p1Code}</code>
                  {isPt ? block.p1AfterPt : block.p1AfterEn}
                </p>
                {Array.isArray(block.pillars) && block.pillars.length > 0 && (
                  <ul className="cms-pillar-list">
                    {block.pillars.map((p, pIdx) => (
                      <li key={pIdx}>
                        <span>
                          <strong>{isPt ? p.boldPt : p.boldEn}</strong>
                          {isPt ? p.textPt : p.textEn}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )

          case 'prerequisites':
            return (
              <section key={key} id={block.anchorId || 'sec-prereq'} className="cms-section">
                <h2 className="cms-h2">
                  <span className="cms-hash">#</span>
                  <span>{isPt ? block.titlePt : block.titleEn}</span>
                </h2>

                <div className="cms-prereq-box">
                  <div className="cms-prereq-head">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#D98E68" strokeWidth="2" aria-hidden="true">
                      <path d="M9 11l3 3L22 4" />
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                    </svg>
                    <span>{isPt ? block.boxTitlePt : block.boxTitleEn}</span>
                  </div>
                  <ol className="cms-prereq-ol">
                    {(block.steps || []).map((step, sIdx) => (
                      <li key={sIdx}>
                        {isPt ? step.beforePt : step.beforeEn}
                        {step.highlightType === 'link' && (
                          <a href="#cms" className="cms-inline-link" onClick={prevent}>
                            {isPt ? step.highlightPt : step.highlightEn}
                          </a>
                        )}
                        {step.highlightType === 'code' && (
                          <code className="cms-inline-code-dark mono">
                            {isPt ? step.highlightPt : step.highlightEn}
                          </code>
                        )}
                        {isPt ? step.afterPt : step.afterEn}
                      </li>
                    ))}
                  </ol>
                </div>

                {block.compTitlePt && (
                  <div className="cms-compliance-box">
                    <div className="cms-compliance-head">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D98E68" strokeWidth="2" aria-hidden="true">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                      <span>{isPt ? block.compTitlePt : block.compTitleEn}</span>
                    </div>
                    <p className="cms-compliance-p">
                      {isPt ? block.compBeforePt : block.compBeforeEn}{' '}
                      <span className="cms-status-pill green mono">
                        <span className="pill-dot" /> {block.pillGreen || 'kyc_status: approved'}
                      </span>{' '}
                      {isPt ? block.compOrPt : block.compOrEn}{' '}
                      <span className="cms-status-pill amber mono">
                        <span className="pill-dot" /> {block.pillAmber || 'compliance_request'}
                      </span>
                      {isPt ? block.compAfterPt : block.compAfterEn}
                    </p>
                  </div>
                )}
              </section>
            )

          case 'apiEndpoint':
            return (
              <section key={key} id={block.anchorId || 'sec-create'} className="cms-section">
                <div className="cms-sec-header">
                  <h2 className="cms-h2">{isPt ? block.titlePt : block.titleEn}</h2>
                  <p className="cms-sec-sub">{isPt ? block.subPt : block.subEn}</p>
                </div>

                {block.hasNote && (
                  <div className="cms-important-note">
                    <span className="cms-note-dot" />
                    <p>
                      {isPt ? block.noteBeforePt : block.noteBeforeEn}
                      <code className="cms-amber-code mono">{block.noteCode1 || 'YOUR_API_KEY'}</code>
                      {isPt ? block.noteMidPt : block.noteMidEn}
                      <code className="cms-amber-code mono">{block.noteCode2 || 'in_000000000000'}</code>
                      {isPt ? block.noteAfterPt : block.noteAfterEn}
                    </p>
                  </div>
                )}

                <div>
                  <DocsCodeCard
                    mode={block.mode || 'create'}
                    copyLabel={t('cms.create.copy')}
                    copiedLabel={t('cms.create.copied')}
                    copyJsonLabel={t('cms.create.copyJson')}
                    reqLabel={block.reqLabel || t('cms.balance.reqLabel')}
                    respLabel={block.respLabel || t('cms.create.respLabel')}
                    respSub={
                      (isPt ? block.respSubPt : block.respSubEn) || t('cms.balance.respSub')
                    }
                  />
                </div>
              </section>
            )

          case 'featureGrid':
            return (
              <section key={key} id={block.anchorId || 'sec-settlement'} className="cms-section">
                <div className="cms-sec-header">
                  <h2 className="cms-h2">{isPt ? block.titlePt : block.titleEn}</h2>
                  <p className="cms-sec-sub">{isPt ? block.subPt : block.subEn}</p>
                </div>

                <div className="cms-feature-grid">
                  {(block.cards || []).map((card, cIdx) => {
                    const isGreen = card.variant !== 'copper'
                    return (
                      <div key={cIdx} className="cms-feat-card">
                        <div className={`cms-feat-icon ${isGreen ? 'green' : 'copper'}`}>
                          {isGreen ? (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4ADE80" strokeWidth="2" aria-hidden="true">
                              <path d="M7 7l10 10M17 7v10H7" />
                            </svg>
                          ) : (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D98E68" strokeWidth="2" aria-hidden="true">
                              <path d="M7 17L17 7M7 7h10v10" />
                            </svg>
                          )}
                        </div>
                        <h3>{isPt ? card.titlePt : card.titleEn}</h3>
                        <p>
                          {isPt ? card.textBeforePt : card.textBeforeEn}
                          {card.codeHighlight && (
                            <code className="cms-amber-code mono">{card.codeHighlight}</code>
                          )}
                          {isPt ? card.textAfterPt : card.textAfterEn}
                        </p>
                        <div className="cms-feat-event mono">{card.eventBadge}</div>
                      </div>
                    )
                  })}
                </div>
              </section>
            )

          case 'metadataBox':
            return (
              <section key={key} id={block.anchorId || 'sec-cms'} className="cms-section">
                <div className="cms-sec-header">
                  <h2 className="cms-h2">{isPt ? block.titlePt : block.titleEn}</h2>
                  <p className="cms-sec-sub">{isPt ? block.subPt : block.subEn}</p>
                </div>

                <div className="cms-metadata-box">
                  <p>
                    {isPt ? block.boxBeforePt : block.boxBeforeEn}
                    <code className="cms-copper-code mono">{block.code1 || 'customer_internal_id'}</code>
                    {isPt ? block.boxMidPt : block.boxMidEn}
                    <code className="cms-copper-code mono">{block.code2 || 'ledger_account'}</code>
                    {isPt ? block.boxAndPt : block.boxAndEn}
                    {isPt ? block.boxAfterPt : block.boxAfterEn}
                  </p>
                </div>
              </section>
            )

          default:
            return null
        }
      })}
    </>
  )
}
