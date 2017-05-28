var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.config.js');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(baseWebpackConfig, {
  entry: [
    './demo/index.js'
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../docs')
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true
    }),
    new HtmlWebpackPlugin({
      template: './demo/index.html',
      baseUrl: '/interpolated-charts/'
    })
  ]
})

