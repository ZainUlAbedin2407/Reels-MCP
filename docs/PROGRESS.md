# Project Progress

## Current task
Task 1 (Init project) - Completed

## Done
- Created initial planning and configuration files (`AGENTS.md`, `docs/PLAN.md`, `docs/PROGRESS.md`, `.gitignore`, `.antigravityignore`).
- Initialized Git repository and created initial commit.
- Task 1:
  - Selected minimal dependencies and rationale:
    - `@modelcontextprotocol/sdk`: Official MCP SDK for stdio transport and server protocol.
    - `zod`: Peer dependency required by MCP SDK for tool input schema definitions.
    - `typescript` (dev): For compiling TypeScript to JavaScript in `dist/`.
    - `@types/node` (dev): For Node.js standard library and test runner types.
  - Selected test approach: Node.js built-in test runner (`node:test` / `node:assert`), zero extra testing dependencies needed.
  - Configured `package.json` with `type: module` and scripts: `build`, `start`, `test`.
  - Configured `tsconfig.json` targeting ES2022 with NodeNext module resolution.
  - Added minimal `src/index.ts` placeholder.
  - Installed dependencies and verified `npm run build`, `npm start`, and `npm test` all exit cleanly (code 0).

## Decisions
- Stack: TypeScript (Node.js) with `@modelcontextprotocol/sdk` over stdio transport.
- Keep dependencies minimal to stay lightweight and maintainable.
- Task 1: Before installing, list every dependency to add and why (keep to TypeScript, Node types, MCP SDK + essential requirements, and one test approach).
- Task 2: CSV parser must handle quoted fields with commas, empty likes as null, and UTF-8 BOM, verified with tests on real rows from `zeetech_reels.csv`.
- Task 3: `getTopReels` must reject limit < 1, cap limit at total rows, and return only `title`, `views`, `style`, `category` sorted by views.
- Task 6: README config example must provide the absolute Windows path with backslashes correctly escaped in JSON.
- Workflow: Do one task at a time, then stop. Stay inside project folder and ask before installing any dependency not listed in the plan.

## Known issues
- What broke: None. Configured `npm test` to compile via `tsc` before invoking `node --test` to ensure built artifacts are up-to-date.

## Next step
- Task 2: Load and parse CSV (implement parser for `zeetech_reels.csv` handling quoted commas, empty likes as null, and UTF-8 BOM, with test coverage).
