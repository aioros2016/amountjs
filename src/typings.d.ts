export type AmountValue = number | string;

export type AmountDigitsType = 'split' | 'float';

export interface AmountOptions {
  /**
   * 金额
   */
  amount: AmountValue;
  /**
   * 千位分隔
   */
  separate?: boolean;
  /**
   * 显示金额前的+
   */
  showPlusMark?: boolean;
  /**
   * 小数类型(split: 截断、float: 四舍五入)
   */
  digitsType?: AmountDigitsType;
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
  unit?: boolean;
  /**
   * 控制台是否显示警告信息
   */
  noWarn?: boolean;
}

declare function amountjs(options: AmountOptions): string | AmountValue;

export default amountjs;
