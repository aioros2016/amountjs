/*
 * @Author: lizhigang
 * @Date: 2023-03-24 19:55:57
 * @Description: 工具方法
 */
import {AfterHandleDigits, BeforeHandleDigits, HandleMaxDigits, HandleMinDigits, HandleSeparate} from "./typings";
import big from "big.js";

/**
 * 千位分隔 处理千位分隔
 * @param number 处理的数字
 * @param lang 语言
 */
export function handleSeparate ({ number, lang }: HandleSeparate) {
  return number.toLocaleString(lang);
}

/**
 * 处理小数最小位数
 * @param minDigits 小数最小位数
 * @param decimal 小数
 */
export function handleMinDigits ({minDigits = -1, decimal}: HandleMinDigits) {
  if (typeof minDigits === 'number' && minDigits > -1 && (decimal.length < minDigits || !decimal.length)) {
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
    return decimal.length < maxDigits ? decimal : digitsType === 'split' ? decimal.substring(0, maxDigits) : Number('1.' + decimal).toFixed(maxDigits).split('.')[1];
  }
  return decimal
}

/**
 * 数字前置操作
 * @param amount 原始金额
 * @param unit 是否显示单位
 */
export function beforeHandleDigits ({amount, unit}: BeforeHandleDigits): {
  number: number;
  decimal: string;
} {
  let number;
  let decimal;
  if (unit) {
    number = amount >= 100000000 ? big(amount).div(100000000).toNumber() : amount >= 10000 ? big(amount).div(10000).toNumber() : amount;
    decimal = number.toString().split(".")[1] ?? '';
  } else {
    number = amount;
    decimal = amount.toString().split(".")[1] ?? '';
  }
  return {
    number,
    decimal
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
    digits = (amount > 0 ? "+" : "") + digits;
  }
  if (unit) {
    digits = amount >= 100000000 ? `${digits}亿` : amount >= 10000 ? `${digits}万` : `${digits}元`;
  }
  return digits
}
