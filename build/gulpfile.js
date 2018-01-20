const path = require('path')
const gulp = require('gulp')
const gutil = require('gulp-util')
const webpack = require('webpack')
const runSequence = require('run-sequence')
const clean = require('gulp-clean')
const replace = require('gulp-replace')
const jsonfile = require('jsonfile')
const dirs = require('./dirs')
const webpackConfig = require('./webpack.config.js')

const matchDir = _dirs => _dirs.map(x => `${x}/**/*.*`)

// function getManifest() {
//     return JSON.parse(fs.readFileSync('./build/manifest.json', 'utf8'))
// }
//
// function packCrx() {
//     const manifest = getManifest()
//     const name = `${manifest.name}.${manifest.version}`
//     mkdirp('./dist', (err) => {
//         if (err) {
//             throw new gutil.PluginError('build', err)
//         }
//
//         let command = './node_modules/.bin/crx pack ./build -p ./config/extension.pem -o ./dist/'
//         command += `${name}.crx`
//
//         exec(command, (err, stdout, stderr) => {
//             callback()
//         })
//     })
// }

function runWepack(then) {
    const compiler = webpack(webpackConfig)

    compiler.run((err) => {
        if (err) {
            console.err(err)
            throw new gutil.PluginError('webpack-build', err)
        }

        then()
    })
}

// common tasks
gulp.task('static', () => {
    gulp.src(matchDir([dirs.staticDir])).pipe(gulp.dest(dirs.distDir))
})

// producation tasks
gulp.task('build', ['pre-build'], (callback) => {
    // runWepack(packCrx(callback))
})

gulp.task('pre-build', (callback) => {
    runSequence('clean', 'static', callback)
})

gulp.task('clean', () => {
    return gulp.src([dirs.distDir]).pipe(clean())
})

// dev tasks
gulp.task('webpack', (callback) => {
    runWepack(callback)
})

gulp.task('reload', () => {
    gulp
        .src('./reload.html')
        .pipe(replace('__TIMESTAMP__', new Date().getTime().toString()))
        .pipe(gulp.dest(dirs.distDir))
})

gulp.task('manifest', (callback) => {
    // eslint-disable-next-line
    const from = require(dirs.manifestPath)
    const to = path.join(dirs.distDir, 'manifest.json')
    jsonfile.writeFile(to, from, { spaces: 2 }, (err) => {
        if (err) {
            throw new gutil.PluginError('try to create manifest:', err)
        }
        callback()
    })
})

gulp.task('watch-static', [], (callback) => {
    runSequence('static', 'reload', callback)
})

gulp.task('watch-webpack', [], (callback) => {
    runSequence('webpack', 'reload', callback)
})

gulp.task('watch-manifest', [], (callback) => {
    runSequence('manifest', 'reload', callback)
})

gulp.task('pre-dev', [], callback => {
    runSequence('static', 'webpack', 'manifest', 'reload', callback)
})

gulp.task('dev', ['pre-dev'], () => {
    gulp.watch(matchDir([dirs.staticDir]), ['watch-static'])
    gulp.watch(matchDir([dirs.srcDir]), ['watch-webpack'])
    gulp.watch([dirs.manifestPath], ['watch-manifest'])
})

gulp.task('default', ['dev'])
