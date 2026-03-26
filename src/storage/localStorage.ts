import { normalizeAppState } from '../logic/normalization';
import type { AppState } from '../types';
import { STORAGE_KEY } from '../utils/constants';

export const loadAppState = (): AppState => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return normalizeAppState(null);
    return normalizeAppState(JSON.parse(raw));
  } catch {
    return normalizeAppState(null);
  }
};

export const saveAppState = (state: AppState): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};
