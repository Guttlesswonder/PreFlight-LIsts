import type { AccountRecord, ChecklistItem, ReadinessSummary } from '../types';

export const flattenItems = (record: AccountRecord): ChecklistItem[] =>
  record.sections.flatMap((section) => section.items);

export const calculateReadiness = (record: AccountRecord): ReadinessSummary => {
  const items = flattenItems(record);
  const totals = {
    confirmed: items.filter((item) => item.status === 'confirmed').length,
    assumed: items.filter((item) => item.status === 'assumed').length,
    unknown: items.filter((item) => item.status === 'unknown').length,
    atRisk: items.filter((item) => item.status === 'at-risk').length
  };

  const denominator = Math.max(items.length, 1);
  const signalScore = Math.max(
    0,
    Math.round(((totals.confirmed * 1 + totals.assumed * 0.5 - totals.unknown * 0.5 - totals.atRisk) / denominator) * 100)
  );

  const warningCount = totals.assumed + totals.unknown;
  const blockingCount = totals.atRisk;

  const classify = (score: number): 'High' | 'Medium' | 'Low' => {
    if (score >= 65) return 'High';
    if (score >= 35) return 'Medium';
    return 'Low';
  };

  const expansionPenalty = warningCount * 6 + blockingCount * 14;
  const adoptionPenalty = totals.unknown * 9 + totals.atRisk * 12;

  return {
    signalScore,
    confirmedCount: totals.confirmed,
    assumedCount: totals.assumed,
    unknownCount: totals.unknown,
    atRiskCount: totals.atRisk,
    warningCount,
    blockingCount,
    expansionReadiness: classify(Math.max(0, signalScore - expansionPenalty)),
    adoptionReadiness: classify(Math.max(0, signalScore - adoptionPenalty))
  };
};
