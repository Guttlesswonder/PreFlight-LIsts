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
});
