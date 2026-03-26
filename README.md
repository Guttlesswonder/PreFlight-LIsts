# Account Growth Preflight

Local-first React + TypeScript app for account management growth planning across **People**, **Process**, and **Technology**.

## Stack
- React + TypeScript + Vite
- Tailwind CSS
- XLSX (SheetJS) for Excel export
- LocalStorage persistence (`account-growth-preflight:v1`)
- Vitest for lightweight logic tests

## Run locally
```bash
npm install
npm run dev
```

## Build + test
```bash
npm run test
npm run build
```

## Key behavior
- Multiple saved records with active record selector.
- New / duplicate / rename / delete (cannot delete the last record).
- Autosave to browser local storage on every edit.
- Editable checklist cards for status, answer, owner, due date, risk, question, and why.
- Search + status filters in active lens.
- White Space cards generated from non-confirmed gaps.
- Readiness summary and issue panel.
- Import (`.json`, constrained `.js`) and export (single/all JSON, optional JS, Excel workbook tabs).

## Import/Export notes
- **Primary supported format**: JSON.
- JS import expects only: `export default { ... }` or `export default [ ... ]` and parses as text without execution.
- Import supports **merge** or **replace** mode.

## Excel tabs
1. Summary
2. People
3. Process
4. Technology
5. White Space
6. Open Issues

## Sample import file
Use `sample-data/sample-records.json` to validate import flow.
