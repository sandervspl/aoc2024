/**
 * https://adventofcode.com/2024/day/11
 */
import _ from 'lodash';

import 'services/array';
import 'services/math';
import 'services/input-file';

let data = inputFile(11, 'input').split(' ');

for (let round = 0; round < 25; round++) {
  console.log('Round', round + 1);

  for (let i = 0; i < data.length; i++) {
    const num = data[i]!;

    if (num === '0') {
      data[i] = '1';
    } else if (num.length % 2 === 0) {
      const p1 = num.slice(0, num.length / 2);
      const p2 = String(+num!.slice(num.length / 2));
      data = data.slice(0, i).concat([p1, p2]).concat(data.slice(++i));
    } else {
      data[i] = String(+num * 2024);
    }
  }
}

console.log(data.length);
