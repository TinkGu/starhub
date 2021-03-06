const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const CaseSensitivePlugin = require('case-sensitive-paths-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const dirs = require('./dirs')
const { genStaticLoader, genStyleLoaders } = require('./utils')
const vueLoaderConfig = require('./vueConf')

const env = process.env.NODE_ENV.trim()
const { joinToSrc } = dirs

const baseConf = {
    entry: {
        content: joinToSrc('./content'),
        background: joinToSrc('./background'),
        reload: path.join(dirs.rootDir, './build/reload.js')
    },
    output: {
        path: dirs.distDir,
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: '[id].[name].js?[hash]'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': dirs.srcDir
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            genStaticLoader(/\.(png|jpe?g|gif)(\?.*)?$/, 'img'),
            genStaticLoader(/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, 'media'),
            genStaticLoader(/\.(woff2?|eot|ttf|otf)(\?.*)?$/, 'fonts'),
            {
                test: /\.svg$/,
                loader: 'vue-svg-loader',
                options: {
                    // optional [svgo](https://github.com/svg/svgo) options
                    svgo: {
                        plugins: [
                            { removeDoctype: true },
                            { removeComments: true }
                        ]
                    }
                }
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'background',
            filename: 'background.html',
            template: dirs.templatePath,
            inject: true,
            chunksSortMode: 'dependency',
            excludeChunks: env === 'development' ? ['content'] : ['content', 'reload']
        }),
        new ProgressBarPlugin({ clear: false }),
        new CaseSensitivePlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(env),
            __ENV__: JSON.stringify(env)
        })
    ],
    stats: 'errors-only'
}

const devConf = merge(Object.assign({}, baseConf), {
    module: {
        rules: genStyleLoaders({ sourceMap: true })
    },
    // devtool: 'cheap-module-eval-source-map',
    plugins: [new webpack.NoEmitOnErrorsPlugin()]
})

const prodConf = merge(Object.assign({}, baseConf), {
    module: {
        rules: genStyleLoaders({ extract: true })
    },

    plugins: [
        new UglifyJSPlugin({
            uglifyOptions: {
                compress: {
                    warnings: false
                }
            },
            parallel: true, // use multi processes
            sourceMap: false
        }),
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true
            }
        }),
        new ExtractTextPlugin({
            filename: '[name].[contenthash].css',
            allChunks: true
        }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: ({ resource }) =>
                resource &&
                resource.match(/\.(js|jsx)$/) &&
                resource.indexOf(dirs.npmDir) >= 0
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor']
        })
    ]
})

module.exports = env === 'development' ? devConf : prodConf
