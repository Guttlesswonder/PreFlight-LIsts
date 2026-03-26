import type { ChecklistItem, ItemResponse, Status } from '../types';

interface SectionItemCardProps {
  item: ChecklistItem;
  response: ItemResponse;
  onStatusChange: (status: Status) => void;
  onNotesChange: (notes: string) => void;
}

const STATUS_OPTIONS: Status[] = ['Confirmed', 'Assumed', 'Unknown', 'Not Applicable', 'At Risk'];

export function SectionItemCard({ item, response, onStatusChange, onNotesChange }: SectionItemCardProps) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-3">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <p className="font-medium text-slate-900">{item.prompt}</p>
        <span className="rounded bg-slate-100 px-2 py-1 text-xs">{item.lenses.join(' + ')}</span>
      </div>
      <div className="grid gap-2 md:grid-cols-[220px,1fr]">
        <select className="rounded border p-2" value={response.status} onChange={(e) => onStatusChange(e.target.value as Status)}>
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        <input className="rounded border p-2" placeholder="Notes / rationale" value={response.notes} onChange={(e) => onNotesChange(e.target.value)} />
      </div>
    </article>
  );
}
