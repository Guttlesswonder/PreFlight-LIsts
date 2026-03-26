export const makeId = (prefix = 'id'): string => `${prefix}_${crypto.randomUUID()}`;
