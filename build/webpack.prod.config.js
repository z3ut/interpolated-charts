var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.config.js');
var vendorsPath = path.resolve('./node_modules');

module.exports = merge(baseWebpackConfig, {
  rules: [
    {
      test: /\.css$/,
      exclude: [/demo/]
    }
  ],
  entry: {
    'index': './src/index.js',
    'index.min': './src/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    library: ['interpolated-charts'],
    libraryTarget: 'umd'
  },
  externals: {
    d3: 'd3'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\min\.js$/,
      minimize: true
    })
  ],
  resolve: {
    alias: {
      d3: vendorsPath + '/d3'
    }
  }
})
