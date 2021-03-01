require('dotenv').config();
const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const port = process.env.PORT || 1234;

module.exports = {
	entry: path.resolve(__dirname, 'test/index.js'),
	mode: 'development',
	output: {
		charset: true,
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: 'assets/',
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)/i,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react'],
					},
				},
			},
			{
				test: /\.css$/i,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
							modules: {
								localIdentName: '[name]_[local]_[hash:base64:16]',
							},
						},
					},
				],
				include: /\.module\.css$/,
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
				exclude: /\.module\.css$/,
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				use: [{ loader: 'file-loader' }],
			},
		],
	},
	resolve: {
		extensions: ['.msj', '.js', '.json'],
		alias: {
			'@root': path.resolve(__dirname, 'src'),
			'@components': path.resolve(__dirname, 'src/components'),
			'@utils': path.resolve(__dirname, 'src/utils'),
			'@pages': path.resolve(__dirname, 'src/pages'),
		},
	},
	optimization: {},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new Dotenv({
			systemvars: true,
		}),
	],
	devServer: {
		contentBase: path.resolve(__dirname, 'public/'),
		publicPath: '/assets/',
		port: port,
		hotOnly: true,
	},
};
