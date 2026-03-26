import type { AppState, ChecklistItem } from '../types';
import { createDeal, normalizeImportedState } from './importExport';

const STORAGE_KEY = 'pre-flight-checklist-state';

export function loadState(items: ChecklistItem[]): AppState {
  const fallbackDeal = createDeal('Primary deal', items);
  const fallback = { deals: [fallbackDeal], activeDealId: fallbackDeal.id };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    return normalizeImportedState(JSON.parse(raw), items);
  } catch {
    return fallback;
  }
}

export function saveState(state: AppState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function clearState(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export { STORAGE_KEY };
