# Project Progress

## Current task
None (Awaiting start of Task 1)

## Done
- Created initial planning and configuration files (`AGENTS.md`, `docs/PLAN.md`, `docs/PROGRESS.md`, `.gitignore`, `.antigravityignore`).
- Initialized Git repository and created initial commit.

## Decisions
- Stack: TypeScript (Node.js) with `@modelcontextprotocol/sdk` over stdio transport.
- Keep dependencies minimal to stay lightweight and maintainable.
- Task 1: Before installing, list every dependency to add and why (keep to TypeScript, Node types, MCP SDK + essential requirements, and one test approach).
- Task 2: CSV parser must handle quoted fields with commas, empty likes as null, and UTF-8 BOM, verified with tests on real rows from `zeetech_reels.csv`.
- Task 3: `getTopReels` must reject limit < 1, cap limit at total rows, and return only `title`, `views`, `style`, `category` sorted by views.
- Task 6: README config example must provide the absolute Windows path with backslashes correctly escaped in JSON.
- Workflow: Do one task at a time, then stop. Stay inside project folder and ask before installing any dependency not listed in the plan.

## Known issues
- None.

## Next step
- Task 1: Init project (list planned dependencies and reasons before installation).
