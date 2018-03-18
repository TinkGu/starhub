import Vue from 'vue'
import pipe from 'fj-pipe'
import * as $ from '@/utils/dom'
import App from './RepoApp'

export default function repoApp() {
    const id = 'starhub-repo-app'
    const el = createElement(id)
    if (el) {
        return new Vue({
            el: `#${id}`,
            render: h => h(App),
        })
    }
}

function createElement(id) {
    const selector = '.repohead-details-container'
    const $target = document.querySelector(selector)
    let $result = null
    if ($target) {
        const $el = document.createElement('div')
        $result = pipe(
            $.id(id),
            $.insertBefore(selector)
        )($el)
    }

    return $result
}
