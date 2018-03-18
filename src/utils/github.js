export function getRepoNameFromUrl() {
    const [, author, reponame] = window.location.pathname.split('/')
    if ([author, reponame].includes(undefined)) {
        return null
    }
    return `${author}/${reponame}`
}

export function hasStar() {
    const selector = '[aria-label="Unstar this repository"]'
    return !!document.querySelector(selector)
}
