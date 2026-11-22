/**
 * Profile identity and shared home/contact content.
 *
 * Keep public contact details and social URLs current. The avatar path can
 * point to an SVG, WebP, or PNG under public/.
 *
 * Page-specific copy lives in the other files in src/data/ and in the view
 * components that own it.
 */

import {
  Briefcase,
  Database,
  FlowArrow,
  GithubLogo,
  LinkedinLogo,
  YoutubeLogo,
  type Icon,
} from '@/components/slab'

export type SocialLink = {
  label: string
  href: string
  Icon: Icon
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
  workArrangement: string
  clientRegions: string
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
  handle: '',
  role: 'Healthcare Operations and AI Automation Specialist',
  avatarSrc: '/avatar.svg',
  verifiedLabel: '',
  email: '44rosellosa2003@gmail.com',
  location: 'Philippines',
  workArrangement: 'Remote',
  clientRegions: 'Philippines and International',
  // Pick any icon from https://phosphoricons.com and import it above.
  stats: [
    { value: 'Workflow', label: 'Automation', Icon: FlowArrow },
    { value: 'Data', label: 'Analysis & reporting', Icon: Database },
    { value: 'Healthcare', label: 'Operations', Icon: Briefcase },
  ],
  // The intro types this line, then flies it into the Home headline.
  // The hero headline is split into two parts for the intro animation.
  displayName: {
    line1: 'Stop Revenue and Intake',
    line2: 'Leaks for US Healthcare & SMBs.',
  },
  hero: {
    body: 'AI Automation Specialist & Workflow Engineer with a BPO Quality Assurance background. I audit broken intake pipelines, normalize messy webhook payloads, and build resilient Make.com and Gemini AI systems that maximize your existing stack—without automating unnecessary bloat.',
    portraitSrc: '/avatar.svg',
    portraitAlt: 'Paul John Rosellosa',
  },
  socials: [
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/pauljohnrosellosa',
      Icon: LinkedinLogo,
    },
    { label: 'GitHub', href: 'https://github.com/44PaulGeorgiee', Icon: GithubLogo },
    { label: 'YouTube', href: 'https://www.youtube.com/@ruleof100guy', Icon: YoutubeLogo },
  ],
}
