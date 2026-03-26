import type { AppState, Deal, ChecklistItem } from '../types';
import { buildInitialResponses } from './readiness';

export function createDeal(name: string, items: ChecklistItem[]): Deal {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    meta: {
      name: name.trim() || 'Untitled deal',
      sfdcRef: '',
      salesOwner: '',
      opportunityStage: ''
    },
    responses: buildInitialResponses(items),
    updatedAt: now
  };
}

export function duplicateDeal(source: Deal): Deal {
  return {
    ...source,
    id: crypto.randomUUID(),
    meta: { ...source.meta, name: `${source.meta.name} (Copy)` },
    responses: structuredClone(source.responses),
    updatedAt: new Date().toISOString()
  };
}

export function removeDeal(state: AppState, dealId: string): AppState {
  const deals = state.deals.filter((deal) => deal.id !== dealId);
  if (!deals.length) return state;
  const activeDealId = state.activeDealId === dealId ? deals[0].id : state.activeDealId;
  return { ...state, deals, activeDealId };
}

export function normalizeImportedState(raw: unknown, items: ChecklistItem[]): AppState {
  const baseDeal = createDeal('Imported deal', items);

  if (!raw || typeof raw !== 'object') {
    return { deals: [baseDeal], activeDealId: baseDeal.id };
  }

  const candidate = raw as Partial<AppState>;
  const deals = (candidate.deals ?? [])
    .filter((deal): deal is Deal => Boolean(deal && typeof deal.id === 'string' && deal.meta && deal.responses))
    .map((deal) => ({
      ...deal,
      meta: {
        name: deal.meta.name || 'Untitled deal',
        sfdcRef: deal.meta.sfdcRef || '',
        salesOwner: deal.meta.salesOwner || '',
        opportunityStage: deal.meta.opportunityStage || ''
      },
      responses: {
        ...buildInitialResponses(items),
        ...deal.responses
      },
      updatedAt: deal.updatedAt || new Date().toISOString()
    }));

  if (!deals.length) {
    return { deals: [baseDeal], activeDealId: baseDeal.id };
  }

  const activeDealId = deals.some((deal) => deal.id === candidate.activeDealId) ? (candidate.activeDealId as string) : deals[0].id;
  return { deals, activeDealId };
}

export function toJsonExport(state: AppState): string {
  return JSON.stringify(state, null, 2);
}
