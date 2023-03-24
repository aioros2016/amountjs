import React, { useState } from 'react';
import './App.css';
// import amountjs from 'amountjs';
import amountjs from "./core";

function App() {
  const [amount, setAmount] = useState("0");

  const onInputAmount = (e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)

  return (
    <div className="App">
      <div>在此输入金额：<input onInput={onInputAmount} /></div>
      <div className="label">千位分隔: {amountjs({
        amount,
        separate: true
      })}</div>
      <div className="label">小数最大位数(截断): {amountjs({
        amount,
        maxDigits: 3
      })}</div>
      <div className="label">小数最小位数(截断): {amountjs({
        amount,
        minDigits: 2
      })}</div>
      <div className="label">小数最大位数(四舍五入): {amountjs({
        amount,
        digitsType: 'float',
        maxDigits: 2
      })}</div>
      <div className="label">小数最小位数(四舍五入): {amountjs({
        amount,
        digitsType: 'float',
        minDigits: 0
      })}</div>
      <div className="label">小数恒定位数: {amountjs({
        amount,
        maxDigits: 2,
        minDigits: 2
      })}</div>
      <div className="label">千位分隔并且小数恒定位数: {amountjs({
        amount,
        separate: true,
        maxDigits: 2,
        minDigits: 2
      })}</div>
      <div className="label">显示正负数: {amountjs({
        amount,
        showPlusMark: true
      })}</div>
      <div className="label">显示货币单位: {amountjs({
        amount,
        unit: true
      })}</div>
      <div className="label">显示货币单位并且限制小数位数: {amountjs({
        amount,
        unit: true,
        maxDigits: 2
      })}</div>
    </div>
  );
}

export default App;
