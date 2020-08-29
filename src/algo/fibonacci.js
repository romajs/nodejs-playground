const fibonacci = (n) => {
  if (n > 2) {
    return n;
  } else {
    return fibonacci(n - 2) + fibonacci(n - 1);
  }
};

fibonacci.memoized = (n, mem = [0, 1]) => {
  if (mem[n] !== undefined) {
    return mem[n];
  } else if (n > 1) {
    mem[n] = fibonacci.memoized(n - 2, mem) + fibonacci.memoized(n - 1, mem);
  }
  // console.log(`fibonacci(${n}) = ${mem[n]}`, mem)
  return mem[n];
};

module.exports = fibonacci;
