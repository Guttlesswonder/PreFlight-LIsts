import type { ChecklistSection } from '../types';
import { makeId } from '../utils/ids';

const makeItem = (question: string, why: string, risk: string) => ({
  id: makeId('item'),
  question,
  why,
  status: 'unknown' as const,
  answer: '',
  owner: '',
  dueDate: '',
  risk
});

export const buildChecklistTemplate = (): ChecklistSection[] => [
  {
    id: 'people',
    name: 'People',
    description:
      'Capture the people signal that tells the AM who can sponsor change, who owns execution, & where expansion may stall.',
    items: [
      makeItem(
        'Who are the key leaders across executive, clinical, operations, finance, & IT?',
        'Shows who matters in evaluation, adoption, & expansion.',
        'Missing stakeholders weakens expansion strategy.'
      ),
      makeItem(
        'Who is the executive sponsor for change or growth?',
        'No sponsor usually means no momentum for expansion.',
        'No sponsor means no internal momentum.'
      ),
      makeItem(
        'Who owns rollout after purchase?',
        'Execution ownership determines whether adoption can stick.',
        'Adoption risk stays high even if the sale closes.'
      ),
      makeItem(
        'Which functions are centralized versus local?',
        'Centralization shows where one motion can scale across the group.',
        'The team may pitch the wrong level of solution.'
      ),
      makeItem(
        'Who outside the organization influences strategic direction?',
        'Hidden influencers often shape priorities, timing, & objections.',
        'Hidden decision pressure may delay or derail the motion.'
      )
    ]
  },
  {
    id: 'process',
    name: 'Process',
    description:
      'Capture the process signal that shows where work is manual, fragmented, inconsistent, or dependent on third parties.',
    items: [
      makeItem(
        'Do they standardize workflows across locations?',
        'Standardization signals whether change can scale cleanly.',
        'Rollout effort & adoption risk are harder to predict.'
      ),
      makeItem(
        'Which workflows vary most by office?',
        'Variation often creates friction, inefficiency, & white space.',
        'Operational inconsistency may block scale.'
      ),
      makeItem(
        'How is patient communication managed today?',
        'Shows whether engagement is fragmented, manual, or vendor dependent.',
        'Engagement gaps & vendor overlap may be missed.'
      ),
      makeItem(
        'How is insurance handled today?',
        'Insurance workflow maturity affects operational fit & service needs.',
        'RCM related pain points may be misunderstood.'
      ),
      makeItem(
        'How are payments handled today?',
        'Payment friction often reveals automation or platform opportunity.',
        'Automation or platform fit may be mis-scoped.'
      )
    ]
  },
  {
    id: 'technology',
    name: 'Technology',
    description:
      'Capture the technology signal that shows what systems are in place, what is fragmented, what vendors are active, & where reporting or adoption gaps exist.',
    items: [
      makeItem(
        'What products do they already own from us?',
        'Shows current footprint, adoption depth, & adjacent expansion paths.',
        'The team may miss adoption & expansion opportunities.'
      ),
      makeItem(
        'What PMS systems are in use today?',
        'Mixed systems usually create complexity & opportunity.',
        'Platform complexity may be underestimated.'
      ),
      makeItem(
        'What imaging platforms are in use today?',
        'Imaging diversity may affect integrations, workflow, & standardization.',
        'Integration or workflow needs may be missed.'
      ),
      makeItem(
        'Which third party vendors are active, & what job does each do?',
        'Vendor sprawl is often the clearest white space map.',
        'Displacement opportunities may be missed.'
      ),
      makeItem(
        'How are KPIs & reporting handled today?',
        'Manual reporting is a strong signal for analytics or automation opportunity.',
        'Analytics & visibility gaps may remain invisible.'
      )
    ]
  }
];
