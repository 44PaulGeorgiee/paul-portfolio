/**
 * Profile identity and shared home/contact content.
 *
 * Keep public contact details empty until a real address or profile URL is
 * ready. The existing avatar path can point to an SVG, WebP, or PNG.
 *
 * Page-specific copy lives in the other files in src/data/ and in the view
 * components that own it.
 */

import { Briefcase, Database, FlowArrow, type Icon } from '@/components/slab'

export type SocialLink = {
  label: string
  href: string
  iconPath: string
}

/** A proof fact on the phone's Home: a glyph, a short value, a caption. */
export type Stat = { value: string; label: string; Icon: Icon }

export type Profile = {
  name: string
  /** First name, used in "Hi, I'm ___." on About. */
  firstName: string
  handle: string
  /** Short role line under the handle on phones. */
  role: string
  /** Square image. An SVG, WebP or PNG with a transparent background looks best. */
  avatarSrc: string
  /** Tooltip / screen-reader label on the verified tick next to your name. */
  verifiedLabel: string
  email: string
  location: string
  /** Three short proof facts shown on phones under the Home lede. */
  stats: Stat[]
  displayName: { line1: string; line2: string }
  hero: {
    body: string
    portraitSrc: string
    portraitAlt: string
  }
  socials: SocialLink[]
}

export const profile: Profile = {
  name: 'Paul John Rosellosa',
  firstName: 'Paul',
<<<<<<< HEAD
  handle: '@pauljohn',
  role: 'Healthcare Operations & AI Automation Specialist',
=======
  handle: '@yourhandle',
  role: 'PLACEHOLDER - your title',
>>>>>>> 86526bacd6fddbb431edf96829103b576d7e046b
  avatarSrc: '/avatar.svg',
  verifiedLabel: '',
  email: '',
  location: 'Philippines',
  // Pick any icon from https://phosphoricons.com and import it above.
  stats: [
    { value: 'Workflow', label: 'Automation', Icon: FlowArrow },
    { value: 'Data', label: 'Analysis & reporting', Icon: Database },
    { value: 'Healthcare', label: 'Operations', Icon: Briefcase },
  ],
  // The intro types this line, then flies it into the Home headline.
  // Keep it short: two halves, 5-8 words total.
  displayName: { line1: 'I automate repetitive', line2: 'work.' },
  hero: {
    body: 'I build practical workflows, data tools, and automation systems that reduce manual work, improve follow-up, and make operations more efficient.',
    portraitSrc: '/avatar.svg',
    portraitAlt: 'Anonymous avatar illustration',
  },
  socials: [],
}
