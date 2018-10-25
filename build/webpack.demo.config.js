var path = require('path');
var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.config.js');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  entry: [
    './demo/index.js'
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../docs')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './demo/index.html',
      baseUrl: '/interpolated-charts/'
    })
  ],
  optimization: {
    minimize: true
  },
})

