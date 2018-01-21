<template lang="html">
    <div id="shub-tag-modal">
        <header class="modal-header">
            <h1 class="repo-name">Spark/Spark</h1>
            <!-- 关闭  -->
        </header>

        <DescBox
            :desc="desc"
            :is-editing="isEditingDesc"
            :on-toggle-edit="toggleEditDesc"
        />

        <section class="tags-box">
            <h2 class="section-title">Tags</h2>
            <input type="text">
            <div class="tags shub-active">
                <Tag
                    class="shub-tag-in-modal"
                    v-for="tag in tags" :key="tag"
                    :name="tag"
                />
            </div>
        </section>
    </div>
</template>

<script>
import Tag from '../Tag'
import DescBox from './DescBox'

export default {
    name: 'TagModal',
    components: {
        Tag,
        DescBox,
    },
    props: {
        desc: {
            type: String,
            default: '',
        },
        tags: Array,
    },
    data() {
        return {
            isEditingDesc: false,
            toggleEditDesc: () => {
                this.isEditingDesc = !this.isEditingDesc
            }
        }
    },
}
</script>

<style lang="less">
#shub-tag-modal {
    padding: 0;
    color: #586069;

    input, textarea {
        width: 100%;
        outline: none;
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

    .repo-name {
        margin: 0;
        padding: 10px 0;
        font-size: 24px;
        font-weight: bold;
    }
}

.tags-box {
    .modal-box();
    margin: 20px 0;
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
