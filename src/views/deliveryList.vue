<template>
    <section class="container">
        <Table :colums="tableColums" dataUrl="/news/groupApprovalList">
            <template slot="status" slot-scope="scoped">
                <span :class="statusColor(scoped)">{{scoped.config.row.status == 0 ? '下发失败' : scoped.config.row.status == 1 ? '下发成功' : '下发中'}}</span>
            </template>
            <template slot="operating" slot-scope="scoped">
                <el-button
                    size="mini"
                    type="text"
                    @click="handleDetail(scoped)">详情</el-button>
            </template>
        </Table>
        <ApprovalDialog 
            :dialogTableVisible="dialogTableVisible"
            :approvalCustormName="dialogInfo.approvalCustormName"
            :approvalASNumber="dialogInfo.approvalASNumber"
            :approvalSubmitTime="dialogInfo.approvalSubmitTime"
            :asPath="dialogInfo.asPath"
            :prefix="dialogInfo.prefix"
            :colums="dialogInfo.colums"
            :dataUrl="dialogInfo.dataUrl"
            :status="dialogInfo.status"
            @dialogClose="handleClose"
            @deliveryConfiguration="handledeliveryConfiguration"
            @generateConfiguration="handleGenerateConfiguration"
            @examinationPassed="handleExaminationPassed"
            @auditNotPassed="handleAuditNotPassed"
        >
        </ApprovalDialog>
    </section>
</template>
<script>
    import Table from '../component/Table.vue'
    import ApprovalDialog from '../component/approvalDialog.vue'
    export default {
        data (){
            return {
                tableColums: {
                    template: true,
                    prop: [
                        { label: 'ID', prop: 'ID', },
                        { label: '下发时间', prop: 'submiteTime',},
                        { label: '客户名称', prop: 'userName',},
                        { label: 'AS号', prop: 'asNumber',},
                        { label: '设备', prop: 'device', },
                        { label: 'as-path', prop: 'asPath', showOverflowTooltip: true },
                        { label: 'prefix', prop: 'prefix', showOverflowTooltip: true },
                        { label: '状态', prop: 'status', formatter: function (cellValue){ var filter = { "0": '下发中', "1": '下发成功', "2": "下发失败" };return filter[cellValue] } },
                        { label: '执行时间', prop: 'executionTime',},
                    ]
                },
                dialogTableVisible: false,
                dialogInfo: {
                    approvalCustormName: '',
                    approvalASNumber: '',
                    approvalSubmitTime: '',
                    asPath: '',
                    prefix: '',
                    status: false,
                    colums: {
                        template: false,
                        prop: [
                            { label: '设备名称', prop: 'deviceName' },
                            { label: '设备IP', prop: 'deviceIp' },
                            { label: '配置', prop: 'config' },
                        ]
                    },
                    dataUrl: '/news/groupApprovaldevicelList'
                },
                
            }
        },
        methods: {
            handleDetail(scope){
                this.dialogTableVisible = true;
                this.dialogInfo.asPath = scope.operating.row.asPath;
                this.dialogInfo.prefix = scope.operating.row.prefix;
                this.dialogInfo.approvalCustormName = scope.operating.row.userName;
                this.dialogInfo.approvalASNumber = scope.operating.row.asNumber;
                this.dialogInfo.approvalSubmitTime = scope.operating.row.submiteTime;
            },
            handleClose(done){
                done()
            }

        },
        computed:{
            statusColor (){
                return function (row){
                    return {
                        failed: row.config.row.status == 0 ? true : false,
                        successed: row.config.row.status == 1 ? true : false,
                        processing: row.config.row.status == 2 ? true : false
                    }
                }
            }
        },
        components: {
            Table,
            ApprovalDialog
        }
    }
</script>
<style lang="scss">
    .failed{
        color: red;
    }
    .successed{
        color: #00FF99;
    }
    .processing{
        color: #00CCFF;
    }
</style>
