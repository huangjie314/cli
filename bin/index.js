#!/usr/bin/env node
const commander = require('commander')
const pkg = require('../package.json')
const bootstrap = require('../lib/bootstrap')

commander
    .version(pkg.version, '-v, --version')
    .usage('<command> [options]')
commander
.version('0.1.0')
.command('create <app-name>')
.description('create a new project powered by t8t-cli')
.action((name) => {
    bootstrap(name)
})

commander.parse(process.argv)