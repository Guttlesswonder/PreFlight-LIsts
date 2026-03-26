import { describe, expect, it } from 'vitest';
import { buildChecklistTemplate } from '../data/checklist';
import { createRecordFromTemplate, duplicateRecord } from '../logic/records';

describe('template and record helpers', () => {
  it('builds lean 15-item template across people/process/technology', () => {
    const sections = buildChecklistTemplate();
    expect(sections.map((section) => section.id)).toEqual(['people', 'process', 'technology']);
    expect(sections.reduce((total, section) => total + section.items.length, 0)).toBe(15);
    expect(sections.every((section) => section.items.every((item) => item.why.length > 0 && item.risk.length > 0))).toBe(true);
  });

  it('creates record from template and duplicates with fresh identity', () => {
    const record = createRecordFromTemplate('Account A');
    const copy = duplicateRecord(record);

    expect(record.name).toBe('Account A');
    expect(record.sections.reduce((total, section) => total + section.items.length, 0)).toBe(15);
    expect(copy.id).not.toBe(record.id);
    expect(copy.name).toContain('(Copy)');
  });
});
