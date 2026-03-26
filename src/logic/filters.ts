import type { ChecklistItem, FilterStatus } from '../types';

export const matchesSearch = (item: ChecklistItem, query: string): boolean => {
  if (!query.trim()) return true;
  const haystack = [item.question, item.why, item.answer, item.owner, item.risk].join(' ').toLowerCase();
  return haystack.includes(query.toLowerCase());
};

export const filterItems = (
  items: ChecklistItem[],
  searchQuery: string,
  statusFilter: FilterStatus
): ChecklistItem[] =>
  items.filter((item) => {
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesStatus && matchesSearch(item, searchQuery);
  });
