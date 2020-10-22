import { asyncRoutes, constantRoutes } from '@/router'
import store from '@/store'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}
// 全部需要过滤的特殊导航
const filterList = ['/form']
// 某个医院代号下 不过滤某些特殊导航
const codeConfig = {
  gyfy_117: ['/form']
}
const actions = {
  generateRoutes({ commit }, roles) {
    let asyncRoutes_ = asyncRoutes
    const { hosp_config, nav_config } = store.getters.globalConfigs
    const code = hosp_config.global_hospital_code
    const charts = nav_config.nav_charts_is_enable
    const statistics = nav_config.nav_statistics_is_enable
    if (!charts) {
      asyncRoutes_ = asyncRoutes_.filter(v => v.path !== '/charts')
    }
    if (!statistics) {
      asyncRoutes_ = asyncRoutes_.filter(v => v.path !== '/statistics')
    }
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes(2)) {
        // 2 也要过滤某些特殊导航
        accessedRoutes = asyncRoutes_.filter(v => !filterList.includes(v.path))
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes_, roles)
        // 根据医院代号过滤特殊导航
        if (codeConfig[code]) {
          for (const item of codeConfig[code]) {
            // 拉出数组 形成不过滤的条件
            filterList.splice(filterList.indexOf(item), 1)
          }
        }
        accessedRoutes = accessedRoutes.filter(v => !filterList.includes(v.path))
      }
      // console.log(accessedRoutes)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
