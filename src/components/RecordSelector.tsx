import type { AccountRecord } from '../types';

interface RecordSelectorProps {
  records: AccountRecord[];
  activeRecordId: string;
  onChange: (recordId: string) => void;
}

export const RecordSelector = ({ records, activeRecordId, onChange }: RecordSelectorProps) => (
  <select
    className="rounded border border-slate-300 bg-white px-3 py-2 text-sm"
    value={activeRecordId}
    onChange={(event) => onChange(event.target.value)}
  >
    {records.map((record) => (
      <option key={record.id} value={record.id}>
        {record.name}
      </option>
    ))}
  </select>
);
