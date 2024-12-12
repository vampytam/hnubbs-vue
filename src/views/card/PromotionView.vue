<template>
    <el-card class="box-card" shadow="never">
        <div slot="header">
            <span>🥂 推广</span>
        </div>
        <div>
            <p v-for="(item, index) in promotions" :key="index" class="block">
                <a :href="item.link" target="_blank">{{ item.title }}</a>
            </p>
        </div>
    </el-card>
</template>

<script>
import { getAllPromotions } from '@/api/promote'

export default {
    name: 'PromotionView',
    data() {
        return {
            promotions: []
        }
    },
    created() {
        this.fetchAllPromotions()
    },
    methods: {
        fetchAllPromotions() {
            getAllPromotions().then((response) => {
                const { data } = response
                this.promotions = data
            })
        }
    }
}
</script>

<style scoped></style>