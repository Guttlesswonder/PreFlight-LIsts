import { makeDefaultRecord } from '../data/defaultRecord';
import type { AccountRecord, AppState, ChecklistSection } from '../types';
import { isoNow } from '../utils/dates';
import { makeId } from '../utils/ids';

const normalizeSection = (value: unknown): ChecklistSection | null => {
  if (!value || typeof value !== 'object') return null;
  const section = value as Partial<ChecklistSection>;
  if (section.id !== 'people' && section.id !== 'process' && section.id !== 'technology') return null;

  return {
    id: section.id,
    name: section.name ?? section.id,
    description: section.description ?? '',
    items: Array.isArray(section.items)
      ? section.items.map((item) => ({
          id: typeof item?.id === 'string' ? item.id : makeId('item'),
          question: typeof item?.question === 'string' ? item.question : 'Untitled question',
          why: typeof item?.why === 'string' ? item.why : '',
          status:
            item?.status === 'confirmed' ||
            item?.status === 'assumed' ||
            item?.status === 'unknown' ||
            item?.status === 'not-applicable' ||
            item?.status === 'at-risk'
              ? item.status
              : 'unknown',
          answer: typeof item?.answer === 'string' ? item.answer : '',
          owner: typeof item?.owner === 'string' ? item.owner : '',
          dueDate: typeof item?.dueDate === 'string' ? item.dueDate : '',
          risk: typeof item?.risk === 'string' ? item.risk : ''
        }))
      : []
  };
};

export const normalizeRecord = (value: unknown): AccountRecord => {
  if (!value || typeof value !== 'object') return makeDefaultRecord();
  const partial = value as Partial<AccountRecord>;
  const now = isoNow();

  const sections = Array.isArray(partial.sections)
    ? partial.sections.map(normalizeSection).filter((section): section is ChecklistSection => section !== null)
    : [];

  return {
    id: typeof partial.id === 'string' && partial.id ? partial.id : makeId('record'),
    name: typeof partial.name === 'string' && partial.name ? partial.name : 'Imported Record',
    createdAt: typeof partial.createdAt === 'string' ? partial.createdAt : now,
    updatedAt: typeof partial.updatedAt === 'string' ? partial.updatedAt : now,
    notes: typeof partial.notes === 'string' ? partial.notes : '',
    sections: sections.length > 0 ? sections : makeDefaultRecord().sections
  };
};

export const dedupeRecordIds = (records: AccountRecord[]): AccountRecord[] => {
  const seen = new Set<string>();
  return records.map((record) => {
    if (seen.has(record.id)) {
      return { ...record, id: makeId('record') };
    }
    seen.add(record.id);
    return record;
  });
};

export const normalizeAppState = (value: unknown): AppState => {
  if (!value || typeof value !== 'object') {
    const starter = makeDefaultRecord('Starter Account');
    return { records: [starter], activeRecordId: starter.id };
  }

  const raw = value as Partial<AppState>;
  const normalizedRecords = dedupeRecordIds(
    Array.isArray(raw.records) && raw.records.length > 0
      ? raw.records.map((entry) => normalizeRecord(entry))
      : [makeDefaultRecord('Starter Account')]
  );

  const activeRecordId =
    typeof raw.activeRecordId === 'string' && normalizedRecords.some((record) => record.id === raw.activeRecordId)
      ? raw.activeRecordId
      : normalizedRecords[0].id;

  return {
    records: normalizedRecords,
    activeRecordId
  };
};
