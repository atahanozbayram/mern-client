require('dotenv').config();
const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const { merge } = require('webpack-merge');
const { commonConfig } = require('./webpack.common');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const prodConfig = merge(commonConfig, {
	name: 'prod',
	entry: '/src/index.js',
	mode: 'production',
	plugins: [
		new HtmlWebpackPlugin({
			template: './public/index.html',
			filename: path.resolve(__dirname, 'dist/index.html'),
			inject: 'body',
		}),
	],
});

module.exports = prodConfig;
