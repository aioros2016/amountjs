# amount.js

**一个专注于处理数字与货币显示的小型ts库**

## 特性

- 小而快
- 使用异常简单，由于Ts加持，api都有语法提示
- 体积只有7.42KB，经过gzip压缩后，体积将进一步压缩至3.29KB

## 安装

```bash
npm i amountjs
```

## 导入

```javascript
import amountjs from 'amountjs';
```

## 使用

库导出单个函数amountjs，必传项接收类型为number或string的值

千位分隔：

    amountjs({amount: 1000, separate: true}) => 1,000

小数最大位数：

    amountjs({amount: 100.978, maxDigits: 2}) => 100.97

小数最小位数：

    amountjs({amount: 100, minDigits: 2}) => 100.00

显示正数前的加号：

    amountjs({amount: 100, showPlusMark: true}) => +100

显示货币单位：

    amountjs({amount: 100000000, unit: true}) => 1亿
货币单位目前最大支持显示到亿

小数最大位数类型(截断 | 四舍五入)：

    amountjs({amount: 123.678, maxDigits: 2, digitsType: 'float'}) => 123.68

以上特性可以相互组合，来得到您最终想要的效果！

## 预览

    npm run start

## 构建

请使用webpack来构建本项目

    npm run build:webpack

## 反馈

如在使用过程中，遇到问题或发现bug，欢迎提交issue或者发邮件给<a href="mailto:d_iii@aliyun.com">我</a>


