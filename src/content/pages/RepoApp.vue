<template>
    <div id="starhub-repo-app">
        <TagBox :tags="tags" />
        <div v-dom-portal class="modal" v-show="false">hello-world</div>
    </div>
</template>

<script>
import TagBox from '@/content/components/TagBox.vue'

export default {
    name: 'App',
    data() {
        return {
            tags: ['fff', 'xxx']
        }
    },
    components: {
        TagBox,
    },
}
</script>

<style lang="less" scoped>
#starhub-repo-app {
    padding: 20px 0;
}

.modal {
    @h: 400px;
    @w: 300px;
    z-index: 999;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -(@h/2);
    margin-left: -(@w/2);
    height: @h;
    width: @w;
    background: #ccc;
}
</style>
