import { ArrowUpRight, Briefcase, Database, FlowArrow, MapPin, Plug, type Icon } from '@/components/slab'
import { Link } from 'react-router-dom'
import { profile } from '@/data/profile'

/**
 * AboutGrid - the About view as a fixed viewport.
 *
 * One glass sheet, two columns: who you are on the left, the illustration
 * on the right. Sized to the panel, so nothing here scrolls.
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
          <p className="agrid__lead">
            Better operations create room for better outcomes.
            <span> Start by understanding the real process.</span>
          </p>

          <p className="agrid__note">
            I'm a healthcare operations and AI automation specialist focused on operational efficiency, quality assurance, process improvement, workflow automation, reporting, and data processing. I work with healthcare businesses and clinics, as well as small and medium-sized businesses looking to improve how work gets done. My approach is to understand the current process, identify avoidable effort and potential revenue leaks, then scope practical improvements without making unsupported outcome claims.
          </p>

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
