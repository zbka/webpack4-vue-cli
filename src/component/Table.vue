<template>
    <div style="background: #fff" class="table-wrap" v-loading="tableLoading">
        <el-table :data="tableData" style="width: 100%" @sort-change="handleSortChange">
            <el-table-column
             align="center"
             :label="item.label"
             :prop="item.prop"
             :show-overflow-tooltip="item.showOverflowTooltip || false"
             :formatter="item.formatter || ''"
             :sortable="item.sortable || false"
             :width="item.width || ''"
             v-for="(item, index) in colums.prop" :key="item.prop || index">
                <template slot-scope="scope">
                    <slot :name="item.prop" :config="scope">{{item.formatter ? item.formatter(scope.row[item.prop]) : scope.row[item.prop]}}</slot>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作" v-if="colums.template">
                <template slot-scope="scope">
                    <slot name="operating" :operating="scope"></slot>
                </template>
            </el-table-column>
        </el-table>
        <div v-if="tableTotal < 6 ? false : true" class="block">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="1"
            :page-sizes="[5, 10, 20]"
            :page-size="5"
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
                    pageSize: 5,
                    currentPange: 1,
                    order: []
                }
            },
            colums: {
                default: []
            },
            dataUrl: {
                default: ''
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
                this.getDableData()
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
                    this.tableData = res.data.data;
                    // console.log(res);
                })
            },
            handleEdit (index, row, callBack){
                callBack(index, row);
            }

        },
        mounted () {
            this.getDableData()
            console.log(this)
        }
    }
</script>