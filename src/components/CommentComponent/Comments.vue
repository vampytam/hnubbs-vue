<template>
    <section class="box comments">
        <hr />
        <h3 class="title is-5">Comments</h3>
        <CommentsForm :slug="slug" v-if="token" @loadComments="fetchComments" />

        <CommentsItem v-for="comment in comments" :key="`comment-${comment.id}`" :comment="comment" />
    </section>
</template>

<script>
import { mapGetters } from 'vuex'
import { fetchCommentsByPostId } from '@/api/comment'
import CommentsForm from './CommentsForm'
import CommentsItem from './CommentsItem'

export default {
    name: 'Comments',
    components: {
        CommentsForm,
        CommentsItem
    },
    data() {
        return {
            comments: []
        }
    },
    props: {
        slug: {
            type: String,
            default: null
        }
    },
    computed: {
        ...mapGetters([
            'token'
        ])
    },
    async mounted() {
        await this.fetchComments(this.slug)
    },
    methods: {
        // 初始化
        async fetchComments(postId) {
            console.log(postId)
            fetchCommentsByPostId(postId).then(response => {
                const { data } = response
                this.comments = data
            })
        }
    }
}
</script>