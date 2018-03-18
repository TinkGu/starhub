<template lang="html">
    <section class="tags-box">
        <h2 class="section-title">Tags</h2>
        <div class="tag-input-box">
            <AutoComplete
                :items="tags"
                :on-complete="onAddTag"
            />
        </div>
        <div class="tags">
            <Tag
                class="shub-tag-in-modal"
                v-for="tag in resortedTags"
                :key="tag.id"
                :tag="tag"
                reactive
                :selected="tag.selected"
                :on-delete="onDeleteTag"
                :on-add="onAddTag"
            />
        </div>
    </section>
</template>

<script>
import Tag from '../Tag'
import AutoComplete from '../AutoComplete'

export default {
    name: 'TagInputBox',
    components: {
        Tag,
        AutoComplete,
    },
    props: {
        tags: Array,
        repoTags: Array,
        onAddTag: Function,
        onDeleteTag: Function,
    },
    computed: {
        resortedTags() {
            const resorted = []
            const repoTagsHashMap = {}
            this.repoTags.forEach(x => {
                repoTagsHashMap[x.id] = true
            })

            this.tags.forEach(tag => {
                if (repoTagsHashMap[tag.id]) {
                    resorted.unshift({
                        ...tag,
                        selected: true,
                    })
                } else {
                    resorted.push(tag)
                }
            })
            return resorted
        }
    }
}
</script>

<style lang="less" scoped>
@import "./tag-modal.less";

.section-title {
    .section-title();
}

.tags-box {
    .modal-box();
    margin-top: 10px;
    margin-bottom: 20px;
}

.tags {
    display: flex;
    padding-bottom: 4px;
    flex-wrap: wrap;
}

.shub-tag-in-modal {
    margin-top: 10px;
    cursor: pointer;
}
</style>
