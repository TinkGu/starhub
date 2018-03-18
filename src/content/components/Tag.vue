<template lang="html">
    <div
        class="shub-tag"
        :class="{ 'shub-active': selected }"
        @click="onClick"
    >
        {{tag.name}}
    </div>
</template>

<script>
export default {
    name: 'Tag',
    props: {
        tag: {
            type: Object,
            default: {
                name: '',
            }
        },
        selected: {
            type: Boolean,
            default: false,
        },
        reactive: Boolean,
        onDelete: Function,
        onAdd: Function,
    },
    methods: {
        onClick() {
            if (!this.reactive) {
                return
            }

            if (this.selected && typeof this.onDelete === 'function') {
                return this.onDelete(this.tag)
            }

            if (!this.selected && typeof this.onAdd === 'function') {
                return this.onAdd(this.tag)
            }
        },
    }
}
</script>

<style lang="less">
@import "~@/content/style/variables.less";

.shub-tag {
    box-sizing: content-box;
    margin-right: 8px;
    padding: 0 10px;
    min-width: 20px;
    height: 20px;
    line-height: 20px;
    background: @primary-light;
    border: solid 1px @bd-primary;
    border-radius: 3px;
    font-size: 12px;
    text-align: center;
    white-space: nowrap;
    word-wrap: break-word;
    color: @primary-dark;

    &:hover {
        background-color: @primary-base;
    }

    &.shub-active {
        background-color: @primary-dark;
        color: #fff;
        border: solid 1px @primary-dark;
    }
}
</style>
