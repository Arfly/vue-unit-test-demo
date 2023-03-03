function fib(n) {
  const num = Number(n)
  if (num && num >= 100000) {
    return 'The input number is out of limits.'
  }
  if (num) {
    if (n === 0) return 0
    if (n === 1) return 1
    if (n === 2) return 2
    return fib(n - 1) + fib(n - 2)
  } else {
    return 0
  }
}

module.exports = {
  fib
}
