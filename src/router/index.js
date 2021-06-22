import Vue from 'vue'
import VueRouter from 'vue-router'
import Film from '@/views/Film'
import Cinema from '@/views/Cinema'
import Center from '@/views/Center'
import Nowplaying from '@/views/film/Nowplaying'
import Comingsoon from '@/views/film/Comingsoon'
import Detail from '@/views/Detail'
import City from '@/views/City'
import Search from '@/views/Search'
import Consult from '@/views/Consult'
// import Login from '@/views/Login'
Vue.use(VueRouter)
const routes = [
  {
    path: '/film',
    component: Film,
    children: [
      {
        path: 'nowplaying',
        component: Nowplaying
      },
      {
        path: 'comingsoon',
        component: Comingsoon
      },
      {
        //   默认显示正在上映电影
        path: '',
        redirect: 'nowplaying'
      }
    ]
  },
  {
    path: '/city',
    component: City
  },
  {
    path: '/consult',
    component: Consult
  },
  {
    path: '/cinema/search',
    component: Search
  },
  {
    path: '/cinema',
    component: Cinema
  },
  {
    path: '/center',
    component: Center
  },
  {
    path: '/detail/:myid',
    component: Detail
  },
  {
    path: '/login',
    // 路由懒加载，当切换到该路由页面才会引入改文件
    component: () => import('@/views/Login')
  },
  {
    path: '*',
    redirect: '/film'
  }
]
const router = new VueRouter({
  routes
})
// 全局守卫路由拦截，当本地存储中没有凭证，则跳转到登陆页面。
router.beforeEach((to, from, next) => {
  const auth = ['/center']
  if (auth.includes(to.fullPath)) {
    if (!localStorage.getItem('token')) {
      next('/login')
    //   注意此处的this为undefined，而不是vue实例，顾不能通过this.$router.push
    }
  } else {
    next()
  }
})
export default router
