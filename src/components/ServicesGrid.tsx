import type { CSSProperties } from 'react'
import { MagnetStraight, Timer, Trophy, CheckCircle, CalendarCheck, Database, FlowArrow, MagnifyingGlass, Briefcase } from '@/components/slab'
import type { Icon } from '@/components/slab'
import Autopilot, { TOOLS } from '@/components/Autopilot'

/**
 * ServicesGrid - the Services view on one glass sheet.
 *
 * Three bands, top to bottom: your three-step method (on a dark plate so it
 * is the first thing the eye lands on), the five services as cards that carry
 * the marks of what each one is built with, and the live automation demo
 * scaled into whatever height is left. Same object language as Home and
 * Projects: the glass, the bento card, plated marks, orange for the index
 * and the accent.
 *
 * Service copy and its illustrative workflow are maintained in this view.
 */

/* ---------- The method ---------- */

type Stage = {
  index: string
  label: string
  body: string
  Icon: Icon
  chips: string[]
}

const STAGES: Stage[] = [
  {
    index: '01',
    label: 'Understand',
    body: 'Map the process, people, tools, and handoffs.',
    Icon: MagnetStraight,
    chips: ['Current process', 'Constraints', 'Pain points'],
  },
  {
    index: '02',
    label: 'Improve',
    body: 'Choose practical changes that fit the existing tools.',
    Icon: Timer,
    chips: ['Workflow', 'Data', 'Access'],
  },
  {
    index: '03',
    label: 'Evaluate',
    body: 'Review the result and identify what still needs attention.',
    Icon: Trophy,
    chips: ['Reliability', 'Follow-up', 'Measurement'],
  },
]

/* ---------- The services ---------- */

// Example tool marks from /public/icons. Swap for the tools you actually use.
const GWS = '/icons/googleworkspace.svg'

type Service = {
  index: string
  title: string
  description: string
  chip: string
  logos: string[]
  bullets: string[]
  Icon: typeof FlowArrow
}

const SERVICES: Service[] = [
  {
    index: '01',
    title: 'Workflow Automation',
    description: 'Automate repetitive administrative tasks, notifications, follow-ups, and routine handoffs.',
    chip: 'Operations',
    logos: [],
    bullets: ['Reduce repeated data entry', 'Keep routine follow-ups moving', 'Make handoffs more consistent'],
    Icon: FlowArrow,
  },
  {
    index: '02',
    title: 'Data and Reporting',
    description: 'Build spreadsheet-based tools, operational dashboards, and reports that make performance easier to monitor.',
    chip: 'Visibility',
    logos: [GWS],
    bullets: ['Organize operational data', 'Make recurring reports easier', 'Track useful indicators'],
    Icon: Database,
  },
  {
    index: '03',
    title: 'Lead and Appointment Follow-Up',
    description: 'Design workflows for lead tracking, timely follow-ups, appointment requests, and status updates.',
    chip: 'Follow-through',
    logos: [],
    bullets: ['Keep request statuses visible', 'Schedule timely reminders', 'Reduce missed handoffs'],
    Icon: CalendarCheck,
  },
  {
    index: '04',
    title: 'Process Audits',
    description: 'Map existing workflows, identify repetitive steps and bottlenecks, and recommend where automation could help.',
    chip: 'Discovery',
    logos: [],
    bullets: ['Document the current workflow', 'Surface delays and duplication', 'Prioritize practical improvements'],
    Icon: MagnifyingGlass,
  },
  {
    index: '05',
    title: 'Privacy-Aware Workflow Planning',
    description: 'For healthcare workflows, define data access, security, privacy, and compliance needs before implementation.',
    chip: 'Healthcare',
    logos: [],
    bullets: ['Confirm information sensitivity', 'Plan access and permissions', 'Validate applicable requirements'],
    Icon: Briefcase,
  },
]

/** The tool marks, stacked horizontally on white tiles (same as Projects). */
function Marks({ service }: { service: Service }) {
  const ServiceIcon = service.Icon
  if (!service.logos.length) {
    return (
      <span className="bento__icon">
        <ServiceIcon size={22} />
      </span>
    )
  }
  return (
    <span className="bento__logos" aria-hidden="true">
      {service.logos.map((src) => (
        <span key={src} className="bento__logo">
          <img src={src} alt="" width={22} height={22} decoding="async" />
        </span>
      ))}
    </span>
  )
}

