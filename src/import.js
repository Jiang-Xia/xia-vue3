// import Vue from 'vue'

import '@/utils/rem.js'
import '@/styles/base.scss'
import '@fortawesome/fontawesome-free/css/all.min.css'

/*
  常用方法挂载
*/
// import { getToken } from '@/utils/cookie'
import DevicePixelRatio from '@/utils/devicePixelRatio'

// 日期处理库
// import dayjs from 'dayjs'

import './permission'

// import axios from '@/utils/request.js'
new DevicePixelRatio().init()

// Vue.prototype.$dayjs = dayjs
new DevicePixelRatio().init()
// Vue.prototype.$axios = axios
// Vue.prototype.$getToken = getToken
