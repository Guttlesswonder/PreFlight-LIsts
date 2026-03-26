import { useMemo, useRef, useState, type ChangeEvent } from 'react';
import { RecordActions } from '../components/RecordActions';
import { RecordSelector } from '../components/RecordSelector';
import { SearchAndFilterBar } from '../components/SearchAndFilterBar';
import { ChecklistSection } from '../components/ChecklistSection';
import { ReadinessSummary } from '../components/ReadinessSummary';
import { WhiteSpacePanel } from '../components/WhiteSpacePanel';
import { NotesPanel } from '../components/NotesPanel';
import { exportRecordJson, exportAllJson } from '../export/exportJson';
import { exportRecordJs, exportAllJs } from '../export/exportJs';
import { exportRecordExcel } from '../export/exportExcel';
import { parseJsImport } from '../import/importJs';
import { parseJsonImport } from '../import/importJson';
import { filterItems } from '../logic/filters';
import { createRecordFromTemplate, duplicateRecord } from '../logic/records';
import { normalizeAppState } from '../logic/normalization';
import { calculateReadiness, flattenItems } from '../logic/readiness';
import { generateWhiteSpace } from '../logic/whitespace';
import { loadAppState, saveAppState } from '../storage/localStorage';
import type { AccountRecord, FilterStatus, ImportMode, LensId } from '../types';
import { isoNow } from '../utils/dates';

const initState = () => {
  if (typeof window === 'undefined') return normalizeAppState(null);
  return loadAppState();
};

