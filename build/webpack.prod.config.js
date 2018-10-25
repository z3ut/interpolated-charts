var path = require('path');
var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.config.js');
var vendorsPath = path.resolve('./node_modules');

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: [/demo/]
      }
    ]
  },
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
  optimization: {
    minimize: true
  },
  resolve: {
    alias: {
      d3: vendorsPath + '/d3'
    }
  }
})
