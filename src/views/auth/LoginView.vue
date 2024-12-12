<template>
    <div class="columns py-6">
        <div class="column is-half is-offset-one-quarter">
            <el-card shadow="never">
                <div slot="header" class="has-text-centered has-text-weight-bold">
                    用户登录
                </div>
                <div>
                    <el-form v-loading="loading" :model="loginForm" status-icon :rules="rules" ref="loginForm"
                        label-width="100px" class="demo-ruleForm">
                        <el-form-item label="账号" prop="username">
                            <el-input v-model="loginForm.username"></el-input>
                        </el-form-item>

                        <el-form-item label="密码" prop="password">
                            <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
                        </el-form-item>

                        <el-form-item label="记住" prop="delivery">
                            <el-switch v-model="loginForm.rememberMe"></el-switch>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
                            <el-button @click="resetForm('loginForm')">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
export default {
    name: "LoginView",
    data() {
        return {
            redirect: undefined,
            loading: false,
            loginForm: {
                username: "",
                password: "",
                rememberMe: true,
            },
            rules: {
                username: [
                    { required: true, message: "请输入账号", trigger: "blur" },
                    {
                        min: 2,
                        max: 15,
                        message: "长度在 2 到 15 个字符",
                        trigger: "blur",
                    },
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                    {
                        min: 6,
                        max: 20,
                        message: "长度在 6 到 20 个字符",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.loading = true;
                    this.$store
                        .dispatch("user/login", this.loginForm)
                        .then(() => {
                            this.$message({
                                message: "恭喜你，登录成功",
                                type: "success",
                                duration: 2000,
                            });

                            setTimeout(() => {
                                this.loading = false;
                                this.$router.push({ path: this.redirect || "/" });
                            }, 0.1 * 1000);
                        })
                        .catch(() => {
                            this.loading = false;
                        });
                } else {
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
    },
};
</script>

<style scoped></style>