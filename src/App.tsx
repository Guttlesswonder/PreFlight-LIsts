import { useMemo, useState } from 'react';
import { DealToolbar } from './components/DealToolbar';
import { OpenIssuesTable } from './components/OpenIssuesTable';
import { ReadinessPanel } from './components/ReadinessPanel';
import { SectionItemCard } from './components/SectionItemCard';
import { Sidebar } from './components/Sidebar';
import { CHECKLIST_ITEMS, CHECKLIST_SECTIONS } from './data/checklist';
import { exportDealToExcel } from './lib/exportExcel';
import { createDeal, duplicateDeal, normalizeImportedState, removeDeal, toJsonExport } from './lib/importExport';
import { summarizeReadiness } from './lib/readiness';
import { loadState, saveState } from './lib/storage';
import type { Deal, DealMeta, Status } from './types';

const FILTERS = ['All', 'Confirmed', 'Assumed', 'Unknown', 'Not Applicable', 'At Risk'] as const;

function App() {
  const [state, setState] = useState(() => loadState(CHECKLIST_ITEMS));
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<(typeof FILTERS)[number]>('All');

  const activeDeal = state.deals.find((deal) => deal.id === state.activeDealId) as Deal;

  const updateState = (next: typeof state) => {
    setState(next);
    saveState(next);
  };

  const updateActiveDeal = (mutator: (deal: Deal) => Deal) => {
    const next = {
      ...state,
      deals: state.deals.map((deal) => (deal.id === state.activeDealId ? mutator(deal) : deal))
    };
    updateState(next);
  };

  const filteredItems = useMemo(() => {
    return CHECKLIST_ITEMS.filter((item) => {
      const responseStatus = activeDeal.responses[item.id]?.status ?? 'Unknown';
      const matchesSearch = `${item.section} ${item.prompt}`.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'All' || responseStatus === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [activeDeal.responses, search, statusFilter]);

  const groupedItems = useMemo(
    () => CHECKLIST_SECTIONS.map((section) => ({ section, items: filteredItems.filter((item) => item.section === section) })).filter((s) => s.items.length),
    [filteredItems]
  );

  const overall = summarizeReadiness(CHECKLIST_ITEMS, activeDeal.responses);
  const sales = summarizeReadiness(CHECKLIST_ITEMS, activeDeal.responses, 'Sales Agreement');
  const implementation = summarizeReadiness(CHECKLIST_ITEMS, activeDeal.responses, 'Implementation Brief');

  const onMetaChange = (key: keyof DealMeta, value: string) => {
    updateActiveDeal((deal) => ({ ...deal, meta: { ...deal.meta, [key]: value }, updatedAt: new Date().toISOString() }));
  };

  const onResponseStatus = (itemId: string, status: Status) => {
    updateActiveDeal((deal) => ({
      ...deal,
      responses: { ...deal.responses, [itemId]: { ...deal.responses[itemId], status } },
      updatedAt: new Date().toISOString()
    }));
  };

  const onResponseNotes = (itemId: string, notes: string) => {
    updateActiveDeal((deal) => ({
      ...deal,
      responses: { ...deal.responses, [itemId]: { ...deal.responses[itemId], notes } },
      updatedAt: new Date().toISOString()
    }));
  };

  return (
    <div className="mx-auto max-w-[1400px] p-4 text-slate-900 md:p-6">
      <header className="mb-4">
        <h1 className="text-2xl font-bold">Pre Flight Checklist App</h1>
        <p className="text-sm text-slate-600">Local-only deal readiness checklist with export tooling.</p>
      </header>
      <div className="grid gap-4 lg:grid-cols-[250px,1fr]">
        <Sidebar
          deals={state.deals}
          activeDealId={state.activeDealId}
          onSelect={(id) => updateState({ ...state, activeDealId: id })}
        />
        <main className="space-y-4">
          <DealToolbar
            meta={activeDeal.meta}
            onMetaChange={onMetaChange}
            onCreate={() => {
              const nextDeal = createDeal(`Deal ${state.deals.length + 1}`, CHECKLIST_ITEMS);
              updateState({ deals: [...state.deals, nextDeal], activeDealId: nextDeal.id });
            }}
            onDuplicate={() => {
              const copy = duplicateDeal(activeDeal);
              updateState({ deals: [...state.deals, copy], activeDealId: copy.id });
            }}
            onDelete={() => updateState(removeDeal(state, activeDeal.id))}
            disableDelete={state.deals.length <= 1}
            onExportJson={() => {
              const blob = new Blob([toJsonExport(state)], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `${activeDeal.meta.name || 'deals'}.json`;
              a.click();
              URL.revokeObjectURL(url);
            }}
            onImportJson={async (file) => {
              try {
                const text = await file.text();
                const parsed = JSON.parse(text);
                const next = normalizeImportedState(parsed, CHECKLIST_ITEMS);
                updateState(next);
              } catch {
                window.alert('Unable to import JSON file.');
              }
            }}
            onExportExcel={() => exportDealToExcel(activeDeal, CHECKLIST_ITEMS)}
          />

          <ReadinessPanel all={overall} sales={sales} implementation={implementation} />

          <section className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="mb-3 flex flex-wrap gap-2">
              <input
                className="min-w-[240px] flex-1 rounded border p-2"
                placeholder="Search checklist items"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <select className="rounded border p-2" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as (typeof FILTERS)[number])}>
                {FILTERS.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-4">
              {groupedItems.map(({ section, items }) => (
                <div key={section} className="space-y-2">
                  <h3 className="text-base font-semibold">{section}</h3>
                  {items.map((item) => (
                    <SectionItemCard
                      key={item.id}
                      item={item}
                      response={activeDeal.responses[item.id]}
                      onStatusChange={(status) => onResponseStatus(item.id, status)}
                      onNotesChange={(notes) => onResponseNotes(item.id, notes)}
                    />
                  ))}
                </div>
              ))}
            </div>
          </section>

          <OpenIssuesTable items={CHECKLIST_ITEMS} responses={activeDeal.responses} />
        </main>
      </div>
    </div>
  );
}

export default App;
