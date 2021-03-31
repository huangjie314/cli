const path = require('path')
const globby = require('globby')
const webpack = require('webpack')
const WebpackBar = require('webpackbar');
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const resolve = filePath => path.resolve(__dirname, filePath);

const cdn_scripts = {
	development: [
		'https://cdn.jsdelivr.net/npm/vue/dist/vue.js'
	],
	production: [
		'https://cdn.jsdelivr.net/npm/vue'
	]
}

const MpagesConfig = () => {
	const entry = {};
	const htmlPlugin = [];
	const paths = globby.sync(['**/*.@(js|ts)', '**/*.tsx'], { cwd: resolve('../src/pages/'), dot: true })
	for (const rawPath of paths) {
		const pageName = rawPath.match(/(.*)\/.+\.(js|tsx?)$/)[1];
		entry[pageName] = `./${rawPath}`;
		htmlPlugin.push(new HtmlWebpackPlugin({
			template: resolve('../public/index.html'),
			filename: `${pageName}.html`,
			// favicon: './favicon.ico',
			title: pageName,
			inject: true,
			hash: true,
			chunks: ['vendor', pageName],
			showErrors: true,
			minify: process.env.NODE_ENV === "development" ? false : {
			    removeComments: true, //移除HTML中的注释
			    collapseWhitespace: true, //折叠空白区域 也就是压缩代码
			    removeAttributeQuotes: true, //去除属性引用
			},
			cdnScripts: cdn_scripts[process.env.NODE_ENV] || []
		}));
	}
	return {
		entry,
		htmlPlugin
	}
}
const { entry, htmlPlugin } = MpagesConfig();

module.exports = {
	context: resolve('../src/pages'),
	entry: entry,
	output: {
		filename: 'js/[name].[chunkhash:8].bundle.js',
		path: resolve('../dist'),
		libraryTarget: 'umd',
        libraryExport: 'default'
	},
	resolve: {
		extensions: ['.js', '.vue', '.json', '*.ts'],
		alias: {
			'@': resolve('../src'),
			'@assets': resolve('../assets'),
            '@lib': resolve('../lib')
		}
	},
	externals: {
		// jquery: 'jQuery',
		vue: 'Vue',
	},
	module: {
		rules: [
			<%_ if (lintOnSave) { _%>
			{
				enforce: 'pre',
				test: /\.(js|vue)$/,
				loader: 'eslint-loader',
				exclude: /node_modules/
			},
			<%_ } _%>
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				exclude: /node_modules/,
			}, 
			<%_ if (useBabel) { _%>
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			<%_ } _%>
			<%_ if (useTs) { _%>
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				exclude: /node_modules/
			},
			<%_ } _%>
			{
				test: /\.css$/,
				use: [
					process.env.NODE_ENV !== 'production'
						? 'style-loader'
						: MiniCssExtractPlugin.loader,
					"css-loader",
					"postcss-loader",
				],
				exclude: /node_modules/
			},
			{
				test: /\.less$/,
				use: [
					process.env.NODE_ENV !== 'production'
						? 'style-loader'
						: MiniCssExtractPlugin.loader,
					"css-loader",
					"postcss-loader",
					"less-loader"
				],
				exclude: /node_modules/
			},
			{
				test: /\.(png|svg|jpg|gif|ico)$/,
				use: [{
					loader: 'file-loader',
					options: {
						esModule: false,
					},
				}],
			}
		]
	},

	plugins: [
		new WebpackBar(),
		new VueLoaderPlugin(),
		new CleanWebpackPlugin(),
		...htmlPlugin,
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
		})
	],
	optimization: {
		splitChunks: {
			chunks: 'all',
		}
	}
}