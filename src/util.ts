/*
 * @Author: lizhigang
 * @Date: 2023-03-24 19:55:57
 * @Description: 工具方法
 */
import {
  AfterHandleDigits,
  BeforeHandleDigits,
  HandleMaxDigits,
  HandleMinDigits,
  HandleSeparate,
  CalcDecimalOtherType,
  CalcIntegerOtherType,
  DigitsType,
  If
} from "./type";
import big from "big.js";
import {AmountOptions} from "./typings";

/**
 * 千位分隔 处理千位分隔
 * @param string 处理的数字
 */
export function handleSeparate ({ number }: HandleSeparate) {
  const integer = number.split('.')[0]
  const decimal = number.split('.')[1]
  const reverseInteger = integer.split('').reverse()
  const separate = reverseInteger.map((number, index) => {
    if (index % 3 === 0 && index > 0 && !isNaN(Number(number))) {
      number += ','
    }
    return number
  })
  let result = separate.reverse().join('')
  if (decimal) {
    result = `${result}.${decimal}`
  }
  return result
}

/**
 * 处理小数最小位数
 * @param minDigits 小数最小位数
 * @param decimal 小数
 */
export function handleMinDigits ({minDigits = -1, decimal}: HandleMinDigits) {
  if (typeof minDigits === 'number' && minDigits > -1 && (decimal?.length < minDigits || !decimal?.length)) {
    return decimal.padEnd(minDigits, '0');
  }
  return decimal;
}

/**
 * 处理小数最大位数
 * @param digitsType 小数类型(split: 截断、float: 四舍五入)
 * @param maxDigits 小数最大位数
 * @param decimal 小数
 */
export function handleMaxDigits <T extends DigitsType>({digitsType, maxDigits = -1, decimal}: HandleMaxDigits<T>) {
  const tempInteger = 1
  if (digitsType === 'float') {
    if (decimal?.length > maxDigits && maxDigits !== -1) {
      const result = big(tempInteger + '.' + decimal).toFixed(maxDigits).split('.')
      const floatInteger = result[0]
      const floatDecimal = result[1]
      return {
        decimal: floatDecimal,
        incremental: Number(floatInteger) > tempInteger
      } as If<T>
    } else {
      return {
        decimal: decimal,
        incremental: false
      } as If<T>
    }
  }
  if (digitsType === 'split' && maxDigits !== -1) {
    return decimal.substring(0, maxDigits) as If<T>
  }
  return decimal as If<T>
}

/**
 * 数字前置操作
 * @param amount 原始金额
 * @param unit 是否显示单位
 */
export function beforeHandleDigits ({amount, unit}: BeforeHandleDigits): string {
  let number;
  if (unit) {
    number = Number(amount) >= 100000000 ? big(amount).div(100000000).toString() : Number(amount) >= 10000 ? big(amount).div(10000).toString() : amount;
  } else {
    number = amount;
  }
  return number
}

/**
 * 数字后置操作
 * @param amount 原始金额
 * @param digits 处理后的数字
 * @param showPlusMark 是否显示加号
 * @param unit 是否显示单位
 */
export function afterHandleDigits ({ amount, digits, showPlusMark, unit }: AfterHandleDigits) {
  if (showPlusMark) {
    digits = (Number(amount) > 0 ? "+" : "") + digits;
  }
  if (unit) {
    digits = Number(amount) >= 100000000 ? `${digits}亿` : Number(amount) >= 10000 ? `${digits}万` : `${digits}元`;
  }
  return digits
}

/**
 * 计算小数
 * @param number 计算后的金额字符串
 * @param separate 千位分隔
 * @param maxDigits 小数最大长度
 * @param minDigits 小数最小长度
 * @param digitsType 小数类型(split: 截断、float: 四舍五入)
 * @param separateNumber 千位分隔字符串
 */
export function calcDecimal <T extends DigitsType>({number, separate, maxDigits, minDigits, digitsType, separateNumber}: Pick<AmountOptions,  'separate' | 'maxDigits' | 'minDigits'> & CalcDecimalOtherType<T>) {
  let decimal = number.split('.')[1] ?? ''
  decimal = separate ? (separateNumber.split('.')[1] ?? '') : decimal;
  decimal = handleMinDigits({minDigits, decimal});
  return handleMaxDigits({digitsType, maxDigits, decimal});
}

/**
 * 计算整数
 * @param separate 千位分隔
 * @param separateNumber 千位分隔字符串
 * @param number 计算后的金额字符串
 * @param incremental 整数位是否加一
 */
export function calcInteger ({separate, separateNumber, number, incremental}: Pick<AmountOptions, 'separate'> & CalcIntegerOtherType) {
  const integer = (separate ? separateNumber : number).split(".")[0];
  return incremental ? big(integer).plus(1).toString() : integer
}
