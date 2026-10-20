export type QA = { q: string; a: string }

/** Contact-view answers based on the services and technologies listed here. */
export const FAQS: QA[] = [
  {
    q: 'What workflows can you automate?',
    a: 'I focus on repetitive administrative work, QA feedback delivery, communication preparation, lead follow-up, appointment requests, and routine data handling. Each workflow is assessed before deciding whether automation is appropriate.',
  },
  {
    q: 'Which businesses do you work with?',
    a: 'Healthcare businesses and clinics are the primary focus. I also work with small and medium-sized businesses looking to improve workflows, reporting, integrations, or data processing.',
  },
  {
    q: 'What platforms do you support?',
    a: 'The listed tools include Google Sheets, Apps Script, Google Forms, Excel, VBA, Power Automate, Outlook, SQL, Power BI, REST APIs, JSON, TypeScript, React, Vite, Claude Code, ChatGPT, and ElevenLabs. The fit depends on your systems and project scope.',
  },
  {
    q: 'How does the workflow assessment work?',
    a: 'We discuss the current process, its handoffs, tools, recurring effort, and desired outcome. I then identify questions, constraints, and potential improvements before recommending a scoped next step.',
  },
  {
    q: 'What happens after consultation?',
    a: 'If there is a suitable opportunity, I can outline the scope, deliverables, assumptions, and next steps for your review. No implementation begins until the scope is agreed.',
  },
  {
    q: 'Can you integrate different applications?',
    a: 'I work with REST APIs, Apps Script, JSON, and spreadsheet workflows. Integration concepts are prototypes unless a specific implementation is verified and agreed; access, permissions, and technical fit must be assessed first.',
  },
  {
    q: 'Can you improve existing spreadsheets?',
    a: 'Yes. I can review a spreadsheet workflow and discuss improvements to its structure, formulas, data handling, reporting, or VBA automation. Any changes should be tested against your requirements and sample data.',
  },
  {
    q: 'What happens when automations fail?',
    a: 'Failure handling is included in the project scope where appropriate. We can define validation, error messages, and a manual recovery path; monitoring or ongoing alerting is not assumed unless specifically included.',
  },
  {
    q: 'How is pricing determined?',
    a: 'Pricing depends on the process, systems involved, complexity, testing, documentation, and any ongoing support. I define the scope and deliverables before proposing a fee.',
  },
  {
    q: 'Do you provide support?',
    a: 'Support and maintenance can be discussed and scoped for each engagement. Availability, response expectations, and duration should be agreed before work begins.',
  },
]
