import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { pt } from '@payloadcms/translations/languages/pt'
import { Users } from './collections/Users'
import { Categories } from './collections/Categories'
import { Pages } from './collections/Pages'
import { seedDocumentation } from './seed'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001',
  secret: process.env.PAYLOAD_SECRET || 'allx-enterprise-cms-secret-key-2026',
  i18n: {
    supportedLanguages: { pt },
    fallbackLanguage: 'pt',
  },
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: ' — Painel de Conteúdo ALL X',
    },
  },
  editor: lexicalEditor(),
  db: sqliteAdapter({
    push: false,
    client: {
      url: process.env.DATABASE_URI || 'file:./allx-cms.db',
    },
  }),
  collections: [Categories, Pages, Users],
  cors: ['http://localhost:3000', 'http://localhost:3001', '*'],
  csrf: ['http://localhost:3000', 'http://localhost:3001'],
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  onInit: async (payload) => {
    await seedDocumentation(payload)
  },
})
