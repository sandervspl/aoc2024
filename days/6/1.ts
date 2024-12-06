/**
 * https://adventofcode.com/2024/day/6
 */
import _ from 'lodash';

import 'services/array';
import 'services/math';
import 'services/input-file';

const field = inputFile(6, 'input')
  .split('\n')
  .map((line) => line.split(''));

const MAP_BOUNDS = {
  width: field[0]!.length,
  height: field.length,
};
const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
};

const guard = {
  x: field.find((line) => line.some((str) => str === '^'))?.findIndex((str) => str === '^')!,
  y: field.findIndex((line) => line.some((str) => str === '^')),
  dir: DIRECTIONS.UP,
  changeDir: function () {
    // prettier-ignore
    switch (this.dir) {
      case DIRECTIONS.UP: this.dir = DIRECTIONS.RIGHT;break;
      case DIRECTIONS.DOWN: this.dir = DIRECTIONS.LEFT;break;
      case DIRECTIONS.LEFT: this.dir = DIRECTIONS.UP;break;
      case DIRECTIONS.RIGHT: this.dir = DIRECTIONS.DOWN;break;
      default: this.dir = DIRECTIONS.UP;
    }
  },
  step: function () {
    field[this.y]![this.x] = 'X';

    return {
      nextX: this.x + this.dir.x,
      nextY: this.y + this.dir.y,
    };
  },
  isOutOfBounds: function () {
    return this.x < 0 || this.x >= MAP_BOUNDS.width || this.y < 0 || this.y >= MAP_BOUNDS.height;
  },
};

let iters = 0;
while (!guard.isOutOfBounds()) {
  if (++iters > 10_000) {
    console.log('breaking out of infinite loop');
    break;
  }

  const { nextX, nextY } = guard.step();

  if (field[nextY]?.[nextX] === '#') {
    guard.changeDir();
  } else {
    guard.x = nextX;
    guard.y = nextY;
  }
}

// console.log(field.map((v) => v.join('')).join('\n'));

let answer = 0;
for (const row of field) {
  for (const str of row) {
    if (str === 'X') answer += 1;
  }
}

console.log(answer);
