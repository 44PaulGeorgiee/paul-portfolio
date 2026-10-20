import { useCallback, useEffect, useRef, useState, type ComponentType, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { ArrowUpRight, X, FlowArrow, Database, CursorClick } from '@/components/slab'
import { GlobeIcon, SparkIcon } from './ProjectIcons'
import { BarrelPanel, AIWindow } from './ProjectPanels'
import { websiteFunnel, type Funnel } from '@/data/funnels'
import { aiStack, type StackNode } from '@/data/ai-stack'
import { useIsPhone } from '@/hooks/useMediaQuery'

/**
 * Projects, as one viewport in Home's bento language: two described work
 * examples, one prototype concept, generic page-template previews, and a
 * grouped tools view. Cards open accessible detail dialogs or the existing
 * template carousel.
 *
 * The dialog is a portal at z 8000, under the funnel preview (9000) so the
 * barrel's own "open this page" dialog can still stack on top of it.
 */
type Project = {
  id: string
  index: string
  title: string
  desc: string
  status?: 'LIVE' | 'INTERNAL' | 'PROTOTYPE' | 'BETA'
  Icon: ComponentType<{ size?: number }>
  eyebrow: string
  Section: ComponentType
  span?: 2
  /** Real marks of what the work was built in; replaces the icon tile. */
  logos?: string[]
  Preview: ComponentType
  /** Phone filter bucket. */
  cat: Cat
}

type Cat = 'work' | 'sites' | 'prototype' | 'tools'
const FILTERS: { key: Cat | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'work', label: 'Work examples' },
  { key: 'sites', label: 'Templates' },
  { key: 'prototype', label: 'Prototype' },
  { key: 'tools', label: 'Tools' },
]

const FUNNEL_SHOTS = websiteFunnel
const thumbSrc = (f: Funnel) => `/${f.dir ?? 'funnels'}/thumbs/${f.file.replace('.html', '.jpeg')}`

const leaves = (n: StackNode): StackNode[] => (n.children?.length ? n.children.flatMap(leaves) : [n])
const AI_LEAVES = leaves(aiStack)

function ProcessPreview({ steps }: { steps: string[] }) {
  return (
    <div className="bento__media bento__doc" aria-hidden="true">
      <span className="bento__doc-eyebrow">Process outline</span>
      <span className="bento__doc-title">Illustrative workflow</span>
      <span className="bento__doc-flow">
        {steps.map((step, i) => <i key={step} className={i === steps.length - 1 ? 'is-on' : undefined}>{step}</i>)}
      </span>
    </div>
  )
}

function ProjectDetail({
  status,
  title,
  problem,
  description,
  outcome,
  tools,
  note,
}: {
  status: string
  title: string
  problem?: string
  description: string
  outcome?: string
  tools: string[]
  note: string
}) {
  return (
    <div className="ppanel ppanel--window">
      <div className="ppanel__bar">
        <span className="ppanel__dots" aria-hidden="true"><i /><i /><i /></span>
        <span className="ppanel__url"><span className="ppanel__url-host">Portfolio work example</span></span>
      </div>
      <div className="ppanel__scroll">
        <article className="pdetail">
          <span className="pdetail__status">{status}</span>
          <h2 className="pdetail__title">{title}</h2>
          {problem && (
            <>
              <h3 className="pdetail__label">Problem</h3>
              <p className="pdetail__description">{problem}</p>
            </>
          )}
          <h3 className="pdetail__label">{problem ? 'Solution' : 'Description'}</h3>
          <p className="pdetail__description">{description}</p>
          <h3 className="pdetail__label">Tools described</h3>
          <ul className="pdetail__tools" role="list">
            {tools.map((tool) => <li key={tool}>{tool}</li>)}
          </ul>
          {outcome && (
            <>
              <h3 className="pdetail__label">Outcome</h3>
              <p className="pdetail__description">{outcome}</p>
            </>
          )}
          <p className="pdetail__note">{note}</p>
        </article>
      </div>
    </div>
  )
}

const QAFeedbackPanel = () => (
  <ProjectDetail
    status="INTERNAL"
    title="QA Feedback Automation"
    problem="Manual QA feedback delivery required repetitive effort and time."
    description="A Power Automate workflow streamlines the delivery of QA feedback."
    tools={['Power Automate']}
    outcome="ESTIMATED savings: approximately 10 hours per week. This is an estimate, not a measured result."
    note="Details are generalized; confidential company, employee, and customer information is not included."
  />
)

const QACallOutPanel = () => (
  <ProjectDetail
    status="INTERNAL"
    title="QA Call Out Card"
    problem="Preparing QA call-out communications manually required repetitive effort."
    description="An Excel VBA workflow prepares call-out communications for Outlook."
    tools={['Microsoft Excel', 'VBA', 'Outlook']}
    outcome="ESTIMATED savings: approximately 10 hours per week. This is an estimate, not a measured result."
    note="Details are generalized; confidential company, employee, and customer information is not included."
  />
)

