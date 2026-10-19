import { ArrowLeft } from '@/components/slab'
import { useNavigate } from 'react-router-dom'
import { profile } from '@/data/profile'

/** General website terms; project-specific work requires a separate agreement. */
export default function ToS() {
  const navigate = useNavigate()

  return (
    <main className="legal-page" aria-label="Terms of Service">
      <div className="legal-page__card">
        <button
          className="legal-page__back"
          onClick={() => navigate('/')}
          aria-label="Back to home"
        >
          <ArrowLeft weight="bold" size={15} aria-hidden="true" />
          Back to home
        </button>

        <h1 className="legal-page__title">Terms of Service</h1>
        <p className="legal-page__updated">Last updated: 2026-10-19</p>

        <div className="legal-page__body">
          <h2>Using this site</h2>
          <p>This site is a portfolio operated by {profile.name}. You may browse it for personal and professional evaluation. Do not misuse the site or submit information you are not authorized to share.</p>

          <h2>Portfolio demonstrations</h2>
          <p>Items labeled as prototypes or templates are illustrative and may not be connected to live systems. They do not represent client deployments or guarantee a particular result.</p>

          <h2>Services</h2>
          <p>Service descriptions are informational. Any project scope, fees, delivery dates, data handling, and ongoing support must be agreed in writing before work begins. No financial or operational outcome is guaranteed by this site.</p>

          <h2>Content and third-party marks</h2>
          <p>Portfolio text and original materials are presented for evaluation. Third-party names and marks remain the property of their respective owners. These general terms are not jurisdiction-specific legal advice and do not replace a signed project agreement.</p>

          <h2>Contact</h2>
          <p>
            {profile.email
              ? <>Questions about these terms: <a href={`mailto:${profile.email}`}>{profile.email}</a></>
              : 'A contact address has not been configured for this site.'}
          </p>
        </div>
      </div>
    </main>
  )
}
