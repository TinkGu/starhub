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

        <div class="shub-ac-menu" v-if="isExpanding">
            <div v-for="item, i in internalItems"
                class="shub-ac-menu-item"
                :class="{'shub-active': i === cursor}"
                @click="onClickItem(item)"
                @mouseover="cursor = i"
             >
                 <Item :item="item.name" :searchText="searchText" />
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
        onComplete: Function,
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
        getLabel: item => item.name,
        inputChange() {
            this.isShowingList = true
            this.cursor = -1
            this.internalItems = elasticSearch(this.items, this.searchText)
            this.$emit('input', null)
            this.waitFor(this.updateItems)
            this.$emit('change', this.searchText)
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
            }
            this.$emit('input', item)
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
            // 如果游标未定位，可以直接 onComplete
            if (this.cursor === -1 || !this.isShowingList) {
                this.onComplete({
                    name: this.searchText.trim(),
                })
                this.isShowingList = false
                this.searchText = ''
            }

            // 下拉选项展示中 并且 游标选中了某个选项，就返回当前 item 到输入框
            if (this.isShowingList && this.internalItems[this.cursor]) {
                this.onSelectItem(this.internalItems[this.cursor])
                this.isShowingList = false
            }
        },

        // ------------ internal methods ------------

        updateItems() {
            this.$emit('update-items', this.searchText)
        },

        setItems(items) {
            this.internalItems = items || []
        },

        setCursor(nextCursor) {
            this.cursor = nextCursor
            this.itemView(
                this.$el.getElementsByClassName('v-autocomplete-list-item')[
                    nextCursor
                ]
            )
        },

        isSelectedValue(value) {
            return (
                this.internalItems.length === 1 && value === this.internalItems[0]
            )
        },

        itemView(el) {
            if (el && el.scrollIntoView) {
                el.scrollIntoView(false)
            }
        },

        waitFor(cb) {
            clearTimeout(this.waitTimeout)
            this.waitTimeout = setTimeout(cb, this.wait)
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

function elasticSearch(list, input) {
    if (!input) { return list }
    return list.filter(x => typeof x.name === 'string' && x.name.includes(input))
        .reduce((res, x) => {
            // 排序：以 input 开头的优先
            if (x.name.startsWith(input)) {
                return [x].concat(res)
            } else {
                return res.concat(x)
            }
        }, [])
}

</script>

<style lang="less" scoped>
@import "~@/content/style/mixin.less";
@import "~@/content/style/variables.less";

.shub-ac {
    position: relative;
}

.shub-ac-menu {
    position: absolute;
    margin-top: 5px;
    margin-left: 4px;
    padding: 10px 0;
    width: 97%;
    border-radius: 4px;
    background: @primary-light;

    .shadow-overlay();

    .shub-ac-menu-item {
        .ellipsis();
        padding: 5px 15px;
        width: 100%;
        background: @primary-light;
        font-size: 12px;
        color: @primary-dark;
        cursor: pointer;
        opacity: 0.8;

        &.shub-active {
            background-color: @primary-dark;
            color: #fff;
        }
    }
}
</style>
