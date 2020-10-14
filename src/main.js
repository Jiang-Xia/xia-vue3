import Vue, { createApp } from 'vue'
import App from './App.vue'

import router from './router/index'
import store from './store'
// import './import'

/*
  解决点解当前路由报错
*/
import Router from 'vue-router'
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

Vue.config.productionTip = true
createApp(App).use(store).use(router).mount('#app')
