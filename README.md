# Pre Flight Checklist App

A local-first React + TypeScript checklist app for managing multi-deal implementation readiness.

## What this app does

- Tracks multiple deals in browser `localStorage`
- Supports deal create, duplicate, delete, switch, JSON import/export
- Provides a 50-item checklist grouped by sections
- Uses statuses: Confirmed, Assumed, Unknown, Not Applicable, At Risk
- Calculates readiness for overall, Sales Agreement, and Implementation Brief lenses
- Shows an Open Issues table from unresolved checklist items
- Exports active deal to Excel (`Summary`, section tabs, `Open Issues`)

> Data is stored in browser localStorage only. No backend or authentication.

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Start dev server:

```bash
npm run dev
```

3. Build production bundle:

```bash
npm run build
```

4. Run tests:

```bash
npm test
```

## Scripts

- `npm run dev` — run Vite dev server
- `npm run build` — typecheck + build production assets
- `npm run preview` — preview production build
- `npm test` — run Vitest tests once
- `npm run test:watch` — run Vitest in watch mode

## Stack

- Vite
- React + TypeScript
- Tailwind CSS
- `xlsx` for Excel export
- Vitest for unit tests
