import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import '@/styles/base.scss'
import 'ant-design-vue/dist/antd.css'
import '@/utils/rem.js'
import '@/styles/base.scss'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './permission'
import '@/mock'
/*
  解决点解当前路由报错
*/
// import Router from 'vue-router'
// const originalPush = Router.prototype.push
// Router.prototype.push = function push (location, onResolve, onReject) {
//   if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
//   return originalPush.call(this, location).catch(err => err)
// }
const app = createApp(App)
app.use(Antd)
app.use(Antd).use(store).use(router).mount('#app')



/*
  常用方法挂载
*/
import { getToken } from '@/utils/cookie'
import axios from '@/utils/request'
import { getCode, getOpenType } from '@/utils/common'
const globalProperties = app.config.globalProperties
globalProperties.$getCode = getCode
globalProperties.$getOpenType = getOpenType
globalProperties.devtools = true    
globalProperties.$getToken = getToken
globalProperties.$axios = axios
globalProperties.log = console.log

