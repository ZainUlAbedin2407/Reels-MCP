# Project Progress

## Current task
Task 6 (README explaining how to register it in Claude) - Completed

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
  - Added `TopReel` interface to `src/types.ts`.
  - Implemented `getTopReels` pure function in `src/reels.ts` with limit validation, default 5, row capping, descending sort with tie-breaking, and field projection.
  - Added unit test suite `src/reels.test.ts` with 9 passing tests.
- Task 4:
  - Inspected `@modelcontextprotocol/sdk` (v1.32.1) in `node_modules` and used `McpServer` and `StdioServerTransport`.
  - Implemented `handleGetTopReels` in `src/index.ts`:
    - Reads reels via loader, invokes `getTopReels`, and returns JSON text content block.
    - Catches validation/file errors and returns `{ content: [{ type: 'text', text: errorMessage }], isError: true }` without crashing.
    - Uses `console.error` for logging; never writes raw output to `stdout`.
  - Implemented `createMcpServer`:
    - Registers `get_top_reels` with clear tool description and Zod schema (`limit`: optional int >= 1).
  - Added direct execution check (`isDirectExecution`) so modules and functions can be tested without starting the server.
  - Added unit tests in `src/index.test.ts` covering success case, invalid limit error response, loader failure error response, and server tool registration.
  - Ran `npm test` (all 18 tests in 3 suites passing).
- Task 5:
  - Manual Inspector test performed:
    - `limit 3`: returned the 3 correct top reels (1445, 1000, 255), including the title with a quoted comma.
    - `limit 0`: returned MCP error -32602 "Number must be greater than or equal to 1" from the schema validation, and the server stayed connected.
    - Found: the Inspector showed wrong default tool annotations (Destructive true, Open-world true, Read-only false).
  - Fixed tool annotations in `get_top_reels` registration in `src/index.ts`:
    - `readOnlyHint`: `true`
    - `destructiveHint`: `false`
    - `idempotentHint`: `true`
    - `openWorldHint`: `false`
  - Updated test in `src/index.test.ts` to assert that registered tool annotations match these values.
  - Verified with `npm test` (18 passing tests).
- Task 6:
  - Authored `README.md` covering:
    - Project description and overview.
    - Prerequisites (Node.js 18+/22.x from `package.json`).
    - Installation, build, and test steps.
    - Testing via `@modelcontextprotocol/inspector`.
    - Detailed `get_top_reels` tool documentation (parameters, defaults, error behavior, and annotations).
    - Claude Desktop registration with Windows configuration path (`%APPDATA%\Claude\claude_desktop_config.json`) and JSON snippet using escaped backslashes for `D:\Zee-Tech\Projects\reels-mcp\dist\index.js`.
    - Claude Code CLI registration command (`claude mcp add reels-mcp -- node D:\Zee-Tech\Projects\reels-mcp\dist\index.js`), with explicit notes to verify official documentation if paths/commands vary.
    - Rebuild reminder note: "After any code change, run npm run build again, because Claude runs dist/index.js."

## Decisions
- Stack: TypeScript (Node.js) with `@modelcontextprotocol/sdk` over stdio transport.
- Keep dependencies minimal to stay lightweight and maintainable (no CSV library).
- Task 1: Before installing, list every dependency to add and why (keep to TypeScript, Node types, MCP SDK + essential requirements, and one test approach).
- Task 2: CSV parser must handle quoted fields with commas, empty likes as null, and UTF-8 BOM, verified with tests on real rows from `zeetech_reels.csv`.
- Task 2: Resolve CSV path relative to module (`import.meta.url`) instead of `process.cwd()`.
- Task 3: `getTopReels` is a pure function taking `(reels, limit)`, validates limit >= 1 integer (default 5), breaks ties by `reel_id` ascending, and returns only `title`, `views`, `style`, `category`.
- Task 4: Use `McpServer.registerTool` from `@modelcontextprotocol/sdk/server/mcp.js` and `StdioServerTransport` from `@modelcontextprotocol/sdk/server/stdio.js`.
- Task 4: Never write to `stdout` directly (use `console.error` for logging). Catch errors and return MCP standard `isError: true` tool responses.
- Task 5: Explicitly define tool annotations (`readOnlyHint: true`, `destructiveHint: false`, `idempotentHint: true`, `openWorldHint: false`) so clients correctly recognize safe, read-only tools.
- Task 6: README config example must provide the absolute Windows path with backslashes correctly escaped in JSON.
- Workflow: Do one task at a time, then stop. Stay inside project folder and ask before installing any dependency not listed in the plan.

## Known issues
- What broke: None. Documentation created without application code modifications.

## Next step
- Task 7: Final cleanup (verify repository state, ensure all tests pass cleanly, remove temporary files).
