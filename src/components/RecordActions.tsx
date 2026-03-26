interface RecordActionsProps {
  onNew: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onImport: () => void;
  onExport: () => void;
  onExportAll: () => void;
  onExportExcel: () => void;
}

const ActionButton = ({ label, onClick }: { label: string; onClick: () => void }) => (
  <button className="rounded bg-slate-800 px-3 py-2 text-xs font-medium text-white hover:bg-slate-700" onClick={onClick}>
    {label}
  </button>
);

export const RecordActions = ({
  onNew,
  onDuplicate,
  onDelete,
  onImport,
  onExport,
  onExportAll,
  onExportExcel
}: RecordActionsProps) => (
  <div className="flex flex-wrap items-center gap-2">
    <ActionButton label="New" onClick={onNew} />
    <ActionButton label="Duplicate" onClick={onDuplicate} />
    <ActionButton label="Delete" onClick={onDelete} />
    <ActionButton label="Import" onClick={onImport} />
    <ActionButton label="Export" onClick={onExport} />
    <ActionButton label="Export All" onClick={onExportAll} />
    <ActionButton label="Export Excel" onClick={onExportExcel} />
  </div>
);
