const pkg = require('../package.json')

module.exports = {
    name: pkg.name,
    version: pkg.version,
    description: pkg.description,
    author: pkg.author,
    manifest_version: 2,
    icons: { 16: 'icons/16.png', 128: 'icons/128.png' },
    permissions: [
        '*://github.com/*',
        'tabs',
        'storage',
        'unlimitedStorage'
    ],
    background: {
        persistent: false,
        page: 'background.html'
    },
    content_scripts: [
        {
            matches: [
                '*://github.com/*'
            ],
            js: ['content.js'],
            // css: ['inject.css'],
            run_at: 'document_end',
            all_frames: true
        }
    ],
    // content_security_policy: "script-src 'self' 'unsafe-eval'; object-src 'self'",
    web_accessible_resources: ['icons/*.png', 'images/*'],
}
