export const STATUSES = ['Confirmed', 'Assumed', 'Unknown', 'Not Applicable', 'At Risk'] as const;

export type Status = (typeof STATUSES)[number];

export type Lens = 'Sales Agreement' | 'Implementation Brief';

export interface ChecklistItem {
  id: string;
  section: string;
  prompt: string;
  lenses: Lens[];
}

export interface ItemResponse {
  status: Status;
  notes: string;
}

export interface DealMeta {
  name: string;
  sfdcRef: string;
  salesOwner: string;
  opportunityStage: string;
}

export interface Deal {
  id: string;
  meta: DealMeta;
  responses: Record<string, ItemResponse>;
  updatedAt: string;
}

export interface AppState {
  deals: Deal[];
  activeDealId: string;
}

export interface ReadinessSummary {
  total: number;
  ready: number;
  atRisk: number;
  unknown: number;
  assumed: number;
  notApplicable: number;
  confirmed: number;
  percentReady: number;
}