const IntegrationConceptPanel = () => (
  <ProjectDetail
    status="PROTOTYPE"
    title="API Integration and Data Processing Workflow"
    description="Demonstrates API requests, JSON parsing, validation, error handling, data transformation, and spreadsheet output."
    tools={['Apps Script', 'REST API', 'JSON', 'Google Sheets']}
    note="Prototype demonstration only; this is not presented as a live or production integration."
  />
)

const AppointmentConceptPanel = () => (
  <ProjectDetail
    status="PROTOTYPE"
    title="Appointment Booking and Follow-Up Automation"
    description="A proposed workflow concept for appointment scheduling, confirmations, reminders, rescheduling, and reporting."
    tools={['Workflow design', 'Scheduling', 'Reporting']}
    note="Prototype concept only; it is not connected to a live booking system or patient data."
  />
)

const LeadConceptPanel = () => (
  <ProjectDetail
    status="PROTOTYPE"
    title="Lead Capture and Follow-Up Workflow"
    description="A proposed lead process covering capture, pipeline stages, follow-up steps, and reporting."
    tools={['Lead capture', 'Pipeline workflow', 'Follow-up']}
    note="Prototype concept only; it is not connected to a live CRM or customer data."
  />
)

const DashboardConceptPanel = () => (
  <ProjectDetail
    status="PROTOTYPE"
    title="Business Operations and Performance Dashboard"
    description="A proposed dashboard workflow covering data cleaning, KPI definition, reporting automation, and operational review."
    tools={['Data processing', 'KPIs', 'Dashboard reporting']}
    note="Prototype concept only; no client or company data is included."
  />
)

/** The three builds as Open Builds rows: plate, eyebrow, title, arrow. */
function FunnelsPreview() {
  return (
    <div className="bento__media bento__fan" aria-hidden="true">
      {FUNNEL_SHOTS.map((f, i) => (
        <span key={f.file} className="bento__photo bento__photo--page" style={{ ['--i' as string]: i }}>
          <img src={thumbSrc(f)} alt="" loading="lazy" decoding="async" />
        </span>
      ))}
    </div>
  )
}

