const globby = require('globby')
const fs = require('fs-extra')
const path = require('path')
const ejs = require('ejs')
const chalk = require('chalk');
const execa = require('execa')

const writeFileTree = require('./utils/writeFileTree')
const sortObject = require('./utils/sortObject')
const executeCommand = require('./utils/executeCommand')
const toType = value => value === null ? 'Null' : {}.toString.call(value).slice(8, -1);
const isObject = value => toType(value) === 'Object'

const PACKAGE_MANAGER_CONFIG = {
    npm: {
      install: ['install', '--loglevel', 'error'],
      add: ['install', '--loglevel', 'error'],
      upgrade: ['update', '--loglevel', 'error'],
      remove: ['uninstall', '--loglevel', 'error']
    },
    yarn: {
      install: [],
      add: ['add'],
      upgrade: ['upgrade'],
      remove: ['remove']
    }
}

class Generator {
    constructor(pkg, context) {
        this.context = context
        this.pkg = pkg
        this.tmplDirs = [];
        this.files = {}
    }

    extendPackage(fields) {
        for (const key in fields) {
            const value = fields[key]
            const existing = this.pkg[key]
            if (isObject(value) && isObject(existing)) {
                this.pkg[key] = Object.assign(existing, value)
            } else {
                this.pkg[key] = value
            }
        }
    }

    async generate() {
        await this.injectFiles();
        this.sortPkg();
        this.files['package.json'] = JSON.stringify(this.pkg, null, 2) + '\n'
        await writeFileTree(this.context, this.files)
    }

    sortPkg() {
        this.pkg.dependencies = sortObject(this.pkg.dependencies)
        this.pkg.devDependencies = sortObject(this.pkg.devDependencies)
        this.pkg.scripts = sortObject(this.pkg.scripts, [
            'dev',
            'build',
            'test:unit',
            'test:e2e',
            'lint',
            'deploy',
        ])
        this.pkg = sortObject(this.pkg, [
            'name',
            'version',
            'private',
            'description',
            'author',
            'scripts',
            'husky',
            'lint-staged',
            'main',
            'module',
            'browser',
            'jsDelivr',
            'unpkg',
            'files',
            'dependencies',
            'devDependencies',
            'peerDependencies',
            'vue',
            'babel',
            'eslintConfig',
            'prettier',
            'postcss',
            'browserslist',
            'jest',
        ])
    }

    async injectFiles() {
        for (const obj of this.tmplDirs) {
            const paths = await globby(['**/*'], { cwd: obj.path, dot: true })
            paths.forEach(rawPath => {
                const content = fs.readFileSync(path.resolve(obj.path, rawPath), 'utf-8')
                this.files[rawPath] = ejs.render(content, obj.data || {})
            })
        }
    }

    /**
     * 注入模板文件目录
     * @param {*} dir 
     */
    injectTmplDir(dir) {
        this.tmplDirs.push(dir)
    }

    async downloadDependency(command) {
        const prevNodeEnv = process.env.NODE_ENV
        // In the use case of Vue CLI, when installing dependencies,
        // the `NODE_ENV` environment variable does no good;
        // it only confuses users by skipping dev deps (when set to `production`).
        delete process.env.NODE_ENV
        console.log(`\n# ${chalk.greenBright('Installing project dependencies...')}`)
        console.log('\n# ===========================\n')
        await executeCommand(command, PACKAGE_MANAGER_CONFIG[command].install, this.context)
        if (prevNodeEnv) {
            process.env.NODE_ENV = prevNodeEnv
        }
        console.log(`${chalk.bgGreenBright('DONE')} ${chalk.greenBright('依赖下载完成! 执行下列命令开始开发：')}\n`)
        console.log(`$ ${chalk.blue(`cd ${this.pkg.name}`)}`)
        console.log(`$ ${chalk.blue(`${command === 'yarn' ? 'yarn dev' : 'npm run dev'}`)}\n`)
    }
}

module.exports = Generator