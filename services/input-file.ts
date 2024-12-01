import fs from 'node:fs';
import path from 'node:path';

(globalThis as any).inputFile = function inputFile(day: number, fileName = 'input') {
  const file = path.resolve('days', day.toString(), fileName);
  const buffer = fs.readFileSync(file, 'utf8');

  return buffer;
};