function AIPreview() {
  const half = Math.ceil(AI_LEAVES.length / 2)
  const rows = [AI_LEAVES.slice(0, half), AI_LEAVES.slice(half)]
  return (
    <div className="bento__media bento__chips" aria-hidden="true">
      {rows.map((row, r) => (
        <div key={r} className="bento__chip-row" data-dir={r ? 'right' : 'left'}>
          <div className="bento__chip-track">
            {[...row, ...row].map((n, i) => (
              <span key={`${n.id}-${i}`} className="bento__chip" data-status={n.status}>
                <n.Icon size={15} weight="duotone" />
                {n.name}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

const FeedbackPreview = () => <ProcessPreview steps={['QA check', 'Feedback', 'Outlook']} />
const CallOutPreview = () => <ProcessPreview steps={['Excel', 'VBA', 'Outlook']} />
const IntegrationPreview = () => <ProcessPreview steps={['Form', 'API + JSON', 'Review']} />

const PROJECTS: Project[] = [
  { id: 'qa-feedback', cat: 'work', index: '01', status: 'INTERNAL', title: 'QA Feedback Automation', desc: 'Power Automate workflow streamlining QA feedback delivery.', Icon: () => <FlowArrow size={20} weight="duotone" />, eyebrow: 'Internal workflow', Section: QAFeedbackPanel, Preview: FeedbackPreview },
  { id: 'qa-callout', cat: 'work', index: '02', status: 'INTERNAL', title: 'QA Call Out Card', desc: 'Excel VBA workflow preparing Outlook call-out communications.', Icon: () => <Database size={20} weight="duotone" />, eyebrow: 'Internal workflow', Section: QACallOutPanel, Preview: CallOutPreview },
  { id: 'integration-concept', cat: 'prototype', index: '03', status: 'PROTOTYPE', title: 'API Integration and Data Processing Workflow', desc: 'API requests, JSON parsing, validation, error handling, transformation, and sheet output.', Icon: () => <Database size={20} weight="duotone" />, eyebrow: 'Prototype', Section: IntegrationConceptPanel, Preview: IntegrationPreview },
  { id: 'appointment-concept', cat: 'prototype', index: '04', status: 'PROTOTYPE', title: 'Appointment Booking and Follow-Up Automation', desc: 'Scheduling, confirmations, reminders, rescheduling, and reporting concept.', Icon: () => <FlowArrow size={20} weight="duotone" />, eyebrow: 'Prototype', Section: AppointmentConceptPanel, Preview: () => <ProcessPreview steps={['Schedule', 'Confirm', 'Remind', 'Report']} /> },
  { id: 'lead-concept', cat: 'prototype', index: '05', status: 'PROTOTYPE', title: 'Lead Capture and Follow-Up Workflow', desc: 'Lead capture, pipeline configuration, follow-up, and reporting concept.', Icon: () => <FlowArrow size={20} weight="duotone" />, eyebrow: 'Prototype', Section: LeadConceptPanel, Preview: () => <ProcessPreview steps={['Capture', 'Pipeline', 'Follow up']} /> },
  { id: 'dashboard-concept', cat: 'prototype', index: '06', status: 'PROTOTYPE', title: 'Business Operations and Performance Dashboard', desc: 'Data cleaning, KPI definition, dashboards, and reporting automation concept.', Icon: () => <Database size={20} weight="duotone" />, eyebrow: 'Prototype', Section: DashboardConceptPanel, Preview: () => <ProcessPreview steps={['Clean data', 'KPIs', 'Dashboard']} /> },
  { id: 'templates', cat: 'sites', index: '07', title: 'Website Template Previews', desc: 'Generated page layouts for exploring structure. These are not client sites or workflow demos.', Icon: GlobeIcon, eyebrow: 'Template gallery', Section: BarrelPanel, Preview: FunnelsPreview },
  { id: 'tools', cat: 'tools', index: '08', title: 'Verified Technology Stack', desc: 'Tools and technologies listed for operations, analytics, development, and automation.', Icon: SparkIcon, eyebrow: 'Technology stack', Section: AIWindow, Preview: AIPreview },
]

/** The icon tile, or the real marks stacked horizontally in its place. */
function Marks({ p, size = 22 }: { p: Project; size?: number }) {
  if (!p.logos?.length) {
    return (
      <span className="bento__icon">
        <p.Icon size={size} />
      </span>
    )
  }
  return (
    <span className="bento__logos" aria-hidden="true">
      {p.logos.map((src) => (
        <span key={src} className="bento__logo">
          <img src={src} alt="" width={22} height={22} decoding="async" />
        </span>
      ))}
    </span>
  )
}

/* ---------- Dialog ----------
   A backdrop, a close button in the corner, and the work. No panel, no
   header: each Section brings its own window (or, for the strip, none). */
function ProjectModal({ project, onClose, children }: { project: Project; onClose: () => void; children: ReactNode }) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    requestAnimationFrame(() => closeRef.current?.focus())
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return createPortal(
    <div
      className="pmodal"
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <button ref={closeRef} type="button" className="pmodal__close" onClick={onClose} aria-label="Close">
        <X size={18} weight="bold" />
      </button>
      <div className="pmodal__stage">{children}</div>
    </div>,
    document.body,
  )
}

/* ---------- The page ---------- */

export default function ProjectsGrid() {
  const [open, setOpen] = useState<Project | null>(null)
  const phone = useIsPhone()
  const [cat, setCat] = useState<Cat | 'all'>('all')
  const keep = (p: Project) => !phone || cat === 'all' || p.cat === cat
  const projects = PROJECTS.filter(keep)
  const triggerRef = useRef<HTMLElement | null>(null)

  const show = useCallback((p: Project, el: HTMLElement) => {
    triggerRef.current = el
    setOpen(p)
  }, [])
  const close = useCallback(() => {
    setOpen(null)
    requestAnimationFrame(() => triggerRef.current?.focus())
  }, [])

  return (
    <section className="pgrid" aria-labelledby="projects-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">Projects</span>
        <h1 className="pgrid__title" id="projects-title">
          Real workflows. Less manual work.
        </h1>
        <p className="pgrid__lede">Practical automation projects built around everyday operational problems.</p>
        <p className="pgrid__lede pgrid__status-guide">
          LIVE: publicly accessible · INTERNAL: used in real workflows · PROTOTYPE: demonstration or concept · BETA: experimental
        </p>
      </header>

      {phone && (
        <div className="pfilter" role="group" aria-label="Filter projects">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              className="pfilter__btn"
              aria-pressed={cat === f.key}
              onClick={() => setCat(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      <div className="home__glass pgrid__glass">
        {/* Hung on the sheet's top edge so it reads as a tag on the container,
            not a seventh card. aria-hidden: the lede already says it. */}
        <span className="pgrid__hint" aria-hidden="true">
          <CursorClick size={14} weight="duotone" />
          Open a card for details
        </span>
        <div className="bento bento--projects">
          {projects.map((p) => (
            <button
              key={p.id}
              type="button"
              className={`bento__card bento__card--btn${p.span === 2 ? ' bento__card--wide' : ''}`}
              data-id={p.id}
              onClick={(e) => show(p, e.currentTarget)}
              aria-haspopup="dialog"
            >
              <span className="bento__head">
                <Marks p={p} />
                {p.status && <span className="bento__status" data-status={p.status}>{p.status}</span>}
                <span className="bento__title">{p.title}</span>
                <span className="bento__desc">{p.desc}</span>
                <ArrowUpRight size={15} weight="bold" aria-hidden="true" className="bento__arrow" />
              </span>
              <p.Preview />
            </button>
          ))}
        </div>
      </div>

      {open && (
        <ProjectModal project={open} onClose={close}>
          <open.Section />
        </ProjectModal>
      )}
    </section>
  )
}
