import type { ChecklistItem, ItemResponse } from '../types';

interface OpenIssuesTableProps {
  items: ChecklistItem[];
  responses: Record<string, ItemResponse>;
}

export function OpenIssuesTable({ items, responses }: OpenIssuesTableProps) {
  const issues = items.filter((item) => ['Assumed', 'Unknown', 'At Risk'].includes(responses[item.id]?.status ?? 'Unknown'));

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4">
      <h2 className="mb-2 text-lg font-semibold">Open Issues</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-2 pr-4">Section</th>
              <th className="py-2 pr-4">Checklist Item</th>
              <th className="py-2 pr-4">Status</th>
              <th className="py-2 pr-4">Notes</th>
            </tr>
          </thead>
          <tbody>
            {issues.map((item) => (
              <tr key={item.id} className="border-b align-top">
                <td className="py-2 pr-4">{item.section}</td>
                <td className="py-2 pr-4">{item.prompt}</td>
                <td className="py-2 pr-4">{responses[item.id]?.status ?? 'Unknown'}</td>
                <td className="py-2 pr-4">{responses[item.id]?.notes ?? ''}</td>
              </tr>
            ))}
            {!issues.length && (
              <tr>
                <td className="py-3 text-slate-500" colSpan={4}>
                  No open issues.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
