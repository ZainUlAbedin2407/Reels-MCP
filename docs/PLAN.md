# Implementation Plan: Minimal Reels MCP Server

A checklist of tasks to implement the minimal MCP server.

- [x] 1. Init project
  - Requirements: Before installing, list every dependency to add and why. Keep it to TypeScript, Node types, the MCP SDK (and whatever it requires), and one test approach.
  - Done when: Dependencies are reviewed/approved, and `package.json` and `tsconfig.json` are set up with TypeScript, `@modelcontextprotocol/sdk`, dev tooling, and build/run/test scripts.
- [x] 2. Load and parse CSV
  - Requirements: The CSV parser must handle quoted fields containing commas (e.g. `"Rates itne neeche, sourcing itni oonchi"`), empty likes values (treat as null), and a possible BOM at the start of the file.
  - Done when: A test covers these three cases using real rows from `zeetech_reels.csv` and records are parsed into typed objects with numeric `views`.
- [x] 3. Tool function plus a unit test
  - Requirements: `getTopReels(limit)` must reject a limit below 1, cap the limit at the number of rows, and return title, views, style, and category for each reel sorted by views descending (default limit: 5).
  - Done when: Automated unit tests verify rejection of limit < 1, capping at total row count, field filtering (`title`, `views`, `style`, `category`), and correct sorting.
- [x] 4. MCP server wiring
  - Done when: The MCP server is initialized with stdio transport, registers the `get_top_reels` tool with input schema validation, and returns results in standard MCP tool response format.
- [x] 5. Manual test with the MCP inspector
  - Done when: Server connects successfully via `@modelcontextprotocol/inspector` and `get_top_reels` responds properly with top reels data.
- [ ] 6. README explaining how to register it in Claude
  - Requirements: The README config example must use the absolute Windows path of the built entry file, with backslashes escaped correctly in JSON.
  - Done when: `README.md` provides clear instructions, prerequisites, build steps, and configuration JSON snippets for Claude Desktop and Claude Code using the properly escaped absolute Windows path.
- [ ] 7. Final cleanup
  - Done when: Unused files/logs are cleared, type checking and tests pass cleanly, and code adheres to all conventions in `AGENTS.md`.
