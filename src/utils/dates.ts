export const isoNow = (): string => new Date().toISOString();
export const todayDate = (): string => new Date().toISOString().slice(0, 10);
export const formatDate = (value: string): string => {
  if (!value) return '';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString();
};
