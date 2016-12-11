import commonConfig from './webpack.common.babel.js'

import webpack from 'webpack'
import webpackMerge from 'webpack-merge'

export default webpackMerge(commonConfig, {
  module: {
    loaders: [

      /*
       [ESLint]
       ES2015のJSに対してESLintの静的機解析チェックを適応する。
       ES2015のトランスパイル前に実施され、チェック内容をコンソール出力。

       see: https://github.com/MoOx/eslint-loader
       */
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'eslint-loader'
      }
    ]
  },

  /*
   [ESLintの設定]
   Lintの適応ルールを記述した.eslintrcファイルのパス指定。

   see: https://github.com/MoOx/eslint-loader#options
   */
  eslint: {
    configFile: `${__dirname}/eslint.json`
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]
})
