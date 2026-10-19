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
  Icon: ComponentType<{ size?: number }>
  eyebrow: string
  Section: ComponentType
  span?: 2
  /** Open Builds style: a small orange kicker above the title. */
  kicker?: string
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
  description,
  tools,
  note,
}: {
  status: string
  title: string
  description: string
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
          <p className="pdetail__description">{description}</p>
          <h3 className="pdetail__label">Tools described</h3>
          <ul className="pdetail__tools" role="list">
            {tools.map((tool) => <li key={tool}>{tool}</li>)}
          </ul>
          <p className="pdetail__note">{note}</p>
        </article>
      </div>
    </div>
  )
}

const QAFeedbackPanel = () => (
  <ProjectDetail
    status="Work example · based on experience provided"
    title="QA Feedback Automation"
    description="Automated the process of delivering quality assurance feedback using Power Automate, helping reduce repetitive manual work."
    tools={['Power Automate', 'Outlook', 'Workflow automation']}
    note="No time-saving figure or client-specific details are published because they are not documented here."
  />
)

const QACallOutPanel = () => (
  <ProjectDetail
    status="Work example · based on experience provided"
    title="QA Call-Out Card Automation"
    description="Used Excel and VBA to streamline the creation and delivery of call-out communications through Outlook."
    tools={['Excel', 'VBA', 'Outlook']}
    note="No time-saving figure or client-specific details are published because they are not documented here."
  />
)

const IntegrationConceptPanel = () => (
  <ProjectDetail
    status="Prototype concept · not a completed integration"
    title="API and Data Integration"
    description="A proposed demonstration of forms, spreadsheets, APIs, JSON data, and automated processing moving information between systems."
    tools={['Google Sheets', 'Google Apps Script', 'HTTP APIs', 'JSON']}
    note="This repository does not contain a working implementation of this integration."
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
  { id: 'qa-feedback', cat: 'work', index: '01', title: 'QA Feedback Automation', desc: 'Power Automate and Outlook streamline the delivery of QA feedback.', Icon: () => <FlowArrow size={20} weight="duotone" />, eyebrow: 'Work example', Section: QAFeedbackPanel, span: 2, Preview: FeedbackPreview },
  { id: 'qa-callout', cat: 'work', index: '02', title: 'QA Call-Out Card Automation', desc: 'Excel and VBA streamline call-out communications through Outlook.', Icon: () => <Database size={20} weight="duotone" />, eyebrow: 'Work example', Section: QACallOutPanel, Preview: CallOutPreview },
  { id: 'integration-concept', cat: 'prototype', index: '03', kicker: 'Prototype concept', title: 'API and Data Integration', desc: 'A proposed flow connecting forms, spreadsheets, APIs, and JSON; no completed build is claimed.', Icon: () => <Database size={20} weight="duotone" />, eyebrow: 'Prototype concept', Section: IntegrationConceptPanel, Preview: IntegrationPreview },
  { id: 'templates', cat: 'sites', index: '04', title: 'Website Template Previews', desc: 'Generated page layouts for exploring structure. These are not client sites or workflow demos.', Icon: GlobeIcon, eyebrow: 'Template gallery', Section: BarrelPanel, Preview: FunnelsPreview },
  { id: 'tools', cat: 'tools', index: '05', title: 'Tools and Developing Capabilities', desc: 'Current operations tools alongside areas still being explored; not a list of delivered AI systems.', Icon: SparkIcon, eyebrow: 'Tools and capabilities', Section: AIWindow, Preview: AIPreview },
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
                {p.kicker && <span className="bento__label">{p.kicker}</span>}
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
