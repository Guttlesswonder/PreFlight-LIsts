export type LensId = 'people' | 'process' | 'technology';

export type ChecklistStatus = 'confirmed' | 'assumed' | 'unknown' | 'not-applicable' | 'at-risk';

export interface ChecklistItem {
  id: string;
  question: string;
  why: string;
  status: ChecklistStatus;
  answer: string;
  owner: string;
  dueDate: string;
  risk: string;
}

export interface ChecklistSection {
  id: LensId;
  name: string;
  description: string;
  items: ChecklistItem[];
}

export interface WhiteSpaceCard {
  id: string;
  lens: string;
  title: string;
  signal: string;
  why: string;
  motion: string;
}

export interface AccountRecord {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  notes: string;
  sections: ChecklistSection[];
}

export interface AppState {
  records: AccountRecord[];
  activeRecordId: string;
}

export interface ReadinessSummary {
  signalScore: number;
  confirmedCount: number;
  assumedCount: number;
  unknownCount: number;
  atRiskCount: number;
  warningCount: number;
  blockingCount: number;
  expansionReadiness: 'High' | 'Medium' | 'Low';
  adoptionReadiness: 'High' | 'Medium' | 'Low';
}

export type FilterStatus = 'all' | ChecklistStatus;
export type ImportMode = 'merge' | 'replace';
