export const OPERATIONS = {
  add: {
    symbol: '+',
    function: (a: number, b: number) => (a + b).toString().replace('.', ','),
  },
  subtract: {
    symbol: '-',
    function: (a: number, b: number) => (a - b).toString().replace('.', ','),
  },
  multiply: {
    symbol: 'x',
    function: (a: number, b: number) => (a * b).toString().replace('.', ','),
  },
  divide: {
    symbol: '÷',
    function: (a: number, b: number) => (a / b).toString().replace('.', ','),
  },
  percentage: {
    symbol: '%',
    function: (percent: number, number: number) => (percent * (number / 100)).toString().replace('.', ','),
  }
}
