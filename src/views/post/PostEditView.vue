<template>
    <section>
        <div class="columns">
            <div class="column is-full">
                <el-card class="box-card" shadow="never">
                    <div slot="header" class="clearfix">
                        <span><i class="fa fa fa-book"> 主题 / 更新主题</i></span>
                    </div>
                    <div>
                        <el-form :model="post" ref="post" class="demo-post">
                            <el-form-item prop="title">
                                <el-input v-model="post.title" placeholder="输入新的主题名称"></el-input>
                            </el-form-item>

                            <!--Markdown-->
                            <div id="vditor"></div>

                            <b-taginput v-model="tags" class="my-3" maxlength="15" maxtags="3" ellipsis
                                placeholder="请输入主题标签，限制为 15 个字符和 3 个标签" />
                            <el-form-item class="mt-3">
                                <el-button type="primary" @click="handleUpdate()">更新
                                </el-button>
                                <el-button @click="resetObj('post')">重置</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-card>
            </div>
        </div>
    </section>
</template>

<script>
import { getPostDetail, updatePost } from "@/api/post";
import Vditor from "vditor";
import "vditor/dist/index.css";

export default {
    name: "PostEditView",
    components: {},
    data() {
        return {
            post: {},
            tags: [],
        };
    },
    created() {
        this.fetchPost();
    },
    methods: {
        renderMarkdown(content) {
            this.contentEditor = new Vditor("vditor", {
                height: 460,
                placeholder: "输入要更新的内容",
                preview: {
                    hljs: { style: "monokai" },
                },
                // 分屏预览模式
                mode: "sv",
                after: () => {
                    this.contentEditor.setValue(content);
                },
            });
        },
        fetchPost() {
            getPostDetail(this.$route.params.id).then((value) => {
                this.post = value.data.post;
                this.tags = value.data.tags.map(tag => tag.name);
                this.renderMarkdown(this.post.content);
            });
        },
        handleUpdate: function () {
            this.post.content = this.contentEditor.getValue();
            updatePost(this.post).then((response) => {
                const { data } = response;
                console.log(data);
                setTimeout(() => {
                    this.$router.push({
                        name: "post-detail",
                        params: { id: data.id },
                    });
                }, 800);
            });
        },

        resetObj(objName) {
            this.$refs[objName].resetFields();
            this.contentEditor.setValue("");
            this.tags = "";
        },
    },
};
</script>

<style>
.vditor-reset pre>code {
    font-size: 100%;
}
</style>