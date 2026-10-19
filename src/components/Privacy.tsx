import { ArrowLeft } from '@/components/slab'
import { useNavigate } from 'react-router-dom'
import { profile } from '@/data/profile'

/** Privacy information based on the current client-side implementation. */
export default function Privacy() {
  const navigate = useNavigate()

  return (
    <main className="legal-page" aria-label="Privacy Policy">
      <div className="legal-page__card">
        <button
          className="legal-page__back"
          onClick={() => navigate('/')}
          aria-label="Back to home"
        >
          <ArrowLeft weight="bold" size={15} aria-hidden="true" />
          Back to home
        </button>

        <h1 className="legal-page__title">Privacy Policy</h1>
        <p className="legal-page__updated">Last updated: 2026-10-19</p>

        <div className="legal-page__body">
          <h2>Who this covers</h2>
          <p>This policy describes this portfolio website, operated by {profile.name} in the Philippines.</p>

          <h2>What is collected</h2>
          <p>The site stores theme and accessibility preferences in your browser's local storage. The contact form validates the name, email address, and message in the browser. No analytics service is configured in this repository.</p>

          <h2>Contact form</h2>
          <p>When a contact endpoint is configured, the form sends its fields to that endpoint; the endpoint operator's handling and retention practices apply and should be documented before use. Without an endpoint, the form uses an email-app handoff when a recipient address is configured. If neither is configured, the form reports that contact is unavailable and does not send or store the submission.</p>

          <h2>Storage and deletion</h2>
          <p>Theme and accessibility preferences remain in your browser until you clear the site's local storage. This site does not define a retention period for a future contact endpoint; configure that policy with the endpoint before enabling submissions.</p>

          <h2>Contact</h2>
          <p>
            {profile.email
              ? <>Questions about this policy: <a href={`mailto:${profile.email}`}>{profile.email}</a></>
              : 'A privacy contact address has not been configured for this site.'}
          </p>
        </div>
      </div>
    </main>
  )
}
