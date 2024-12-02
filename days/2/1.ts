/**
 * https://adventofcode.com/2024/day/2
 */
import 'services/array';
import 'services/math';
import 'services/input-file';

const data = inputFile(2, 'input')
  .split('\n')
  .map((line) => line.split(' '))
  .map((numstr) => numstr.flatMap(Number));

let answer = 0;

for (let i = 0; i < data.length; i++) {
  const report = data[i]!;
  let incr: boolean | null = null;

  for (let j = 0; j < report.length; j++) {
    if (j === 0) continue;

    const isLast = report.length - 1 === j;
    const cur = report[j]!;
    const prev = report[j - 1]!;

    const diff = Math.abs(cur - prev);
    // unsafe
    if (diff > 3 || diff === 0) {
      break;
    }

    if (incr) {
      // unsafe
      if (cur < prev) {
        break;
      }
    } else if (incr === false) {
      // unsafe
      if (cur > prev) {
        break;
      }
    } else if (cur > prev) {
      incr = true;
    } else if (cur < prev) {
      incr = false;
    }

    if (isLast) {
      answer += 1;
    }
  }
}

console.log(answer);
