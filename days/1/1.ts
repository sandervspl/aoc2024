/**
 * https://adventofcode.com/2024/day/1
 */
import 'services/array';
import 'services/math';
import 'services/input-file';

const data = inputFile(1, 'input')
  .split('\n')
  .map((line) => line.split('   '))
  .reduce(
    (acc, line) => {
      acc[0].push(Number(line[0]));
      acc[1].push(Number(line[1]));

      return acc;
    },
    [[], []] as [number[], number[]],
  );

data[0].sort();
data[1].sort();

let answer = 0;

for (let i = 0; i < data[0].length; i++) {
  const n1 = data[0][i]!;
  const n2 = data[1][i]!;
  const diff = Math.abs(n1 - n2);

  answer += diff;
}

console.log(answer);
