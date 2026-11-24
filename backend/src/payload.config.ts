import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { pt } from '@payloadcms/translations/languages/pt'
import { Users } from './collections/Users'
import { Categories } from './collections/Categories'
import { Pages } from './collections/Pages'
import { seedDocumentation } from './seed'
import { migrations } from './migrations'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.NEXT_PUBLIC_SERVER_URL,
  'http://localhost:3000',
  'http://localhost:3001',
].filter((u): u is string => Boolean(u))

const dbUri = process.env.DATABASE_URI || 'file:./allx-cms.db'
const usePostgres = dbUri.startsWith('postgres://') || dbUri.startsWith('postgresql://')

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001',
  secret: process.env.PAYLOAD_SECRET || 'allx-enterprise-cms-secret-key-2026',
  i18n: {
    supportedLanguages: { pt },
    fallbackLanguage: 'pt',
  },
  admin: {
    theme: 'dark',
    importMap: { baseDir: path.resolve(dirname) },
    components: {
      views: {
        dashboard: { Component: '/components/admin/Welcome#default' },
      },
      graphics: {
        Logo: '/components/admin/Logo#default',
        Icon: '/components/admin/Icon#default',
      },
    },
    user: Users.slug,
    meta: {
      icons: [{ rel: 'icon', url: '/logo.png' }],
      titleSuffix: ' — Painel de Conteúdo ALL X',
    },
  },
  editor: lexicalEditor(),
  db: usePostgres
    ? postgresAdapter({
        push: false, // em producao o push e ignorado; usamos migrations
        prodMigrations: migrations, // roda as migrations pendentes ao iniciar
        pool: {
          connectionString: dbUri,
        },
      })
    : sqliteAdapter({
        push: true, // cria/atualiza tabelas automaticamente (sem precisar de migrations)
        client: {
          url: dbUri,
        },
      }),
  collections: [Categories, Pages, Users],
  cors: allowedOrigins,
  csrf: allowedOrigins,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  onInit: async (payload) => {
    await seedDocumentation(payload)
  },
})
