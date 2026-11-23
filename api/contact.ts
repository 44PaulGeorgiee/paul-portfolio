type ContactPayload = {
  name?: unknown
  email?: unknown
  message?: unknown
}

type ApiRequest = {
  method?: string
  body?: unknown
}

type ApiResponse = {
  status(code: number): ApiResponse
  json(body: unknown): void
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default async function handler(request: ApiRequest, response: ApiResponse) {
  if (request.method !== 'POST') {
    response.status(405).json({ error: 'Method not allowed.' })
    return
  }

  const body = request.body as ContactPayload | null
  const name = typeof body?.name === 'string' ? body.name.trim() : ''
  const email = typeof body?.email === 'string' ? body.email.trim() : ''
  const message = typeof body?.message === 'string' ? body.message.trim() : ''

  if (!name || !email || !message) {
    response.status(400).json({ error: 'Name, email, and message are required.' })
    return
  }
  if (name.length > 80 || email.length > 254 || message.length > 5000 || !EMAIL_RE.test(email)) {
    response.status(400).json({ error: 'Please check your contact details and try again.' })
    return
  }

  const webhookUrl = process.env.MAKE_WEBHOOK_URL
  if (!webhookUrl) {
    response.status(500).json({ error: 'The contact service is not configured.' })
    return
  }

  try {
    const webhookResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    })

    if (!webhookResponse.ok) {
      response.status(500).json({ error: 'Message delivery failed. Please try again later.' })
      return
    }

    response.status(200).json({ success: true })
  } catch {
    response.status(500).json({ error: 'Message delivery failed. Please try again later.' })
  }
}
