<template lang="html">
    <section class="desc-box">
        <div class="desc-box-input" v-if="isEditing">
            <textarea
                placeholder="edit description"
                v-model.trim="descInput"
                v-focus="isEditing"
            >
            </textarea>
            <div class="desc-btn-group">
                <div class="desc-save-btn" @click="onSave">save</div>
                <div class="desc-cancel-btn" @click="onCancel">cancel</div>
            </div>
        </div>

        <div
            class="desc-box-placeholder"
            v-else-if="!desc"
            @click="onEdit"
        >
            <TextIcon class="text-icon" />
            <div>Edit Description</div>
        </div>

        <div class="desc-box-text" @click="onEdit" v-else>
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
import { focus } from 'vue-focus'
import TextIcon from '@/../static/svg/left-alignment.svg'

export default {
    name: 'DescBox',
    components: {
        TextIcon,
    },
    directives: { focus },
    props: {
        desc: {
            type: String,
            default: '',
        },
        updateRepo: Function,
    },
    data() {
        return {
            isEditing: false,
            descInput: this.desc,
        }
    },
    methods: {
        onEdit() {
            this.isEditing = true
        },
        onCancel() {
            this.isEditing = false
        },
        async onSave() {
            if (this.descInput.trim() === '') {
                return
            }

            await this.updateRepo({
                desc: this.descInput,
            })
            this.isEditing = false
        },
    }
}
</script>

<style lang="less" scoped>
@import "~@/content/style/variables.less";
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
    color: @text-base;
    cursor: pointer;
}

.desc-btn-group {
    display: flex;
    justify-content: space-between;
}

.desc-save-btn, .desc-cancel-btn {
    padding-left: 3px;
    width: 50px;
    font-size: 14px;
    cursor: pointer;

    &:hover {
        color: @text-dark;
        text-shadow: 1px 0px 2px #ccc;
    }
}
</style>
