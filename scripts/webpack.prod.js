const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common.webpack, {
  entry: common.src,
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      },
    }),
    new webpack.HashedModuleIdsPlugin(),
    new CleanWebpackPlugin([
      common.dist,
    ], {
      root: path.resolve(__dirname, '..'),
    }),
    new UglifyJsPlugin({
      sourceMap: false,
      uglifyOptions: {
        output: {
          comments: false,
        },
        compress: {
          warnings: false,
        },
      }
    }),
    new CompressionWebpackPlugin({ test: /.js$/ }),
  ],
});
