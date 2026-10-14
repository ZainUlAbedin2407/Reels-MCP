# Agent Guidelines

## Goal
Build a minimal MCP server in TypeScript (Node.js, official MCP SDK, stdio transport) with one tool `get_top_reels(limit = 5)` reading `./zeetech_reels.csv` and returning top reels by views as JSON.

## Stack
- Node.js, TypeScript, `@modelcontextprotocol/sdk`, stdio transport

## Commands
- Install: `npm install`
- Build: `npm run build`
- Run: `npm start`
- Test: `npm test`

## Conventions
- Small, single-purpose functions
- No extra dependencies beyond essential MCP SDK / dev tools
- No secrets or sensitive data in code

## Workflow Rule
Before any work, read docs/PLAN.md. After each task, update docs/PLAN.md and docs/PROGRESS.md.
