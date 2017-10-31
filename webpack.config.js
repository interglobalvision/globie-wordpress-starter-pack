const path = require('path');
const webpack = require('webpack');
//const ExtractTextPlugin = require('extract-text-webpack-plugin');

console.log(path.resolve(__dirname, 'dist/js'));

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
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015','babel-preset-minify']
        },
      }, {
        test: /\.styl$/,
        loader: 'style-loader!css-loader!stylus-loader',
        exclude: /node_modules/,
      }
    ]
  },
  stats: {
    colors: true
  },
  devtool: 'source-map',
  watch: true,
};
