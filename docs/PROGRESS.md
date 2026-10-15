# Project Progress

## Current task
Task 2 (Load and parse CSV) - Completed

## Done
- Created initial planning and configuration files (`AGENTS.md`, `docs/PLAN.md`, `docs/PROGRESS.md`, `.gitignore`, `.antigravityignore`).
- Initialized Git repository and created initial commit.
- Task 1:
  - Selected minimal dependencies and rationale (TypeScript, @types/node, @modelcontextprotocol/sdk, zod, node:test).
  - Configured `package.json` and `tsconfig.json`.
  - Added minimal `src/index.ts` placeholder and verified build/start/test commands.
- Task 2:
  - Created `src/types.ts` defining the `Reel` interface.
  - Implemented standalone CSV parser in `src/csvParser.ts` without external CSV libraries:
    - `stripBom`: strips leading UTF-8 BOM (`\uFEFF`).
    - `parseCsvLine`: character-by-character parser handling quoted fields containing commas and escaped quotes (`""`).
    - `parseCsv`: maps rows to `Reel` objects with numeric `views`/`reel_id` and empty likes as `null`.
    - `getDefaultCsvPath`: resolves CSV path via `import.meta.url` (`new URL('../zeetech_reels.csv', import.meta.url)`).
    - `loadReelsCsv`: reads and parses CSV from resolved path.
  - Created test suite `src/csvParser.test.ts` testing:
    - Quoted fields with commas using real row 15.
    - Empty likes as `null` using real row 2 vs numeric likes in row 1.
    - UTF-8 BOM prefix handling.
    - Path resolution from outside working directory (tested via `os.tmpdir()`).
    - Full parsing of all 18 rows from `zeetech_reels.csv`.
  - Verified tests pass via `npm test` (5/5 tests passing).

## Decisions
- Stack: TypeScript (Node.js) with `@modelcontextprotocol/sdk` over stdio transport.
- Keep dependencies minimal to stay lightweight and maintainable (no CSV library).
- Task 1: Before installing, list every dependency to add and why (keep to TypeScript, Node types, MCP SDK + essential requirements, and one test approach).
- Task 2: CSV parser must handle quoted fields with commas, empty likes as null, and UTF-8 BOM, verified with tests on real rows from `zeetech_reels.csv`.
- Task 2: Resolve CSV path relative to module (`import.meta.url`) instead of `process.cwd()`.
- Task 3: `getTopReels` must reject limit < 1, cap limit at total rows, and return only `title`, `views`, `style`, `category` sorted by views.
- Task 6: README config example must provide the absolute Windows path with backslashes correctly escaped in JSON.
- Workflow: Do one task at a time, then stop. Stay inside project folder and ask before installing any dependency not listed in the plan.

## Known issues
- What broke: None. All 5 test cases passed cleanly on first run.

## Next step
- Task 3: Tool function plus a unit test (`getTopReels(limit)` rejecting limit < 1, capping at total rows, and returning title, views, style, category).
