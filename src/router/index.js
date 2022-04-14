import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/login'
import Home from '@/components/Home'
import Search from "@/components/home/Search"
import Love from "@/components/home/love"
import rank from "@/components/home/rank"
import musiclist from "@/components/home/musiclist"
//lessload只能是5.0版本
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect:'/login'
    },
    {
      path: '/login',
      name: 'login', 
      component: Login
    },
    {
      path:'/HelloWord',
      name:'HelloWord',
      component:HelloWorld
    },
    {
      path:'/Home',
      name:'Home',
      component:Home,
      redirect:'/home/rank',
      children:[
        {path:'/home/rank',component:rank},
        {path:'/home/Search',component:Search},
        {path:'/home/love',component:Love},
        {path:'/home/musiclist',component:musiclist}
      ]
    }
  ]
})

router.beforeEach((to,from,next)=>{
  if(to.path==='/login') return next()
  const tokenstr=window.sessionStorage.getItem('token')
  if(!tokenstr) return next('/login')
  next()
})

export default router

