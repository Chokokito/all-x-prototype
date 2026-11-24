import { use } from 'react'
import CmsDocsPage from '../../../components/CmsDocsPage'
import CommandSearchModal from '../../../components/CommandSearchModal'
import LangSwitchStage from '../../../components/LangSwitchStage'

export default function DocsRoutePage({ params }) {
  const resolved = params ? use(params) : {}
  const slugArr = resolved?.slug
  const initialSlug = Array.isArray(slugArr) && slugArr.length > 0 ? slugArr[0] : 'managed-wallets'

  return (
    <>
      <CommandSearchModal />
      <LangSwitchStage>
        <CmsDocsPage initialSlug={initialSlug} />
      </LangSwitchStage>
    </>
  )
}
