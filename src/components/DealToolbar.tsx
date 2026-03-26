import type { DealMeta } from '../types';

interface DealToolbarProps {
  meta: DealMeta;
  onMetaChange: (key: keyof DealMeta, value: string) => void;
  onCreate: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onExportJson: () => void;
  onImportJson: (file: File) => void;
  onExportExcel: () => void;
  disableDelete: boolean;
}

export function DealToolbar(props: DealToolbarProps) {
  const { meta, onMetaChange, onCreate, onDuplicate, onDelete, onExportJson, onImportJson, onExportExcel, disableDelete } = props;

  return (
    <section className="space-y-3 rounded-xl border border-slate-200 bg-white p-4">
      <div className="grid gap-3 md:grid-cols-4">
        <input className="rounded border p-2" value={meta.name} onChange={(e) => onMetaChange('name', e.target.value)} placeholder="Deal name" />
        <input className="rounded border p-2" value={meta.sfdcRef} onChange={(e) => onMetaChange('sfdcRef', e.target.value)} placeholder="SFDC reference" />
        <input className="rounded border p-2" value={meta.salesOwner} onChange={(e) => onMetaChange('salesOwner', e.target.value)} placeholder="Sales owner" />
        <input
          className="rounded border p-2"
          value={meta.opportunityStage}
          onChange={(e) => onMetaChange('opportunityStage', e.target.value)}
          placeholder="Opportunity stage"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        <button className="rounded bg-slate-900 px-3 py-2 text-sm text-white" onClick={onCreate}>New Deal</button>
        <button className="rounded bg-slate-700 px-3 py-2 text-sm text-white" onClick={onDuplicate}>Duplicate</button>
        <button className="rounded bg-rose-700 px-3 py-2 text-sm text-white disabled:opacity-50" onClick={onDelete} disabled={disableDelete}>Delete</button>
        <button className="rounded bg-slate-200 px-3 py-2 text-sm" onClick={onExportJson}>Export JSON</button>
        <label className="cursor-pointer rounded bg-slate-200 px-3 py-2 text-sm">
          Import JSON
          <input
            type="file"
            className="hidden"
            accept="application/json"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onImportJson(file);
              e.currentTarget.value = '';
            }}
          />
        </label>
        <button className="rounded bg-emerald-600 px-3 py-2 text-sm text-white" onClick={onExportExcel}>Export Excel</button>
      </div>
    </section>
  );
}
