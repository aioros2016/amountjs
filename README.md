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

## API

| 属性           | 类型            | 必传  | 默认值   | 描述                             |
|--------------|---------------|-----|-------|--------------------------------|
| amount       | string、number | 是   | -     | 需要处理的值                         |
| separate     | boolean       | 否   | false | 千位分隔                           |
| showPlusMark | boolean       | 否   | false | 显示正数前的加号                       |
| digitsType   | string        | 否   | split | 小数限制位数时的类型。split：截断；float：四舍五入 |
| maxDigits    | number        | 否   | -     | 小数位最大长度                        |
| minDigits    | number        | 否   | -     | 小数位最小长度，不足补0                   |
| unit         | boolean       | 否   | false | 显示RMB货币单位                      |
| noWarn         | boolean       | 否   | false | 是否显示控制台的警告信息                   |

## 兼容

![React](https://static.lizhigang.cn/img/react.png)
![Vue](https://static.lizhigang.cn/img/vue.png)
![Next.js](https://static.lizhigang.cn/img/nextjs.png)

## 反馈

如在使用过程中，遇到问题或发现bug，欢迎提交issue或者发邮件给<a href="mailto:d_iii@aliyun.com">我</a>


