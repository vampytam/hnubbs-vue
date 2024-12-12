<template>
    <div>
        <el-card shadow="never">
            <div slot="header" class="clearfix">
                搜索到 <code>{{ posts.length }}</code>
                条关于 <code class="has-text-info">{{ query.keyword }}</code> 的记录
            </div>
            <div>
                <article v-for="(item, index) in posts" :key="index" class="media">
                    <div class="media-left">
                        <figure class="image is-48x48">
                            <img :src="`https://cn.gravatar.com/avatar/${item.userId}?s=164&d=monsterid`">
                        </figure>
                    </div>
                    <div class="media-content">
                        <div class=""> <!-- FIXME -->
                            <p class="ellipsis is-ellipsis-1">
                                <el-tooltip class="item" effect="dark" :content="item.title" placement="top">
                                    <router-link :to="{ name: 'post-detail', params: { id: item.id } }">
                                        <span class="is-size-6">{{ item.title }}</span>
                                    </router-link>
                                </el-tooltip>
                            </p>
                        </div>
                        <nav class="level has-text-grey is-mobile  is-size-7 mt-2">
                            <div class="level-left">
                                <div class="level-left">
                                    <router-link class="level-item" :to="{ path: `/member/${item.username}/home` }">
                                        {{ item.nickname }}
                                    </router-link>

                                    <span class="mr-1">
                                        发布于:{{ dayjs(item.createTime).format("YYYY/MM/DD") }}
                                    </span>

                                    <span v-for="(tag, index) in item.tags" :key="index"
                                        class="tag is-hidden-mobile is-success is-light mr-1">
                                        <router-link :to="{ name: 'tag', params: { name: tag.name } }">
                                            {{ "#" + tag.name }}
                                        </router-link>
                                    </span>

                                    <span class="is-hidden-mobile">浏览:{{ item.views }}</span>
                                </div>
                            </div>
                        </nav>
                    </div>
                    <div class="media-right" />
                </article>
            </div>

            <!--分页-->
            <Pagination v-show="query.total > 0" :total="query.total" :page.sync="query.pageNo"
                :limit.sync="query.pageSize" @pagination="fetchSearchResult" />
        </el-card>
    </div>
</template>

<script>
import { searchByKeyword } from '@/api/post'
import Pagination from '@/components/PaginationComponent/Pagination'

export default {
    name: 'SearchView',
    components: { Pagination },
    data() {
        return {
            posts: [],
            query: {
                keyword: this.$route.query.key,
                pageNo: 1,
                pageSize: 10,
                total: 0
            }
        }
    },
    created() {
        this.fetchSearchResult()
    },
    methods: {
        fetchSearchResult() {
            searchByKeyword(this.query).then(value => {
                const { data } = value
                this.posts = data.records
                this.query.total = data.total
                this.query.pageSize = data.size
                this.query.pageNum = data.current
            })
        }
    }
}
</script>

<style scoped></style>