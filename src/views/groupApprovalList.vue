<template>
    <section class="container">
        <Table ref="table" :colums="tableColums" dataUrl="/news/groupApprovalList">
            <template slot="operating" slot-scope="scoped">
                <el-button
                    v-if="scoped.operating.row.status"
                    size="mini"
                    type="text"
                    @click="handleDetail(scoped)">详情</el-button>
                <el-button
                    v-else
                    size="mini"
                    type="primary"
                    @click="handleDetail(scoped)">审核</el-button>
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
                        { label: '提交时间', prop: 'submiteTime',},
                        { label: '客户名称', prop: 'userName',},
                        { label: 'AS号', prop: 'asNumber',},
                        { label: '设备', prop: 'device', },
                        { label: 'as-path', prop: 'asPath', showOverflowTooltip: true },
                        { label: 'prefix', prop: 'prefix', showOverflowTooltip: true },
                        { label: '状态', prop: 'status', formatter: function (cellValue){ var filter = { "0": '待审核', "1": '审核通过', "2": "审核未通过" };return filter[cellValue] } },
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
                            { label: '配置', prop: 'config', showOverflowTooltip: true },
                        ]
                    },
                    dataUrl: '/news/groupApprovaldevicelList'
                },
                
            }
        },
        methods: {
            handleDetail (scope){
                this.dialogTableVisible = true;
                this.dialogInfo.asPath = scope.operating.row.asPath;
                this.dialogInfo.prefix = scope.operating.row.prefix;
                this.dialogInfo.approvalCustormName = scope.operating.row.userName;
                this.dialogInfo.approvalASNumber = scope.operating.row.asNumber;
                this.dialogInfo.approvalSubmitTime = scope.operating.row.submiteTime;
                this.dialogInfo.status = scope.operating.row.status ? false : true;
                this.dialogInfo.colums.template = scope.operating.row.status == 1 ? true : false;
            },
            handleClose (done){
                done()
            },
            handledeliveryConfiguration(data){
                this.$router.push({path: '/NetXpert/deliveryList'})
            },
            handleGenerateConfiguration(data){
                const h = this.$createElement;
                const deviceName = data.operating.row.deviceName;
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
                    ])
                });
            },
            handleExaminationPassed(){
                this.$message({
                    message: '操作成功',
                    type: 'success'
                });
                this.dialogTableVisible = false;
                this.$refs.table.getDableData();
            },
            handleAuditNotPassed(){
                this.$message({
                    message: '操作成功',
                    type: 'success'
                });
                this.dialogTableVisible = false;
                this.$refs.table.getDableData();
            }

        },
        components: {
            Table,
            ApprovalDialog
        }
    }
</script>
<style lang="scss">
</style>
