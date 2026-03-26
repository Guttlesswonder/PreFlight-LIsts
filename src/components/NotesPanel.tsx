export const NotesPanel = ({ notes, onChange }: { notes: string; onChange: (value: string) => void }) => (
  <textarea
    className="h-52 w-full rounded border border-slate-300 p-3 text-sm"
    value={notes}
    placeholder="Record notes, next steps, and follow-ups..."
    onChange={(event) => onChange(event.target.value)}
  />
);
