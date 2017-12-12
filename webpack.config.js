const path = require('path');
const webpack = require('webpack');

const MinifyPlugin = require('babel-minify-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const glob = require('glob');

module.exports = {
  entry: './src/js/main.js',
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: 'main.js'
  },
  externals: {
    "jquery": "jQuery" // We declare jQuery as an externa dependency because we add it thru worpdress enqueue
  },
  resolve: {
    extensions: ['.js', '.css', '.styl', '.svg']
  },

  module: {
    loaders: [{
      test: /\.js$/, // include .js files
      enforce: 'pre', // preload the jshint loader
      exclude: /node_modules/, // exclude any and all files in the node_modules folder
      use: [
        {
          loader: 'jshint-loader'
        }
      ]
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015',  'minify']
      },
    }, {
      test: /\.styl/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          options: {
            minimize: true,
          },
        }, {
          loader: 'stylus-loader',
          options: {
            preferPathResolver: 'webpack', // Faster
          },
        }],
      })
    }],
  },

  plugins: [
    new MinifyPlugin({}, {
      comments: false,
    }),
    new ExtractTextPlugin('../css/site.css'),
    // Copy the images folder and optimize all the images
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src/img/'),
        to: path.resolve(__dirname, 'dist/img/'),
      },
    ]),
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      gifsicle:{interlaced: false, optimizationLevel: 1},
      jpegtran:{progressive: false, arithmetic: false},
      optipng:{optimizationLevel: 4, bitDepthReduction: true, colorTypeReduction: true, paletteReduction: true},
      svgo:{plugins: [{cleanupIDs: false}]},
    }),

  ],

  stats: {
    colors: true
  },

  devtool: 'source-map',
  watch: true,
};
