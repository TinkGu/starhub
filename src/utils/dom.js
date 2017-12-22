import h from 'hyperscript'
import hh from 'hyperscript-helpers'

export const hs = hh(h)

const insert = pos => selector => newEl => {
    const el = document.querySelector(selector)
    if (el.parentNode) {
        el.parentNode.insertBefore(newEl, pos === 'before' ? el : el.nextSibling)
    }
    return newEl
}

export const insertBefore = insert('before')
export const insertAfter = insert('after')

export const setClass = className => el => {
    el.classList.add(className)
    return el
}

export const html = htmlString => el => {
    // eslint-disable-next-line no-param-reassign
    el.innerHTML = htmlString
    return el
}
