import type { ChecklistStatus } from '../types';

export const STORAGE_KEY = 'account-growth-preflight:v1';

export const STATUS_OPTIONS: ChecklistStatus[] = [
  'confirmed',
  'assumed',
  'unknown',
  'not-applicable',
  'at-risk'
];
