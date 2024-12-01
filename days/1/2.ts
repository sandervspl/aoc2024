/**
 * https://adventofcode.com/2024/day/1#part2
 */
import 'services/array';
import 'services/math';
import 'services/input-file';

const numsl: number[] = [];
const numsr: number[] = [];

inputFile(1, 'input')
  .split('\n')
  .map((line) => line.split('   '))
  .forEach((line) => {
    const nl = Number(line[0]);
    numsl.push(nl);

    const nr = Number(line[1]);
    numsr[nr] = numsr[nr] ? numsr[nr] + 1 : 1;
  });

let answer = 0;

for (const num of numsl) {
  answer += num * (numsr[num] || 0);
}

console.log(answer);
