const insert = pos => selector => newEl => {
    const el = document.querySelector(selector)
    if (el.parentNode) {
        el.parentNode.insertBefore(newEl, pos === 'before' ? el : el.nextSibling)
    }
    return newEl
}

export const insertBefore = insert('before')
export const insertAfter = insert('after')

export const classname = className => el => {
    el.classList.add(className)
    return el
}

export const id = x => el => {
    el.setAttribute('id', x)
    return el
}

export const setAttribute = attrs => el => {
    Object.keys(attrs).forEach(a => el.setAttribute(a, attrs[a]))
    return el
}

export const html = htmlString => el => {
    // eslint-disable-next-line no-param-reassign
    el.innerHTML = htmlString
    return el
}
