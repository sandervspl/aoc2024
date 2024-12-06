/**
 * https://adventofcode.com/2024/day/6#part2
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

class Guard {
  x = 0;
  y = 0;
  dir = DIRECTIONS.UP;

  constructor() {
    this.x = field
      .find((line) => line.some((str) => str === '^'))
      ?.findIndex((str) => str === '^')!;
    this.y = field.findIndex((line) => line.some((str) => str === '^'));
  }

  changeDir = (x: number, y: number) => {
    switch (this.dir) {
      case DIRECTIONS.UP:
        this.dir = DIRECTIONS.RIGHT;
        break;
      case DIRECTIONS.DOWN:
        this.dir = DIRECTIONS.LEFT;
        break;
      case DIRECTIONS.LEFT:
        this.dir = DIRECTIONS.UP;
        break;
      case DIRECTIONS.RIGHT:
        this.dir = DIRECTIONS.DOWN;
        break;
      default:
        this.dir = DIRECTIONS.UP;
    }
  };

  step = () => {
    return {
      nextX: this.x + this.dir.x,
      nextY: this.y + this.dir.y,
    };
  };

  isOutOfBounds = () => {
    return this.x < 0 || this.x >= MAP_BOUNDS.width || this.y < 0 || this.y >= MAP_BOUNDS.height;
  };
}

let answer = 0;

function run(field: string[][], guard: Guard) {
  let iters = 0;

  while (!guard.isOutOfBounds()) {
    // Guard is looping. Super lame way to check but cba any more
    if (++iters > 10_000) {
      return true;
    }

    const { nextX, nextY } = guard.step();

    if (field[nextY]?.[nextX] === '#' || field[nextY]?.[nextX] === 'O') {
      guard.changeDir(nextX, nextY);
    } else {
      guard.x = nextX;
      guard.y = nextY;
    }
  }
}

for (const y of field.range()) {
  for (const x of field[y]!.range()) {
    if (field[y]![x] === '^' || field[y]![x] === '#') continue;

    const fieldCopy = [...field].map((l) => [...l]);
    fieldCopy[y]![x] = 'O';

    const guard = new Guard();

    const isLooping = run(fieldCopy, guard);

    if (isLooping) {
      answer += 1;
    }
  }
}

console.log(answer);
