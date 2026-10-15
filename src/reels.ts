import { Reel, TopReel } from './types.js';

export function validateLimit(limit?: unknown): number {
  if (limit === undefined) {
    return 5;
  }

  if (
    typeof limit !== 'number' ||
    !Number.isInteger(limit) ||
    limit < 1
  ) {
    throw new Error(
      `Invalid limit: expected a whole number greater than or equal to 1, received ${String(limit)}`
    );
  }

  return limit;
}

export function getTopReels(reels: readonly Reel[], limit?: unknown): TopReel[] {
  const validLimit = validateLimit(limit);
  const cappedLimit = Math.min(validLimit, reels.length);

  const sorted = [...reels].sort((a, b) => {
    if (b.views !== a.views) {
      return b.views - a.views;
    }
    return a.reel_id - b.reel_id;
  });

  return sorted.slice(0, cappedLimit).map((reel) => ({
    title: reel.title,
    views: reel.views,
    style: reel.style,
    category: reel.category,
  }));
}
