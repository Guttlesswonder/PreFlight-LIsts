import type { ChecklistItem, ChecklistSection as ChecklistSectionType } from '../types';
import { ChecklistItemCard } from './ChecklistItemCard';

interface ChecklistSectionProps {
  section: ChecklistSectionType;
  items: ChecklistItem[];
  onUpdateItem: (itemId: string, patch: Partial<ChecklistItem>) => void;
}

export const ChecklistSection = ({ section, items, onUpdateItem }: ChecklistSectionProps) => (
  <div className="space-y-3">
    <div>
      <h2 className="text-xl font-semibold">{section.name}</h2>
      <p className="text-sm text-slate-600">{section.description}</p>
    </div>
    {items.length === 0 ? (
      <div className="rounded border border-dashed border-slate-300 bg-white p-4 text-sm text-slate-500">No items match your current filters.</div>
    ) : (
      items.map((item) => <ChecklistItemCard key={item.id} item={item} onUpdate={onUpdateItem} />)
    )}
  </div>
);
