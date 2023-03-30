/*
 * @Author: lizhigang
 * @Date: 2023-03-27 15:44:41
 * @Company: orientsec.com.cn
 * @Description: 除主模块以外的ts类型
 */
import {AmountOptions} from "./typings";

export type DigitsType = 'split' | 'float';

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

export interface HandleMaxDigits<T> {
  digitsType: T;
  maxDigits?: number;
  decimal: string;
}

export interface AfterHandleDigits {
  amount: string;
  digits: string;
  showPlusMark?: Pick<AmountOptions, 'showPlusMark'>[keyof Pick<AmountOptions, 'showPlusMark'>];
  unit?: Pick<AmountOptions, 'unit'>[keyof Pick<AmountOptions, 'unit'>];
}

export interface CalcDecimalOtherType<T> {
  number: string;
  separateNumber: string;
  digitsType: T;
}

export interface CalcIntegerOtherType {
  separateNumber: string;
  number: string;
  incremental: boolean;
}

export type If<C extends 'split' | 'float'> = C extends 'float' ? {
  decimal: string;
  incremental: boolean;
} : string;

