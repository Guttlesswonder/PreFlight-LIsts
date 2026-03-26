interface SectionStat {
  section: string;
  addressed: number;
  total: number;
}

interface SidebarProps {
  sections: SectionStat[];
  activeSection: string;
  onSelect: (section: string) => void;
}

export function Sidebar({ sections, activeSection, onSelect }: SidebarProps) {
  return (
    <aside className="space-y-2">
      {sections.map((item) => {
        const active = item.section === activeSection;
        return (
          <button
            key={item.section}
            onClick={() => onSelect(item.section)}
            className={`w-full rounded-2xl border px-4 py-3 text-left ${
              active ? 'border-slate-900 bg-slate-950 text-white' : 'border-slate-300 bg-slate-100 text-slate-900'
            }`}
          >
            <p className="font-semibold">{item.section}</p>
            <p className={`mt-1 text-sm ${active ? 'text-slate-200' : 'text-slate-600'}`}>
              {item.addressed}/{item.total} addressed
            </p>
          </button>
        );
      })}
    </aside>
  );
}
