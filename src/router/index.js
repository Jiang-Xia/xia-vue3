import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/router/modules/home'
import Disease from '@/router/modules/diseases'
import Export from '@/router/modules/export'
import Profile from '@/router/modules/profile'
import Research from '@/router/modules/research'


const routes= [
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: () => import('@/views/login/index-default.vue'),
  //   meta: {
  //     title: '登录',
  //     role: 'normal'
  //   }
  // },
  {
    path: '/',
    name: '/',
    redirect: '/home'
  },
  // {
  //   path: '/index',
  //   name: 'Index',
  //   component: '',
  //   props: true,
  //   meta: {
  //     title: '首页',
  //     role: 'normal'
  //   }
  // },
  Home,
  Disease,
  Export,
  Profile,
  Research
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
