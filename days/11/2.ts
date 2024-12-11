/**
 * https://adventofcode.com/2024/day/11#part2
 */
import _ from 'lodash';

import 'services/array';
import 'services/math';
import 'services/input-file';

let data = inputFile(11, 'input').split(' ').map(Number);
let cache: Map<number, bigint> = new Map();

// Init numbers
for (const num of data) {
  cache.set(num, 1n);
}

// Go through all 75 rounds
for (let i = 0; i < 75; i++) {
  const newCache = new Map<number, bigint>();

  for (const [num, count] of cache.entries()) {
    if (num === 0) {
      newCache.set(1, (newCache.get(1) || 0n) + count);
    } else if (String(num).length % 2 === 0) {
      const str = String(num);
      const mid = Math.floor(str.length / 2);
      const left = parseInt(str.slice(0, mid));
      const right = parseInt(str.slice(mid));
      newCache.set(left, (newCache.get(left) || 0n) + count);
      newCache.set(right, (newCache.get(right) || 0n) + count);
    } else {
      newCache.set(num * 2024, (newCache.get(num * 2024) || 0n) + count);
    }
  }

  cache = newCache;
}

console.log(Array.from(cache.values()).reduce((a, b) => a + b, 0n));
