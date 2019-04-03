<template>
    <section class="container addApplication">
        <!-- <el-row class="cusstorm_list">
            <el-col :span="12">
                <h5 style="margin: 5px 0 15px;text-align: left;">用户列表</h5>
                <el-tree :highlight-current="true" :data="treeData" accordion :props="defaultProps" @node-click="handleNodeClick"></el-tree>
            </el-col>
            <el-col :span="12">
                <h5 style="margin: 5px 0 15px;text-align: left;">设备列表</h5>
                <div v-show="deviceList">
                    <el-tree :data="DevicetreeData" node-key="id" show-checkbox :default-checked-keys="['all']" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                </div>
            </el-col>
        </el-row> -->
        <el-row class="texarea_wrap">
            <el-col style="text-align: left;padding-bottom: 10px;" :span="24">
                <span class="select_title">客户名称：</span><el-cascader style="margin-right: 10px;" filterable expand-trigger="hover"  size="mini" :options="options" :show-all-levels="false"></el-cascader>
                <span class="select_title">设备名称：</span><el-select size="mini" v-model="value5" multiple placeholder="请选择"><el-option v-for="item in DevicetreeData" :key="item.value" :label="item.label" :value="item.value"></el-option></el-select>
            </el-col>
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
                options: [
                    {value: 1, label: '日本', children: [
                        {value: 2,label: '日本IIJ'},
                        {value: 3,label: '日本CAL'},
                        {value: 3,label: '日本CAL'},
                        {value: 4,label: '日本NTT'},
                        {value: 5,label: '日本Virte'},
                    ]},
                    {value: 1, label: '日本', children: [
                        {value: 2,label: '日本IIJ'},
                        {value: 3,label: '日本CAL'},
                        {value: 3,label: '日本CAL'},
                        {value: 4,label: '日本NTT'},
                        {value: 5,label: '日本Virte'},
                    ]},
                    {value: 1, label: '日本', children: [
                        {value: 2,label: '日本IIJ'},
                        {value: 3,label: '日本CAL'},
                        {value: 3,label: '日本CAL'},
                        {value: 4,label: '日本NTT'},
                        {value: 5,label: '日本Virte'},
                    ]},
                    {value: 1, label: '日本', children: [
                        {value: 2,label: '日本IIJ'},
                        {value: 3,label: '日本CAL'},
                        {value: 3,label: '日本CAL'},
                        {value: 4,label: '日本NTT'},
                        {value: 5,label: '日本Virte'},
                    ]},
                    {value: 1, label: '日本', children: [
                        {value: 2,label: '日本IIJ'},
                        {value: 3,label: '日本CAL'},
                        {value: 3,label: '日本CAL'},
                        {value: 4,label: '日本NTT'},
                        {value: 5,label: '日本Virte'},
                    ]},
                    {value: 1, label: '日本', children: [
                        {value: 2,label: '日本IIJ'},
                        {value: 3,label: '日本CAL'},
                        {value: 3,label: '日本CAL'},
                        {value: 4,label: '日本NTT'},
                        {value: 5,label: '日本Virte'},
                    ]},
                    {value: 1, label: '日本', children: [
                        {value: 2,label: '日本IIJ'},
                        {value: 3,label: '日本CAL'},
                        {value: 3,label: '日本CAL'},
                        {value: 4,label: '日本NTT'},
                        {value: 5,label: '日本Virte'},
                    ]},
                    {value: 1, label: '日本', children: [
                        {value: 2,label: '日本IIJ'},
                        {value: 3,label: '日本CAL'},
                        {value: 3,label: '日本CAL'},
                        {value: 4,label: '日本NTT'},
                        {value: 5,label: '日本Virte'},
                    ]},
                    {value: 1, label: '日本', children: [
                        {value: 2,label: '日本IIJ'},
                        {value: 3,label: '日本CAL'},
                        {value: 3,label: '日本CAL'},
                        {value: 4,label: '日本NTT'},
                        {value: 5,label: '日本Virte'},
                    ]},
                    {value: 1, label: '日本', children: [
                        {value: 2,label: '日本IIJ'},
                        {value: 3,label: '日本CAL'},
                        {value: 3,label: '日本CAL'},
                        {value: 4,label: '日本NTT'},
                        {value: 5,label: '日本Virte'},
                    ]},
                    {value: 1, label: '日本', children: [
                        {value: 2,label: '日本IIJ'},
                        {value: 3,label: '日本CAL'},
                        {value: 3,label: '日本CAL'},
                        {value: 4,label: '日本NTT'},
                        {value: 5,label: '日本Virte'},
                    ]},
                    {value: 1, label: '日本', children: [
                        {value: 2,label: '日本IIJ'},
                        {value: 3,label: '日本CAL'},
                        {value: 3,label: '日本CAL'},
                        {value: 4,label: '日本NTT'},
                        {value: 5,label: '日本Virte'},
                    ]},
                    {value: 1, label: '日本', children: [
                        {value: 2,label: '日本IIJ'},
                        {value: 3,label: '日本CAL'},
                        {value: 3,label: '日本CAL'},
                        {value: 4,label: '日本NTT'},
                        {value: 5,label: '日本Virte'},
                    ]},
                    {value: 7, label: '美国', children: [
                        {value: 8,label: '美国Google'},
                        {value: 9,label: '美国MSN'},
                        {value: 10,label: '美国CCIC'},
                        {value: 11,label: '美国VALVE'},
                    ]},
                    {value: 111, label: '香港', children: [
                        {value: 21,label: '香港ANC'},
                        {value: 31,label: '香港PCCM'},
                        {value: 41,label: '香港REACH'},
                    ]}
                ],
                value5: '',
                currentSelectName: '',
                currentSelecDevice: [],
                DevicetreeData: [
                    {value: 1,label: '北京IIJ'},
                    {value: 2,label: '北京IRJ'},
                    {value: 3,label: '北京IVJ'},
                    {value: 4,label: '北京IVG'},
                    {value: 5,label: '北京IHJ'},
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
                    this.currentSelectName = params.label;
                }
            },
            onSubmit (){
                if(this.currentSelectName == ''){
                    this.$message.error('请选择客户');
                    console.log(this.value5);
                    return;
                }
            }
        }
    }
</script>
<style lang="scss">
    h5{
        font-size: 16px;
    }
    // .texarea_wrap .el-cascader-menu{
    //     height: 400px;
    // }
    .addApplication{
        .el-select__tags{
            flex-wrap: nowrap;
            overflow: hidden;
        }
        .select_title{
            font-size: 14px;
        }
    }
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
