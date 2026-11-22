import { ArrowUpRight, Briefcase, Database, FlowArrow, MapPin, Plug, type Icon } from '@/components/slab'
import { Link } from 'react-router-dom'
import { profile } from '@/data/profile'

/**
 * AboutGrid - the About view with naturally flowing content.
 *
 * One glass sheet, two columns: who you are on the left, the illustration
 * on the right. The timeline and bio remain part of the document flow.
 *
 * The left column is a ladder, not a paragraph block: one display statement,
 * one line of context, then the four things you do - each carrying the marks
 * of the tools it is built with. The tools are the proof, so they are the
 * visual. Swap the marks below for your own (any square SVG/PNG in public/).
 */

type Capability = {
  index: string
  title: string
  Icon: Icon
}

const CAPABILITIES: Capability[] = [
  { index: '01', title: 'Healthcare operations', Icon: Briefcase },
  { index: '02', title: 'Quality assurance & reporting', Icon: Database },
  { index: '03', title: 'Workflow improvement', Icon: FlowArrow },
  { index: '04', title: 'APIs & AI automation · developing', Icon: Plug },
]

export default function AboutGrid() {
  return (
    <section className="pgrid agrid" aria-labelledby="about-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">About</span>
        <h1 className="pgrid__title" id="about-title">
          Healthcare operations, improved with practical automation.
        </h1>
        <p className="pgrid__lede">
          I help healthcare businesses and growing teams improve efficiency, reporting, and day-to-day processes.
        </p>
      </header>

      <div className="home__glass agrid__glass">
        <div className="agrid__copy">
          <p className="agrid__note">
            I help healthcare clinics and SMBs fix operational bottlenecks, automate critical workflows, and recover lost revenue using AI, Make.com, and smart system design.
          </p>

          <section className="agrid__timeline" aria-labelledby="experience-title">
            <h2 className="agrid__timeline-title" id="experience-title">Experience &amp; Credentials</h2>
            <ol className="agrid__timeline-list">
              <li className="agrid__timeline-item">
                <h3>AI Automation Specialist &amp; Workflow Engineer <span>(2025 – Present)</span></h3>
                <p>Design and deploy end-to-end automation scenarios in Make.com and n8n focused on lead capture, payload normalization, and automated asset delivery for US SMB and healthcare workflows.</p>
              </li>
              <li className="agrid__timeline-item">
                <h3>Quality Analyst — Business Process Outsourcing <span>(Prior)</span></h3>
                <p>Audited operational workflows, enforced strict performance standards, and drove process compliance using Verint AQM—bringing a QA auditor's mindset to identifying bottlenecks and edge-case failures before building automations.</p>
              </li>
              <li className="agrid__timeline-item">
                <h3>Certifications &amp; Technical Training</h3>
                <p>Google AI Studio, GitHub Copilot, n8n, Make.com Multi-Module Architecture, TESDA Driving NC II Certification (2026).</p>
              </li>
            </ol>
          </section>

          <ul className="agrid__caps" role="list">
            {CAPABILITIES.map((c) => (
              <li key={c.index} className="agrid__cap">
                <span className="agrid__cap-marks">
                  <span className="agrid__mark">
                    <c.Icon size={19} weight="duotone" aria-hidden="true" />
                  </span>
                </span>
                <span className="agrid__cap-title">{c.title}</span>
                <span className="agrid__cap-index" aria-hidden="true">
                  {c.index}
                </span>
              </li>
            ))}
          </ul>

          {/* One plate for focus, location, and a route to the work. */}
          <div className="agrid__bar">
            <span className="agrid__cell">
              <span className="agrid__cell-mark">
                <Briefcase size={16} weight="fill" aria-hidden="true" />
              </span>
              <span className="agrid__cell-copy">
                <span className="agrid__cell-title">Healthcare operations</span>
                <span className="agrid__cell-meta">Quality · reporting · workflows</span>
              </span>
            </span>

            <span className="agrid__cell">
              <span className="agrid__cell-mark">
                <MapPin size={16} weight="fill" aria-hidden="true" />
              </span>
              <span className="agrid__cell-copy">
                <span className="agrid__cell-title">{profile.location}</span>
                <span className="agrid__cell-meta">{profile.workArrangement} · {profile.clientRegions}</span>
              </span>
            </span>

            <Link className="agrid__cell agrid__cell--wide" to="/projects">
              <span className="agrid__cell-mark">
                <FlowArrow size={16} weight="fill" aria-hidden="true" />
              </span>
              <span className="agrid__cell-copy">
                <span className="agrid__cell-title">Selected work</span>
                <span className="agrid__cell-meta">Two operations automation examples</span>
              </span>
              <ArrowUpRight className="agrid__cell-go" size={15} weight="bold" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="agrid__portrait">
          <img
            src={profile.hero.portraitSrc}
            alt={profile.hero.portraitAlt}
            loading="eager"
            decoding="async"
            width={400}
            height={400}
          />
        </div>
      </div>
    </section>
  )
}
