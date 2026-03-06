# amountjs

一个专注于数字与人民币金额展示的轻量格式化函数库。

## 安装

```bash
npm i amountjs
```

## 快速开始

```ts
import amountjs from 'amountjs';

amountjs({ amount: 1000, separate: true });
// => '1,000'
```

如果你使用 CommonJS：

```js
const amountjs = require('amountjs');
```

包对外导出单个默认函数，发布入口为 `dist/index.js`，类型入口为 `dist/index.d.ts`。

## 常见用法

```ts
amountjs({ amount: 100.978, maxDigits: 2 });
// => '100.97'

amountjs({ amount: 123.678, maxDigits: 2, digitsType: 'float' });
// => '123.68'

amountjs({ amount: 100, minDigits: 2 });
// => '100.00'

amountjs({ amount: 100, showPlusMark: true });
// => '+100'

amountjs({ amount: 100000000, unit: true });
// => '1亿'
```

## API

| 属性 | 类型 | 必传 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `amount` | `string \| number` | 是 | - | 需要处理的值 |
| `separate` | `boolean` | 否 | `false` | 是否开启千位分隔 |
| `showPlusMark` | `boolean` | 否 | `false` | 正数前是否显示 `+` |
| `digitsType` | `'split' \| 'float'` | 否 | `'split'` | 小数超长时的处理方式：`split` 为截断，`float` 为四舍五入 |
| `maxDigits` | `number` | 否 | - | 小数最大长度 |
| `minDigits` | `number` | 否 | - | 小数最小长度，不足时补 `0` |
| `unit` | `boolean` | 否 | `false` | 是否追加人民币单位（`元` / `万` / `亿`） |
| `noWarn` | `boolean` | 否 | `false` | 是否关闭控制台 warning |

## 行为说明

- `digitsType` 只在设置了 `maxDigits` 时才会体现“截断 / 四舍五入”的差异。
- `unit: true` 时：
  - 小于 `10000` 的值追加 `元`
  - 大于等于 `10000` 且小于 `100000000` 的值使用 `万`
  - 大于等于 `100000000` 的值使用 `亿`
- 当 `amount` 不是合法数字（或数字字符串）时，函数会返回原始输入，并在默认情况下输出 warning。
- 当 `minDigits > maxDigits` 时，函数会返回原始输入，并在默认情况下输出 warning。

## Demo 与开发

- `pnpm start`：启动 CRA demo 页面（当前 demo 直接消费本地 `src/core.ts`）。
- `pnpm build`：构建 demo 应用。
- `pnpm build:webpack`：构建用于发布的库产物到 `dist/`。
- `npm pack --dry-run`：检查最终 npm 包将包含哪些文件。

## 反馈

如在使用过程中遇到问题或发现 bug，欢迎提交 issue 或发邮件给 <a href="mailto:d_iii@aliyun.com">我</a>。


