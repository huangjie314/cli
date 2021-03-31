const fs = require('fs-extra')
const path = require('path')

module.exports = function writeFileTree(dir, files) {
    Object.keys(files).forEach(filename => {
        const filePath = path.resolve(dir, filename)
        fs.ensureDirSync(path.dirname(filePath))
        fs.writeFileSync(filePath, files[filename])
    })
}