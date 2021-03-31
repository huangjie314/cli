module.exports = (api) => {
    api.injectFeature({
        name: 'TypeScript',
        value: 'typescript',
        description: 'Add support for the TypeScript language',
        link: 'https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-typescript'
    })
}
