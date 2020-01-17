import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    component: () => import('views/Login.vue')
  },
  {
    path: '/home',
    component: () => import('views/Home.vue'),
    redirect:"/welcome",
    children:[
      {path:'/welcome',component: () => import('views/Welcome.vue')},
      {path:'/category',component: () => import('components/Category.vue')},
      {path:'/dishes',component: () => import('components/Dishes.vue')},
      {path:'/historyOrder',component: () => import('components/HistoryOrder.vue')},
      {path:'/report',component: () => import('components/Report.vue')},
      {path:'/setting',component: () => import('components/Setting.vue')},
      {path:'/todayOrder',component: () => import('components/TodayOrder.vue')}
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
//全局导航守卫
router.beforeEach((to,from,next)=>{
  // if (to.path=="/") {
  //   return next();
  // }
  // let token= sessionStorage.getItem("token");
  // if (token==null) {
  //   return next({to:"/"})
  // }
  next({redirect:to.path});
})

export default router
