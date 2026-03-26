import type { AccountRecord, WhiteSpaceCard } from '../types';
import { makeId } from '../utils/ids';

const pickMotion = (lens: string, question: string, status: string): string => {
  if (status === 'at-risk') return 'Operational consistency';
  const lowerQuestion = question.toLowerCase();
  if (lowerQuestion.includes('vendor')) return 'Vendor consolidation';
  if (lowerQuestion.includes('kpi') || lowerQuestion.includes('reporting')) return 'Reporting maturity';
  if (lens === 'People') return 'Adoption support';
  if (lens === 'Process') return 'Workflow automation';
  return 'Analytics & visibility';
};

export const generateWhiteSpace = (record: AccountRecord): WhiteSpaceCard[] => {
  const cards: WhiteSpaceCard[] = [];

  for (const section of record.sections) {
    for (const item of section.items) {
      if (item.status === 'assumed' || item.status === 'unknown' || item.status === 'at-risk') {
        cards.push({
          id: makeId('ws'),
          lens: section.name,
          title: `${section.name} gap: ${item.question}`,
          signal: item.status,
          why: item.why,
          motion: pickMotion(section.name, item.question, item.status)
        });
      }
    }
  }

  return cards;
};
