import type { ReadinessSummary } from '../types';
import { MetricCard } from './MetricCard';

interface ReadinessPanelProps {
  all: ReadinessSummary;
  sales: ReadinessSummary;
  implementation: ReadinessSummary;
}

export function ReadinessPanel({ all, sales, implementation }: ReadinessPanelProps) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold">Readiness Overview</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Overall readiness" value={`${all.percentReady}%`} tone="good" />
        <MetricCard label="At risk" value={all.atRisk} tone="danger" />
        <MetricCard label="Unknown" value={all.unknown} tone="warn" />
        <MetricCard label="Assumed" value={all.assumed} tone="warn" />
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-3">
          <h3 className="font-medium">Sales Agreement lens</h3>
          <p className="text-sm text-slate-600">{sales.percentReady}% ready · {sales.atRisk} at risk</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-3">
          <h3 className="font-medium">Implementation Brief lens</h3>
          <p className="text-sm text-slate-600">{implementation.percentReady}% ready · {implementation.atRisk} at risk</p>
        </div>
      </div>
    </section>
  );
}
