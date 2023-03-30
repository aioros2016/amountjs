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
   * 小数类型(split: 截断、float: 四舍五入)
   */
  digitsType?: 'split' | 'float';
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
  /**
   * 控制台是否显示警告信息
   */
  noWarn?: boolean;
}

declare function amountjs({ amount, separate, showPlusMark, digitsType = 'split', maxDigits, minDigits, unit, noWarn = false }: AmountOptions): string | number;

export default amountjs;
