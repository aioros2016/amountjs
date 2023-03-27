/*
 * @Author: lizhigang
 * @Date: 2023-03-27 15:44:41
 * @Company: orientsec.com.cn
 * @Description: 除主模块以外的ts类型
 */
import {AmountOptions} from "./typings";

export interface BeforeHandleDigits {
  amount: string;
  unit?: true;
}

export interface HandleSeparate {
  number: string;
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
  amount: string;
  digits: string;
  showPlusMark?: Pick<AmountOptions, 'showPlusMark'>[keyof Pick<AmountOptions, 'showPlusMark'>];
  unit?: Pick<AmountOptions, 'unit'>[keyof Pick<AmountOptions, 'unit'>];
}
