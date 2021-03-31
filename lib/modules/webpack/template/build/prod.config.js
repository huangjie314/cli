const merge = require('webpack-merge');
const base = require('./base.config');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const extraPlugins = [];
if (process.env.npm_config_report) {
  const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
  extraPlugins.push(new BundleAnalyzerPlugin())
}

module.exports = merge(base, {
  mode: "production",
  output: {
		filename: 'js/[name].[contenthash:8].bundle.js',
	},
  optimization: {
    minimize: true,
    minimizer: [
      //js压缩
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
     
    ],
  },
  plugins: [
    new CssMinimizerPlugin(),
    ...extraPlugins,
    new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash:8].css'
		})
  ]
})