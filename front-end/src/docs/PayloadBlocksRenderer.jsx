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
              <aside key={key} className="cms-callout" role="note">
                <div className="cms-callout-head">
                  <svg className="cms-callout-ico" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                  <span className="cms-callout-label mono">
                    {isPt ? 'Especificação operacional' : 'Operational note'}
                  </span>
                </div>
                <p className="cms-callout-text">
                  <strong>{isPt ? block.boldPt : block.boldEn}</strong>{' '}
                  {isPt ? block.textPt : block.textEn}
                </p>
              </aside>
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
                  <span>{isPt ? block.titlePt : block.titleEn}</span>
                  <span className="cms-hash" aria-hidden="true">#</span>
                </h2>

                <div className="cms-prereq-box">
                  <div className="cms-prereq-head">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="3" y="4" width="18" height="16" rx="2" />
                      <path d="M7 9h10M7 13h6" />
                    </svg>
                    <span className="mono">{isPt ? block.boxTitlePt : block.boxTitleEn}</span>
                  </div>
                  <ol className="cms-prereq-ol">
                    {(block.steps || []).map((step, sIdx) => (
                      <li key={sIdx}>
                        <span className="cms-step-num mono">0{sIdx + 1}</span>
                        <span className="cms-step-body">
                          {isPt ? step.beforePt : step.beforeEn}
                          {step.highlightType === 'link' && (
                            <a href="/docs" className="cms-inline-link" onClick={prevent}>
                              {isPt ? step.highlightPt : step.highlightEn}
                            </a>
                          )}
                          {step.highlightType === 'code' && (
                            <code className="cms-inline-code-dark mono">
                              {isPt ? step.highlightPt : step.highlightEn}
                            </code>
                          )}
                          {isPt ? step.afterPt : step.afterEn}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>

                {block.compTitlePt && (
                  <div className="cms-compliance-box">
                    <div className="cms-compliance-head">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <path d="M9 12l2 2 4-4" />
                      </svg>
                      <span className="mono">{isPt ? block.compTitlePt : block.compTitleEn}</span>
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
                    snippets={block.snippets}
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
                        <div className="cms-feat-top">
                          <div className={`cms-feat-icon ${isGreen ? 'inbound' : 'outbound'}`}>
                            {isGreen ? (
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M7 7l10 10M17 7v10H7" />
                              </svg>
                            ) : (
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M7 17L17 7M7 7h10v10" />
                              </svg>
                            )}
                          </div>
                          <span className="cms-feat-idx mono">0{cIdx + 1}</span>
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
