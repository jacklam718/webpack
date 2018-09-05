const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const src = path.join(__dirname, '..', 'src');
const dist = path.join(__dirname, '..', 'public');
const joinSrc = filename => path.join(src, filename);
const joinDist = filename => path.join(dist, filename);

const common = {
  src,
  dist,
  joinSrc,
  joinDist,
  webpack: {
    output: {
      filename: '[name].[hash].js',
      path: dist,
      publicPath: '/',
    },
    plugins: [
      new BundleTracker({ filename: './webpack-stats.json' }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: module => (
          // any required modules inside node_modules are extracted to vendor
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.includes(path.join(__dirname, '../node_modules'))
        ),
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        minChunks: Infinity,
      }),
      new HtmlWebpackPlugin({
        template: joinSrc('index.html'),
        filename: joinDist('index.html'),
        inject: 'body',
      }),
    ],
    resolve: {
      extensions: ['.js', '.json', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          loader: 'html-loader',
        },
        {
          test: /\.(xml)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        },
        {
          test: /\.(png|jpe?g|gif|svg|woff|woff2|eot|ttf|otf)$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        },
        {
          test: /\.css$/,
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' },
          ],
        },
        {
          test: /\.scss$/,
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' },
            { loader: 'sass-loader' },
          ],
        },
        {
          test: /\.js(x|)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  'react',
                  'env',
                  'stage-0',
                  'stage-2',
                ],
                plugins: [
                  'lodash',
                  'transform-runtime',
                  'transform-object-rest-spread',
                  'transform-decorators-legacy',
                  'react-hot-loader/babel',
                ],
              },
            },
          ],
        },
      ],
    },
  }
};

module.exports = common;
