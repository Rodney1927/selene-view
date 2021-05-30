// 引入vue
import Vue from 'vue'
// 引入vue-router
import VueRouter from 'vue-router'
//引入路由组件 对应页面的相对路径
import home from "../views/home";
import notfound from "../views/404"
import positionManager from "../components/position_manager";
import login from "@/views/login";
import positionInfo from "@/components/position_info";
import applyManager from "@/components/apply_manager";
import myApply from "@/components/my_apply";
import studentManager from "@/components/student_manager";
import companyManager from "@/components/company_manager"
import interviewManager from "@/components/interview_manager"
import companyApply from "@/components/company_apply"
import teacherManager from "@/components/teacher_manager"
import classManager from "@/components/class_manager"

// 使用VueRouter
Vue.use(VueRouter)

//定义全局路由的集合，数组类型，每个路由映射一个组件
const globalRoutes = [
    { path: "/", redirect: "/login"},
    { path: '/login', name: 'login', component: login },
    { path: '*', name: '404', component: notfound}
]

const homeRoutes = {
    path: '/home',
    component: home,
    name: 'home',
    children:[
        { path: '/positionManager', component: positionManager, name: 'positionManager'},
        { path: '/positionInfo', component: positionInfo, name: 'positionInfo'},
        { path: '/applyManager', component: applyManager, name: 'applyManager'},
        { path: '/myApply', component: myApply, name: 'myApply'},
        { path: '/studentManager', component: studentManager, name: 'studentManager'},
        { path: '/companyManager', component: companyManager, name: 'companyManager'},
        { path: '/interviewManager', component: interviewManager, name: 'interviewManager'},
        { path: '/companyApply', component: companyApply, name: 'companyApply'},
        { path: '/teacherManager', component: teacherManager, name: 'teacherManager'},
        { path: '/classManager', component: classManager, name: 'classManager'},
    ]
}

//实例化VueRouter
const router = new VueRouter({
    mode:'hash',
    routes: globalRoutes.concat(homeRoutes)
})
export default router