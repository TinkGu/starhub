<template>
    <div id="starhub-repo-app">
        <TagBox :tags="tags" />
        <div v-dom-portal class="shub-tag-modal">
            <TagModal :tags="tags" :desc="'我们一家人'" />
        </div>
    </div>
</template>

<script>
import TagBox from '@/content/components/TagBox'
import TagModal from '@/content/components/TagModal'

export default {
    name: 'App',
    data() {
        return {
            tags: ['browser', 'Node', 'gta', 'angular', 'React', 'app']
        }
    },
    components: {
        TagBox,
        TagModal,
    },
}
</script>

<style lang="less" scoped>
@import "~@/content/style/mixin.less";

#starhub-repo-app {
    padding: 20px 0;
}

.shub-tag-modal {
    @h: 200px;
    @w: 300px;
    z-index: 999;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -(@h/2);
    margin-left: -(@w/2);
    min-height: @h;
    width: @w;
    background: #fff;
    border-radius: 2px;
    border: solid 1px #ebebeb;
}
</style>
