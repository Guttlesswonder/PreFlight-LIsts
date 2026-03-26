import { describe, expect, it } from 'vitest';
import { makeDefaultRecord } from '../data/defaultRecord';
import { generateWhiteSpace } from '../logic/whitespace';

describe('generateWhiteSpace', () => {
  it('creates cards for assumed/unknown/at-risk gaps', () => {
    const record = makeDefaultRecord();
    record.sections[0].items[0].status = 'assumed';
    record.sections[1].items[0].status = 'confirmed';

    const cards = generateWhiteSpace(record);

    expect(cards.length).toBeGreaterThan(0);
    expect(cards[0].motion.length).toBeGreaterThan(0);
  });

  it('maps vendor/reporting signals to specific generic motions', () => {
    const record = makeDefaultRecord();
    const tech = record.sections.find((section) => section.id === 'technology')!;
    tech.items[3].status = 'assumed';
    tech.items[4].status = 'assumed';

    const cards = generateWhiteSpace(record);
    const motions = cards.map((card) => card.motion);

    expect(motions).toContain('Vendor consolidation');
    expect(motions).toContain('Reporting maturity');
  });
});
