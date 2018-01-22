<template lang="html">
    <section class="desc-box">
        <div class="desc-box-input" v-if="isEditing">
            <textarea
                placeholder="edit description"
                v-model.trim="descInput"
            >
            </textarea>
            <div class="desc-save-btn">save</div>
        </div>

        <div
            class="desc-box-placeholder"
            v-else-if="!desc"
            @click="onToggleEdit"
        >
            <TextIcon class="text-icon" />
            <div>Edit Description</div>
        </div>

        <div class="desc-box-text" @click="onToggleEdit" v-else>
            <header class="desc-box-text-header">
                <h2 class="section-title">Description</h2>
                <span class="desc-edit-btn">Edit</span>
            </header>
            <div class="desc-text">
                {{desc}}
            </div>
        </div>
    </section>
</template>

<script>
import TextIcon from '@/../static/svg/left-alignment.svg'

export default {
    name: 'DescBox',
    components: {
        TextIcon,
    },
    props: {
        desc: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            isEditing: false,
            descInput: this.desc,
        }
    },
    methods: {
        onToggleEdit() {
            this.isEditing = !this.isEditing
        }
    }
}
</script>

<style lang="less" scoped>
@import "./tag-modal.less";

.section-title {
    .section-title();
}

.desc-box {
    .modal-box();
    .modal-line();
    padding-top: 10px;
    padding-bottom: 10px;
}

.desc-box-placeholder {
    display: flex;
    align-items: center;
    margin: 5px 0;
    padding: 5px 10px;
    width: 100%;
    background: #edeff0;
    border-radius: 2px;
    color: #838c91;
    cursor: pointer;

    .text-icon {
        margin-right: 10px;
        width: 10px;
        height: 10px;
    }
}

.desc-box-text-header {
    display: flex;
    align-items: center;

    .desc-edit-btn {
        .section-title();
        margin-left: 10px;
        text-decoration: underline;
        font-size: 12px;
        cursor: pointer;
    }
}

.desc-text {
    font-size: 12px;
    cursor: pointer;
}
</style>
