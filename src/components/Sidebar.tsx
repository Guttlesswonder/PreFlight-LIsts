import type { Deal } from '../types';

interface SidebarProps {
  deals: Deal[];
  activeDealId: string;
  onSelect: (id: string) => void;
}

export function Sidebar({ deals, activeDealId, onSelect }: SidebarProps) {
  return (
    <aside className="space-y-2 rounded-xl border border-slate-200 bg-white p-3">
      <h2 className="text-sm font-semibold text-slate-700">Deals</h2>
      {deals.map((deal) => (
        <button
          key={deal.id}
          onClick={() => onSelect(deal.id)}
          className={`w-full rounded-lg px-3 py-2 text-left text-sm ${
            activeDealId === deal.id ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
          }`}
        >
          <div className="font-medium">{deal.meta.name}</div>
          <div className="text-xs opacity-80">{deal.meta.sfdcRef || 'No SFDC ref'}</div>
        </button>
      ))}
    </aside>
  );
}
