import pipe from 'fj-pipe'
import * as $ from '@/utils/dom'
import { stget, stset } from '@/utils/storage'
import Tagbox from './Tagbox'

async function main() {
    const repo = getRepoName()
    await stset({
        repoNextId: 1,
        'repos.1.name': repo,
        'repos.1.tags': [1, 2],
        tags: [1],
        tagNextId: 1,
        'tags.1.name': 'fp',
        'tags.1.repos': [1],
        tagIdCount: 0,
    })
    const store = await stget()
    const $tagbox = insertTagsBoxAfter('.repohead-details-container')
    $.html(Tagbox({
        tags: [
            { name: 'fp' },
            { name: '123' }
        ]
    }).outerHTML)($tagbox)
}

function hasStar() {
    const selector = '[aria-label="Unstar this repository"]'
    return !!document.querySelector(selector)
}

function getRepoName() {
    return window.location.pathname.slice(1)
}

function insertTagsBoxAfter(selector) {
    const $target = document.querySelector(selector)
    let $result = null
    if ($target) {
        const $el = document.createElement('div')
        $result = pipe(
            $.setClass('starhub-tags-container'),
            $.insertBefore(selector)
        )($el)
    }

    return $result
}

main()
