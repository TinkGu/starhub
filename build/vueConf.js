const utils = require('./utils')

const isProduction = process.env.NODE_ENV === 'production'
const sourceMapEnabled = !isProduction

module.exports = {
    loaders: utils.genStyleLoaders({
        sourceMap: sourceMapEnabled,
        extract: isProduction,
    }),
    cssSourceMap: sourceMapEnabled,
    cacheBusting: true,
    transformToRequire: {
        video: ['src', 'poster'],
        source: 'src',
        img: 'src',
        image: 'xlink:href',
    },
}
