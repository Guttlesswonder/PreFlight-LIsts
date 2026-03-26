import type { AccountRecord, AppState } from '../types';

const download = (filename: string, content: string): void => {
  const blob = new Blob([content], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
};

export const exportRecordJson = (record: AccountRecord): void => {
  download(`${record.name.replace(/\s+/g, '-').toLowerCase()}-record.json`, JSON.stringify(record, null, 2));
};

export const exportAllJson = (state: AppState): void => {
  download('account-growth-preflight-records.json', JSON.stringify(state.records, null, 2));
};
