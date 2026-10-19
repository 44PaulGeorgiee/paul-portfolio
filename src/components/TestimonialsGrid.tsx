import { Database, FlowArrow, type Icon } from '@/components/slab'

type Result = {
  index: string
  title: string
  description: string
  tools: string[]
  Icon: Icon
}

const RESULTS: Result[] = [
  {
    index: '01',
    title: 'QA Feedback Automation',
    description: 'Automated the process of delivering quality assurance feedback using Power Automate, helping reduce repetitive manual work.',
    tools: ['Power Automate', 'Outlook', 'Workflow automation'],
    Icon: FlowArrow,
  },
  {
    index: '02',
    title: 'QA Call-Out Card Automation',
    description: 'Used Excel and VBA to streamline the creation and delivery of call-out communications through Outlook.',
    tools: ['Excel', 'VBA', 'Outlook'],
    Icon: Database,
  },
]

export default function TestimonialsGrid() {
  return (
    <section className="pgrid tgrid" aria-labelledby="results-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">Selected Results</span>
        <h1 className="pgrid__title" id="results-title">
          Practical automation. Less repetitive work.
        </h1>
        <p className="pgrid__lede">
          Two qualitative examples from QA operations. No time-saving figures or client identities are published.
        </p>
      </header>

      <div className="home__glass tgrid__glass">
        <div className="tgrid__ledger">
          <div className="tgrid__ledger-head">
            <h2 className="tgrid__ledger-title">Work examples</h2>
            <p className="tgrid__ledger-sub">Descriptions are based on work details provided; no quantified outcomes are claimed.</p>
          </div>

          <ul className="tgrid__clients" role="list">
            {RESULTS.map(({ index, title, description, tools, Icon }) => (
              <li key={index} className="tgrid__client">
                <span className="tgrid__client-ghost" aria-hidden="true">{index}</span>
                <span className="tgrid__client-mark" aria-hidden="true">
                  <Icon size={22} weight="duotone" />
                </span>
                <span className="tgrid__client-body">
                  <span className="tgrid__client-head">
                    <span className="tgrid__client-name">{title}</span>
                    <span className="tgrid__client-role">Work example</span>
                  </span>
                  <span className="tgrid__client-daily">{description}</span>
                  <ul className="tgrid__client-tags" role="list" aria-label={`${title} tools`}>
                    {tools.map((tool) => <li key={tool} className="tgrid__client-tag">{tool}</li>)}
                  </ul>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}