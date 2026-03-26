import type { ChangeEventHandler } from 'react';

interface EditableFieldProps {
  label: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
  as?: 'input' | 'textarea' | 'select';
  options?: string[];
  type?: string;
}

export const EditableField = ({ label, value, onChange, as = 'input', options, type = 'text' }: EditableFieldProps) => (
  <label className="flex flex-col gap-1 text-xs font-medium text-slate-700">
    {label}
    {as === 'textarea' ? (
      <textarea className="rounded border border-slate-300 p-2 text-sm" value={value} onChange={onChange} rows={3} />
    ) : as === 'select' ? (
      <select className="rounded border border-slate-300 p-2 text-sm" value={value} onChange={onChange}>
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    ) : (
      <input className="rounded border border-slate-300 p-2 text-sm" value={value} type={type} onChange={onChange} />
    )}
  </label>
);
