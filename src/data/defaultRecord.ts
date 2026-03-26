import type { AccountRecord } from '../types';
import { buildChecklistTemplate } from './checklist';
import { isoNow } from '../utils/dates';
import { makeId } from '../utils/ids';

export const makeDefaultRecord = (name = 'New Account Record'): AccountRecord => {
  const now = isoNow();
  return {
    id: makeId('record'),
    name,
    createdAt: now,
    updatedAt: now,
    notes: '',
    sections: buildChecklistTemplate()
  };
};
