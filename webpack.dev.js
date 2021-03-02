require('dotenv').config();
const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const port = process.env.PORT || 1234;
const { merge } = require('webpack-merge');
const { commonConfig } = require('./webpack.common.js');

const devConfig = merge(commonConfig, {
	name: 'dev',
	entry: '/test/index.js',
	mode: 'development',
	plugins: [new webpack.HotModuleReplacementPlugin(), new Dotenv({ systemvars: true })],
	devServer: {
		contentBase: path.resolve(__dirname, 'public/'),
		publicPath: '/assets/',
		port: port,
		hotOnly: true,
	},
});

module.exports = devConfig;
