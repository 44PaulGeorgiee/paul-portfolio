/**
 * The grouped tools and capabilities shown in the Projects tools view and
 * summarized as chips on Home.
 *
 * This file is the ONLY place node copy lives. AIStack.tsx and AIStackGrid.tsx
 * render whatever shape they find here, so swapping in content is a data edit
 * and never a JSX edit. Keep the exported names and types stable.
 *
 * Shape rules:
 * - The root is the profile. Its children are category branches.
 * - Leaves with `Internal` are tools currently used; `Beta` marks skills in
 *   development. Use `Live` only when a real externally used system exists.
 * - Logo marks are optional and must match an asset that exists in public/.
 */

import {
  Sparkle,
  Article,
  Robot,
  UsersThree,
  Database,
  FlowArrow,
  Browser,
  Plug,
} from '@/components/slab'
import type { Icon } from '@/components/slab'
import { profile } from '@/data/profile'

export type StackStatus = 'Live' | 'Internal' | 'Beta'

/** A vendor mark, masked to a single ink colour so the row reads as one set
 *  rather than a rainbow of brand palettes. Only marks that already exist in
 *  public/icons are listed. */
export type StackLogo = { src: string; name: string }

export type StackNode = {
  id: string
  name: string
  /** One plain sentence a non-technical client understands. */
  what: string
  /** Real stack / model / where it runs. Rendered small and muted. */
  stack?: string
  status?: StackStatus
  /** Phosphor glyph for the card's mark tile. Every node has one. */
  Icon: Icon
  logos?: StackLogo[]
  children?: StackNode[]
}

const GOOGLE_WORKSPACE: StackLogo = { src: '/icons/googleworkspace.svg', name: 'Google Workspace' }

/** Grouped tools and capabilities. Beta denotes skills still being developed. */
export const aiStack: StackNode = {
  id: 'root',
  Icon: Sparkle,
  name: profile.name,
  what: 'Current operations tools, alongside APIs, JSON, AI workflows, and integration skills in development.',
  stack: 'Healthcare operations · quality assurance · reporting · workflow improvement',
  children: [
    {
      id: 'core-tools',
      Icon: Article,
      name: 'Core tools',
      what: 'Tools used for spreadsheet work, reporting, and operational automation.',
      children: [
        {
          id: 'excel',
          Icon: Article,
          name: 'Microsoft Excel',
          what: 'Spreadsheet analysis and tools for operational processes.',
          status: 'Internal',
        },
        {
          id: 'google-sheets',
          Icon: Article,
          logos: [GOOGLE_WORKSPACE],
          name: 'Google Sheets',
          what: 'Shared spreadsheet-based tracking and reporting.',
          status: 'Internal',
        },
        {
          id: 'sql',
          Icon: Database,
          name: 'SQL',
          what: 'Querying and organizing data for analysis.',
          status: 'Internal',
        },
        {
          id: 'power-automate',
          Icon: FlowArrow,
          name: 'Power Automate',
          what: 'Workflow automation for routine notifications and handoffs.',
          status: 'Internal',
        },
        {
          id: 'vba',
          Icon: Article,
          name: 'VBA',
          what: 'Excel macros for streamlining recurring spreadsheet tasks.',
          status: 'Internal',
        },
        {
          id: 'apps-script',
          Icon: FlowArrow,
          logos: [GOOGLE_WORKSPACE],
          name: 'Google Apps Script',
          what: 'Scripting for Google Workspace tasks and data flows.',
          status: 'Internal',
        },
      ],
    },
    {
      id: 'integration-analytics',
      Icon: Database,
      name: 'Integration and analytics',
      what: 'Developing ways to move information between systems and make reporting clearer.',
      children: [
        {
          id: 'apis',
          Icon: Plug,
          name: 'APIs',
          what: 'Learning to connect services through documented interfaces.',
          status: 'Beta',
        },
        {
          id: 'json',
          Icon: Article,
          name: 'JSON',
          what: 'Working with structured data used in system integrations.',
          status: 'Beta',
        },
        {
          id: 'http-requests',
          Icon: Browser,
          name: 'HTTP requests',
          what: 'Developing practical request and response handling.',
          status: 'Beta',
        },
        {
          id: 'data-dashboards',
          Icon: Database,
          name: 'Data dashboards',
          what: 'Reporting views that make operational indicators easier to monitor.',
          status: 'Internal',
        },
      ],
    },
    {
      id: 'developing',
      Icon: Robot,
      name: 'Areas in development',
      what: 'Exploratory capabilities, not claims of production-ready client systems.',
      children: [
        {
          id: 'ai-workflows',
          Icon: Robot,
          name: 'AI workflows',
          what: 'Exploring where AI can assist a workflow with appropriate review and safeguards.',
          status: 'Beta',
        },
        {
          id: 'lead-automation',
          Icon: UsersThree,
          name: 'Lead automation',
          what: 'Developing lead tracking and follow-up workflow concepts.',
          status: 'Beta',
        },
        {
          id: 'system-integration',
          Icon: FlowArrow,
          name: 'System integration',
          what: 'Expanding skills for connecting existing business systems.',
          status: 'Beta',
        },
      ],
    },
  ],
}
