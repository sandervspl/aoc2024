/**
 * https://adventofcode.com/2024/day/11#part2
 */
import _ from 'lodash';

import 'services/array';
import 'services/math';
import 'services/input-file';

let data = inputFile(11, 'example').split(' ');
const cache = new Map<{ num: number; iter: number }, number>();

function ans(num: number, iter: number) {
  if (cache.has({ num, iter })) {
    return cache.get({ num, iter })!;
  }

  let result = 0;

  if (iter === 0) {
    result = 1;
  } else if (num === 0) {
    result = ans(1, iter - 1);
  } else if (String(num).length % 2 === 0) {
    let str = String(num);
    const mid = Math.floor(str.length / 2);
    result += ans(Number(str.slice(0, mid)), iter - 1);
    result += ans(Number(str.slice(mid)), iter - 1);
  } else {
    result = ans(num * 2024, iter - 1);
  }

  cache.set({ num, iter }, result);

  return result;
}

const ROUNDS = 75;
const res: number[] = [];

for (const i of data.range()) {
  res.push(ans(Number(data[i]!), ROUNDS));
}

console.log(Math.sum(res));
