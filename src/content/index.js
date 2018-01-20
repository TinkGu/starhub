// import { stget, stset } from '@/utils/storage'
// import Tagbox from './Tagbox'
import repoApp from './pages/repo'

async function main() {
    // const repo = getRepoName()
    // await stset({
    //     repoNextId: 1,
    //     'repos.1.name': repo,
    //     'repos.1.tags': [1, 2],
    //     tags: [1],
    //     tagNextId: 1,
    //     'tags.1.name': 'fp',
    //     'tags.1.repos': [1],
    //     tagIdCount: 0,
    // })
    // const store = await stget()
    repoApp()

    // $.html(Tagbox.render({
    //     tags: [
    //         { name: 'fp' },
    //         { name: '123' }
    //     ]
    // }).outerHTML)($tagbox)
}

function hasStar() {
    const selector = '[aria-label="Unstar this repository"]'
    return !!document.querySelector(selector)
}

function getRepoName() {
    return window.location.pathname.slice(1)
}

main()
