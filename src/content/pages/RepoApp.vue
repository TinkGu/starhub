<template>
    <div>
        <TagBox :tags="tags" />
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

<style lang="less">
.starhub-repo-app {
    padding: 20px 0;
}
</style>
