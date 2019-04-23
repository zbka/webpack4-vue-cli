import Login from './views/login.vue'
import Index from './views/layout.vue'
import BusinessApplication from './views/businessApplication.vue'
import AddApplication from './views/addApplication.vue'
import GroupApprovalList from './views/groupApprovalList.vue'
import DeliveryList from './views/deliveryList.vue'
import UserManagement from './views/useManagement.vue'
// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
const routes = [
    { path: '/', redirect: '/NetXpert' },
    { path: '/NetXpert', redirect: '/NetXpert/businessApplication' },
    {
        path: '/NetXpert', component: Index,
        children: [
            { path: 'businessApplication', component: BusinessApplication },
            { path: 'addApplication', component: AddApplication },
            { path: 'groupApprovalList', component: GroupApprovalList },
            { path: 'deliveryList', component: DeliveryList },
            { path: 'userManagement', component: UserManagement }
        ] 
    },
    { path: '/login', component: Login, name: 'login' },
]

export default routes
