import { describe, expect, it } from 'vitest';
import { filterItems } from '../logic/filters';
import { dedupeRecordIds, normalizeAppState, normalizeRecord } from '../logic/normalization';
import { parseJsonImport } from '../import/importJson';

describe('normalization and import safety', () => {
  it('normalizes malformed app state to starter record', () => {
    const state = normalizeAppState({ records: 'bad-data' });
    expect(state.records.length).toBe(1);
    expect(state.activeRecordId).toBe(state.records[0].id);
  });

  it('deduplicates duplicate record ids', () => {
    const base = normalizeRecord({ id: 'same', name: 'A', sections: [] });
    const second = normalizeRecord({ id: 'same', name: 'B', sections: [] });
    const deduped = dedupeRecordIds([base, second]);
    expect(new Set(deduped.map((record) => record.id)).size).toBe(2);
  });

  it('normalizes imported json with record list', () => {
    const imported = parseJsonImport('[{"name":"One"},{"name":"Two"}]');
    expect(imported.length).toBe(2);
    expect(imported[0].sections.length).toBe(3);
  });

  it('filters across question and owner', () => {
    const record = normalizeRecord({ name: 'F', sections: [{ id: 'people', name: 'People', description: '', items: [{ id: 'i1', question: 'Q', why: '', status: 'confirmed', answer: '', owner: 'Alex', dueDate: '', risk: '' }] }, { id: 'process', name: 'Process', description: '', items: [] }, { id: 'technology', name: 'Technology', description: '', items: [] }] });
    const items = filterItems(record.sections[0].items, 'alex', 'all');
    expect(items.length).toBe(1);
  });
});
