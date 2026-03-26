import type { AccountRecord, AppState } from '../types';

const downloadJs = (filename: string, content: string): void => {
  const blob = new Blob([content], { type: 'text/javascript;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
};

export const exportRecordJs = (record: AccountRecord): void => {
  downloadJs('account-growth-record.js', `export default ${JSON.stringify(record, null, 2)};\n`);
};

export const exportAllJs = (state: AppState): void => {
  downloadJs('account-growth-records.js', `export default ${JSON.stringify(state.records, null, 2)};\n`);
};
