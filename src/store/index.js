import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import crs from '../chromeStorage'

Vue.use(Vuex)

const store = new Vuex.Store({
    plugins: [createLogger()],
    state: {
        tags: [],
    },
    mutations: {
        setTags(state, tags) {
            state.tags = tags
        },
        addTag(state, tag) {
            state.tags.push(tag)
        },
    },
    actions: {
        async createTag({ commit }, name) {
            const tag = await crs.models.tag.create({ name })
            commit('addTag', tag)
        },
        async fetchTags({ commit }) {
            const tags = await crs.models.tag.all()
            commit('setTags', tags || [])
        },
        async maybeCreateTag({ commit, state }, tag) {
            if (tag.id === undefined) {
                let finalTag
                const tagExisted = state.tags.find(x => x.name === tag.name.trim())
                if (tagExisted) {
                    finalTag = tagExisted
                } else {
                    finalTag = await crs.models.tag.create({
                        name: tag.name
                    })
                    await commit('addTag', finalTag)
                }
                return finalTag
            } else {
                return tag
            }
        }
    }
})

export default store
