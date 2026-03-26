# AGENTS.md

## Repo workflow
- Use TypeScript strict mode and avoid `any`.
- Keep UI components in `src/components` and pure logic in `src/lib`.
- Add/modify unit tests for pure helper behavior when changing logic.
- Keep data local-only; do not add backend or auth code.

## Commands
- Install: `npm install`
- Dev: `npm run dev`
- Build: `npm run build`
- Test: `npm test`

## Coding conventions
- Prefer small pure functions in `src/lib`.
- Keep checklist content in `src/data/checklist.ts`.
- Keep App component orchestration-focused; move reusable UI to components.
