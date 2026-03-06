/*
 * @Author: lizhigang
 * @Date: 2022-09-26 10:11:09
 * @Company: orientsec.com.cn
 * @Description: 项目构建webpack配置
 */
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require("path");

module.exports = {
  mode: 'production',
  entry: {
    index: path.resolve(__dirname, './src/core.ts')
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: "index.js",
    library: "amountjs",
    libraryExport: "default",
    libraryTarget: "umd",
    umdNamedDefine: true,
    globalObject: "this"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {loader: 'ts-loader'},
        ],
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, './src/typings.d.ts'),
          to: path.resolve(__dirname, './dist/index.d.ts')
        }
      ]
    })
  ]
}
