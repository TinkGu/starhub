import { createCrxAdapter, createStore } from 'crx-orm'
import Tag from './models/Tag'
import Repo from './models/Repo'

export default createStore({
    adapter: createCrxAdapter(),
    schemas: [
        Tag,
        Repo,
    ],
})
