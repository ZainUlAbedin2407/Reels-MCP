# Reels MCP Server

A minimal Model Context Protocol (MCP) server written in TypeScript that runs over standard input/output (`stdio`) using the official `@modelcontextprotocol/sdk`. It provides an AI assistant with a single dedicated tool, `get_top_reels`, which reads Instagram reel performance data from `./zeetech_reels.csv` and returns the top reels ranked by view count in JSON format.

## Prerequisites

- **Node.js**: Node.js 18.0.0 or higher (v22 recommended, as targeted by `@types/node: ^22.13.0` in `package.json`).
- **npm**: npm 10+ (included with Node.js).

## Installation and Build

1. Clone or open this repository directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build TypeScript to `dist/`:
   ```bash
   npm run build
   ```

> **Note**: After any code change, run `npm run build` again, because Claude runs `dist/index.js`.

## Running Tests

Execute the automated test suite powered by the Node.js native test runner:
```bash
npm test
```
This compiles TypeScript and runs all tests for CSV parsing (including BOM, quoted commas, and URL-based path resolution), the pure `getTopReels` function, and the MCP tool handler.

## Testing with MCP Inspector

To test the server interactively using the official MCP Inspector, run:
```bash
npx @modelcontextprotocol/inspector node dist/index.js
```
Open the URL printed in the terminal in your browser to inspect available tools and invoke `get_top_reels`. Do not share that link, because it contains a token.

## Tool: `get_top_reels`

Retrieves top-performing reels sorted by views descending, breaking ties by `reel_id` ascending.

- **Parameters**:
  - `limit` (*optional, number*): Whole integer of 1 or more specifying how many top reels to return.
- **Default**: `5` when omitted or undefined.
- **Output format**: Returns an array of objects containing only `title`, `views`, `style`, and `category`.
- **Error Behavior**: Rejects non-integers, decimals, strings, `NaN`, and numbers below 1 with a descriptive error response (`isError: true` or JSON-RPC schema error `-32602`), ensuring the server never crashes.
- **Tool Annotations**: Marked as read-only (`readOnlyHint: true`), non-destructive (`destructiveHint: false`), idempotent (`idempotentHint: true`), and closed-world (`openWorldHint: false`).

## Registering in Claude

### Claude Desktop

1. Open or create the Claude Desktop configuration file on Windows:
   ```
   %APPDATA%\Claude\claude_desktop_config.json
   ```
   *(Full path typically: `C:\Users\<YourUsername>\AppData\Roaming\Claude\claude_desktop_config.json`. If your system configuration or Claude Desktop version places this file elsewhere, please check the official Anthropic Claude Desktop documentation rather than guessing).*

2. Add `reels-mcp` under `mcpServers` with the absolute Windows path to the built entry file (note that backslashes must be double-escaped in JSON):

```json
{
  "mcpServers": {
    "reels-mcp": {
      "command": "node",
      "args": [
        "D:\\Zee-Tech\\Projects\\reels-mcp\\dist\\index.js"
      ]
    }
  }
}
```

3. Restart Claude Desktop.

### Claude Code

To add the MCP server in Claude Code CLI, run:
```bash
claude mcp add reels-mcp -- node "D:\Zee-Tech\Projects\reels-mcp\dist\index.js"
```

*(Note: CLI flags and options may vary depending on the Claude Code version. If this command does not match your version, verify the current syntax with `claude mcp --help` or refer to the official Claude Code documentation).*

## Troubleshooting

- **Restart Claude Desktop**: Fully quit Claude Desktop from the system tray (notification area) and reopen it after editing the config.
- **Check Logs**: Check `%APPDATA%\Claude\logs` if the server fails to connect.
- **Node Path**: If `node` is not found, use the full path to `node.exe` (e.g. `"C:\\Program Files\\nodejs\\node.exe"`).
- **Rebuild after edits**: Run `npm run build` after any code change, because Claude runs `dist/index.js`.
