import { describe, expect, it } from 'vitest';
import { CHECKLIST_ITEMS } from '../data/checklist';
import { createDeal, duplicateDeal, normalizeImportedState, removeDeal } from './importExport';

describe('import/export deal helpers', () => {
  it('creates, duplicates, and removes deals', () => {
    const deal = createDeal('Alpha', CHECKLIST_ITEMS);
    const copy = duplicateDeal(deal);

    expect(copy.id).not.toBe(deal.id);
    expect(copy.meta.name).toContain('(Copy)');

    const state = { deals: [deal, copy], activeDealId: deal.id };
    const next = removeDeal(state, deal.id);

    expect(next.deals).toHaveLength(1);
    expect(next.activeDealId).toBe(copy.id);
  });

  it('normalizes malformed imported state', () => {
    const normalized = normalizeImportedState({ deals: [{ id: '1', meta: { name: '' }, responses: {} }] }, CHECKLIST_ITEMS);

    expect(normalized.deals).toHaveLength(1);
    expect(normalized.deals[0].meta.name).toBe('Untitled deal');
    expect(Object.keys(normalized.deals[0].responses)).toHaveLength(CHECKLIST_ITEMS.length);
  });
});
