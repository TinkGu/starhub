import Vue from 'vue'
import pipe from 'fj-pipe'
import * as $ from '@/utils/dom'
import App from './RepoApp.vue'

export default function repoApp() {
    const className = 'starhub-tags-container'
    createElement(className)

    return new Vue({
        el: `.${className}`,
        render: h => h(App),
    })
}

function createElement(className) {
    const selector = '.repohead-details-container'
    const $target = document.querySelector(selector)
    let $result = null
    if ($target) {
        const $el = document.createElement('div')
        $result = pipe(
            $.classname(className),
            $.insertBefore(selector)
        )($el)
    }

    return $result
}
