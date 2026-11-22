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
  VideoCamera,
} from '@/components/slab'
import { aiStack, type StackNode } from '@/data/ai-stack'
import { profile } from '@/data/profile'
import { LATEST_JOURNEY_VIDEO } from '@/data/vlogs'

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
      {/* Project overview; detailed examples live on the Projects page. */}
      <Link to="/projects" className="bento__card bento__card--projects">
        <CardHead Icon={FolderOpen} title="Projects" desc="Workflow projects and prototype concepts." />
        <ul className="bento__media bento__offers" role="list" aria-hidden="true">
          {[
            { title: 'Operations workflows', note: 'Practical process improvements' },
            { title: 'Prototype concepts', note: 'Ideas and experiments in progress' },
          ].map((item, i) => (
            <li key={item.title} className="bento__offer" style={{ '--i': i } as React.CSSProperties}>
              <span className="bento__offer-tile"><FlowArrow size={15} weight="duotone" /></span>
              <span className="bento__offer-text">
                <span className="bento__offer-title">{item.title}</span>
                <span className="bento__offer-note">{item.note}</span>
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
        <CardHead Icon={Robot} title="Verified technology" desc="Tools across operations, analytics, development, and automation." />
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

      <Link to="/vlogs" className="bento__card bento__card--vlog">
        <CardHead
          Icon={VideoCamera}
          title="Latest journey vlog"
          desc={LATEST_JOURNEY_VIDEO.title}
        />
        <div className="bento__media bento__vlog-preview" aria-hidden="true">
          <img
            src={`https://img.youtube.com/vi/${LATEST_JOURNEY_VIDEO.videoId}/hqdefault.jpg`}
            alt=""
            loading="lazy"
            decoding="async"
          />
          <span className="bento__vlog-play"><VideoCamera size={22} weight="fill" /></span>
        </div>
      </Link>
    </nav>
  )
}
