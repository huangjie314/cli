const path = require('path')

module.exports = function(generator, answers) {
    generator.extendPackage({
        dependencies: {
            'core-js': '^3.8.3',
        },
        devDependencies: {
            '@babel/core': '^7.12.13',
            '@babel/preset-env': '^7.12.13',
            'babel-loader': '^8.2.2',
        },
    })
    generator.injectTmplDir(
        {
            path: path.resolve(__dirname, './template'),
            data: {
                useTs: answers.features.includes('typescript')
            }
        }
    )
}