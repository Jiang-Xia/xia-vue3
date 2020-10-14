import axios from 'axios'
import Vue from 'vue'
import { Message } from 'element-ui'
import Cookies from 'js-cookie'
import { openLoading, closeLoading } from '@/utils/loading'
import request from '@/api/form.js'
const $axios = axios.create({
  // 设置超时时间
  timeout: 60000
  // 基础url，会在请求url中自动添加前置链接
  // baseURL: 'http://192.168.1.7:9001/'
})
Vue.prototype.$http = axios
/**
 * 请求拦截器
 */
$axios.interceptors.request.use(
  async (config) => {
    const token = Cookies.get('form_token')
    if (config.url.includes('/api/v1/token/get_proxy_token')) {
      openLoading()
      return config
    } else {
      if (token) {
        config.headers.Authorization = Cookies.get('token_type') + ' ' + Cookies.get('form_token')
        openLoading()
        return config
      } else {
        const flag = await request.getToken().then(res => {
          var millisecond = new Date().getTime()
          var expiresTime = new Date(millisecond + res.expires_at * 1000)
          Cookies.set('form_token', res.proxy_token, {
            expires: expiresTime
          })
          Cookies.set('token_type', res.token_type, {
            expires: expiresTime
          })
          return true
        })
        console.log(flag, 'new')
        if (flag) {
          openLoading()
          config.headers.Authorization = Cookies.get('token_type') + ' ' + Cookies.get('form_token')
          return config
        }
      }
    }
  },
  error => {
    return Promise.reject(error)
  }
)
/**
 * 响应拦截器
 */
$axios.interceptors.response.use(

  response => {
    const status = response.status
    const code = response.data.code
    closeLoading()
    if ((status >= 200 && status < 300) || status === 304) {
      if (code === '00000') {
        return Promise.resolve(response.data)
      } else {
        Message.error(response.data.msg)
        return Promise.reject(response.data)
      }
    } else {
      Message.error(response.data.msg)
      return Promise.reject(response)
    }
  },
  error => {
    closeLoading()
    if (error.response) {
      switch (error.response.status) {
        case 400:
          Message.error(error.response.data.msg)
          break
        case 401:
          Message.error(error.response.data.msg)
          break
        case 403:
          Message.error(error.response.data.msg)
          break
        case 404:
          Message.error(error.response.data.msg)
          break
        case 408:
          Message.error(error.response.data.msg)
          break
        case 500:
          Message.error(error.response.data.msg)
          break
        case 501:
          Message.error(error.response.data.msg)
          break
        case 502:
          Message.error(error.response.data.msg)
          break
        case 503:
          Message.error(error.response.data.msg)
          break
        case 504:
          Message.error(error.response.data.msg)
          break
        case 505:
          Message.error(error.response.data.msg)
          break
        default:
          break
      }
    } else {
      if (error.message.includes('timeout')) {
        Vue.prototype.$message.error('请求超时！请检查网络是否正常')
      } else {
        Vue.prototype.$message.error('请求失败，请检查网络是否已连接')
      }
    }
    return Promise.reject(error)
  }
)

export default $axios
