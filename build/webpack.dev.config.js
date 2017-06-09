var path = require('path');
var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.config.js');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(baseWebpackConfig, {
  entry: [
    'babel-polyfill',
    './demo/index.js'
  ],
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '../demo/build'),
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './demo/index.html',
      baseUrl: '/'
    })
  ]
})
