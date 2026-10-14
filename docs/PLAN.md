# Implementation Plan: Minimal Reels MCP Server

A checklist of tasks to implement the minimal MCP server.

- [ ] 1. Init project
  - Done when: `package.json` and `tsconfig.json` are set up with TypeScript, `@modelcontextprotocol/sdk`, dev tooling, and build/run/test scripts.
- [ ] 2. Load and parse CSV
  - Done when: A CSV parser module reads `./zeetech_reels.csv` and parses records into typed objects (`reel_id`, `title`, `views`, `likes`, `style`, `category`, `notes`) with numeric `views`.
- [ ] 3. Tool function plus a unit test
  - Done when: `getTopReels(limit)` is implemented with sorting by views descending (default limit: 5) and verified with an automated unit test.
- [ ] 4. MCP server wiring
  - Done when: The MCP server is initialized with stdio transport, registers the `get_top_reels` tool with input schema validation, and returns results in standard MCP tool response format.
- [ ] 5. Manual test with the MCP inspector
  - Done when: Server connects successfully via `@modelcontextprotocol/inspector` and `get_top_reels` responds properly with top reels data.
- [ ] 6. README explaining how to register it in Claude
  - Done when: `README.md` provides clear instructions, prerequisites, build steps, and the configuration JSON snippet for Claude Desktop and Claude Code.
- [ ] 7. Final cleanup
  - Done when: Unused files/logs are cleared, type checking and tests pass cleanly, and code adheres to all conventions in `AGENTS.md`.
