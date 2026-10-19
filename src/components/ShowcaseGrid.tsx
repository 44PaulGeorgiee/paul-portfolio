import type { CSSProperties } from 'react'
import { CalendarCheck, Database, FlowArrow, type Icon } from '@/components/slab'

type Concept = {
  title: string
  description: string
  steps: string[]
  Icon: Icon
}

const CONCEPTS: Concept[] = [
  {
    title: 'Clinic Appointment Workflow',
    description: 'An illustrative inquiry-to-status flow for appointment requests. It is not connected to a live clinic system.',
    steps: ['Inquiry capture', 'Lead tracking', 'Follow-up schedule', 'Status update'],
    Icon: CalendarCheck,
  },
  {
    title: 'Lead Management System',
    description: 'A prototype outline for keeping lead stages, follow-up activity, appointments, and conversion status visible.',
    steps: ['Capture', 'Pipeline stage', 'Follow-up', 'Appointment', 'Conversion'],
    Icon: FlowArrow,
  },
  {
    title: 'Operations Dashboard',
    description: 'A proposed reporting flow from operational data collection to indicators and a review dashboard.',
    steps: ['Collect data', 'Check quality', 'Track indicators', 'Review dashboard'],
    Icon: Database,
  },
]

export default function ShowcaseGrid() {
  return (
    <section className="pgrid sgrid ktools" aria-labelledby="showcase-title">
      <header className="pgrid__head ktools__head">
        <div className="ktools__head-copy">
          <span className="pgrid__eyebrow">Showcase · Prototype concepts</span>
          <h1 className="pgrid__title" id="showcase-title">
            See the workflow in action.
          </h1>
          <p className="pgrid__lede">
            Explore practical examples of how business processes, data, and automation can work together. These are concepts, not live client systems.
          </p>
        </div>
      </header>

      <div className="home__glass ktools__glass sgrid__glass">
        <div className="sgrid__method" aria-labelledby="showcase-concepts-title">
          <div className="sgrid__method-copy">
            <span className="sgrid__method-eyebrow">Illustrative only</span>
            <h2 className="sgrid__method-title" id="showcase-concepts-title">
              Process ideas,
              <br />
              <span>made visible.</span>
            </h2>
            <p className="sgrid__method-sub">
              No integrations are live, and no patient or client data is used in these outlines.
            </p>
          </div>

          <ol className="sgrid__stages" role="list">
            {CONCEPTS.map(({ title, description, steps, Icon }, i) => (
              <li key={title} className="sgrid__stage" style={{ '--i': i } as CSSProperties}>
                <span className="sgrid__stage-ghost" aria-hidden="true">0{i + 1}</span>
                <span className="sgrid__stage-icon" aria-hidden="true">
                  <Icon size={22} weight="duotone" />
                </span>
                <h3 className="sgrid__stage-label">{title}</h3>
                <span className="sgrid__chip">Prototype concept</span>
                <p className="sgrid__stage-body">{description}</p>
                <ul className="sgrid__stage-chips" role="list" aria-label={`${title} outline`}>
                  {steps.map((step) => <li key={step} className="sgrid__stage-chip">{step}</li>)}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}