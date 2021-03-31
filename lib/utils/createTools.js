exports.getPromptModules = () => {
    return [
        'babel',
        'typescript',
        'router',
        'vuex',
        'linter',
        'pkgmanager'
    ].map(file => require(`../promptModules/${file}`))
}