import commonConfig from './webpack.common.babel.js'

import webpack from 'webpack'
import webpackMerge from 'webpack-merge'
import saveLicense from 'uglify-save-license'

export default webpackMerge(commonConfig, {
  plugins: [
    /*
     [最適化]
     JSに圧縮をする際にモジュールの利用頻度を考慮して並び替える。
     これにより、よく利用されるモジュールほど短い名前に変換される。
     圧縮後に使用される変数名の多くが短くなるため、ファイルサイズのより小さくできる。

     see: https://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin
     */
    new webpack.optimize.OccurrenceOrderPlugin(),

    /*
     [ファイル圧縮]
     スペースや改行、コメントを削除して出力されるJSを最小化。
     outputの設定は、minify時のコメント削除でLicense情報まで消してしまわないようにするためのもの。


     see: https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
     */
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: saveLicense
      }
    }),

    /*
     [環境変数の定義]

     see: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
     */
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),

    /*
     [重複排除]
     バンドル時に依存関係木を作り重複しているモジュールを探索、削除することでファイルサイズを減らす。
     削除モジュールの参照元には関数のコピーを適応することで、意味的な整合性を保ってる。

     https://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
     */
    new webpack.optimize.DedupePlugin(),

    /*
     [コード圧縮]
     ファイルを細かく分析し、まとめられるところはできるだけまとめてコードを圧縮する。

     see: https://webpack.github.io/docs/list-of-plugins.html#aggressivemergingplugin
     */
    new webpack.optimize.AggressiveMergingPlugin()
  ]
})
