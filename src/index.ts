import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';
import { loadReelsCsv } from './csvParser.js';
import { getTopReels } from './reels.js';
import { Reel } from './types.js';

export const getTopReelsInputSchema = {
  limit: z
    .number()
    .int()
    .min(1)
    .optional()
    .describe('Maximum number of top reels to return (whole number >= 1, defaults to 5)'),
};

export async function handleGetTopReels(
  args?: { limit?: unknown },
  loader: () => Reel[] = loadReelsCsv
): Promise<CallToolResult> {
  try {
    const reels = loader();
    const topReels = getTopReels(reels, args?.limit);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(topReels, null, 2),
        },
      ],
    };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error('Error handling get_top_reels:', errorMessage);
    return {
      content: [
        {
          type: 'text',
          text: errorMessage,
        },
      ],
      isError: true,
    };
  }
}

export function createMcpServer(loader: () => Reel[] = loadReelsCsv): McpServer {
  const server = new McpServer({
    name: 'reels-mcp',
    version: '1.0.0',
  });

  server.registerTool(
    'get_top_reels',
    {
      description: 'Returns the top Zee-Tech Instagram reels ranked by view count in JSON format.',
      inputSchema: getTopReelsInputSchema,
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false,
      },
    },
    async (args) => handleGetTopReels(args, loader)
  );

  return server;
}

export async function main(): Promise<void> {
  const server = createMcpServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Reels MCP server running on stdio');
}

function isDirectExecution(): boolean {
  if (!process.argv[1]) return false;
  try {
    const scriptPath = path.normalize(path.resolve(process.argv[1])).toLowerCase();
    const currentPath = path.normalize(fileURLToPath(import.meta.url)).toLowerCase();
    return scriptPath === currentPath;
  } catch {
    return false;
  }
}

if (isDirectExecution()) {
  main().catch((error) => {
    console.error('Fatal error running reels-mcp server:', error);
    process.exit(1);
  });
}
