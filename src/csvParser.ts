import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { Reel } from './types.js';

export function stripBom(text: string): string {
  if (text.charCodeAt(0) === 0xfeff || text.startsWith('\ufeff')) {
    return text.slice(1);
  }
  return text;
}

export function parseCsvLine(line: string): string[] {
  const cleanLine = line.replace(/\r$/, '');
  const fields: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < cleanLine.length; i++) {
    const char = cleanLine[i];

    if (char === '"') {
      if (inQuotes && cleanLine[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      fields.push(current);
      current = '';
    } else {
      current += char;
    }
  }

  fields.push(current);
  return fields;
}

export function parseCsv(csvContent: string): Reel[] {
  const sanitized = stripBom(csvContent);
  const lines = sanitized.split(/\r?\n/).filter((line) => line.trim().length > 0);
  if (lines.length <= 1) {
    return [];
  }

  const reels: Reel[] = [];
  for (let i = 1; i < lines.length; i++) {
    const fields = parseCsvLine(lines[i]);
    if (fields.length < 7) {
      continue;
    }

    reels.push({
      reel_id: Number(fields[0]),
      title: fields[1],
      views: Number(fields[2]),
      likes: fields[3] === '' ? null : Number(fields[3]),
      style: fields[4],
      category: fields[5],
      notes: fields[6] ?? '',
    });
  }

  return reels;
}

export function getDefaultCsvPath(): string {
  return fileURLToPath(new URL('../zeetech_reels.csv', import.meta.url));
}

export function loadReelsCsv(filePath: string = getDefaultCsvPath()): Reel[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  return parseCsv(content);
}
