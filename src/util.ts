/*
 * @Author: lizhigang
 * @Date: 2023-03-24 19:55:57
 * @Description: 工具方法
 */
import {AfterHandleDigits, BeforeHandleDigits, HandleMaxDigits, HandleMinDigits, HandleSeparate} from "./type";
import big from "big.js";

/**
 * 千位分隔 处理千位分隔
 * @param string 处理的数字
 */
export function handleSeparate ({ number }: HandleSeparate) {
  const integer = number.split('.')[0]
  const decimal = number.split('.')[1]
  const reverseInteger = integer.split('').reverse()
  const separate = reverseInteger.map((number, index) => {
    if (index % 3 === 0 && index > 0) {
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
export function handleMaxDigits ({digitsType, maxDigits = -1, decimal}: HandleMaxDigits) {
  if (typeof maxDigits === 'number' && maxDigits > -1) {
    const tempInteger = 1
    if (decimal?.length < maxDigits) {
      return {
        decimal,
        incremental: false
      }
    }
    if (digitsType === 'split') {
      return {
        decimal: decimal.substring(0, maxDigits),
        incremental: false
      }
    }
    if (digitsType === 'float') {
      const result = Number(tempInteger + '.' + decimal).toFixed(maxDigits).split('.')
      const floatInteger = result[0]
      const floatDecimal = result[1]
      return {
        decimal: floatDecimal,
        incremental: Number(floatInteger) > tempInteger
      }
    }
  }
  return {
    decimal,
    incremental: false
  }
}

/**
 * 数字前置操作
 * @param amount 原始金额
 * @param unit 是否显示单位
 */
export function beforeHandleDigits ({amount, unit}: BeforeHandleDigits): {
  number: string
} {
  let number;
  if (unit) {
    number = Number(amount) >= 100000000 ? big(amount).div(100000000).toString() : Number(amount) >= 10000 ? big(amount).div(10000).toString() : amount;
  } else {
    number = amount;
  }
  return {
    number
  }
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
