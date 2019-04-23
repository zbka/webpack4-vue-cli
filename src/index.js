import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import route from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './styles/font.js'
import state from './vuex/state'
import getters from './vuex/getters'
import mutations from './vuex/mutations'
import actions from './vuex/actions'
import App from './app.vue'
// if(process.env.NODE_ENV==='development'){require('./mock.js')} //选择性打包
require('./mock.js')
Vue.config.devtools = true
Vue.use(Vuex)
Vue.use(ElementUI)
Vue.use(VueRouter)

const store = new Vuex.Store({
    state,
    mutations, 
    getters,
    actions
})
const router = new VueRouter(
    {mode: 'hash', routes: route}
)
router.beforeEach((to, from, next) => {
    if (to.name == "login"){
        next();
    }
    if(sessionStorage.loginStatus){
        next();
    }else{
        next({path: '/login'});
    }
})

// var root = document.getElementById("app");
new Vue({
    store,
    router,
    render: h => h(App)
}).$mount("#app")
