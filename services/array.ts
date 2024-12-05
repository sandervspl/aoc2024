interface Array<T> {
  first(): T;
  last(): T;
  middle(): T;
  range(): number[];
}

Array.prototype.first = function first() {
  return this[0];
};

Array.prototype.last = function last() {
  return this[this.length - 1];
};

Array.prototype.middle = function middle() {
  return this[Math.floor(this.length / 2)];
};

Array.prototype.range = function middle() {
  return Array.from(this).map((_, i) => i);
};
