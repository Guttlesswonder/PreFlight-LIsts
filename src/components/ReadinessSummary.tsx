import type { ReadinessSummary as ReadinessSummaryType } from '../types';

export const ReadinessSummary = ({ summary }: { summary: ReadinessSummaryType }) => (
  <div className="rounded border border-slate-200 bg-white p-4 text-sm">
    <h3 className="mb-2 font-semibold">Growth Snapshot</h3>
    <ul className="space-y-1 text-slate-700">
      <li>Signal score: {summary.signalScore}</li>
      <li>Confirmed: {summary.confirmedCount}</li>
      <li>Assumed: {summary.assumedCount}</li>
      <li>Unknown: {summary.unknownCount}</li>
      <li>At risk: {summary.atRiskCount}</li>
      <li>Expansion readiness: {summary.expansionReadiness}</li>
      <li>Adoption readiness: {summary.adoptionReadiness}</li>
    </ul>
  </div>
);
