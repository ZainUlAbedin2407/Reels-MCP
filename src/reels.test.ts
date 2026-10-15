import { describe, it } from 'node:test';
import assert from 'node:assert';
import { getTopReels, validateLimit } from './reels.js';
import { Reel } from './types.js';

describe('getTopReels', () => {
  const sampleReels: Reel[] = [
    {
      reel_id: 1,
      title: 'Earbuds unboxing',
      views: 104,
      likes: 2,
      style: 'unboxing',
      category: 'earbuds',
      notes: 'note 1',
    },
    {
      reel_id: 2,
      title: 'Purple earbuds',
      views: 7,
      likes: null,
      style: 'unboxing',
      category: 'earbuds',
      notes: 'note 2',
    },
    {
      reel_id: 3,
      title: 'Power bank heavy duty',
      views: 180,
      likes: 3,
      style: 'unboxing',
      category: 'power bank',
      notes: 'note 3',
    },
    {
      reel_id: 4,
      title: 'Power bank built-in cables',
      views: 135,
      likes: 6,
      style: 'unboxing',
      category: 'power bank',
      notes: 'note 4',
    },
    {
      reel_id: 5,
      title: 'Boombox speaker',
      views: 33,
      likes: null,
      style: 'graphic',
      category: 'speaker',
      notes: 'note 5',
    },
    {
      reel_id: 6,
      title: 'Meme voice note',
      views: 242,
      likes: null,
      style: 'humor',
      category: 'none',
      notes: 'note 6',
    },
  ];

  it('defaults to 5 reels when limit is undefined', () => {
    const result = getTopReels(sampleReels);
    assert.strictEqual(result.length, 5);
    assert.strictEqual(result[0].views, 242);
    assert.strictEqual(result[1].views, 180);
    assert.strictEqual(result[2].views, 135);
    assert.strictEqual(result[3].views, 104);
    assert.strictEqual(result[4].views, 33);
  });

  it('rejects limit less than 1 with a clear error message', () => {
    assert.throws(
      () => getTopReels(sampleReels, 0),
      /Invalid limit: expected a whole number greater than or equal to 1, received 0/
    );
    assert.throws(
      () => getTopReels(sampleReels, -1),
      /Invalid limit: expected a whole number greater than or equal to 1, received -1/
    );
  });

  it('rejects decimal limits with a clear error message', () => {
    assert.throws(
      () => getTopReels(sampleReels, 2.5),
      /Invalid limit: expected a whole number greater than or equal to 1, received 2.5/
    );
  });

  it('rejects string limits with a clear error message', () => {
    assert.throws(
      () => getTopReels(sampleReels, '5' as unknown as number),
      /Invalid limit: expected a whole number greater than or equal to 1, received 5/
    );
    assert.throws(
      () => getTopReels(sampleReels, 'abc' as unknown as number),
      /Invalid limit: expected a whole number greater than or equal to 1, received abc/
    );
  });

  it('rejects NaN, null, and other non-integers with a clear error message', () => {
    assert.throws(
      () => getTopReels(sampleReels, NaN),
      /Invalid limit: expected a whole number greater than or equal to 1, received NaN/
    );
    assert.throws(
      () => getTopReels(sampleReels, null as unknown as number),
      /Invalid limit: expected a whole number greater than or equal to 1, received null/
    );
  });

  it('caps the limit at the number of rows when limit exceeds row count', () => {
    const smallList = sampleReels.slice(0, 3);
    const result = getTopReels(smallList, 10);
    assert.strictEqual(result.length, 3);
  });

  it('sorts by views descending and breaks ties by reel_id ascending', () => {
    const tiedReels: Reel[] = [
      {
        reel_id: 10,
        title: 'Reel 10',
        views: 200,
        likes: null,
        style: 'unboxing',
        category: 'speaker',
        notes: '',
      },
      {
        reel_id: 2,
        title: 'Reel 2',
        views: 200,
        likes: null,
        style: 'unboxing',
        category: 'speaker',
        notes: '',
      },
      {
        reel_id: 5,
        title: 'Reel 5',
        views: 500,
        likes: null,
        style: 'humor',
        category: 'none',
        notes: '',
      },
    ];

    const result = getTopReels(tiedReels, 3);
    assert.strictEqual(result.length, 3);
    assert.strictEqual(result[0].title, 'Reel 5'); // 500 views
    assert.strictEqual(result[1].title, 'Reel 2'); // 200 views, reel_id 2
    assert.strictEqual(result[2].title, 'Reel 10'); // 200 views, reel_id 10
  });

  it('returns only title, views, style, and category for each reel', () => {
    const result = getTopReels(sampleReels, 1);
    assert.strictEqual(result.length, 1);
    const keys = Object.keys(result[0]).sort();
    assert.deepStrictEqual(keys, ['category', 'style', 'title', 'views']);
    assert.strictEqual(result[0].title, 'Meme voice note');
    assert.strictEqual(result[0].views, 242);
    assert.strictEqual(result[0].style, 'humor');
    assert.strictEqual(result[0].category, 'none');
  });

  it('behaves as a pure function and does not mutate the input reels array', () => {
    const inputCopy = [...sampleReels];
    getTopReels(sampleReels, 3);
    assert.deepStrictEqual(sampleReels, inputCopy);
  });
});
