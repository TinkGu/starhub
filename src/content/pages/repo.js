import Vue from 'vue'
import VuePortal from 'vue-dom-portal'
import pipe from 'fj-pipe'
import * as $ from '@/utils/dom'
import App from './RepoApp'

Vue.use(VuePortal)

export default function repoApp() {
    const id = 'starhub-repo-app'
    createElement(id)

    return new Vue({
        el: `#${id}`,
        render: h => h(App),
    })
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
