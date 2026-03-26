import { describe, expect, it } from 'vitest';
import { CHECKLIST_ITEMS } from '../data/checklist';
import { buildInitialResponses, summarizeReadiness } from './readiness';

describe('readiness helpers', () => {
  it('buildInitialResponses defaults each item to Unknown', () => {
    const responses = buildInitialResponses(CHECKLIST_ITEMS.slice(0, 3));
    expect(Object.keys(responses)).toHaveLength(3);
    expect(Object.values(responses).every((value) => value.status === 'Unknown')).toBe(true);
  });

  it('summarizeReadiness computes summary values', () => {
    const items = CHECKLIST_ITEMS.slice(0, 4);
    const responses: Record<string, { status: 'Confirmed' | 'At Risk' | 'Assumed' | 'Unknown'; notes: string }> = {
      [items[0].id]: { status: 'Confirmed', notes: '' },
      [items[1].id]: { status: 'At Risk', notes: '' },
      [items[2].id]: { status: 'Assumed', notes: '' },
      [items[3].id]: { status: 'Unknown', notes: '' }
    };

    const summary = summarizeReadiness(items, responses);
    expect(summary.total).toBe(4);
    expect(summary.ready).toBe(1);
    expect(summary.atRisk).toBe(1);
    expect(summary.percentReady).toBe(25);
  });
});
