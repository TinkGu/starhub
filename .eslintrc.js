module.exports = {
    root: true,
    extends: ['airbnb-base', 'loose-airbnb'],
    env: {
        browser: true,
        node: true,
        jest: true,
        es6: true,
        webextensions: true
    },
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 7,
        ecmaFeatures: {
            classes: true,
            modules: true
        }
    },
    settings: {
        'import/resolver': {
            webpack: {
                config: 'build/webpack.config.js'
            }
        }
    },
    rules: {
        semi: ['warn', 'never'],
        indent: [
            1,
            4,
            {
                SwitchCase: 1
            }
        ],
        'import/no-extraneous-dependencies': ['error', {
            'devDependencies': [
                'build/**',
                'postcss.config.js'
            ]
        }],
    },
    globals: {
        chrome: true
    }
}
