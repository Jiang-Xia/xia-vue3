import { handleLogin, handleUserInfo } from '@/api/login.js'
import { setToken, setInfo, removeToken } from '@/utils/cookie'

export default {
  namespaced: true,
  state: {
    userInfo: '',
    token: ''
  },
  mutations: {
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    }
  },
  actions: {
    login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        handleLogin(userInfo).then(response => {
          // const { credentials } = response
          const { access_token, expires_in, token_type } = response
          const expires_in_time = expires_in * 1000
          console.log(response)
          // expires_in 后台实际到期时间比前端晚5分钟
          setToken(token_type, access_token, expires_in_time)
          // setInfo(user_profile)
          // commit('SET_USER_INFO', user_profile)
          // commit('SET_TOKEN', getToken())
          resolve(true)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        handleUserInfo().then(response => {
          console.log(response)
          // commit('SET_USER_INFO', response)
          setInfo(response)
          resolve(response)
        })
      })
    },
    resetToken({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}
