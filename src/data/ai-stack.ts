/**
 * Verified technologies and tools shown in the Home and Projects views.
 * Content here is limited to the stack supplied for this portfolio.
 */

import {
  Article,
  BracketsCurly,
  Browser,
  ChartLine,
  Code,
  Database,
  FileCode,
  FlowArrow,
  GoogleLogo,
  MicrosoftExcelLogo,
  Robot,
  UsersThree,
  type Icon,
} from '@/components/slab'
import type { Icon as IconType } from '@/components/slab'
import { profile } from '@/data/profile'

export type StackStatus = 'Live' | 'Internal' | 'Beta'

export type StackLogo = { src: string; name: string }

export type StackNode = {
  id: string
  name: string
  what: string
  stack?: string
  status?: StackStatus
  Icon: IconType
  logos?: StackLogo[]
  children?: StackNode[]
}

const node = (id: string, name: string, what: string, Icon: Icon): StackNode => ({
  id,
  name,
  what,
  Icon,
})

export const aiStack: StackNode = {
  id: 'root',
  Icon: Robot,
  name: profile.name,
  what: 'Tools and technologies used across operations, analytics, development, and automation.',
  stack: 'Healthcare operations · workflow improvement · reporting · data processing',
  children: [
    {
      id: 'google-workspace',
      Icon: GoogleLogo,
      name: 'Google Workspace',
      what: 'Spreadsheet, form, and scripting tools.',
      children: [
        node('google-sheets', 'Google Sheets', 'Spreadsheets and reporting.', Article),
        node('apps-script', 'Apps Script', 'Google Workspace scripting and automation.', FlowArrow),
        node('google-forms', 'Google Forms', 'Form-based information collection.', Article),
      ],
    },
    {
      id: 'microsoft',
      Icon: MicrosoftExcelLogo,
      name: 'Microsoft',
      what: 'Spreadsheet, macro, workflow, and email tools.',
      children: [
        node('excel', 'Microsoft Excel', 'Spreadsheet analysis and workflow support.', Article),
        node('vba', 'VBA', 'Excel macro development.', Code),
        node('power-automate', 'Power Automate', 'Workflow automation.', FlowArrow),
        node('outlook', 'Outlook', 'Email and communication workflows.', Article),
      ],
    },
    {
      id: 'analytics',
      Icon: ChartLine,
      name: 'Analytics',
      what: 'Data querying, reporting, and business intelligence.',
      children: [
        node('sql', 'SQL', 'Querying and organizing data.', Database),
        node('power-bi', 'Power BI', 'Business intelligence and dashboards.', ChartLine),
        node('sheets-reporting', 'Google Sheets Reporting', 'Spreadsheet-based reporting.', Article),
      ],
    },
    {
      id: 'development',
      Icon: BracketsCurly,
      name: 'Development',
      what: 'Web development and service integration technologies.',
      children: [
        node('rest-apis', 'REST APIs', 'Application interfaces for data exchange.', FlowArrow),
        node('json', 'JSON', 'Structured data format for integrations.', BracketsCurly),
        node('typescript', 'TypeScript', 'Typed JavaScript development.', FileCode),
        node('react', 'React', 'Component-based user interface development.', Code),
        node('vite', 'Vite', 'Frontend development and build tooling.', Browser),
      ],
    },
    {
      id: 'ai-automation',
      Icon: UsersThree,
      name: 'AI and Automation',
      what: 'AI-assisted tools included in the supplied technology stack.',
      children: [
        node('claude-code', 'Claude Code', 'AI-assisted development tool.', Robot),
        node('chatgpt', 'ChatGPT', 'AI assistant.', Robot),
        node('elevenlabs', 'ElevenLabs', 'AI audio tools.', Robot),
      ],
    },
  ],
}
