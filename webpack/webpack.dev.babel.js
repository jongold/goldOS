/**
 * DEVELOPMENT WEBPACK CONFIGURATION
 */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = require('./webpack.base.babel')({
  // Add hot reloading in development
  entry: [
    'webpack-dev-server/client?http://localhost:3000', // Needed for hot reloading
    'webpack/hot/only-dev-server',
    path.join(__dirname, '..', 'app/app.js'), // Start with js/app.js
  ],
  // Load the CSS in a style tag in development
  cssLoaders: 'style-loader!css-loader!cssnext-loader',
  cssnext: {
    features: {
      rem: false,
      pseudoElements: false,
      colorRgba: false,
    },
  },
  // Add hot reloading
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // Tell webpack we want hot reloading
    new HtmlWebpackPlugin({
      template: 'app/index.html',
      inject: true, // Inject all files that are generated by webpack, e.g. bundle.js
    }),
  ],
  // Tell babel that we want to hot-reload
  babelQuery: {
    presets: ['react-hmre'],
  },
  // Emit a source map for easier debugging
  devtool: 'inline-source-map',
});
