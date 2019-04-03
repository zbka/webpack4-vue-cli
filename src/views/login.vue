<template>
    <div v-on:keyup.enter="submitForm" class="login_block" style="height: 100%;">
            <div class="header_bar">
                欢迎登录自服务平台
            </div>
            <div class="login_content">
                <div class="content">
                    <!-- <div class="content-header">
                        <h3>
                            客户自服务系统
                        </h3>                                                                                                   
                    </div> -->
                    <div class="content-main">
                        <h5>账户密码登录</h5>
                        <el-form :model="formData" status-icon :rules="formRuls" ref="loginRuleForm" class="demo-ruleForm">
                            <el-form-item prop="user">
                                <span class="icon_wrap">
                                    <svg class="icon" aria-hidden="true">
                                        <use xlink:href="#icon-yonghu"></use>
                                    </svg>
                                </span>
                                <el-input type="text" placeholder="用户名" v-model="formData.user" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item :error="passWorldError"  prop="pass">
                                <span class="icon_wrap">
                                    <svg class="icon" aria-hidden="true">
                                        <use xlink:href="#icon-webicon204"></use>
                                    </svg>
                                </span>
                                <el-input type="password" placeholder="密码" v-model="formData.pass" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button style="width: 100%;" :loading="isFormSubmit" type="primary" size="small" @click="submitForm">登 录</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </div>
    </div>
</template>
<script>
    import axios from 'axios'
    export default {
        data (){
            var checkUser = (rule, value, callback) => {
                if(!value){
                    return callback(new Error('用户名不能为空'))
                }
                callback()
            }
            var checkPass = (rule, value, callback) => {
                if(!value){
                    return callback(new Error('密码不能为空'))
                }
                return callback()
            }
            return {
                passWorldError: '',
                isFormSubmit: false,
                loginLoading: false,
                formRuls: {
                    user: [
                        { validator: checkUser, trigger: 'change' }
                    ],
                    pass : [
                        { validator: checkPass, trigger: 'change' },
                        { validator: checkPass, trigger: 'submit' },
                    ]
                },
                formData: {
                    user: '',
                    pass: ''
                }
            }
        },
        methods: {
            submitForm (){
                this.$refs.loginRuleForm.validate((vali) => {
                    if(!vali){
                        return false;
                    }
                    if(vali && this.formData.pass == "123456"){
                        sessionStorage.setItem("loginStatus", true);
                        this.$router.push({path: '/NetXpert/businessApplication'});
                    }else{
                        if(this.passWorldError !== ""){
                            this.passWorldError='';
                        }
                        this.$nextTick(() => {
                            this.passWorldError='密码错误'
                        })
                    }
                })
            }
        }
    }
</script>
<style lang="scss">
    .content{
        width: 340px;
    }
    .header_bar{
        color: #ccc;
        font-size: 12px;
        line-height: 40px;
        background: rgba(0,0,0,0.2);
        padding: 0 50px;
    }
    .login_block{
        background: url('./img/bg.65a8e66.jpg') no-repeat;
        background-size: 100% 100%;
    }
    .login_content{
        background: #FFF;
        border-radius: 5px;
        width: 340px;
        top: 20%;
        position: absolute;
        right: 0;
        // top: 0;
        // bottom: 0;
        left: 0;
        margin: auto;
        padding: 5px 30px;
    }
    .content-main{
        h5{
            font-size: 16px;
            text-align: center;
            line-height: 30px;
        }
        .el-form-item{
            margin-bottom: 28px;
        }
    }
    .el-form-item__content .icon_wrap{
        position: absolute;
        z-index: 10;
        left: 10px;
        line-height: 50px;
    }
    .login_block .el-input input{
        padding-left: 35px;
    }
    .icon {
        width: 1.7em;
        height: 1.7em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }
</style>


