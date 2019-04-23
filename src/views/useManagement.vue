<template>
    <section class="container userManagement">
        <el-row class="treeWrapper">
            <el-col :span="10">
                <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
            </el-col>
        </el-row>
        
    </section>
</template>
<script>
export default {
    data(){
        return{
            treeData: [
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
        }
    }
}
</script>
<style lang="scss">
    .userManagement{
        .treeWrapper{
            background: #FFF;
            padding: 15px 20px;
        }
    }
</style>
