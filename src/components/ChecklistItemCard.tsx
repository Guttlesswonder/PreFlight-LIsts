import type { ChecklistItem, ChecklistStatus } from '../types';
import { STATUS_OPTIONS } from '../utils/constants';
import { EditableField } from './EditableField';

interface ChecklistItemCardProps {
  item: ChecklistItem;
  onUpdate: (itemId: string, patch: Partial<ChecklistItem>) => void;
}

export const ChecklistItemCard = ({ item, onUpdate }: ChecklistItemCardProps) => (
  <div className="rounded border border-slate-200 bg-white p-4 shadow-sm">
    <div className="grid grid-cols-2 gap-3">
      <EditableField label="Question" value={item.question} onChange={(event) => onUpdate(item.id, { question: event.target.value })} />
      <EditableField label="Why" value={item.why} onChange={(event) => onUpdate(item.id, { why: event.target.value })} />
      <EditableField
        label="Status"
        as="select"
        options={STATUS_OPTIONS}
        value={item.status}
        onChange={(event) => onUpdate(item.id, { status: event.target.value as ChecklistStatus })}
      />
      <EditableField label="Owner" value={item.owner} onChange={(event) => onUpdate(item.id, { owner: event.target.value })} />
      <EditableField
        label="Due Date"
        type="date"
        value={item.dueDate}
        onChange={(event) => onUpdate(item.id, { dueDate: event.target.value })}
      />
      <EditableField label="Risk if unclear" value={item.risk} onChange={(event) => onUpdate(item.id, { risk: event.target.value })} />
      <div className="col-span-2">
        <EditableField label="Answer" as="textarea" value={item.answer} onChange={(event) => onUpdate(item.id, { answer: event.target.value })} />
      </div>
    </div>
  </div>
);
