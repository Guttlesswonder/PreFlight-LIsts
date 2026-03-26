import { parseJsonImport } from './importJson';
import type { AccountRecord } from '../types';

const extractJsExportPayload = (source: string): string => {
  const normalized = source.trim().replace(/;\s*$/, '');
  const match = normalized.match(/^export\s+default\s+([\s\S]+)$/);
  if (!match) {
    throw new Error('Unsupported JS import format. Use export default <json-like-data>.');
  }
  const payload = match[1].trim();
  if (!payload.startsWith('{') && !payload.startsWith('[')) {
    throw new Error('JS import payload must be object or array literal.');
  }
  return payload;
};

export const parseJsImport = (source: string): AccountRecord[] => {
  const payload = extractJsExportPayload(source);
  return parseJsonImport(payload);
};
