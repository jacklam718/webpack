let webpackConfig;
switch (process.env.NODE_ENV) {
  case 'production':
    webpackConfig = require('./scripts/webpack.prod');
    break;
  default:
    webpackConfig = require('./scripts/webpack.dev');
    break;
}
module.exports = webpackConfig;
