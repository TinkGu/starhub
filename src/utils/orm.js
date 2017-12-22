const store = ({
    repoNextId: 1,
    'repos.1.name': 'fj-pipe',
    'repos.1.tags': [1, 2],
    tags: [1],
    tagNextId: 1,
    'tags.1.name': 'fp',
    'tags.1.repos': [1],
    tagIdCount: 0,
})

function TagModel() {
    const get = getModelEntities({
        name: 'tag',
        fields: {
            name: '',
            tags: [],
        }
    })
}

function getTags(ids) {
    return
}

function getModelEntities(model) {
    const fields = Object.keys(model.fields)
    return ids => x => ids.map(id => {
        const instance = {}
        fields.forEach(fl => {
            instance[fl] = x[`${model.name}s.${id}.${fl}`]
        })
        return instance
    })
}
