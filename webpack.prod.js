require('dotenv').config();
const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const { merge } = require('webpack-merge');
const { commonConfig } = require('./webpack.common');

const prodConfig = merge(commonConfig, {
	name: 'prod',
	entry: '/src/index.js',
	mode: 'production',
});

module.exports = prodConfig;
