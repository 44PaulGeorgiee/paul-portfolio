export type QA = { q: string; a: string }

/**
 * The questions people ask before they email. One list, used by the FAQ
 * accordion on the Contact view (and the legacy long-scroll FAQ section).
 * Questions and concise answers for the Contact view's scrollable accordion.
 */
export const FAQS: QA[] = [
  {
    q: 'What types of processes can you automate?',
    a: 'I focus on repetitive administrative tasks, notifications, data handling, reporting, lead follow-ups, and workflows that move information between systems.',
  },
  {
    q: 'Do I need to replace my existing software?',
    a: 'Not necessarily. First, I look at your current workflow and whether your existing tools can be connected or configured more effectively.',
  },
  {
    q: 'Can you work with healthcare businesses?',
    a: 'Yes. My healthcare operations experience helps me understand administrative workflows. Solutions involving sensitive information must account for privacy, security, permissions, and applicable requirements.',
  },
  {
    q: 'How do you determine whether automation is worth it?',
    a: 'I consider time spent, task frequency, errors, delays, and business impact. The expected benefits should justify implementation and ongoing costs.',
  },
  {
    q: 'Do you offer a free audit?',
    a: 'An initial discovery conversation can establish whether a process is worth investigating. A detailed audit should have a defined scope and deliverables, even when offered free.',
  },
  {
    q: 'How much do your services cost?',
    a: 'Pricing depends on the workflow, systems involved, complexity, and maintenance needs. I establish the scope and expected outcome before proposing a solution.',
  },
]
