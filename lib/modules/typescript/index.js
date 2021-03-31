const path = require('path')

module.exports = function(generator, answers) {
    generator.extendPackage({
        dependencies: {
            "vue-class-component": "^7.2.6",
            "vue-property-decorator": "^9.1.2"
        },
        devDependencies: {
            "ts-loader": "^8.0.18",
            "typescript": "^4.2.3",
            "@babel/plugin-proposal-decorators": "^7.13.5",
            "@babel/plugin-proposal-class-properties": "^7.13.0",
        },
    })
    generator.injectTmplDir(
        {
            path: path.resolve(__dirname, './template'),
            data: {}
        }
    )
}