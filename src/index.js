import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import route from './router'
import state from './vuex/state'
import getters from './vuex/getters'
import mutations from './vuex/mutations'
import actions from './vuex/actions'
import App from './app.vue'
require('./mock.js')
Vue.config.devtools = true
Vue.use(Vuex)
Vue.use(VueRouter)

const store = new Vuex.Store({
    state,
    mutations, 
    getters,
    actions
})
const router = new VueRouter(
    {mode: 'history', routes: route}
)
// var root = document.getElementById("app");
new Vue({
    store,
    router,
    render: h => h(App)
}).$mount("#app")
