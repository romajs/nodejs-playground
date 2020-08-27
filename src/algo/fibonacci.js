const fibonacci = (n, mem = [0, 1]) => {
  if (mem[n] !== undefined) {
    return mem[n]
  } else if (n > 1) {
    mem[n] = fibonacci(n - 2, mem) + fibonacci(n - 1, mem)
  }
  // console.log(`fibonacci(${n}) = ${mem[n]}`, mem)
  return mem[n]
}

module.exports = fibonacci
