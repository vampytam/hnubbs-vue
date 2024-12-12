<template>
    <el-card class="" shadow="never">
        <div slot="header">
            <span class="has-text-weight-bold">🧐 随便看看</span>
        </div>
        <div>
            <p v-for="(item, index) in recommends" :key="index" :title="item.title" class="block ellipsis is-ellipsis-1">
                <router-link :to="{ name: 'post-detail', params: { id: item.id } }">
                    <span v-if="index < 9" class="tag">
                        0{{ parseInt(index) + 1 }}
                    </span>
                    <span v-else class="tag">
                        {{ parseInt(index) + 1 }}
                    </span>
                    {{ item.title }}
                </router-link>
            </p>
        </div>
    </el-card>
</template>

<script>
import { getRecommendPosts } from '@/api/post'

export default {
    name: 'PostRecommendView',
    props: {
        postId: {
            type: String,
            default: null
        }
    },
    data() {
        return {
            recommends: []
        }
    },
    created() {
        this.fetchRecommendPosts()
    },
    methods: {
        fetchRecommendPosts() {
            getRecommendPosts(this.postId).then(value => {
                const { data } = value
                this.recommends = data
            })
        }
    }
}
</script>

<style scoped></style>