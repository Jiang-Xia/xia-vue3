import router from '@/router'
import store from '@/store'
// import { Message } from 'element-ui'
import { getToken } from '@/utils/cookie' // get token from cookie
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getPageTitle, getOpenType } from '@/utils/common'

const whiteList = ['/login', '/index', '/404']
router.beforeEach(async(to, from, next) => {
  // next函数 进行管道中的一个钩子，如果执行完了，则导航的状态就是 confirmed （确认的）；否则为false，终止导航。
  NProgress.start()
  const hasToken = getToken()
  // console.log(1111, to.path)
  document.title = getPageTitle(to.meta.title)
  if (!hasToken) {
    store.dispatch('user/resetToken')
    // 未登录
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      // 有权限
      const baseUrl = location.protocol + '//' + location.host + location.pathname
      // 需要登录的 路由 跳转到首页进行登录
      if (getOpenType() && to.fullPath.indexOf('paticent') !== -1) {
        top.location.href = baseUrl + '#/login'
        next()
        // console.log(11111111111)
      } else if (to.fullPath === '/') {
        const redirect = router.history.pending.fullPath
        top.location.href = baseUrl + '#/login' + `?redirect=${redirect}`
        next()
        // console.log(222222222)
      } else {
        // console.log(33333333333, baseUrl)
        top.location.replace(baseUrl + '#/login' + `?redirect=${to.fullPath}`)
        next(`/login?redirect=${to.path}`)
      }
    }
  } else {
    // 已登录
    // console.log('已登录', store.getters.roles)
    if (to.path === '/login') {
      next({ path: '/home' })
      NProgress.done()
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          const res = await store.dispatch('user/getUserInfo')
          const { user_type } = res[0]
          const accessRoutes = await store.dispatch('permission/generateRoutes', [user_type])
          // router.addRoute(accessRoutes)
          for(let item of accessRoutes){
            router.addRoute(item)
          }
          next({ ...to, replace: true })
        } catch (error) {
          console.log(error)
          await store.dispatch('user/resetToken')
          next(`/login?redirect=${to.path}`)
        }
      }
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
