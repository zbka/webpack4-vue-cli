<template>
    <section class="container">
        <div style="background: #fff" class="table-wrap" v-loading="tableLoading">
            <el-table :data="tableData" style="width: 100%" @sort-change="handleSortChange">
                <el-table-column align="center" label="业务ID" prop="ID">
                </el-table-column>
                <el-table-column align="center" label="提交时间" prop="submiteTime" sortable="custom">
                </el-table-column>
                <el-table-column align="center" label="客户名称" prop="userName">
                </el-table-column>
                <el-table-column align="center" label="AS号" prop="asNumber">
                </el-table-column>
                <el-table-column align="center" label="设备" prop="device">
                </el-table-column>
                <el-table-column align="center" label="as-path" :showOverflowTooltip="true" prop="asPath">
                </el-table-column>
                <el-table-column align="center" label="prefix" :showOverflowTooltip="true" prop="prefix">
                </el-table-column>
                <el-table-column align="center" label="状态" prop="status">
                    <template slot-scope="scope">
                        <span :class="statusColor(scope.row.status)">{{scope.row.status == 0 ? '失败' : '成功'}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="执行时间" prop="executionTime" sortable>
                </el-table-column>
                <!-- <el-table-column align="center" label="操作" prop="detailed">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
                    </template>
                </el-table-column> -->
            </el-table>
            <div class="block">
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="1"
                :page-sizes="[5, 10, 20]"
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
                tableData: [],
                tableConfig: {
                    pageSize: 5,
                    currentPange: 1,
                    order: []
                },
                tableTotal: 40
            }
        },
        methods: {
            statusColor (value){
                return {
                    failed: value == 0 ? true : false,
                    successed: value == 0 ? false : true
                }
            },
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
                axios.post('/news/groupApprovalList',tableConfig).then((res) => {
                    this.tableLoading = false;
                    this.tableData = res.data.data;
                    this.tableTotal= res.data.total;
                })
            }

        },
        mounted () {
            console.log(this)
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