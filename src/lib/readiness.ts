import type { ChecklistItem, ItemResponse, Lens, ReadinessSummary } from '../types';

export const DEFAULT_RESPONSE: ItemResponse = { status: 'Unknown', notes: '' };

export function buildInitialResponses(items: ChecklistItem[]): Record<string, ItemResponse> {
  return items.reduce<Record<string, ItemResponse>>((acc, item) => {
    acc[item.id] = { ...DEFAULT_RESPONSE };
    return acc;
  }, {});
}

export function summarizeReadiness(items: ChecklistItem[], responses: Record<string, ItemResponse>, lens?: Lens): ReadinessSummary {
  const filteredItems = lens ? items.filter((item) => item.lenses.includes(lens)) : items;

  const summary = filteredItems.reduce(
    (acc, item) => {
      const status = responses[item.id]?.status ?? 'Unknown';
      acc.total += 1;
      if (status === 'Confirmed') acc.ready += 1;
      if (status === 'At Risk') acc.atRisk += 1;
      if (status === 'Unknown') acc.unknown += 1;
      if (status === 'Assumed') acc.assumed += 1;
      if (status === 'Not Applicable') acc.notApplicable += 1;
      if (status === 'Confirmed') acc.confirmed += 1;
      return acc;
    },
    {
      total: 0,
      ready: 0,
      atRisk: 0,
      unknown: 0,
      assumed: 0,
      notApplicable: 0,
      confirmed: 0,
      percentReady: 0
    } as ReadinessSummary
  );

  summary.percentReady = summary.total ? Math.round((summary.ready / summary.total) * 100) : 0;
  return summary;
}
