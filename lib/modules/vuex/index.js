module.exports = (generator, answers = {}) => {
    generator.extendPackage({
        dependencies: {
            "vuex:": '^3.6.2',
        }
    })
    generator.injectTmplDir(
        {
            path: require('path').resolve(__dirname, './template'),
            data:  {}
        }
    )
}