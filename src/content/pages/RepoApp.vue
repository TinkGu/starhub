<template>
    <div id="starhub-repo-app">
        <TagBox :tags="tags" >
            <div class="shub-add-tag-btn" @click="openModal">
                <AddIcon class="shub-add-icon" />
            </div>
        </TagBox>
        <div v-dom-portal class="shub-tag-modal" v-show="isEditing">
            <TagModal
                v-if="isEditing"
                :tags="tags"
                :desc="'我们一家人'"
                :on-close="() => toggleModal(false)"
            />
        </div>
    </div>
</template>

<script>
import TagBox from '@/content/components/TagBox'
import TagModal from '@/content/components/TagModal'
import AddIcon from '@/../static/svg/add.svg'

export default {
    name: 'App',
    data() {
        return {
            isEditing: false,
            tags: ['browser', 'Node', 'gta', 'angular', 'React', 'app'],
            toggleModal: (flag) => {
                this.isEditing = flag
            }
        }
    },
    components: {
        TagBox,
        TagModal,
        AddIcon,
    },
    methods: {
        openModal() {
            this.toggleModal(true)
        },
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
    border-radius: 4px;
    border: solid 1px #ebebeb;
}

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
</style>
