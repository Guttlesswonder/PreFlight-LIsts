import type { FilterStatus } from '../types';
import { STATUS_OPTIONS } from '../utils/constants';

interface SearchAndFilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  status: FilterStatus;
  onStatusChange: (value: FilterStatus) => void;
}

export const SearchAndFilterBar = ({ search, onSearchChange, status, onStatusChange }: SearchAndFilterBarProps) => (
  <div className="flex gap-2">
    <input
      className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
      value={search}
      onChange={(event) => onSearchChange(event.target.value)}
      placeholder="Search question, why, answer, owner, risk..."
    />
    <select
      className="rounded border border-slate-300 px-3 py-2 text-sm"
      value={status}
      onChange={(event) => onStatusChange(event.target.value as FilterStatus)}
    >
      <option value="all">all</option>
      {STATUS_OPTIONS.map((value) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  </div>
);
