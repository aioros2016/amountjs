/*
 * @Author: lizhigang
 * @Date: 2022-09-22 13:08:29
 * @Description: amountjs主模块
 */
import big from "big.js";
import { AmountOptions } from "./typings";

/**
 * 千位分隔 处理千位分隔
 * @param number 处理的数据
 */
function handleSeparate (number: number | big) {
    return number.toLocaleString("en-US", {
        maximumFractionDigits: 20,
    });
}

/**
 * 处理小数最小位数
 * @param minDigits 小数最小位数
 * @param decimal 小数
 */
function handleMinDigits (minDigits: number, decimal: string) {
    if (decimal?.length < minDigits || !decimal) {
        let addZero = "";
        for (let i = 0; i < (!decimal ? minDigits : Number(minDigits - decimal.length)); i++) {
            addZero += "0";
        }
        decimal += addZero;
        return decimal;
    }
    return decimal;
}

/**
 * 处理小数最大位数
 * @param maxDigits 小数最大位数
 * @param decimal 小数
 */
function handleMaxDigits (maxDigits: number, decimal: string) {
    return (decimal && decimal.length) < maxDigits ? decimal : decimal.substring(0, maxDigits);
}

/**
 * 货币格式化
 * @param value 金额
 * @param separate 千位分隔
 * @param showPlusMark 显示金额前的+
 * @param maxDigits 小数最大长度
 * @param minDigits 小数最小长度
 * @param unit 显示货币单位
 */
export default function amountjs({ amount, separate, showPlusMark, maxDigits, minDigits, unit }: AmountOptions) {
    if (amount && !isNaN(Number(amount) as number)) {
        const plusMark = amount > 0 ? "+" : "";
        let number: number | big = 0;
        let decimal = "";
        if (typeof amount === 'number') {
            amount = amount.toString();
        }
        if (unit) {
            number = Number(amount) >= 100000000 ? big(amount).div(100000000) : Number(amount) >= 10000 ? big(amount).div(10000) : Number(amount);
            if (number.toString().split(".")[1]) {
                decimal = number.toString().split(".")[1];
            }
        } else {
            if (amount.split(".")[1]) {
                decimal = amount.split(".")[1];
            }
            number = Number(amount);
        }
        const formatValue = handleSeparate(number);
        const splitNumber = (separate ? formatValue : number.toString()).split(".");
        splitNumber[1] = decimal;
        if (splitNumber.length === 1) {
            splitNumber[1] = "";
        }
        if (typeof minDigits === 'number' && minDigits > -1) {
            splitNumber[1] = handleMinDigits(minDigits, splitNumber[1]);
        }

        if (typeof maxDigits === 'number' && maxDigits > -1) {
            splitNumber[1] = handleMaxDigits(maxDigits, splitNumber[1]);
        }
        let returnVal = splitNumber[1] ? splitNumber.join(".") : splitNumber[0];
        if (showPlusMark) {
            returnVal = plusMark + returnVal;
        }
        if (unit) {
            returnVal = Number(amount) >= 100000000 ? `${returnVal}亿` : Number(amount) >= 10000 ? `${returnVal}万` : `${returnVal}元`;
        }
        return returnVal;
    } else {
        console.warn('输入的不是一个数字或者数字字符串！')
    }
    return amount;
}

