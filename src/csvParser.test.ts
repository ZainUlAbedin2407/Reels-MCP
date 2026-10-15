import { describe, it } from 'node:test';
import assert from 'node:assert';
import os from 'node:os';
import { parseCsv, parseCsvLine, loadReelsCsv, getDefaultCsvPath } from './csvParser.js';

describe('CSV Parser', () => {
  it('handles quoted fields containing commas using real row from zeetech_reels.csv', () => {
    const csvRow = '15,"Rates itne neeche, sourcing itni oonchi (ninja banner)",1000,,graphic,none,second best reel';
    const csvData = `reel_id,title,views,likes,style,category,notes\n${csvRow}`;
    const reels = parseCsv(csvData);

    assert.strictEqual(reels.length, 1);
    assert.strictEqual(reels[0].reel_id, 15);
    assert.strictEqual(reels[0].title, 'Rates itne neeche, sourcing itni oonchi (ninja banner)');
    assert.strictEqual(reels[0].views, 1000);
    assert.strictEqual(reels[0].style, 'graphic');
    assert.strictEqual(reels[0].category, 'none');
    assert.strictEqual(reels[0].notes, 'second best reel');
  });

  it('treats empty likes as null using real rows from zeetech_reels.csv', () => {
    const rowWithNullLikes = '2,Purple earbuds in case (hand shot),7,,unboxing,earbuds,lowest views';
    const rowWithNumericLikes = '1,Pro 2 White Edition earbuds unboxing (hand + laptop),104,2,unboxing,earbuds,"phone number overlay; posted 19h before screenshot"';
    const csvData = `reel_id,title,views,likes,style,category,notes\n${rowWithNullLikes}\n${rowWithNumericLikes}`;

    const reels = parseCsv(csvData);

    assert.strictEqual(reels.length, 2);
    assert.strictEqual(reels[0].reel_id, 2);
    assert.strictEqual(reels[0].likes, null);
    assert.strictEqual(reels[1].reel_id, 1);
    assert.strictEqual(reels[1].likes, 2);
  });

  it('handles UTF-8 BOM at the start of the CSV content', () => {
    const csvWithBom = '\uFEFFreel_id,title,views,likes,style,category,notes\n1,Pro 2 White Edition earbuds unboxing (hand + laptop),104,2,unboxing,earbuds,notes';
    const reels = parseCsv(csvWithBom);

    assert.strictEqual(reels.length, 1);
    assert.strictEqual(reels[0].reel_id, 1);
    assert.strictEqual(reels[0].views, 104);
    assert.strictEqual(reels[0].likes, 2);
  });

  it('resolves CSV path using import.meta.url independent of current working directory', () => {
    const originalCwd = process.cwd();
    const tempDir = os.tmpdir();

    try {
      process.chdir(tempDir);
      assert.notStrictEqual(process.cwd().toLowerCase(), originalCwd.toLowerCase());

      // loadReelsCsv without arguments uses default resolved path via import.meta.url
      const reels = loadReelsCsv();
      assert.strictEqual(reels.length, 18);
      assert.strictEqual(reels[0].reel_id, 1);
      assert.strictEqual(typeof reels[0].views, 'number');
    } finally {
      process.chdir(originalCwd);
    }
  });

  it('loads and parses all 18 real rows from zeetech_reels.csv with numeric views', () => {
    const reels = loadReelsCsv();
    assert.strictEqual(reels.length, 18);

    for (const reel of reels) {
      assert.strictEqual(typeof reel.reel_id, 'number');
      assert.strictEqual(typeof reel.title, 'string');
      assert.strictEqual(typeof reel.views, 'number');
      assert.ok(!Number.isNaN(reel.views));
      assert.ok(reel.likes === null || typeof reel.likes === 'number');
      assert.strictEqual(typeof reel.style, 'string');
      assert.strictEqual(typeof reel.category, 'string');
      assert.strictEqual(typeof reel.notes, 'string');
    }
  });
});
