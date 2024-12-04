/**
 * https://adventofcode.com/2024/day/4
 */
import _ from 'lodash';

import 'services/array';
import 'services/math';
import 'services/input-file';

const rows = inputFile(4, 'input')
  .split('\n')
  .map((line) => line.split(''));

let answer = 0;

for (let rowIdx = 0; rowIdx < rows.length; rowIdx++) {
  const row = rows[rowIdx]!;

  for (let letterIdx = 0; letterIdx < row.length; letterIdx++) {
    const horizontal = row.slice(letterIdx, letterIdx + 4);
    if (horizontal.join('') === 'XMAS') answer += 1;
    if (horizontal.toReversed().join('') === 'XMAS') answer += 1;

    let vertical = '';
    for (const vertLetterIdx of _.range(4)) {
      vertical += rows[rowIdx + vertLetterIdx]?.[letterIdx] || '';
    }

    if (vertical === 'XMAS') answer += 1;
    if (vertical.split('').toReversed().join('') === 'XMAS') answer += 1;

    let diagonals = ['', '', '', ''];
    for (const vertLetterIdx of _.range(4)) {
      diagonals[0] += rows[rowIdx + vertLetterIdx]?.[letterIdx + vertLetterIdx] ?? '';
      diagonals[1] += rows[rowIdx + vertLetterIdx]?.[letterIdx - vertLetterIdx] ?? '';
      diagonals[2] += rows[rowIdx - vertLetterIdx]?.[letterIdx - vertLetterIdx] ?? '';
      diagonals[3] += rows[rowIdx - vertLetterIdx]?.[letterIdx + vertLetterIdx] ?? '';
    }

    for (const diagonal of diagonals) {
      if (diagonal === 'XMAS') answer += 1;
    }
  }
}

console.log(answer);
