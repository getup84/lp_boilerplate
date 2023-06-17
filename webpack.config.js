const webpack = require('webpack');
module.exports = {
  //モードを production にすると最適化された状態、 development にするとソースマップ有効で出力される。
  mode: process.env.NODE_ENV,
  devtool: process.env.NODE_ENV === 'development' ? 'inline-source-map' : false,
  entry: './src/js/main.js',  //メインになるJSファイル（エントリーポイント）
  output: {
    path: `${__dirname}/dist`,  //出力ファイルのディレクトリ名
    filename: 'bundle.js'  //出力ファイル名
  },
  module: {  //Loaderを使う。今回はBabel。
    rules: [
      {
        test: /\.js$/,  //変換するファイルの指定。「.js」で終わるファイル
        exclude: /(node_modules)/,  //除外するファイル
        use: {
          loader: 'babel-loader',  //Babelを利用する
          options: {
            presets: ['@babel/preset-env']  //プリセットでES2020をES5に変換
          }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ]
  },
  target: ["web", "es5"]
};