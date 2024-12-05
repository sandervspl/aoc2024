/**
 * https://adventofcode.com/2024/day/5
 */
import 'services/array';
import 'services/math';
import 'services/input-file';

const data = inputFile(5, 'input').split('\n\n');
const rules = data[0]!
  .split('\n')
  .map((r) => r.split('|'))
  .map((r) => r.map(Number));
const input = data[1]!.split('\n');

let answer = 0;

for (const i of input.range()) {
  let valid = true;
  const row = input[i]!.split(',').map(Number);

  for (const j of row.range()) {
    const first = row[j];
    const second = row[j + 1];

    if (second == null) break;

    for (const rule of rules) {
      // If the numbers are the inverse of a rule we know the row is invalid
      if (rule[1] === first && rule[0] === second) {
        valid = false;
        break;
      }
    }
  }

  if (valid) {
    const middle = row.middle();
    answer += middle;
  }
}

console.log(answer);
