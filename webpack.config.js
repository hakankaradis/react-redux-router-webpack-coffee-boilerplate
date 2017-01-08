webpack = require('webpack');
fs = require('fs');
path = require('path');
ProgressBarPlugin = require('progress-bar-webpack-plugin');
WebpackNotifierPlugin = require('webpack-notifier');

CLIENT_PATH = path.join(__dirname, 'lib');
BUILD_PATH  = path.join(__dirname, 'public');

__PROD__ = process.env.NODE_ENV === 'production'

moduleDirectories = fs.readdirSync(CLIENT_PATH)
  .map(function(item) {
    return path.join(CLIENT_PATH, item);
  })
  .filter(function(item) {
    return fs.statSync(item).isDirectory();
  });

var webpackConfig = {
  context: CLIENT_PATH,
  entry: [
    './'
  ],
  output: {
    path: BUILD_PATH,
    filename: 'bundle.js'
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  resolve: {
    root: CLIENT_PATH,
    moduleDirectories: moduleDirectories,
    extensions: ['', '.coffee', '.js', '.styl', '.json']
  },
  module: {
    loaders: [{
      test: /\.coffee$/,
      include: CLIENT_PATH,
      loaders: ['coffee', 'cjsx']
    }, {
      test: /\.styl$/,
      include: CLIENT_PATH,
      loaders: [
        'style',
        'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
        'stylus'
      ]
    }, {
      test: /\.(png|jpg|gif|woff|otf)/,
      loader: 'url',
      query: {
        limit: 8192,
        name: '[path][name].[ext]'
      }
    }, {
      test: /\.ttf$/,
      loader: 'file',
      query: { mimetype: 'application/x-font-ttf' }
    }, {
      test: /\.eot$/,
      loader: 'file',
      query: { mimetype: 'application/octet-stream' }
    }, {
      test: /\.svg$/,
      loader: 'file',
      query: { mimetype: 'image/svg+xml' }
    }, {
      test: /\.json$/,
      loader: 'json',
      include: CLIENT_PATH
    }]
  },
  plugins: [
    new ProgressBarPlugin({ format: ' client: [:bar] :percent ', width: 1024 })
  ],
  node: {
    child_process: 'empty',
    fs: 'empty'
  }
}

if (__PROD__) {
  webpackConfig.plugins.push(
    new webpack.DefinePlugin({
      'process.env': { 'NODE_ENV': JSON.stringify('production') }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: { keep_fnames: true },
      compress: {
        unused: true,
        dead_code: true,
        warnings: no
      }
    })
  );
} else {
  webpackConfig.watch = true;
  webpackConfig.debug = true;
  webpackConfig.plugins.push(
    new WebpackNotifierPlugin({ title: 'react-redux-router-webpack-coffee-boilerplate', alwaysNotify: true })
  );
}

module.exports = webpackConfig;
