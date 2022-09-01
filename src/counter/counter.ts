function counter(value = 0): Array<() => number> {
  let count = value;
  function getValue() {
    return count;
  }
  function inc() {
    count += 1;
    return count;
  }
  return [getValue, inc];
}

const [getA, nextA] = counter(1);

console.log(`A:${getA()}`);
console.log(`A:${nextA()}`);

const [getB, nextB] = counter(5);

console.log(`B:${getB()}`);
console.log(`B:${nextB()}`);

console.log(`A:${nextA()}`);
console.log(`B:${nextB()}`);
