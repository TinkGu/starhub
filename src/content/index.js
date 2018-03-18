import Vue from 'vue'
import VuePortal from 'vue-dom-portal'
import AsyncComputed from 'vue-async-computed'
import repoApp from './pages/repo'

Vue.use(VuePortal)
Vue.use(AsyncComputed)

// chrome.storage.local.get(null, (x) => {
//     console.log(x)
// })

// chrome.storage.local.clear()

async function main() {
    repoApp()
}

main()
