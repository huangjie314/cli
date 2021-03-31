module.exports = (generator, answers = {}) => {
    generator.extendPackage({
        dependencies: {
            "vue-router": '^3.5.1',
        }
    })
    generator.injectTmplDir(
        {
            path: require('path').resolve(__dirname, './template'),
            data:  {}
        }
    )
}