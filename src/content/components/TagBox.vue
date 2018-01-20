<template lang="html">
    <div class="shub-tagbox container">
        <Tag v-for="tag in tags" :key="tag" :name="tag" />
        <div class="shub-add-tag-btn">
            <AddIcon class="shub-add-icon" />
        </div>
    </div>
</template>

<script>
import AddIcon from '@/../static/svg/add.svg'
import Tag from './Tag.vue'

export default {
    name: 'TagBox',
    props: {
        tags: Array,
    },
    components: {
        Tag,
        AddIcon,
    }
}
</script>

<style lang="less" scoped>
.shub-tagbox {
    display: flex;
    padding-bottom: 4px;

    .shub-add-tag-btn {
        box-sizing: content-box;
        display: flex;
        padding: 0 5px;
        background: #fff;
        border: solid 1px #ccc;
        border-radius: 3px;
        cursor: pointer;
    }

    .shub-add-icon {
        width: 10px;
        height: 100%;
    }
}

</style>
