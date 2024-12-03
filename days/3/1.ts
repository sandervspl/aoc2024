/**
 * https://adventofcode.com/2024/day/3
 */
import 'services/array';
import 'services/math';
import 'services/input-file';

const data = inputFile(3, 'input');
const regex = /mul\(\d+,\d+\)/g;

const answer = data
  .match(regex)
  ?.map((mul) => mul.match(/\d+/g))
  .map((numstr) => numstr?.flatMap(Number))
  .reduce((acc, nums) => acc + nums![0]! * nums![1]!, 0);

console.log(answer);
