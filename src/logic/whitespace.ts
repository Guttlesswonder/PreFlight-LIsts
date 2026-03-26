import type { AccountRecord, WhiteSpaceCard } from '../types';
import { makeId } from '../utils/ids';

const motionMap: Record<string, string> = {
  people: 'Adoption support',
  process: 'Workflow automation',
  technology: 'Analytics & visibility'
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
          motion:
            item.status === 'at-risk'
              ? 'Operational consistency'
              : motionMap[section.id] ?? 'Reporting maturity'
        });
      }
    }
  }

  return cards;
};
