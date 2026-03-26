import { describe, expect, it } from 'vitest';
import { makeDefaultRecord } from '../data/defaultRecord';
import { calculateReadiness } from '../logic/readiness';

describe('calculateReadiness', () => {
  it('counts status totals and returns readiness labels', () => {
    const record = makeDefaultRecord();
    record.sections[0].items[0].status = 'confirmed';
    record.sections[0].items[1].status = 'assumed';
    record.sections[1].items[0].status = 'at-risk';

    const summary = calculateReadiness(record);

    expect(summary.confirmedCount).toBe(1);
    expect(summary.assumedCount).toBe(1);
    expect(summary.atRiskCount).toBe(1);
    expect(['High', 'Medium', 'Low']).toContain(summary.expansionReadiness);
  });
});
