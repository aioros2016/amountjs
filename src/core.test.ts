// @ts-nocheck
import amountjs from './core';

describe('amountjs formatter correctness', () => {
  it('formats numeric 0 through the same path as string 0', () => {
    expect(amountjs({ amount: 0, minDigits: 2 })).toBe('0.00');
    expect(amountjs({ amount: 0, minDigits: 2 })).toBe(amountjs({ amount: '0', minDigits: 2 }));
  });

  it('rounds negative values correctly when decimal carry crosses the integer boundary', () => {
    expect(amountjs({ amount: -1.996, digitsType: 'float', maxDigits: 2 })).toBe('-2.00');
    expect(amountjs({ amount: -0.996, digitsType: 'float', maxDigits: 2 })).toBe('-1.00');
  });

  it('uses consistent unit thresholds for negative values', () => {
    expect(amountjs({ amount: -9999, unit: true })).toBe('-9999元');
    expect(amountjs({ amount: -10000, unit: true })).toBe('-1万');
    expect(amountjs({ amount: -100000000, unit: true })).toBe('-1亿');
  });
});