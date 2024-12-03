/**
 * https://adventofcode.com/2024/day/3#part2
 */
import 'services/array';
import 'services/math';
import 'services/input-file';

const data = inputFile(3, 'input');
const regex = /(don\'t|do)\(\)|mul\(\d+,\d+\)/g;

const matches: (string | null)[] | null = data.match(regex);

for (let i = 0; i < matches!.length; i++) {
  const match = matches![i];

  if (match == null) continue;

  if (match === "don't()") {
    matches![i] = null;

    for (let j = i + 1; j < matches!.length; j++) {
      const next = matches![j];
      if (next === 'do()') break;
      matches![j] = null;
    }
  }

  if (match == 'do()') {
    matches![i] = null;
  }
}

const answer = matches!
  .filter((match): match is string => match != null)
  .map((mul) => mul.match(/\d+/g))
  .map((numstr) => numstr?.flatMap(Number))
  .reduce((acc, nums) => acc + nums![0]! * nums![1]!, 0);

console.log(answer);
