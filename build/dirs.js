const path = require('path')

const rootDir = path.resolve(__dirname, '..')
const srcDir = path.join(rootDir, 'src')
const distDir = path.join(rootDir, 'dist')
const staticDir = path.join(rootDir, 'static')
const npmDir = path.join(rootDir, 'node_modules')
const templatePath = path.resolve(__dirname, 'template.ejs')
const manifestPath = path.join(srcDir, 'manifest.js')

const joinToSrc = dir => path.join(srcDir, dir)
const joinToStatic = _p => path.join(staticDir, _p)

module.exports = {
    rootDir,
    srcDir,
    distDir,
    staticDir,
    npmDir,
    templatePath,
    manifestPath,
    joinToSrc,
    joinToStatic,
}
