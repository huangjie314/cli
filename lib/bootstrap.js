const path = require('path')
const fs = require('fs-extra')
const chalk = require('chalk');
const inquirer = require('inquirer')
const ora = require('ora');
const clearConsole = require('./utils/clearConsole')
const Prompt = require('./Prompt')
const Generator = require('./Generator');
const { getPromptModules } = require('./utils/createTools')

module.exports = async function bootstrap(name) {
    const targetDir = path.resolve(name)
    if (fs.existsSync(targetDir)) {
        // 如果存在目标目录
        clearConsole()
        const { overwrite } = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'overwrite',
                message: `Target directory ${chalk.cyan(targetDir)} already exists. Is overwrite?`,
            }
        ])
        if (overwrite) {
            const spinner = ora(`Removing ${chalk.cyan(targetDir)}......`).start();
            try {
                await fs.remove(targetDir)
                spinner.succeed('Removed')
            } catch (err) {
                spinner.fail('Remove fail')
            }
        } else {
            return;
        }
    }

    const promptInstance = new Prompt();
    const promptModules = getPromptModules();
    promptModules.forEach(fn => fn(promptInstance))

    clearConsole()
    
    const answers = await inquirer.prompt(promptInstance.getAllPrompts())

    const pkg = {
        name,
        version: '1.0.0',
        scripts: {},
        dependencies: {},
        devDependencies: {},
    }
    const generator = new Generator(pkg, path.resolve(process.cwd(), name))
    answers.features.unshift('vue', 'webpack')
    answers.features.forEach(feature => {
        require(`./modules/${feature}`)(generator, answers)
    })
    console.log('answers ', answers );
    console.log(`✨  Creating project in ${chalk.yellow(targetDir)}.`)
    console.log(`🚀  Invoking generators...`)
    await generator.generate()
    generator.downloadDependency(answers.pkgmanager);
}

