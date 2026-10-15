# Project Progress

## Current task
Task 3 (Tool function plus a unit test) - Completed

## Done
- Created initial planning and configuration files (`AGENTS.md`, `docs/PLAN.md`, `docs/PROGRESS.md`, `.gitignore`, `.antigravityignore`).
- Initialized Git repository and created initial commit.
- Task 1:
  - Selected minimal dependencies and rationale (TypeScript, @types/node, @modelcontextprotocol/sdk, zod, node:test).
  - Configured `package.json` and `tsconfig.json`.
  - Added minimal `src/index.ts` placeholder and verified build/start/test commands.
- Task 2:
  - Created `src/types.ts` defining the `Reel` interface.
  - Implemented standalone CSV parser in `src/csvParser.ts` (BOM stripping, quotes/commas, null likes, url-based path resolution).
  - Created test suite `src/csvParser.test.ts` with 5 passing tests.
- Task 3:
  - Added `TopReel` interface to `src/types.ts` containing only `title`, `views`, `style`, and `category`.
  - Implemented `getTopReels` pure function in `src/reels.ts`:
    - `validateLimit`: validates limit is a whole number >= 1, defaults `undefined` to 5, rejects strings, decimals, NaN, null, and non-positive numbers with a descriptive error.
    - Caps effective limit at total row count.
    - Pure sort by `views` descending, breaking ties by `reel_id` ascending without mutating the input array.
    - Projects results to `TopReel` shape (`title`, `views`, `style`, `category`).
  - Added unit test suite `src/reels.test.ts` covering validation, defaults, capping, descending sort, tie-breaking, field filtering, and array immutability.
  - Ran `npm test` (all 14 tests in 2 suites passing cleanly).

## Decisions
- Stack: TypeScript (Node.js) with `@modelcontextprotocol/sdk` over stdio transport.
- Keep dependencies minimal to stay lightweight and maintainable (no CSV library).
- Task 1: Before installing, list every dependency to add and why (keep to TypeScript, Node types, MCP SDK + essential requirements, and one test approach).
- Task 2: CSV parser must handle quoted fields with commas, empty likes as null, and UTF-8 BOM, verified with tests on real rows from `zeetech_reels.csv`.
- Task 2: Resolve CSV path relative to module (`import.meta.url`) instead of `process.cwd()`.
- Task 3: `getTopReels` is a pure function taking `(reels, limit)`, validates limit >= 1 integer (default 5), breaks ties by `reel_id` ascending, and returns only `title`, `views`, `style`, `category`.
- Task 6: README config example must provide the absolute Windows path with backslashes correctly escaped in JSON.
- Workflow: Do one task at a time, then stop. Stay inside project folder and ask before installing any dependency not listed in the plan.

## Known issues
- What broke: None. All 9 new test cases passed cleanly on first run.

## Next step
- Task 4: MCP server wiring (initialize MCP server with stdio transport, register `get_top_reels` tool with input schema validation, and return standard MCP response).