/* ---------- The page ---------- */

export default function ServicesGrid() {
  return (
    <section className="pgrid sgrid" aria-labelledby="services-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">Services</span>
        <h1 className="pgrid__title" id="services-title">
          Automation built around your business.
        </h1>
        <p className="pgrid__lede">
          I help teams identify repetitive tasks, connect disconnected tools, and create workflows that make day-to-day operations more efficient.
        </p>
      </header>

      <div className="home__glass sgrid__glass">
        {/* One dark plate, the headline on the left, the three stages wired
            in order on the right with a signal running them. */}
        <div className="sgrid__method" aria-labelledby="method-title">
          <div className="sgrid__method-copy">
            <span className="sgrid__method-eyebrow">Your Method</span>
            <h2 className="sgrid__method-title" id="method-title">
              Understand. Improve. Evaluate.
              <br />
              <span>Start with the process.</span>
            </h2>
            <p className="sgrid__method-sub">
              A clear view of the work helps keep solutions practical and measurable.
            </p>
          </div>

          <ol className="sgrid__stages" role="list">
            {STAGES.map((s, i) => {
              const StageIcon = s.Icon
              return (
                <li key={s.index} className="sgrid__stage" style={{ '--i': i } as CSSProperties}>
                  <span className="sgrid__stage-ghost" aria-hidden="true">{s.index}</span>
                  <span className="sgrid__stage-icon" aria-hidden="true">
                    <StageIcon size={22} weight="duotone" />
                  </span>
                  <h3 className="sgrid__stage-label">{s.label}.</h3>
                  <p className="sgrid__stage-body">{s.body}</p>
                  <ul className="sgrid__stage-chips" role="list" aria-label={`${s.label} touches`}>
                    {s.chips.map((c) => (
                      <li key={c} className="sgrid__stage-chip">{c}</li>
                    ))}
                  </ul>
                </li>
              )
            })}
          </ol>
        </div>

        {/* Five cards, each carrying the marks of what it is built with. */}
        <div className="sgrid__offers">
          <div className="sgrid__offers-head">
              <h2 className="sgrid__offers-title">Ways I can help</h2>
            <p className="sgrid__offers-sub">Scoped around your current process and tools.</p>
          </div>
          <ul className="bento sgrid__services" role="list">
            {SERVICES.map((s) => (
              <li key={s.title} className="bento__card sgrid__service">
                <span className="bento__head">
                  <span className="sgrid__service-top">
                    <Marks service={s} />
                    <span className="sgrid__service-index" aria-hidden="true">{s.index} / 05</span>
                  </span>
                  <span className="bento__title">{s.title}</span>
                  <span className="bento__desc">{s.description}</span>
                </span>
                <span className="sgrid__chip" aria-hidden="true">{s.chip}</span>
                <ul className="sgrid__bullets" role="list">
                  {s.bullets.map((b) => (
                    <li key={b} className="sgrid__bullet">
                      <CheckCircle size={15} weight="duotone" aria-hidden="true" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>

        {/* The live workflow. Its caption and the tool chips sit in a header
            above the window, so the canvas gets the whole glass width. */}
        <div className="sgrid__flow">
          <header className="sgrid__flow-head">
            <div className="sgrid__flow-copy">
              <span className="sgrid__flow-eyebrow">Prototype workflow</span>
              <h2 className="sgrid__flow-title">Appointment request follow-up.</h2>
              <p className="sgrid__flow-sub">
                Illustrative appointment follow-up concept only; it is not connected to a live system or patient data.
              </p>
            </div>
            <ul className="sgrid__flow-tools" role="list" aria-label="Tools that power this flow">
              {TOOLS.map(({ Icon: ToolIcon, label }) => (
                <li key={label} className="sgrid__flow-tool">
                  <ToolIcon size={14} weight="duotone" aria-hidden="true" />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </header>
          <div className="sgrid__flow-main">
            <Autopilot compact maxScale={1.08} />
          </div>
        </div>
      </div>
    </section>
  )
}
