const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge');
const base = require('./base.config');

module.exports = merge(base, {
	mode: "development",
	devServer: {
		contentBase: path.join(__dirname, '../dist'),
		compress: true,
		host:'127.0.0.1',
		port: 9001,
		inline: true,
		open:true,
		hot: true,
		hotOnly: true,
		injectHot: true,
	},
	devtool: 'inline-source-map',
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
})