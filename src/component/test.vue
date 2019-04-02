<template>
    <div style="background: #fff" class="table-wrap" v-loading="tableLoading">
        <el-table :data="tableData" style="width: 100%" @sort-change="handleSortChange">
            <el-table-column
             align="center"
             :label="item.label"
             :prop="item.prop"
             :sortable="item.sortable || false"
             :width="item.width || ''"
             v-for="(item, index) in colums" :key="item.prop || index">
            </el-table-column>
        </el-table>
        <div v-if="tableTotal ? true : false" class="block">
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
</template>
<script>
    import axios from 'axios'
    export default {
        props: {
            tableConfig: {
                default: {
                    pageSize: 10,
                    currentPange: 1,
                    order: []
                }
            },
            colums: {
                default: []
            },
            dataUrl: {
                default: '/news/groupApprovalList'
            }
        },
        data() {
            return {
                tableLoading: false,
                tableTotal: 0,
                tableData: [],
            }
        },
        methods: {
            handleSizeChange (pageSize){
                this.tableConfig.pageSize = pageSize;
            },
            handleCurrentChange (currentPange){
                this.tableConfig.currentPange = currentPange;
                this.getDableData()
            },
            handleSortChange (params){
                this.tableConfig.order = [params.prop, params.order]
                this.getDableData()
            },
            getDableData (){
                this.tableLoading = true;
                axios.post(this.dataUrl,this.tableConfig).then((res) => {
                    console.log(res.data)
                    this.tableLoading = false;
                    this.tableTotal = res.data.total;
                    this.tableData = [{
                            ID: 1,
                            submiteTime: "2002-08-27 21:20",
                            }];
                    // console.log(res);
                })
            }

        },
        mounted () {
            this.getDableData()
        }
    }
</script>