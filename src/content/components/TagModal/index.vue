<template lang="html">
    <div id="shub-tag-modal">
        <header class="modal-header">
            <h1 class="repo-name">{{repo.name}}</h1>
            <div class="close-model-btn" @click="onClose">
                <CloseIcon class="close-icon" />
            </div>
        </header>

        <DescBox :desc="repo.desc" :update-repo="updateRepo" />
        <TagInputBox
            :tags="tags"
            :repo-tags="repo.tags"
            :on-add-tag="onAddTag"
            :on-delete-tag="onDeleteTag"
        />
    </div>
</template>

<script>
import CloseIcon from '@/../static/svg/close.svg'
import DescBox from './DescBox'
import TagInputBox from './TagInputBox'

export default {
    name: 'TagModal',
    components: {
        CloseIcon,
        DescBox,
        TagInputBox,
    },
    props: {
        repo: {
            type: Object,
            default: {
                name: '',
                desc: '',
                tags: [],
            }
        },
        tags: Array,
        onClose: Function,
        updateRepo: Function,
        onAddTag: Function,
        onDeleteTag: Function,
    },
}
</script>

<style lang="less">
@import "~@/content/style/variables.less";

#shub-tag-modal {
    padding: 0;
    color: @text-light;

    input, textarea {
        width: 100%;
        border: solid 1px @bd-base;
        outline: none;
        font-size: 12px;
        line-height: 24px;
        color: @text-base;
    }

    textarea {
        resize: none;
    }
}
</style>

<style lang="less" scoped>
@import "./tag-modal.less";

.modal-header {
    .modal-box();
    .modal-line();

    display: flex;
    justify-content: space-between;

    .repo-name {
        margin: 0;
        padding: 10px 0;
        font-size: 18px;
    }
}

.close-model-btn {
    display: flex;
    margin-top: 5px;
    height: 15px;
    width: 15px;
    background: #fff;
    border: solid 1px #ccc;
    border-radius: 50%;
    cursor: pointer;
}

.close-icon {
    margin: auto;
    padding: 3px;
    height: 100%;
}
</style>