export const App = () => {
  const [state, setState] = useState(initState);
  const [activeLens, setActiveLens] = useState<LensId>('people');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('all');
  const [tab, setTab] = useState<'issues' | 'whitespace' | 'notes'>('issues');
  const inputRef = useRef<HTMLInputElement>(null);

  const activeRecord = useMemo(
    () => state.records.find((record) => record.id === state.activeRecordId) ?? state.records[0],
    [state]
  );

  const updateState = (updater: (current: typeof state) => typeof state) => {
    setState((current) => {
      const next = updater(current);
      saveAppState(next);
      return next;
    });
  };

  const upsertRecord = (record: AccountRecord) => {
    updateState((current) => ({
      ...current,
      records: current.records.map((entry) => (entry.id === record.id ? record : entry))
    }));
  };

  const activeSection = activeRecord.sections.find((section) => section.id === activeLens) ?? activeRecord.sections[0];

  const visibleItems = filterItems(activeSection.items, search, statusFilter);

  const updateItem = (itemId: string, patch: Record<string, string>) => {
    const now = isoNow();
    const next: AccountRecord = {
      ...activeRecord,
      updatedAt: now,
      sections: activeRecord.sections.map((section) =>
        section.id !== activeSection.id
          ? section
          : {
              ...section,
              items: section.items.map((item) => (item.id === itemId ? { ...item, ...patch } : item))
            }
      )
    };
    upsertRecord(next);
  };

  const onRenameRecord = (name: string) => {
    upsertRecord({ ...activeRecord, name, updatedAt: isoNow() });
  };

  const onNewRecord = () => {
    const record = createRecordFromTemplate(`Account ${state.records.length + 1}`);
    updateState((current) => ({
      records: [...current.records, record],
      activeRecordId: record.id
    }));
  };

  const onDuplicateRecord = () => {
    const clone = duplicateRecord(activeRecord);
    updateState((current) => ({
      records: [...current.records, clone],
      activeRecordId: clone.id
    }));
  };

  const onDeleteRecord = () => {
    if (state.records.length === 1) {
      window.alert('Cannot delete the last record. Create another record first.');
      return;
    }
    const remaining = state.records.filter((record) => record.id !== activeRecord.id);
    updateState(() => ({ records: remaining, activeRecordId: remaining[0].id }));
  };

  const onImport = () => inputRef.current?.click();

  const readFile = async (file: File): Promise<AccountRecord[]> => {
    const text = await file.text();
    if (file.name.endsWith('.json')) return parseJsonImport(text);
    if (file.name.endsWith('.js')) return parseJsImport(text);
    throw new Error('Unsupported file type. Use .json or .js.');
  };

  const onFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const imported = await readFile(file);
      const mode = window.prompt('Import mode: type "merge" or "replace"', 'merge') as ImportMode | null;
      if (mode !== 'merge' && mode !== 'replace') return;
      updateState((current) => {
        const records = mode === 'replace' ? imported : [...current.records, ...imported];
        const normalized = normalizeAppState({ records, activeRecordId: imported[0]?.id ?? current.activeRecordId });
        return normalized;
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown import error';
      window.alert(`Import failed: ${message}`);
    } finally {
      event.target.value = '';
    }
  };

  const summary = calculateReadiness(activeRecord);
  const whiteSpace = generateWhiteSpace(activeRecord);
  const issues = flattenItems(activeRecord).filter((item) => ['assumed', 'unknown', 'at-risk'].includes(item.status));

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <header className="mb-4 space-y-3 rounded border border-slate-200 bg-white p-4">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">Account Growth Preflight</h1>
          <div className="flex items-center gap-3">
            <RecordSelector records={state.records} activeRecordId={state.activeRecordId} onChange={(id) => updateState((current) => ({ ...current, activeRecordId: id }))} />
            <input
              className="rounded border border-slate-300 px-2 py-2 text-sm"
              value={activeRecord.name}
              onChange={(event) => onRenameRecord(event.target.value)}
              placeholder="Rename record"
            />
          </div>
        </div>
        <RecordActions
          onNew={onNewRecord}
          onDuplicate={onDuplicateRecord}
          onDelete={onDeleteRecord}
          onImport={onImport}
          onExport={() => exportRecordJson(activeRecord)}
          onExportAll={() => exportAllJson(state)}
          onExportExcel={() => exportRecordExcel(activeRecord)}
        />
        <div className="flex gap-2 text-xs">
          <button className="rounded border border-slate-300 px-2 py-1" onClick={() => exportRecordJs(activeRecord)}>
            Export JS (optional)
          </button>
          <button className="rounded border border-slate-300 px-2 py-1" onClick={() => exportAllJs(state)}>
            Export All JS (optional)
          </button>
        </div>
      </header>

      <input ref={inputRef} type="file" className="hidden" accept=".json,.js" onChange={onFileChange} />

      <div className="grid grid-cols-[200px_1fr_320px] gap-4">
        <aside className="rounded border border-slate-200 bg-white p-3">
          {activeRecord.sections.map((section) => (
            <button
              key={section.id}
              className={`mb-2 block w-full rounded px-3 py-2 text-left text-sm ${
                activeLens === section.id ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-800'
              }`}
              onClick={() => setActiveLens(section.id)}
            >
              {section.name}
            </button>
          ))}
        </aside>

        <main className="space-y-3 rounded border border-slate-200 bg-white p-4">
          <SearchAndFilterBar
            search={search}
            onSearchChange={setSearch}
            status={statusFilter}
            onStatusChange={setStatusFilter}
          />
          <ChecklistSection section={activeSection} items={visibleItems} onUpdateItem={updateItem} />
        </main>

        <aside className="space-y-3">
          <ReadinessSummary summary={summary} />
          <div className="rounded border border-slate-200 bg-white p-3">
            <div className="mb-2 flex gap-1 text-xs">
              <button className={`rounded px-2 py-1 ${tab === 'issues' ? 'bg-slate-800 text-white' : 'bg-slate-100'}`} onClick={() => setTab('issues')}>
                Issues
              </button>
              <button className={`rounded px-2 py-1 ${tab === 'whitespace' ? 'bg-slate-800 text-white' : 'bg-slate-100'}`} onClick={() => setTab('whitespace')}>
                White Space
              </button>
              <button className={`rounded px-2 py-1 ${tab === 'notes' ? 'bg-slate-800 text-white' : 'bg-slate-100'}`} onClick={() => setTab('notes')}>
                Notes
              </button>
            </div>

            {tab === 'issues' && (
              <ul className="space-y-2 text-xs">
                {issues.map((item) => (
                  <li key={item.id} className="rounded border border-slate-200 p-2">
                    <p className="font-semibold">{item.question}</p>
                    <p>
                      {item.status} {item.owner ? `· ${item.owner}` : ''}
                    </p>
                  </li>
                ))}
              </ul>
            )}
            {tab === 'whitespace' && <WhiteSpacePanel cards={whiteSpace} />}
            {tab === 'notes' && (
              <NotesPanel notes={activeRecord.notes} onChange={(notes) => upsertRecord({ ...activeRecord, notes, updatedAt: isoNow() })} />
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};
