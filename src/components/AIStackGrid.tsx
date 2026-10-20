import { aiStack, type StackNode } from '@/data/ai-stack'

/**
 * The supplied technology stack as a grid, for the Projects pop-up.
 *
 * The tree (AIStack.tsx) explains the hierarchy; this view answers the
 * question a hiring reader actually has: what is each thing built ON. Every
 * card leads with the marks of the model, the harness and the services
 * behind it, then the plain-English line. Names and copy come from
 * ai-stack.ts; only marks that exist in public/icons should be used.
 */

type Group = { title: string; what: string; systems: StackNode[] }

/** Flatten the tree into groups, including a branch node when it has a status. */
function groups(root: StackNode): Group[] {
  return (root.children ?? []).map((branch) => ({
    title: branch.name,
    what: branch.what,
    systems: branch.status ? [branch, ...(branch.children ?? [])] : (branch.children ?? []),
  }))
}

function Card({ n }: { n: StackNode }) {
  const tools = n.logos ?? []
  return (
    <li className="aig__card">
      {(tools.length > 0 || n.status) && (
        <div className="aig__marks" aria-label={tools.length ? `Uses ${tools.map((t) => t.name).join(', ')}` : `${n.status} capability`}>
          {tools.map((t) => (
            <span key={t.name} className="aig__mark" title={t.name}>
              <img src={t.src} alt="" width={22} height={22} loading="lazy" decoding="async" />
            </span>
          ))}
          {n.status && (
            <span className="aig__status" data-status={n.status}>
              {n.status}
            </span>
          )}
        </div>
      )}
      <h4 className="aig__name">
        <n.Icon size={16} weight="duotone" aria-hidden="true" />
        {n.name}
      </h4>
      <p className="aig__what">{n.what}</p>
      {n.stack && <p className="aig__stack">{n.stack}</p>}
      {tools.length > 0 && (
        <ul className="aig__tools" role="list">
          {tools.map((t) => (
            <li key={t.name}>{t.name}</li>
          ))}
        </ul>
      )}
    </li>
  )
}

export default function AIStackGrid() {
  return (
    <div className="aig">
      <header className="aig__head">
        <div className="aig__head-text">
          <span className="aig__eyebrow">Verified technology</span>
          <h3 className="aig__title">{aiStack.what}</h3>
        </div>
        <span className="aig__harness-label">Technology listed by category</span>
      </header>

      {groups(aiStack).map((g) => (
        <section key={g.title} className="aig__group" aria-label={g.title}>
          <div className="aig__group-head">
            <h3 className="aig__group-title">{g.title}</h3>
            <p className="aig__group-what">{g.what}</p>
          </div>
          <ul className="aig__cards" role="list">
            {g.systems.map((n) => (
              <Card key={n.id} n={n} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
