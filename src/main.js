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
import '@/icons'

/* 组件 */
import XiaUi from '@/components/xia-ui/src'
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
app.use(XiaUi)
app.use(Antd).use(store).use(router).mount('#app')

/* 
  全局组件注册
*/
import SvgIcon from '@/components/SvgIcon'
// 自动注册图表组件
import {componentfn} from '@/components/charts'
componentfn(app)
import BreadCrumb from '@/components/breadcrumb'
app.component('SvgIcon', SvgIcon)
app.component('BreadCrumb', BreadCrumb)


/*
  常用方法挂载
*/
import { getToken } from '@/utils/cookie'
import axios from '@/utils/request'
import { getCode, getOpenType } from '@/utils/common'
const globalProperties = app.config.globalProperties
globalProperties.$getCode = getCode
globalProperties.$getOpenType = getOpenType
globalProperties.devtools = false    
globalProperties.$getToken = getToken
globalProperties.$axios = axios
globalProperties.log = console.log

export default app

