const { fib } = require('./index')

function test(title, fn) {
  try {
    fn()
    console.log(`${title} text pass!`)
  } catch (e) {
    console.log(e.message)
    console.error(`${title} test failed!`)
  }
}

function expect(value) {
  return {
    toBe(expectVal) {
      if (value !== expectVal) {
        throw Error(`Test failed! Input: ${value} expected: ${expectVal}`)
      }
    },

    toBeEqual(expectVal) {
      if (Array.isArray(value) && Array.isArray(expectVal)) {
        if (
          value.sort((a, b) => a - b).join() !==
          expectVal.sort((a, b) => a - b).join()
        ) {
          throw Error(`Test failed! Input: ${value} expected: ${expectVal}`)
        }
      } else {
        throw Error(
          `Type Error! toBeEqual fun accept array! Input: ${value} expected: ${expectVal}`
        )
      }
    }
  }
}

test('Test fib', () => {
  expect(fib('S')).toBe(0)
  expect(fib(2)).toBe(2)
  expect(fib(5)).toBe(8)
  expect(fib(10)).toBe(89)
  expect(fib(100000000)).toBe('The input number is out of limits.')
})
