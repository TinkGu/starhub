export default function Tag(store) {
    const schema = store.createSchema({
        name: 'tag',
        properties: {
            name: {
                type: 'string',
                required: true,
                setIndex: true, // one-to-one,
            },
        },
    })

    return schema
}
