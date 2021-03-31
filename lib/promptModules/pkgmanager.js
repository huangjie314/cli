module.exports = (api) => {
    api.injectPrompt({
        name: 'pkgmanager',
        message: 'Pick the package manager to use when installing dependencies:',
        type: 'list',
        choices: [
            {
                name: 'Use NPM',
                value: 'npm',
                short: 'NPM'
            },
            {
                name: 'Use Yarn',
                value: 'yarn',
                short: 'Yarn'
            }
        ],
        filter: function (val) {
            return val.toLowerCase();
        }
    })
}