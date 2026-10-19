import type React from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  FolderOpen,
  User,
  Robot,
  Stack,
  FlowArrow,
  Database,
} from '@/components/slab'
import { aiStack, type StackNode } from '@/data/ai-stack'
import { profile } from '@/data/profile'

/**
 * Home's showcase: each card links to a portfolio view and summarizes its
 * actual content. Work examples, services, and tool groups stay aligned with
 * the pages that render them in full.
 *
 * Motion is transform-only on a clipped inner track, so a card never adds
 * height and Home stays a single viewport.
 */

const OFFERS = [
  { Icon: FlowArrow, title: 'Workflow automation', note: 'Routine tasks and handoffs' },
  { Icon: Database, title: 'Data and reporting', note: 'Tools to monitor operations' },
  { Icon: Stack, title: 'Lead follow-up', note: 'Tracking and timely updates' },
  { Icon: User, title: 'Process audits', note: 'Bottlenecks and repeat work' },
  { Icon: FlowArrow, title: 'Privacy-aware planning', note: 'Access and data handling' },
] as const

const WORK_ITEMS = [
  { name: 'QA Feedback Automation', work: 'Power Automate and Outlook for QA feedback delivery.' },
  { name: 'QA Call-Out Card Automation', work: 'Excel and VBA for call-out communications.' },
]

// Three photos of you, fanned. Small copies are fine - the fan shows them under 100px.
const PHOTOS = [profile.avatarSrc, '/avatar.svg?2', '/avatar.svg?3']

/** The AI systems as a flat list: every leaf of the Projects tree, in order. */
const leaves = (n: StackNode): StackNode[] =>
  n.children?.length ? n.children.flatMap(leaves) : [n]
const AI_BUILDS = leaves(aiStack)

function CardHead({
  Icon,
  title,
  desc,
}: {
  Icon: typeof FolderOpen
  title: string
  desc: string
}) {
  return (
    <header className="bento__head">
      <span className="bento__label">
        <span className="bento__icon">
          <Icon size={20} weight="fill" aria-hidden="true" />
        </span>
        <h3 className="bento__title">{title}</h3>
      </span>
      <p className="bento__desc">{desc}</p>
      <ArrowUpRight size={15} weight="bold" aria-hidden="true" className="bento__arrow" />
    </header>
  )
}

export default function HomeBento() {
  const half = Math.ceil(AI_BUILDS.length / 2)
  const toolRows = [AI_BUILDS.slice(0, half), AI_BUILDS.slice(half)]

  return (
    <nav className="bento" aria-label="Explore the portfolio">
      {/* Selected work examples in the existing compact project card. */}
      <Link to="/projects" className="bento__card bento__card--projects">
        <CardHead Icon={FolderOpen} title="Selected work" desc="Two described QA workflow automation examples; no unverified metrics." />
        <ul className="bento__media bento__offers" role="list" aria-hidden="true">
          {WORK_ITEMS.map((item, i) => (
            <li key={item.name} className="bento__offer" style={{ '--i': i } as React.CSSProperties}>
              <span className="bento__offer-tile"><FlowArrow size={15} weight="duotone" /></span>
              <span className="bento__offer-text">
                <span className="bento__offer-title">{item.name}</span>
                <span className="bento__offer-note">{item.work}</span>
              </span>
            </li>
          ))}
        </ul>
      </Link>

      {/* About: a fanned stack of photos. */}
      <Link to="/about" className="bento__card bento__card--about">
        <CardHead Icon={User} title="About" desc="Healthcare operations experience, applied to practical workflow improvement." />
        <div className="bento__media bento__fan" aria-hidden="true">
          {PHOTOS.map((src, i) => (
            <span key={src} className="bento__photo" style={{ ['--i' as string]: i }}>
              <img src={src} alt="" loading="lazy" decoding="async" />
            </span>
          ))}
        </div>
      </Link>

      {/* Tools and developing capabilities from the grouped stack data. */}
      <Link to="/projects" className="bento__card bento__card--ai">
        <CardHead Icon={Robot} title="Tools and capabilities" desc="Current operations tools and clearly marked areas in development." />
        <div className="bento__media bento__chips" aria-hidden="true">
          {toolRows.map((row, r) => (
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
      </Link>

      {/* A practical process instead of an unverified credential. */}
      <Link to="/about" className="bento__card bento__card--creds">
        <CardHead Icon={FlowArrow} title="How I work" desc="Understand the process before choosing a solution." />
        <div className="bento__media bento__doc" aria-hidden="true">
          <span className="bento__doc-eyebrow">A practical approach</span>
          <span className="bento__doc-title">Understand · map · improve · evaluate</span>
          <span className="bento__doc-line" />
          <span className="bento__doc-line bento__doc-line--short" />
        </div>
      </Link>

      {/* Services: the five offers as a compact index. */}
      <Link to="/services" className="bento__card bento__card--services">
        <CardHead Icon={Stack} title="Services" desc="Practical support for process, data, and follow-up." />
        <ul className="bento__media bento__offers" role="list">
          {OFFERS.map(({ Icon, title, note }, i) => (
            <li key={title} className="bento__offer" style={{ '--i': i } as React.CSSProperties}>
              <span className="bento__offer-tile">
                <Icon size={15} weight="duotone" aria-hidden="true" />
              </span>
              <span className="bento__offer-text">
                <span className="bento__offer-title">{title}</span>
                <span className="bento__offer-note">{note}</span>
              </span>
              <span className="bento__offer-num" aria-hidden="true">
                0{i + 1}
              </span>
            </li>
          ))}
        </ul>
      </Link>

      {/* Work examples, not fabricated testimonials. */}
      <Link to="/testimonials" className="bento__card bento__card--quotes">
        <CardHead Icon={FlowArrow} title="Selected results" desc="Qualitative outcomes only; no client identities or figures are published." />
        <div className="bento__media bento__reviews" aria-hidden="true">
          <div className="bento__reviews-track">
            {[...WORK_ITEMS, ...WORK_ITEMS].map((item, i) => (
              <span key={i} className="bento__review">
                <span className="bento__review-top">
                  <FlowArrow size={14} weight="duotone" />
                  <b>{item.name}</b>
                </span>
                <span className="bento__review-role">Work example</span>
                <span className="bento__review-work">{item.work}</span>
              </span>
            ))}
          </div>
        </div>
      </Link>
    </nav>
  )
}
