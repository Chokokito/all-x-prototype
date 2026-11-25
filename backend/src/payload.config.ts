import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { brevoHttpAdapter } from './lib/brevoEmailAdapter'
import { pt } from '@payloadcms/translations/languages/pt'
import { Users } from './collections/Users'
import { Categories } from './collections/Categories'
import { Pages } from './collections/Pages'
import { ContactRequests } from './collections/ContactRequests'
import { DocFeedback } from './collections/DocFeedback'
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

const brevoApiKey = process.env.BREVO_API_KEY?.trim()
const smtpHost = process.env.SMTP_HOST?.trim()
const smtpUser = process.env.SMTP_USER?.trim()
const smtpPass = process.env.SMTP_PASS?.trim()
const smtpPort = Number(process.env.SMTP_PORT || 587)
const smtpFrom = process.env.SMTP_FROM?.trim() || smtpUser
const smtpFromName = process.env.SMTP_FROM_NAME?.trim() || 'ALL X'

const emailAdapter = brevoApiKey
  ? brevoHttpAdapter({
      apiKey: brevoApiKey,
      defaultFromAddress: smtpFrom || 'no-reply@allx.global',
      defaultFromName: smtpFromName,
    })
  : smtpHost && smtpUser && smtpPass
    ? nodemailerAdapter({
        defaultFromAddress: smtpFrom || 'no-reply@allx.global',
        defaultFromName: smtpFromName,
        transportOptions: {
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        },
      })
    : undefined

export default buildConfig({
  ...(emailAdapter ? { email: emailAdapter } : {}),
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001',
  secret: (() => {
    const s = process.env.PAYLOAD_SECRET
    if (s) return s
    // Em producao o segredo e obrigatorio; o fallback so existe para dev local.
    if (process.env.NODE_ENV === 'production' && process.env.NEXT_PHASE !== 'phase-production-build') {
      throw new Error('PAYLOAD_SECRET nao definido')
    }
    return 'dev-only-insecure-secret'
  })(),
  i18n: {
    supportedLanguages: { pt },
    fallbackLanguage: 'pt',
  },
  admin: {
    theme: 'dark',
    avatar: {
      Component: '/components/admin/Avatar#default',
    },
    importMap: { baseDir: path.resolve(dirname) },
    components: {
      beforeNavLinks: [
        { path: '/components/admin/SiteLink#default', clientProps: { variant: 'nav', kind: 'home' } },
      ],
      actions: [
        { path: '/components/admin/SiteLink#default', clientProps: { variant: 'header', kind: 'site' } },
      ],
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
  collections: [Categories, Pages, DocFeedback, ContactRequests, Users],
  cors: allowedOrigins,
  csrf: allowedOrigins,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  onInit: async (payload) => {
    await seedDocumentation(payload)
  },
})
