const fs = require('fs-extra')
const path = require('path')
const ejs = require('ejs')
const globby = require('globby')
module.exports = function(generator, answers = {}) {
    generator.extendPackage({
        scripts: {
            "test": "echo \"Error: no test specified\" && exit 1",
            "dev": "cross-env NODE_ENV=development webpack-dev-server --config build/dev.config.js",
            "build": "cross-env NODE_ENV=production webpack --config build/prod.config.js"
        },
        devDependencies: {
            "clean-webpack-plugin": "^3.0.0",
            "less": "^4.1.1",
            "less-loader": "^8.0.0",
            "css-loader": "^5.0.2",
            "css-minimizer-webpack-plugin": "^1.2.0",
            "file-loader": "^6.2.0",
            "url-loader": "^4.1.1",
            "html-webpack-plugin": "^5.3.1",
            "style-loader": "^2.0.0",
            "webpack": "^5.25.0",
            "webpack-cli": "^3.3.12",
            "webpackbar": "^5.0.0-3",
            "webpack-dev-server": "^3.11.2",
            "webpack-merge": "^4.2.1",
            "webpack-bundle-analyzer": "^4.4.0",
            "less-loader": "^8.0.0",
            "mini-css-extract-plugin": "^1.3.9",
            "postcss-loader": "^5.2.0",
            "postcss-preset-env": "^6.7.0",
            "postcss-px-to-viewport": "^1.1.1",
            "terser-webpack-plugin": "^5.1.1",
            "cross-env": "^7.0.3"
        },
    })
    generator.injectTmplDir(
        {
            path: path.resolve(__dirname, './template'),
            data:  {
                useBabel: answers.features.includes('babel'),
                useTs: answers.features.includes('typescript'),
                lintOnSave: answers.lintOn.includes('save')
            }
        }
    )
}