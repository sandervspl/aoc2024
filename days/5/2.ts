/**
 * https://adventofcode.com/2024/day/5#part2
 */
import _ from 'lodash';

import 'services/array';
import 'services/math';
import 'services/input-file';

const data = inputFile(5, 'input').split('\n\n');
const rules = data[0]!
  .split('\n')
  .map((r) => r.split('|'))
  .map((r) => r.map(Number));
const input = data[1]!.split('\n').map((v) => v.split(',').map(Number));

let answer = 0;

for (const i of input.range()) {
  const row = input[i]!;
  let wasIncorrect = false;

  function shuffle() {
    for (const j of row.range()) {
      const first = row[j];
      const second = row[j + 1];

      if (second == null) break;

      for (const rule of rules) {
        if (rule[1] === first && rule[0] === second) {
          wasIncorrect = true;
          const temp = row[j];
          input[i]![j] = row[j + 1]!;
          input[i]![j + 1] = temp!;

          // Start shuffling again from beginning
          shuffle();
        }
      }
    }
  }

  shuffle();

  if (wasIncorrect) {
    const middle = row.middle();
    answer += middle;
  }
}

console.log(answer);
