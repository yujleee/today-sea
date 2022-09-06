const path = require('path');

const HtmlWebpack = require('html-webpack-plugin');

module.exports = {
  mode: 'none',
  entry: './js/index.js',
  output: {
    filename: 'app.bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpack({
      template: './index.html', // index.html을 기본 템플릿으로 반영할 수 있도록 설정
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'post-css-loader'],
      },
      {
        test: /\.png$/,
        loader: 'file-loader',
        options: {
          publicPath: './dist/',
          name: '[name].[ext]?[hash]',
        },
      },
      {
        test: /\.json$/,
        loader: 'file-loader',
        options: {
          publicPath: './dist/',
          name: '[name].[ext]?[hash]',
        },
      },
    ],
  },
};
