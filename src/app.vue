<template>
    <div id="app">
        <div class="link">
            <li class="link_item"><router-link to="/">/</router-link></li>
            <li><router-link to="/params/foo/bar">/params/foo/bar</router-link></li>
            <li><router-link to="/foo">foo</router-link></li>
            <li><router-link to="/optional-params">/optional-params</router-link></li>
            <li><router-link to="/optional-params/foo">/optional-params/foo</router-link></li>
            <li><router-link to="/params-with-regex/123">/params-with-regex/123</router-link></li>
            <li><router-link to="/params-with-regex/abc">/params-with-regex/abc</router-link></li>
            <li><router-link to="/asterisk/foo">/asterisk/foo</router-link></li>
            <li><router-link to="/asterisk/foo/bar">/asterisk/foo/bar</router-link></li>
            <li><router-link to="/optional-group/bar">/optional-group/bar</router-link></li>
            <li><router-link to="/optional-group/foo/bar">/optional-group/foo/bar</router-link></li>
        </div>
        <router-view>
              
        </router-view>
        <div class="routerView">
            <pre>{{ JSON.stringify($route, null, 2) }}</pre>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                test: 'weweeasdqwdwjjew'
            }
        },
        mounted(){
            console.log(this);
        },
        methods: {
            handl: function () {
            }
        }
    }
</script>
<style lang="scss">
    #app{
        overflow: hidden;
    }
    .link{
        background-color: #444;
        &_item{
            color: #fff;
        }
    }
    .bg{
        background: url('./views/img/webpack.png');
    }
    .slider {
        width: 500px;
        float: left;
    }
    .main {
        float: left;
    }
</style>
