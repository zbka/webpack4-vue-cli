<template>
    <el-dialog class="approval_dialog" title="业务审核" :visible.sync="dialogTableVisible" :before-close="handleClose">
        <el-row>
            <el-col :span="24">
                <span class="approval_item_titil">客户名称：</span>
                <span class="approval_item_content">{{approvalCustormName}}</span>
                <span class="approval_item_titil">AS号：</span>
                <span class="approval_item_content">{{approvalASNumber}}</span>
                <span class="approval_item_titil">提交时间：</span>
                <span class="approval_item_content">{{approvalSubmitTime}}</span>
            </el-col>
            <el-col :span="4">
                <span class="approval_item_titil">as-path：</span>
            </el-col>
            <el-col :span="20">
                <span class="approval_item_content">{{asPath}}</span>
            </el-col>
            <el-col :span="4">
                <span class="approval_item_titil">prefix：</span>
            </el-col>
            <el-col :span="20">
                <span class="approval_item_content">{{prefix}}</span>
            </el-col>
        </el-row>
        <el-row>
            <el-col>
                <h4 style="margin: 0;text-align:center;">设备列表</h4>
            </el-col>
        </el-row>
        <Table :colums="colums" :dataUrl="dataUrl">
            <template slot="config" slot-scope="scopeds">
                <el-button
                    @click="hanleAlertNowConfig(scopeds)"
                    size="mini"
                    type="text">
                    当前配置
                </el-button>
            </template>
            <template slot="operating" slot-scope="scoped">
                <el-button
                    size="mini"
                    type="text"
                    @click="handleDeliveryConfiguration(scoped)">下发配置</el-button>
                <el-button
                    size="mini"
                    type="text"
                    @click="handleGenerateConfiguration(scoped)">生成配置</el-button>
            </template>
        </Table>
        <span v-if="status" slot="footer" class="dialog-footer">
            <el-button type="primary" @click="handleExaminationPassed">审核通过</el-button>
            <el-button @click="handleAuditNotPassed">审核不通过</el-button>
        </span>
    </el-dialog>
</template>
<script>
    import Table from './Table.vue'
    export default {
        props: {
            approvalCustormName: {
                default: ''
            },
            approvalASNumber: {
                default: ''
            },
            approvalSubmitTime: {
                default: ''
            },
            dialogTableVisible: {
                default: false
            },
            asPath: {
                default: ''
            },
            prefix: {
                default: ''
            },
            colums: {
                default: {}
            },
            status: {
                default: false
            },
            dataUrl: {
                default: ''
            }
        },
        data (){
            return {
            }
        },
        methods: {
            handleDeliveryConfiguration(data){
                this.$emit('deliveryConfiguration',data)
            },
            handleGenerateConfiguration(data){
                this.$emit('generateConfiguration',data)
            },
            handleExaminationPassed(){
                this.$emit('examinationPassed')
            },
            handleAuditNotPassed(){
                this.$emit('auditNotPassed')
            },
            hanleAlertNowConfig(rows){
                const h = this.$createElement;
                const deviceName = rows.config.row.deviceName;
                const style = 'max-height:' + window.screen.availHeight*0.7 + 'px;' + 'overflow: auto;text-align:center;'
                this.$msgbox({
                    title: deviceName + '当前配置',
                    message: h('p', {style:style},[
                        h('p', null, 'sfewf'),
                        h('p', null, 'afewf'),
                        h('p', null, 'afewf'),
                        h('p', null, 'afewf'),
                        h('p', null, 'afewf'),
                        h('p', null, 'afewf'),
                        h('p', null, 'afewf'),
                        h('p', null, 'afewf'),
                        h('p', null, 'afewf'),
                        h('p', null, 'afewf'),
                        h('p', null, 'afewf'),
                        h('p', null, 'afewf'),
                        h('p', null, 'afewf'),
                        h('p', null, 'afewf'),
                        h('p', null, 'afewf'),
                        h('p', null, 'afewf'),
                        h('p', null, 'afewf'),
                        h('p', null, 'afewf'),
                        h('p', null, 'afewf'),
                        h('p', null, 'afewf'),
                        h('p', null, 'afewf'),
                        h('p', null, 'afewf'),
                        h('p', null, 'afewf'),
                        h('p', null, 'afewf'),
                        h('p', null, 'afewf'),
                        h('p', null, 'afewf'),
                        h('p', null, 'afewf'),
                        h('p', null, 'afewf'),
                        h('p', null, 'afewf'),
                        h('p', null, 'afewf'),
                        h('p', null, 'afewf'),
                        h('p', null, 'afewf'),
                        h('p', null, 'afewf'),
                        h('p', null, 'afewf'),
                        h('p', null, 'afewf'),
                        h('p', null, 'afewf'),
                        h('p', null, 'afewf'),
                        h('p', null, 'afewf'),
                        h('p', null, 'afewf'),
                        h('p', null, 'afewf'),
                        h('p', null, 'afewf'),
                        h('p', null, 'afewf'),
                        h('p', null, 'afewf'),
                    ])
                })
            },
            handleClose(done){
                this.$emit('dialogClose', done)
            }

        },
        components: {
            Table
        }
    }
</script>
<style lang="scss">
    // .el-message-box{
    //     max-height: 80%;
    // }
    .approval_dialog{
        .el-col{
            padding: 10px 0;
        }
        text-align: left;
        .approval_item_titil{
            color: rgba(0,0,0,0.9)
        }
        .approval_item_content{
            margin-right: 20px;
        }
        .el-dialog__body{
            padding: 0 20px 30px;
        }
    }
</style>
