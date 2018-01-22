<template lang="html">
    <section class="tags-box">
        <h2 class="section-title">Tags</h2>
        <div class="tag-input-box">
            <AutoComplete
                :items="tags"
            />
        </div>
        <div class="tags shub-active">
            <Tag
                class="shub-tag-in-modal"
                v-for="tag in tags" :key="tag"
                :name="tag"
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
    },
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
