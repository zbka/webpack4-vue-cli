<template>
    <section class="container">
        <el-row class="cusstorm_list">
            <el-col :span="12">
                <h5 style="margin: 5px 0 15px;text-align: left;">用户列表</h5>
                <el-tree :data="treeData" accordion :props="defaultProps" @node-click="handleNodeClick"></el-tree>
            </el-col>
            <el-col :span="12">
                <h5 style="margin: 5px 0 15px;text-align: left;">设备列表</h5>
                <div v-show="deviceList">
                    <el-tree :data="DevicetreeData" node-key="id" show-checkbox :default-checked-keys="['all']" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                </div>
            </el-col>
        </el-row>
        <el-row class="texarea_wrap">
            <el-col :span="24">
                <el-form ref="form" label-position="top" :model="form" label-width="80px">
                    <el-form-item label="as-path">
                        <el-input :autosize="autosize" type="textarea" v-model="form.asPath"></el-input>
                    </el-form-item>
                    <el-form-item label="prefix">
                        <el-input :autosize="autosize" type="textarea" v-model="form.prefix"></el-input>
                    </el-form-item>
                    <el-form-item class="button_wrap">
                        <el-button size="small" type="primary" :loading="createLoading" @click="onSubmit">立即创建</el-button>
                        <el-button size="small">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="24">
            </el-col>
        </el-row>
    </section>
</template>
<script>
    export default {
        data (){
            return {
                treeData: [
                    {id: 1, label: '日本', children: [
                        {label: '日本IIJ'},
                        {label: '日本CAL'},
                        {label: '日本NTT'},
                        {label: '日本Virte'},
                    ]},
                    {id: 2, label: '美国', children: [
                        {label: '美国Google'},
                        {label: '美国MSN'},
                        {label: '美国CCIC'},
                        {label: '美国VALVE'},
                    ]},
                    {id: 3, label: '香港', children: [
                        {label: '香港ANC'},
                        {label: '香港PCCM'},
                        {label: '香港REACH'},
                    ]}
                ],
                DevicetreeData: [
                    {label: '全部设备', id: 'all',  children: [
                        {label: '北京IIJ'},
                        {label: '北京IRJ'},
                        {label: '北京IVJ'},
                        {label: '北京IVG'},
                        {label: '北京IHJ'},
                    ]}
                    
                ],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                createLoading: false,
                autosize: { minRows: 3, maxRows: 6 },
                form: {
                    asPath: '',
                    prefix: ''
                },
                deviceList: false
            }
        },
        methods: {
            handleNodeClick (params,node){
                if (node.childNodes.length == 0){
                    this.deviceList = true;
                }
            }
        }
    }
</script>
<style lang="scss">
    .cusstorm_list{
        background: #fff;
        padding: 10px 16px;
    }
    .container form{
        text-align: left;
    }
    .texarea_wrap{
        background: #fff;
        padding: 0 20px;
        padding-top: 20px;
    }
    .button_wrap{
        text-align: center;
    }
    .texarea_wrap .el-form-item__label{
        line-height: 16px;
        padding-bottom: 6px;
    }
</style>
