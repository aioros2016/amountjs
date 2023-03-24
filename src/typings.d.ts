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
   * toLocaleString编码语言
   */
  lang?: string;
}

export interface BeforeHandleDigits {
  amount: number;
  unit?: true;
}

export interface HandleSeparate {
  number: number;
  lang: string;
}

export interface HandleMinDigits {
  minDigits?: Pick<AmountOptions, 'minDigits'>[keyof Pick<AmountOptions, 'minDigits'>];
  decimal: string;
}

export interface HandleMaxDigits {
  digitsType: Pick<AmountOptions, 'digitsType'>[keyof Pick<AmountOptions, 'digitsType'>]
  maxDigits?: Pick<AmountOptions, 'maxDigits'>[keyof Pick<AmountOptions, 'maxDigits'>];
  decimal: string;
}

export interface AfterHandleDigits {
  amount: number;
  digits: string;
  showPlusMark?: Pick<AmountOptions, 'showPlusMark'>[keyof Pick<AmountOptions, 'showPlusMark'>];
  unit?: Pick<AmountOptions, 'unit'>[keyof Pick<AmountOptions, 'unit'>];
}

declare function amountjs(ops: AmountOptions): string | number;

export default amountjs;
