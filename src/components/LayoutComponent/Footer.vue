<template>
    <footer class="footer has-text-grey-light has-background-grey-darker">
        <div class="container">
            <div class="">
                <span>hnu course work</span>

                <span style="float: right">
                    <router-link :to="{ path: '/admin/login' }">
                        管理员登录
                    </router-link>
                    |
                    <a href="/?lang=zh_CN">中文</a> |
                    <a href="/?lang=en_US">English</a>
                </span>
            </div>

            <div>
                <span>{{ title }} ALL RIGHTS RESERVED</span>
                <div style="float: right">
                    <template>
                        <b-taglist attached>
                            <b-tag type="is-dark" size="is-normal">Design</b-tag>
                            <b-tag type="is-info" size="is-normal">{{ author }}</b-tag>
                        </b-taglist>
                    </template>
                </div>
            </div>
        </div>
        <BackToTop />
    </footer>
</template>

<script>
import BackToTop from "@/components/BackToTop/BackToTop";

export default {
    name: "Footer",
    components: {
        BackToTop
    },
    data() {
        return {
            title: "© " + new Date().getFullYear() + ' hnubbs',
            author: '胡南友',
        };
    },
};
</script>

<style scoped>
footer {
    margin-top: 120px;
    height: 150px;
}

footer a {
    color: #bfbfbf;
}
</style>