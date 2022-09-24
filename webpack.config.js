const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'none',
  entry: { main: './js/build/index.js', info: './js/build/infoRender.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].app.js',
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve('./index.html'),
      filename: 'index.html',
      chunks: ['main'],
    }),
    new HTMLWebpackPlugin({
      template: path.resolve('./info.html'),
      filename: 'info.html',
      chunks: ['info'],
    }),
    new HTMLWebpackPlugin({
      template: path.resolve('./error.html'),
      filename: 'error.html',
      chunks: ['info'],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
};
