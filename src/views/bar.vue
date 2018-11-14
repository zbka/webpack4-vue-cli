<template>
    <div class="sliderBar" @click="handl">
        <ul>
            <li>test nav 1</li>
            <li>test nav 3</li>
            <li>test nav 4</li>
            <li>test nav 5</li>
            <li>test nav 4</li>
            <li>test nav 5</li>
            <li>test nav 4</li>
            <li>test nav 5</li>
            <li>test nav 4</li>
            <li>test nav 5</li>
            <li>test nav 4</li>
            <li>test nav 5</li>
            <li>test nav 4</li>
            <li>test nav 5</li>
            <li>test nav 4</li>
            <li>test nav 5</li><li>test nav 4</li>
            <li>test nav 5</li>
            <li>test nav 4</li>
            <li>test nav 5</li>
            <li>test nav 4</li>
            <li>test nav 5</li>
            <li>test nav 4</li>
            <li>test nav 5</li>
            <li>test nav 4</li>
            <li>test nav 5</li>
            <li>test nav 4</li>
            <li>test nav 5</li>
        </ul>
        <button type="button" @click="tourl">跳 转</button>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                test: 'weweeasdqwdwjjew'
            }
        },
        methods: {
            tourl() {
                this.$router.push('foo')
            },
            handl: function () {
                // alert('Very Good')
                console.log(this.$route.params)
            }
        }
    }
</script>
<style lang="scss" scoped>
</style>
