<template lang="html">
    <div class="shub-tag">{{name}}</div>
</template>

<script>
export default {
    name: 'Tag',
    props: {
        name: String,
    }
}
</script>

<style lang="less">
.shub-tag {
    box-sizing: content-box;
    margin-right: 8px;
    padding: 0 10px;
    min-width: 20px;
    height: 20px;
    line-height: 20px;
    background: #f1f8ff;
    border: solid 1px #c8e1ff;
    border-radius: 3px;
    font-size: 12px;
    text-align: center;
    white-space: nowrap;
    word-wrap: break-word;
    color: #1988e0;

    &:hover {
        background-color: #ddeeff;
    }
}
</style>
