export type QA = { q: string; a: string }

/** Contact-view answers based on the services and technologies listed here. */
export const FAQS: QA[] = [
  {
    q: 'What happens after consultation?',
    a: 'If there is a suitable opportunity, I can outline the scope, deliverables, assumptions, and next steps for your review. No implementation begins until the scope is agreed.',
  },
  {
    q: 'How is pricing determined?',
    a: 'Pricing depends on the process, systems involved, complexity, testing, documentation, and any ongoing support. I define the scope and deliverables before proposing a fee.',
  },
  {
    q: 'Do you provide support?',
    a: 'Support and maintenance can be discussed and scoped for each engagement. Availability, response expectations, and duration should be agreed before work begins.',
  },
  {
    q: 'What happens when automations fail?',
    a: 'Failure handling is included in the project scope where appropriate. We can define validation, error messages, and a manual recovery path; monitoring or ongoing alerting is not assumed unless specifically included.',
  },
  {
    q: 'How does the workflow assessment work?',
    a: 'We discuss the current process, its handoffs, tools, recurring effort, and desired outcome. I then identify questions, constraints, and potential improvements before recommending a scoped next step.',
  },
]
