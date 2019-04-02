<template>
    <el-container>
        <el-aside class="nav_aside" width="200px">
            <div class="logo_wrap">
                <img width="30px" src="./img/logo.svg" alt=""> <span>Element Pro</span>
            </div>
            <el-menu :default-active="$route.path" router class="el-menu-vertical-demo" @select="handleSelect" @open="handleOpen" @close="handleClose"
                background-color="#001529" text-color="#fff" active-text-color="#ffd04b">
                <el-menu-item index="/NetXpert/businessApplication">
                    <i class="el-icon-menu"></i>
                    <span slot="title">业务申请列表</span>
                </el-menu-item>
                <el-menu-item index="/NetXpert/addApplication">
                    <i class="el-icon-edit-outline"></i>
                    <span slot="title">添加申请</span>
                </el-menu-item>
                <el-menu-item index="/NetXpert/groupApprovalList">
                    <i class="el-icon-edit-outline"></i>
                    <span slot="title">集团审批列表</span>
                </el-menu-item>
                <el-menu-item index="/NetXpert/deliveryList">
                    <i class="el-icon-edit-outline"></i>
                    <span slot="title">集团下发列表</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header class="header_nav">
                <div></div>
            </el-header>
            <el-main>
                <div style="overflow-y: auto;position: absolute;left: 0;top: 0;right: 0;bottom: 0;padding: 15px;">
                    <router-view></router-view>
                </div>
            </el-main>
            <!-- <el-footer>Footer</el-footer> -->
        </el-container>
    </el-container>
</template>
<script>
    export default {
        data() {
            return {
            }
        },
        mounted() {
        },
        methods: {

        },
    }
</script>
<style lang="scss">
    html,
    body,
    #app {
        width: 100%;
        height: 100%;
        overflow: auto;
        margin: 0;
    }
    .el-container{
        min-height: 100%;
        .el-main{
            position: relative;
            padding: 15px;
        }
    }
    .el-header,
    .el-footer {
        background-color: #fff;
        color: #333;
        text-align: center;
        line-height: 60px;
    }
    a {
        color: #fff;
        text-decoration: none;
    }
    .is-active a{
        color:rgb(255, 208, 75);
    }
    .header_nav{
        position: relative;
        z-index: 2;
        box-shadow: 0 1px 2px 0 rgba(0,0,0,.25);
    }
    .el-aside {
        background-color: #001529;
        color: #333;
        // text-align: center;
        line-height: 200px;
        .el-menu{
            border-right: 0;
        }
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 160px;
    }

    body>.el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }

    .logo_wrap {
        height: 60px;
        background: #002140;
        line-height: 60px;
        color: #fff;
        font-size: 20px;
        font-weight: 600;

        img {
            vertical-align: middle;
        }

        span {
            vertical-align: middle;
        }
    }
</style>