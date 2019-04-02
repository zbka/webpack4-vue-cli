<template>
    <section class="container">
        <div style="background: #fff" class="table-wrap" v-loading="tableLoading">
            <el-table :data="tableData" style="width: 100%" @sort-change="handleSortChange">
                <el-table-column align="center" label="业务ID" prop="ID">
                </el-table-column>
                <el-table-column align="center" label="提交时间" prop="submissionTime" sortable="custom">
                </el-table-column>
                <el-table-column align="center" label="客户名称" prop="name">
                </el-table-column>
                <el-table-column align="center" label="AS号" prop="ASnmber">
                </el-table-column>
                <el-table-column align="center" label="设备" prop="device">
                </el-table-column>
                <el-table-column align="center" label="as-path" prop="asPath">
                </el-table-column>
                <el-table-column align="center" label="prefix" prop="prefix">
                </el-table-column>
                <el-table-column align="center" label="状态" prop="status">
                </el-table-column>
                <el-table-column align="center" label="执行时间" prop="executionTime" sortable>
                </el-table-column>
                <el-table-column align="center" label="详细" prop="detailed">
                </el-table-column>
            </el-table>
            <div class="block">
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="1"
                :page-sizes="[10, 20, 30, 50]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="tableTotal">
                </el-pagination>
            </div>
        </div>

    </section>
</template>
<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                tableLoading: false,
                tableData: [
                    { ID: '1',submissionTime: '2019 03-08',name: 'fwef',ASnmber: '123',device: 'fwef',asPath: 'wefwefwef',prefix: 'wef',status: 'ae',executionTime: '2019 12-12',detailed: 'awef' },
                    { ID: '1',submissionTime: '2019 03-08',name: 'fwef',ASnmber: '123',device: 'fwef',asPath: 'wefwefwef',prefix: 'wef',status: 'ae',executionTime: '2019 12-12',detailed: 'awef' },
                    { ID: '1',submissionTime: '2019 03-08',name: 'fwef',ASnmber: '123',device: 'fwef',asPath: 'wefwefwef',prefix: 'wef',status: 'ae',executionTime: '2019 12-12',detailed: 'awef' },
                    { ID: '1',submissionTime: '2019 03-08',name: 'fwef',ASnmber: '123',device: 'fwef',asPath: 'wefwefwef',prefix: 'wef',status: 'ae',executionTime: '2019 12-12',detailed: 'awef' },
                    { ID: '1',submissionTime: '2019 03-08',name: 'fwef',ASnmber: '123',device: 'fwef',asPath: 'wefwefwef',prefix: 'wef',status: 'ae',executionTime: '2019 12-12',detailed: 'awef' },
                ],
                tableConfig: {
                    pageSize: 10,
                    currentPange: 1,
                    order: []
                },
                tableTotal: 40
            }
        },
        methods: {
            handleSizeChange (pageSize){
                this.tableConfig.pageSize = pageSize;
                this.getDableData(this.tableConfig)
            },
            handleCurrentChange (currentPange){
                this.tableConfig.currentPange = currentPange;
                this.getDableData(this.tableConfig)
            },
            handleSortChange (params){
                this.tableConfig.order = [params.prop, params.order]
                this.getDableData(this.tableConfig)
            },
            getDableData (tableConfig){
                this.tableLoading = true;
                axios.post('/news/index',tableConfig).then((res) => {
                    this.tableLoading = false;
                    // console.log(res);
                })
            }

        },
        mounted () {
            this.getDableData(this.tableConfig);
        }
    }
</script>
<style lang="scss">
    .container{
        line-height: 1;
        .el-pagination{
            text-align: right;
            padding: 8px 15px;
        }
    }
    
</style>