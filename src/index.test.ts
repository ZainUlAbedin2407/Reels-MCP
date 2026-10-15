import { describe, it } from 'node:test';
import assert from 'node:assert';
import { handleGetTopReels, createMcpServer } from './index.js';
import { Reel } from './types.js';

describe('MCP Server Tool Handler', () => {
  const mockReels: Reel[] = [
    {
      reel_id: 1,
      title: 'Mock Reel 1',
      views: 100,
      likes: null,
      style: 'style 1',
      category: 'category 1',
      notes: '',
    },
    {
      reel_id: 2,
      title: 'Mock Reel 2',
      views: 500,
      likes: 10,
      style: 'style 2',
      category: 'category 2',
      notes: '',
    },
    {
      reel_id: 3,
      title: 'Mock Reel 3',
      views: 300,
      likes: 5,
      style: 'style 3',
      category: 'category 3',
      notes: '',
    },
  ];

  it('successfully returns top reels as JSON text content in standard MCP format', async () => {
    const result = await handleGetTopReels({ limit: 2 }, () => mockReels);

    assert.strictEqual(result.isError, undefined);
    assert.strictEqual(result.content.length, 1);
    const item = result.content[0];
    assert.strictEqual(item.type, 'text');
    if (item.type === 'text') {
      const data = JSON.parse(item.text);
      assert.strictEqual(Array.isArray(data), true);
      assert.strictEqual(data.length, 2);
      assert.strictEqual(data[0].title, 'Mock Reel 2');
      assert.strictEqual(data[0].views, 500);
      assert.strictEqual(data[1].title, 'Mock Reel 3');
      assert.strictEqual(data[1].views, 300);
    }
  });

  it('returns isError: true when limit is invalid', async () => {
    const result = await handleGetTopReels({ limit: 0 }, () => mockReels);

    assert.strictEqual(result.isError, true);
    assert.strictEqual(result.content.length, 1);
    const item = result.content[0];
    assert.strictEqual(item.type, 'text');
    if (item.type === 'text') {
      assert.match(
        item.text,
        /Invalid limit: expected a whole number greater than or equal to 1, received 0/
      );
    }
  });

  it('returns isError: true when loader fails without crashing', async () => {
    const failingLoader = () => {
      throw new Error('Failed to read CSV file');
    };

    const result = await handleGetTopReels({ limit: 5 }, failingLoader);

    assert.strictEqual(result.isError, true);
    assert.strictEqual(result.content.length, 1);
    const item = result.content[0];
    assert.strictEqual(item.type, 'text');
    if (item.type === 'text') {
      assert.strictEqual(item.text, 'Failed to read CSV file');
    }
  });

  it('creates McpServer instance with registered get_top_reels tool and correct annotations', () => {
    const server = createMcpServer(() => mockReels);
    assert.ok(server);
    const registeredTools = (server as unknown as {
      _registeredTools: Record<string, {
        description?: string;
        annotations?: {
          readOnlyHint?: boolean;
          destructiveHint?: boolean;
          idempotentHint?: boolean;
          openWorldHint?: boolean;
        };
      }>;
    })._registeredTools;

    const tool = registeredTools['get_top_reels'];
    assert.ok(tool);
    assert.deepStrictEqual(tool.annotations, {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: false,
    });
  });
});
