require('babel-core/register')
require('babel-polyfill')
require('dotenv').load()

var path = require('path')
var autoprefixer = require('autoprefixer')
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
var webpack = require('webpack')
var appName = require('../lib').appName

module.exports = {
  context: path.resolve(__dirname, '../frontend'),
  entry: {
    javascript: path.resolve(__dirname, '../frontend/javascripts/index.js'),
    stylesheet: path.resolve(__dirname, '../frontend/stylesheets/index.scss')
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../public/bundles')
  },
  module: {
    resolve: {
      extensions: ['', '.js', '.scss']
    },
    loaders: [
      {
        test: /\.js$/,
        include: /frontend/,
        loader: 'babel',
      },
      {
        test: /\.json$/,
        include: /frontend/,
        loader: 'json',
      },
      {
        test: /\.scss$/,
        include: /frontend/,
        loader: ExtractTextWebpackPlugin.extract('style', 'css!postcss!sass')
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg)(\?.*)?$/,
        include: /frontend/,
        loader: 'url'
      }
    ]
  },
  plugins: [
    new ExtractTextWebpackPlugin('stylesheet.bundle.css', {
      allChunks: true,
      extract: true,
      remove: true
    }),
    new webpack.DefinePlugin({
      ENV: {
        APP_NAME: JSON.stringify(appName),
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        ROOT_URL: JSON.stringify(process.env.ROOT_URL),
        ALGOLIASEARCH_APP_ID: JSON.stringify(process.env.ALGOLIASEARCH_APP_ID),
        ALGOLIASEARCH_API_KEY: JSON.stringify(process.env.ALGOLIASEARCH_API_KEY)
      }
    }),

  ],
  postcss: () => {
    return [autoprefixer({ browsers: ['last 2 versions'] })]
  }
}
