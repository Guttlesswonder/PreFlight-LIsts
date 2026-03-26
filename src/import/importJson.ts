import { dedupeRecordIds, normalizeRecord } from '../logic/normalization';
import type { AccountRecord } from '../types';

export const parseJsonImport = (text: string): AccountRecord[] => {
  const parsed = JSON.parse(text);
  if (Array.isArray(parsed)) {
    return dedupeRecordIds(parsed.map((entry) => normalizeRecord(entry)));
  }
  return [normalizeRecord(parsed)];
};
