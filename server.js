const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');

const isProd = process.env.NODE_ENV === 'production';
const publicPath = path.join(config.output.path, config.output.publicPath);
const port = process.env.PORT ? process.env.PORT : 5000;
const app = express();

// page routes
const routes = [
  '/',
  '/profile',
  '/quotation',
  '/quotation/*',
  '/application',
  '/registration',
  '/login',
];

if (!isProd) {
  const compiler = webpack(config);
  app.use(webpackMiddleware(compiler, {
    contentBase: 'src',
  }));
  app.use(webpackHotMiddleware(compiler));
  app.get(routes, function response(req, res, next) {
    compiler.outputFileSystem.readFile(path.join(publicPath, 'index.html'), (err, result) => {
      if (err) {
        return next(err);
      }
      res.set('content-type', 'text/html');
      res.send(result);
      res.end();
    });
  });
} else {
  app.use(express.static(publicPath));
  app.get(routes, function response(req, res) {
    res.sendFile(path.join(publicPath, 'index.html'));
  });
}

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.error(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
