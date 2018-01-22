<template lang="html">
    <div class="shub-ac">
        <div class="shub-ac-input-group" :class="{'shub-ac-selected': value}">
            <input type="search" class="shub-ac-input"
                v-model="searchText"
                :disabled="disabled"
                @blur="blur" @focus="focus" @input="inputChange"
                @keyup.enter="keyEnter" @keydown.tab="keyEnter"
                @keydown.up="keyUp" @keydown.down="keyDown"
            >
        </div>

        <div class="shub-ac-menu">
            <div v-for="item, i in internalItems"
                class="shub-ac-menu-item"
                :class="{'shub-active': i === cursor}"
                @click="onClickItem(item)"
                @mouseover="cursor = i"
             >
                 <Item :item="item" :searchText="searchText" />
             </div>
        </div>
    </div>
</template>

<script>
import Item from './Item'

export default {
    name: 'Autocomplete',
    components: {
        Item,
    },
    props: {
        value: null,
        items: Array,
        componentItem: {
            default: () => Item,
        },
        wait: {
            type: Number,
            default: 500,
        },
        disabled: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            searchText: '',
            isShowingList: false,
            cursor: -1,
            internalItems: this.items || [],
            waitTimeout: null,
        }
    },
    computed: {
        hasItems() {
            return !!this.internalItems.length
        },
        isExpanding() {
            return this.isShowingList && this.hasItems
        },
    },
    methods: {
        getLabel: item => item,
        inputChange() {
            this.isShowingList = true
            this.cursor = -1
            this.onSelectItem(null, 'inputChange')
            this.waitFor(this.updateItems)
            this.$emit('change', this.searchText)
        },

        waitFor(cb) {
            clearTimeout(this.waitTimeout)
            this.waitTimeout = setTimeout(cb, this.wait)
        },

        updateItems() {
            this.$emit('update-items', this.searchText)
        },

        focus() {
            this.isShowingList = true
        },

        blur() {
            this.$emit('blur', this.searchText)
            setTimeout(() => { this.isShowingList = false }, 200)
        },

        onClickItem(item) {
            this.onSelectItem(item)
            this.$emit('item-clicked', item)
        },

        onSelectItem(item) {
            if (item) {
                this.internalItems = [item]
                this.searchText = this.getLabel(item)
                this.$emit('item-selected', item)
            } else {
                this.setItems(this.items)
            }
            this.$emit('input', item)
        },

        setItems(items) {
            this.internalItems = items || []
        },

        isSelectedValue(value) {
            return (
                this.internalItems.length === 1 && value === this.internalItems[0]
            )
        },

        keyUp() {
            if (this.cursor > -1) {
                this.setCursor(this.cursor - 1)
            }
        },

        keyDown() {
            if (this.cursor < this.internalItems.length) {
                this.setCursor(this.cursor + 1)
            }
        },

        keyEnter() {
            if (this.isShowingList && this.internalItems[this.cursor]) {
                this.onSelectItem(this.internalItems[this.cursor])
                this.isShowingList = false
            }
        },

        setCursor(nextCursor) {
            this.cursor = nextCursor
            this.itemView(
                this.$el.getElementsByClassName('v-autocomplete-list-item')[
                    nextCursor
                ]
            )
        },

        itemView(item) {
            if (item && item.scrollIntoView) {
                item.scrollIntoView(false)
            }
        },
    },
    created() {
        this.onSelectItem(this.value)
    },
    watch: {
        items(newValue) {
            this.setItems(newValue)
        },
        value(newValue) {
            if (!this.isSelectedValue(newValue)) {
                this.onSelectItem(newValue)
                this.searchText = this.getLabel(newValue)
            }
        },
    },
}

</script>

<style lang="less" scoped>
@import "~@/content/style/mixin.less";

.shub-ac {
    position: relative;
}

.shub-ac-menu {
    position: absolute;
    margin-top: 5px;
    margin-left: 4px;
    padding: 10px 0;
    width: 97%;
    border: solid 1px #ebebeb;
    border-radius: 4px;
    background: #f1f8ff;

    .shadow-overlay();

    .shub-ac-menu-item {
        .ellipsis();
        padding: 5px 15px;
        width: 100%;
        background: #f1f8ff;
        font-size: 12px;
        color: #1988e0;
        cursor: pointer;

        &.shub-active {
            background-color: #1988e0;
            color: #fff;
        }
    }
}
</style>
