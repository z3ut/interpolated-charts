var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.config.js');

module.exports = merge(baseWebpackConfig, {
  entry: {
    'index': './src/index.js',
    'index.min': './src/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  externals: {
    d3: 'd3'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\min\.js$/,
      minimize: true
    }),
  ]
})
