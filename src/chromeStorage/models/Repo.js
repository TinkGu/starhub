export default function Repo(store) {
    const schema = store.createSchema({
        name: 'repo',
        properties: {
            name: {
                type: 'string',
                required: true,
                setIndex: true, // one-to-one,
            },
            desc: {
                type: 'string',
            },
            tags: store.relationship.hasMany('tag'),
        },
    })

    return schema
}
