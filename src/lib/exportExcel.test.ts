import { describe, expect, it } from 'vitest';
import { sanitizeSheetName } from './exportExcel';

describe('excel helpers', () => {
  it('sanitizes sheet names for excel constraints', () => {
    const unsafe = 'Revenue / Region: North America [FY26]?';
    const safe = sanitizeSheetName(unsafe);

    expect(safe).not.toMatch(/[\\/?*\[\]:]/);
    expect(safe.length).toBeLessThanOrEqual(31);
  });
});
