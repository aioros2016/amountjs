/// <reference types="react-scripts" />
export declare interface AmountOptions {
  /**
   * 金额
   */
  amount: number | string;
  /**
   * 千位分隔
   */
  separate?: true;
  /**
   * 显示金额前的+
   */
  showPlusMark?: true;
  /**
   * 小数最大长度
   */
  maxDigits?: number;
  /**
   * 小数最小长度
   */
  minDigits?: number;
  /**
   * 显示货币单位
   */
  unit?: true;
}

declare function amountjs(ops: AmountOptions): unknown;

export default amountjs;
