/*
 * @Author: lizhigang
 * @Date: 2022-09-22 13:08:29
 * @Description: amountjs主模块
 */
import { handleSeparate, handleMinDigits, handleMaxDigits, beforeHandleDigits, afterHandleDigits } from "./util";
import { AmountOptions } from "./typings";

/**
 * 货币格式化
 * @param value 金额
 * @param separate 千位分隔
 * @param showPlusMark 显示金额前的+
 * @param maxDigits 小数最大长度
 * @param minDigits 小数最小长度
 * @param unit 显示货币单位
 * @param lang toLocaleString编码语言
 */
export default function amountjs({ amount, separate, showPlusMark, digitsType = 'split', maxDigits, minDigits, unit, lang = "en-US" }: AmountOptions) {
    if (typeof maxDigits === 'number' && typeof minDigits === 'number' && minDigits > maxDigits) {
        console.warn('小数最大长度必须大于小数最小长度');
        return amount;
    }
    if (amount && !isNaN(Number(amount) as number)) {
        amount = Number(amount);
        let { number, decimal } = beforeHandleDigits({amount, unit})
        const separateNumber = handleSeparate({number, lang})
        const integer = (separate ? separateNumber : number.toString()).split(".")[0];
        decimal = separate ? (separateNumber.split('.')[1] ?? '') : decimal;
        decimal = handleMinDigits({minDigits, decimal});
        decimal = handleMaxDigits({digitsType, maxDigits, decimal});
        let digits = decimal ? `${integer}.${decimal}` : integer;
        return afterHandleDigits({
            amount,
            digits,
            showPlusMark,
            unit
        });
    } else {
        console.warn('输入的不是一个数字或者数字字符串！');
        return amount;
    }
}

