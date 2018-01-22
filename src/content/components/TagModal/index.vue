<template lang="html">
    <div id="shub-tag-modal">
        <header class="modal-header">
            <h1 class="repo-name">Spark/Spark</h1>
            <div class="close-model-btn" @click="onClose">
                <CloseIcon class="close-icon" />
            </div>
        </header>

        <DescBox
            :desc="desc"
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
import CloseIcon from '@/../static/svg/close.svg'
import Tag from '../Tag'
import DescBox from './DescBox'

export default {
    name: 'TagModal',
    components: {
        Tag,
        DescBox,
        CloseIcon,
    },
    props: {
        desc: {
            type: String,
            default: '',
        },
        tags: Array,
        onClose: Function,
    },
    data() {
        return {
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
