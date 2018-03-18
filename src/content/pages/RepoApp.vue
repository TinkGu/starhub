<template>
    <div id="starhub-repo-app">
        <TagBox :tags="repo.tags" >
            <div class="shub-add-tag-btn" @click="openModal">
                <AddIcon class="shub-add-icon"/>
            </div>
        </TagBox>
        <div class="container">
            <div class="shub-repo-desc">{{repo.desc}}</div>
        </div>
        <div v-dom-portal class="shub-tag-modal" v-show="isEditing">
            <TagModal
                v-if="isEditing"
                :repo="repo"
                :tags="tags"
                :update-repo="updateRepo"
                :on-close="closeModal"
                :on-add-tag="addTag"
                :on-delete-tag="deleteTag"
            />
        </div>
    </div>
</template>

<script>
import store from '@/store'
import crs from '@/chromeStorage'
import { getRepoNameFromUrl } from '@/utils/github'
import TagBox from '@/content/components/TagBox'
import TagModal from '@/content/components/TagModal'
import AddIcon from '@/../static/svg/add.svg'

export default {
    name: 'RepoApp',
    store,
    data() {
        return {
            repo: {
                name: '',
                desc: '',
                tags: [],
            },
            isEditing: false,
            hasCreated: false,
        }
    },
    computed: {
        tags() {
            return this.$store.state.tags
        }
    },
    components: {
        TagBox,
        TagModal,
        AddIcon,
    },
    // eslint-disable-next-line
    created: async function() {
        this.$store.dispatch('fetchTags')
        const reponame = getRepoNameFromUrl()
        this.repo.name = reponame
        if (reponame) {
            const repo = await crs.models.repo.find({ name: reponame })
            if (repo) {
                this.repo = repo
                this.hasCreated = true
            }
        }
    },
    methods: {
        async openModal() {
            if (!this.hasCreated) {
                this.repo = await crs.models.repo.create({ name: this.repo.name, tags: [] })
            }
            this.isEditing = true
        },
        closeModal() {
            this.isEditing = false
        },
        async updateRepo(setter) {
            await crs.models.repo.update({
                name: this.repo.name,
            }, setter)

            this.repo = {
                ...this.repo,
                ...setter,
            }
        },
        async addTag(tag) {
            const tagDoc = await this.$store.dispatch('maybeCreateTag', tag)
            if (!this.isTagInRepo(tagDoc)) {
                await this.updateRepo({
                    tags: this.repo.tags.concat(tagDoc)
                })
            }
        },
        async deleteTag(tag) {
            if (this.isTagInRepo(tag)) {
                await this.updateRepo({
                    tags: this.repo.tags.filter(x => x.id !== tag.id)
                })
            }
        },
        isTagInRepo(tag) {
            return this.repo.tags.some(x => x.id === tag.id)
        }
    },
}
</script>

<style lang="less" scoped>
@import "~@/content/style/mixin.less";
@import "~@/content/style/variables.less";

#starhub-repo-app {
    padding: 20px 0;
}

.shub-repo-desc {
    margin-top: 10px;
    padding: 0 5px;
    max-width: 600px;
    font-size: 12px;
    color: @text-base;
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
    border: solid 1px @bd-base;
}

.shub-add-tag-btn {
    box-sizing: content-box;
    display: flex;
    padding: 0 5px;
    height: 20px;
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
