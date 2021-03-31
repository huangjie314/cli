const path = require('path')

module.exports = function(generator, answers = {}) {
    generator.extendPackage({
        dependencies: {
            vue: '^2.6.12',
        },
        devDependencies: {
            'vue-template-compiler': '^2.6.12',
            'vue-loader': '^15.9.6',
        },
    })
    generator.injectTmplDir(
        {
            path: path.resolve(__dirname, './template'),
            data: {}
        }
    )
}