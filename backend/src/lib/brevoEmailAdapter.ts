import type { EmailAdapter, SendEmailOptions } from 'payload'

type BrevoAdapterArgs = {
  apiKey: string
  defaultFromAddress: string
  defaultFromName: string
}

/**
 * Adaptador de e-mail via API HTTPS do Brevo (porta 443).
 * Necessario no plano gratuito do Render, que bloqueia portas SMTP (25/465/587).
 */
export function brevoHttpAdapter({
  apiKey,
  defaultFromAddress,
  defaultFromName,
}: BrevoAdapterArgs): EmailAdapter {
  return () => ({
    name: 'brevo-http',
    defaultFromAddress,
    defaultFromName,
    sendEmail: async (message: SendEmailOptions) => {
      const toList = Array.isArray(message.to) ? message.to : message.to ? [message.to] : []
      const to: Array<{ email: string; name?: string }> = []
      for (const entry of toList) {
        if (typeof entry === 'string' && entry.trim()) {
          to.push({ email: entry.trim() })
        } else if (entry && typeof entry === 'object' && 'address' in entry && entry.address) {
          to.push({
            email: String(entry.address),
            ...(entry.name ? { name: String(entry.name) } : {}),
          })
        }
      }

      if (to.length === 0) {
        throw new Error('Destinatário de e-mail ausente.')
      }

      const res = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          'api-key': apiKey,
        },
        body: JSON.stringify({
          sender: {
            email: defaultFromAddress,
            name: defaultFromName,
          },
          to,
          subject: message.subject || 'ALL X',
          htmlContent: message.html ? String(message.html) : undefined,
          textContent: message.text ? String(message.text) : undefined,
        }),
      })

      if (!res.ok) {
        const errBody = await res.text().catch(() => '')
        throw new Error(`Brevo API HTTP ${res.status}: ${errBody}`)
      }

      return res.json()
    },
  })
}
