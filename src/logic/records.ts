import { makeDefaultRecord } from '../data/defaultRecord';
import type { AccountRecord } from '../types';
import { isoNow } from '../utils/dates';
import { makeId } from '../utils/ids';

export const createRecordFromTemplate = (name: string): AccountRecord => makeDefaultRecord(name);

export const duplicateRecord = (record: AccountRecord): AccountRecord => {
  const now = isoNow();
  return {
    ...record,
    id: makeId('record'),
    name: `${record.name} (Copy)`,
    createdAt: now,
    updatedAt: now
  };
};
