const path = require('path');
const webpack = require('webpack');

const ImageminPlugin = require('imagemin-webpack-plugin').default;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const glob = require('glob');

module.exports = {
  mode: 'development',
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
    // FOR JS FILES (PRE)
    // Used to lint js code
		rules: [{
			test: /\.js$/, // include .js files
			enforce: 'pre', // preload the  loader
			exclude: /node_modules/, // exclude any and all files in the node_modules folder
      use: [{
        loader: 'eslint-loader'
      }]
    }, { // FOR JS FILES
			test: /\.js$/,
			loader: 'babel-loader',
			query: {
				presets: ['@babel/preset-env']
			},
    }, { // FOR STYL FILES
      test: /\.styl/,
      use: [{
        loader: 'style-loader',
      }, {
        loader: 'css-loader',
        options: {
          minimize: true,
          url: false,
        }
      }, {
        loader: 'stylus-loader',
        options: {
          preferPathResolver: 'webpack', // Faster
          'resolve url': true,
        }
      }],
    }, {
			test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
			loader: 'file-loader',
		}],
	},

	plugins: [
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
