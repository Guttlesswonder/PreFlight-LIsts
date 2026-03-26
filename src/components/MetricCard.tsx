interface MetricCardProps {
  label: string;
  value: string | number;
  tone?: 'default' | 'good' | 'warn' | 'danger';
}

const toneMap = {
  default: 'bg-white text-slate-900 border-slate-200',
  good: 'bg-emerald-50 text-emerald-900 border-emerald-200',
  warn: 'bg-amber-50 text-amber-900 border-amber-200',
  danger: 'bg-rose-50 text-rose-900 border-rose-200'
};

export function MetricCard({ label, value, tone = 'default' }: MetricCardProps) {
  return (
    <div className={`rounded-xl border p-3 ${toneMap[tone]}`}>
      <p className="text-xs uppercase tracking-wide">{label}</p>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
    </div>
  );
}
