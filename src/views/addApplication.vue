<template>
    <section class="container addApplication">
        <el-row class="texarea_wrap">
            <el-col :span="24" style="text-align: left;padding-bottom: 10px;" >
                <el-form :inline="true" :rules="form1Rule" ref="form1" size="small" :model="form1">
                    <el-form-item prop="ASNumber" label="AS号：">
                        <el-input @input="asNumInput" @change="asNumChange" class="asNumber" v-model="form1.ASNumber"></el-input>
                    </el-form-item>
                    <el-form-item prop="clientName" label="客户名称：">
                        <el-cascader v-model="form1.clientName"  filterable expand-trigger="hover"  :options="options" :show-all-levels="false"></el-cascader>
                    </el-form-item>
                    <el-form-item prop="deviceList" label="设备：">
                        <el-select v-model="form1.deviceList"  multiple >
                            <el-option v-for="item in DevicetreeData" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="24">
                <el-form ref="form" :model="form" label-position="top"  label-width="80px">
                    <el-form-item label="as-path">
                        <el-input :autosize="autosize" type="textarea" v-model="form.asPath"></el-input>
                    </el-form-item>
                    <el-form-item label="prefix">
                        <el-input :autosize="autosize" type="textarea" v-model="form.prefix"></el-input>
                    </el-form-item>
                    <el-upload
                        action="/news/upLoad"
                        class="upload"
                        :on-preview="handlePreview"
                        :before-remove="beforeRemove"
                        :limit="1"
                        :on-success="fileUploadSuccess"
                        :on-error="fileUploadFaild"
                        :on-exceed="handleExceed"
                        :file-list="fileList">
                        <el-button size="small" type="text">附件上传</el-button>
                        <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                    </el-upload>
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
            const checkform1IsImpty = (rule, value, callback) => {
                console.log(rule)
                if(value.length == 0){
                    return callback(new Error('不能为空'));
                };
                callback();
            };
            return {
                options: [
                    
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
                form1:{
                    deviceList: [],
                    clientName: [],
                    ASNumber: ''
                },
                form1Rule: {
                    deviceList: { validator: checkform1IsImpty, trigger: 'change' },
                    clientName: { validator: checkform1IsImpty, trigger: 'blur' }
                }
            }
        },
        methods: {
            onSubmit (){
                this.$refs.form1.validate((vali,prop) => {
                    console.log(this.form1.clientName)
                    console.log(vali)
                });
            },
            asNumInput(){
                console.log(this.form1.ASNumber)
                if(this.form1.ASNumber == 23){
                    this.form1.clientName = [7,9]
                }else{
                    this.form1.clientName = []
                }
            },
            asNumChange(){

            },
            fileUploadSuccess(){
                console.log("yes");
            },
            fileUploadFaild(){
                console.log("no");
            }
        }
    }
</script>
<style lang="scss">
    h5{
        font-size: 16px;
    }
    .addApplication{
        .el-select__tags{
            flex-wrap: nowrap;
            overflow: hidden;
        }
        .select_title{
            font-size: 14px;
        }
        .asNumber{
            width: 80px;
        }
        .upload{
            width: 200px;
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
</style>
