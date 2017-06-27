var path = require('path');
var webpack = require('webpack');

console.log(path.resolve(__dirname, 'src/js'));
module.exports = {
  entry: './src/js/main.js',
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: 'main.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
        presets: ['babili','es2015']
      }
    }]
  },
  stats: {
    colors: true
  },
  devtool: 'source-map'
};
