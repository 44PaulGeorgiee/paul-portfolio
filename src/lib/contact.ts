/**
 * Contact submission.
 *
 * The browser posts to the same-origin API route. The Make webhook URL is
 * only read by the server-side route and is never bundled into the client.
 */

export const MAX_NAME = 80
export const MAX_EMAIL = 254
export const MAX_MESSAGE = 5000

// Built from \u escapes so the source stays pure ASCII.
// Control chars U+0000-U+001F and U+007F; when newlines are allowed, tab,
// LF and CR survive. Zero-width and bidi marks always go.
const CTRL_NO_NL = new RegExp('[\\u0000-\\u001F\\u007F]', 'g')
const CTRL_KEEP_NL = new RegExp('[\\u0000-\\u0008\\u000B\\u000C\\u000E-\\u001F\\u007F]', 'g')
const ZERO_WIDTH = new RegExp('[\\u200B-\\u200F\\u202A-\\u202E\\u2060\\uFEFF]', 'g')

export function sanitize(input: string, allowNewlines = false): string {
  const controls = allowNewlines ? CTRL_KEEP_NL : CTRL_NO_NL
  return input.replace(controls, '').replace(ZERO_WIDTH, '')
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type Lead = {
  name: string
  email: string
  message: string
  /** Honeypot. Empty for a person. */
  website: string
}

export type SubmitResult = { via: 'webhook' }

/** Read, trim, cap and sanitise the form fields. Returns null if a required
 *  field is missing or the email does not look like one. */
export function readLead(data: FormData): Lead | null {
  const name = sanitize(String(data.get('name') ?? '').trim()).slice(0, MAX_NAME)
  const email = sanitize(String(data.get('email') ?? '').trim()).slice(0, MAX_EMAIL)
  const message = sanitize(String(data.get('message') ?? '').trim(), true).slice(0, MAX_MESSAGE)
  if (!name || !email || !message || !EMAIL_RE.test(email)) return null
  const website = String(data.get('website') ?? '')
  if (website) return null
  return { name, email, message, website }
}

export class SubmitError extends Error {}

export async function submitLead(lead: Lead): Promise<SubmitResult> {
  const { name, email, message } = lead
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, message }),
  })
  const body = await res.json().catch(() => null)
  if (!res.ok) {
    throw new SubmitError(body?.error || 'Message delivery failed. Please try again later.')
  }
  if (body?.success !== true) {
    throw new SubmitError('The contact service returned an unexpected response.')
  }

  return { via: 'webhook' }
}
