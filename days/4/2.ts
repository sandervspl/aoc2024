/**
 * https://adventofcode.com/2024/day/4#part2
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
    const diagonals: string[] = [];
    for (const samLetterIdx of _.range(3)) {
      // down -> right
      diagonals[0] += rows[rowIdx + samLetterIdx]?.[letterIdx + samLetterIdx] ?? '';
      // 2 rows down, up -> right
      diagonals[1] += rows[rowIdx + 2 - samLetterIdx]?.[letterIdx + samLetterIdx] ?? '';
    }

    if (diagonals[0] === 'MAS' || diagonals[0]?.split('').toReversed().join('') === 'MAS') {
      if (diagonals[1] === 'MAS' || diagonals[1]?.split('').toReversed().join('') === 'MAS') {
        answer += 1;
      }
    }
  }
}

console.log(answer);
