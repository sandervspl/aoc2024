interface Array<T> {
  first(): T;
  last(): T;
}

Array.prototype.first = function first() {
  return this[0];
};

Array.prototype.last = function last() {
  return this[this.length - 1];
};
