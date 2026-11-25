import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    forgotPassword: {
      generateEmailSubject: () => 'Redefinição de senha — Painel ALL X',
      generateEmailHTML: (args) => {
        const token = args?.token || ''
        const user = args?.user as { name?: string; email?: string } | undefined
        const serverURL = (process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001').replace(/\/+$/, '')
        const resetURL = `${serverURL}/admin/reset/${token}`
        const firstName = (user?.name || user?.email || '').split('@')[0].split(' ')[0]
        const greeting = firstName ? `Olá, ${firstName}` : 'Olá'

        return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Redefinição de senha — ALL X</title>
</head>
<body style="margin:0;padding:0;background-color:#050506;color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#050506;padding:40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:540px;background-color:#0d0d0f;border:1px solid #222227;border-radius:12px;overflow:hidden;">
          <tr>
            <td style="height:3px;background:linear-gradient(90deg,#b56d48,#d98e68,#e2a383);font-size:0;line-height:0;">&nbsp;</td>
          </tr>
          <tr>
            <td style="padding:36px 36px 28px 36px;">
              <img src="${serverURL}/logo.png" alt="ALL X" height="26" style="display:block;height:26px;width:auto;margin-bottom:28px;" />
              <p style="margin:0 0 8px 0;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#d98e68;font-weight:600;">
                Segurança &middot; Painel de Conteúdo
              </p>
              <h1 style="margin:0 0 16px 0;font-size:24px;line-height:1.25;font-weight:600;color:#f4f4f5;letter-spacing:-0.02em;">
                ${greeting}, redefina sua senha
              </h1>
              <p style="margin:0 0 28px 0;font-size:15px;line-height:1.6;color:#b4b4bb;">
                Recebemos uma solicitação para alterar a senha da sua conta no painel administrativo da <strong style="color:#f4f4f5;">ALL X</strong>. Clique no botão abaixo para criar uma nova senha:
              </p>
              <table role="presentation" cellspacing="0" cellpadding="0" style="margin:0 0 28px 0;">
                <tr>
                  <td align="center" style="border-radius:8px;background-color:#d98e68;">
                    <a href="${resetURL}" target="_blank" style="display:inline-block;padding:13px 26px;font-size:14px;font-weight:700;color:#1a0e07;text-decoration:none;border-radius:8px;">
                      Redefinir minha senha
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:0 0 10px 0;font-size:12.5px;line-height:1.5;color:#85858d;">
                Se o botão não abrir, copie e cole este endereço no seu navegador:
              </p>
              <p style="margin:0 0 24px 0;font-size:12px;line-height:1.5;word-break:break-all;background-color:#141417;border:1px solid #222227;border-radius:6px;padding:10px 12px;color:#e2a383;">
                ${resetURL}
              </p>
              <p style="margin:0;font-size:12.5px;line-height:1.55;color:#85858d;border-top:1px solid #1e1e23;padding-top:18px;">
                Este link é temporário e expira automaticamente. Se você não solicitou a redefinição, pode ignorar este e-mail com segurança — sua senha atual continua protegida.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 36px;background-color:#09090b;border-top:1px solid #1a1a1f;font-size:11.5px;color:#6c6c75;">
              &copy; 2026 ALL X &middot; Painel de Conteúdo Institucional
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
      },
    },
  },
  access: {
    // Admin ve e gerencia todos; editor so le e edita a propria conta (/admin/account).
    read: ({ req }) =>
      req.user ? (req.user.role === 'admin' ? true : { id: { equals: req.user.id } }) : false,
    create: ({ req }) => (req.user ? req.user.role === 'admin' : false),
    update: ({ req, id }) =>
      req.user ? (req.user.role === 'admin' ? true : req.user.id === id) : false,
    delete: ({ req }) => req.user?.role === 'admin',
  },
  labels: {
    singular: 'Membro da Equipe',
    plural: 'Equipe & Acessos',
  },
  admin: {
    hideAPIURL: true,
    hidden: ({ user }) => (user as { role?: string } | null)?.role !== 'admin',
    useAsTitle: 'email',
    group: 'Administração',
    description: 'Gerencie quem pode acessar e editar o conteúdo da documentação da ALL X.',
  },
  fields: [
    {
      name: 'avatar',
      type: 'text',
      label: 'Foto de Perfil',
      admin: {
        components: {
          Field: '/components/admin/AvatarField#default',
        },
      },
    },
    {
      name: 'name',
      type: 'text',
      label: 'Nome Completo',
    },
    {
      name: 'role',
      type: 'select',
      defaultValue: 'admin',
      label: 'Perfil de Acesso',
      access: {
        // Ninguem (alem de admin) altera perfis, evitando escalada de privilegio.
        update: ({ req }) => req.user?.role === 'admin',
      },
      options: [
        { label: 'Administrador Geral', value: 'admin' },
        { label: 'Editor de Conteúdo', value: 'editor' },
      ],
    },
  ],
}
