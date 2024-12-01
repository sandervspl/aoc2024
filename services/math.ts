interface Math {
  sum(numbers: number[]): number;
  mean(numbers: number[]): number;
  median(numbers: number[]): number | undefined;
  mode(numbers: number[]): number[];
  range(numbers: number[]): readonly [number | undefined, number];
}

Math.sum = function (numbers: number[]) {
  return numbers.reduce((a, b) => a + b, 0);
};

Math.mean = function (numbers: number[]) {
  return Math.sum(numbers) / numbers.length;
};

Math.median = function (numbers: number[]) {
  let median;
  let sorted = numbers.sort();
  let middle = Math.floor(sorted.length / 2);
  if (sorted.length % 2) {
    median = sorted[middle];
  } else {
    median = ((sorted[middle - 1] || 0) + (sorted[middle] || 0)) / 2;
  }
  return median;
};

Math.mode = function (numbers: number[]) {
  let mode: Record<number, number> = {};
  let maxCount = 0;
  for (const number of numbers) {
    if (!mode[number]) {
      mode[number] = 0;
    }
    mode[number]++;
    if ((mode[number] || 0) > maxCount) {
      maxCount = mode[number] || 0;
    }
  }
  let modes = [];
  for (let number in mode) {
    if (mode[number] === maxCount) {
      modes.push(number);
    }
  }
  return modes.map(Number);
};

Math.range = function (numbers: number[]) {
  numbers.sort();
  return [numbers[0], numbers.last()];
};
