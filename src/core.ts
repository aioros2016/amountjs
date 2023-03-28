/*
 * @Author: lizhigang
 * @Date: 2022-09-22 13:08:29
 * @update: 2023-03-28 16:28:00
 * @Description: amountjs主模块
 */
import {
    handleSeparate,
    beforeHandleDigits,
    afterHandleDigits,
    calcDecimal,
    calcInteger
} from "./util";
import { AmountOptions } from "./typings";

/**
 * 货币格式化
 * @param value 金额
 * @param separate 千位分隔
 * @param showPlusMark 显示金额前的+
 * @param digitsType 小数保留类型(split: 截断、float: 四舍五入)
 * @param maxDigits 小数最大长度
 * @param minDigits 小数最小长度
 * @param unit 显示货币单位
 */
export default function amountjs({ amount, separate, showPlusMark, digitsType = 'split', maxDigits, minDigits, unit }: AmountOptions) {
    if (!amount || (typeof amount === 'string' && !amount.trim())) {
        return amount
    }
    if (typeof maxDigits === 'number' && typeof minDigits === 'number' && minDigits > maxDigits) {
        console.warn('小数最大长度必须大于小数最小长度');
        return amount;
    }
    if (amount && !isNaN(Number(amount) as number)) {
        amount = amount.toString().trim()
        const number = beforeHandleDigits({amount, unit})
        const separateNumber = handleSeparate({number})
        const {decimal, incremental} = calcDecimal({number, separate, digitsType, maxDigits, minDigits, separateNumber});
        const integer = calcInteger({separate, separateNumber, number, incremental})
        return afterHandleDigits({
            amount,
            digits: decimal ? `${integer}.${decimal}` : integer,
            showPlusMark,
            unit
        });
    } else {
        console.warn('输入的不是一个数字或者数字字符串！');
        return amount;
    }
}

