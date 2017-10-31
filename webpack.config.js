const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: './src/js/main.js',
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: 'main.js'
  },
  resolve: {
    extensions: ['.js', '.css', '.styl', '.svg']
  },
  module: {
    loaders: [
      {
        test: /\.js$/, // include .js files
        enforce: "pre", // preload the jshint loader
        exclude: /node_modules/, // exclude any and all files in the node_modules folder
        use: [
          {
            loader: "jshint-loader"
          }
        ]
      }, {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015','babel-preset-minify']
        },
      }, {
        test: /\.styl/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'stylus-loader'],
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('../css/site.css'),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.site\.min\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true
    })
  ],
  stats: {
    colors: true
  },
  devtool: 'source-map',
  watch: true,
};
