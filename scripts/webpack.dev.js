const webpack = require('webpack');
const merge = require('webpack-merge');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const common = require('./webpack.common.js');

const SERVER_PORT = 5000;

module.exports = merge(common.webpack, {
  entry: {
    app: [
      'babel-polyfill',
      'react-hot-loader/patch',
      `webpack-hot-middleware/client?http://localhost:${SERVER_PORT}`,
      'webpack/hot/only-dev-server',
      common.src,
    ]
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: false,
    port: SERVER_PORT,
    hot: true,
    inline: true,
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development'),
      },
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new OpenBrowserPlugin({ url: `http://localhost:${SERVER_PORT}` }),
    new FriendlyErrorsPlugin(),
  ],
});
