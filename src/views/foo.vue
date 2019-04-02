<template>
    <div class="box" @click="handl">
        <p>wef {{ localComputed }}</p>
        <p>foo: {{ count }}</p>
        <p>Length {{ doneTodosCountLength }}</p>
        <div>
            <ul>
                <li v-for="(articale, index) in articles" v-bind:key="index">
                    <p>titil: {{ articale.title }}</p>
                </li>
            </ul>
        </div>
        <button type="button" @click="tourl">跳 转</button>
    </div>
</template>
<script>
    import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
    import { JH_news } from '../axios/api.js'
    export default {
        data () {
            return {
                test: 'weweeasdqwdwjjew',
                articles: []
            }
        },
        mounted () {
            JH_news((response) => {
                console.log(response.data.articles)
                this.articles = response.data.articles
            })
        },
        computed: {
            localComputed () {
                return this.test
            },
            ...mapState([
                'count'
            ]),
            ...mapGetters([
                'doneTodosCountLength'
            ])
        },
        methods: {
            tourl() {
                this.$router.push('bar')
            },
            handl () {
                this.increment(10)
                // this.promiseAdd(32).then(() => { alert(222) })
            },
            ...mapMutations([
                'increment'
            ]),
            ...mapActions([
                'laterAdd',
                'promiseAdd'
            ])
        }
    }
</script>
<style lang="scss" scoped>
    .box {
        width: 400px;
        // height: 500px;
        border-radius: 20px;
    }
</style>
