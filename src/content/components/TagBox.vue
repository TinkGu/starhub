<template lang="html">
    <div class="shub-tagbox container">
        <Tag v-for="tag in tags" :key="tag.id" :tag="tag" />
        <slot></slot>
    </div>
</template>

<script>
import Tag from './Tag'

export default {
    name: 'TagBox',
    props: {
        tags: Array,
    },
    components: {
        Tag,
    }
}
</script>

<style lang="less" scoped>
.shub-tagbox {
    display: flex;
    padding-bottom: 4px;
}

</style>
