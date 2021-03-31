const execa = require('execa')
const path = require('path')

module.exports = function executeCommand(command, args, cwd) {
    return new Promise((resolve, reject) => {
        const childProcess = execa(command, args, {
            cwd: cwd,
            stdio: ['inherit', 'pipe', 'inherit']
        })
        childProcess.stdout.on('data', buffer => {
            process.stdout.write(buffer)
        })

        childProcess.on('close', code => {
            if (code !== 0) {
                reject(new Error(`${command} execute failed`))
                return;
            }
            resolve();
        })
    })
}