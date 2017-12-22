import pify from 'chrome-call'

export const stget = x => {
    if (typeof x === 'function') {
        return pify(chrome.storage.sync, 'get', null).then(st => x(st))
    } else {
        return pify(chrome.storage.sync, 'get', x)
    }
}

export const stset = x => pify(chrome.storage.sync, 'set', x)
