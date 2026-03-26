import type { ChecklistSection } from '../types';
import { makeId } from '../utils/ids';

export const buildChecklistTemplate = (): ChecklistSection[] => [
  {
    id: 'people',
    name: 'People',
    description: 'Stakeholder ownership, enablement coverage, and accountability.',
    items: [
      {
        id: makeId('item'),
        question: 'Are executive sponsors identified and engaged?',
        why: 'Sponsor commitment drives prioritization and internal adoption.',
        status: 'unknown',
        answer: '',
        owner: '',
        dueDate: '',
        risk: ''
      },
      {
        id: makeId('item'),
        question: 'Is there a clear operational owner for expansion initiatives?',
        why: 'Unclear ownership slows execution and follow-through.',
        status: 'unknown',
        answer: '',
        owner: '',
        dueDate: '',
        risk: ''
      }
    ]
  },
  {
    id: 'process',
    name: 'Process',
    description: 'Workflow consistency, reporting cadence, and change management.',
    items: [
      {
        id: makeId('item'),
        question: 'Are documented workflows in place for core recurring motions?',
        why: 'Repeatable workflows reduce operational friction and risk.',
        status: 'unknown',
        answer: '',
        owner: '',
        dueDate: '',
        risk: ''
      },
      {
        id: makeId('item'),
        question: 'Is KPI reporting reviewed in a regular cadence?',
        why: 'Cadence reviews expose gaps and prioritize growth actions.',
        status: 'unknown',
        answer: '',
        owner: '',
        dueDate: '',
        risk: ''
      }
    ]
  },
  {
    id: 'technology',
    name: 'Technology',
    description: 'System fit, integration quality, and visibility tooling.',
    items: [
      {
        id: makeId('item'),
        question: 'Are key systems integrated with minimal manual rework?',
        why: 'Disconnected systems create data delays and inconsistent execution.',
        status: 'unknown',
        answer: '',
        owner: '',
        dueDate: '',
        risk: ''
      },
      {
        id: makeId('item'),
        question: 'Does the team have reliable visibility into adoption trends?',
        why: 'Low visibility makes it difficult to identify expansion timing.',
        status: 'unknown',
        answer: '',
        owner: '',
        dueDate: '',
        risk: ''
      }
    ]
  }
];
