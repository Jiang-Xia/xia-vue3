import Vue from 'vue'

import '@/utils/rem.js'
import '@/styles/base.scss'
import ElementUI, { Message } from 'element-ui'
import '@/styles/element-variables.scss'
import '@fortawesome/fontawesome-free/css/all.min.css'

/*
  常用方法挂载
*/
import { getToken } from '@/utils/cookie'
import DevicePixelRatio from '@/utils/devicePixelRatio'
import { openLoading, closeLoading } from '@/utils/loading'

// 日期处理库
import dayjs from 'dayjs'

import './permission'

import axios from '@/utils/request.js'

import _ from 'lodash'

/*
  脑图 本地目录导入
*/
import '@/assets/js/common/jsmind/style/jsmind.css'
import jsmind from '@/assets/js/common/jsmind/js/jsmind.js'
// import '@/assets/js/common/jsmind/js/jsmind.draggable.js'

/*
  D3
*/
// import * as d3 from 'd3'
// Vue.prototype.$d3 = d3

/*
  常用方法挂载
*/

/*
 缓存 store
 */
import localforage from 'localforage/dist/localforage.js'

// 全局缓存 数据库
import storage from '@/utils/storage'
import { getCode, getOpenType } from '@/utils/common'

/*
   缓存 store
*/

/*
  组件库注册
*/
import echarts from 'echarts'
import VeLine from 'v-charts/lib/line.common'
import VeHistogram from 'v-charts/lib/histogram.common'
import Bar from 'v-charts/lib/bar.common'
import Pie from 'v-charts/lib/pie.common'

import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'
/*
  组件库注册
*/

/*
  全局注册组件
*/
// 全局函数挂载
import showXiaLogin from '@/components/xia-login/main.js'

import XiaPagination from '@/components/xia-pagination/install.js'
import XiaData from '@/components/xia-data'
import XiaDevelop from '@/components/xia-develop'
import XiaProgress from '@/components/xia-progress'
import XiaLogin from '@/components/xia-login'
import XiaIframe from '@/components/xia-iframe'
new DevicePixelRatio().init()

Vue.prototype.$getToken = getToken
Vue.prototype.$openLoading = openLoading
Vue.prototype.$closeLoading = closeLoading
Vue.prototype.$dayjs = dayjs
Vue.prototype.$axios = axios
Vue.prototype.$Message = Message
Vue.prototype._ = _
Vue.prototype.$jsmind = jsmind
Vue.prototype.localforage = localforage
// 患者详情缓存数据库
const metaTemplateListDb = localforage.createInstance({
  name: 'metaTemplateListDb',
  storeName: 'metaDataDbStore'
})
Vue.prototype.$metaTemplateListDb = metaTemplateListDb

// 字段树 缓存数据库
const treeTemplateListDb = localforage.createInstance({
  name: 'treeTemplateListDb',
  storeName: 'treeDataDbStore'
})
Vue.prototype.$treeTemplateListDb = treeTemplateListDb

// 历史记录 缓存数据库
const historyRecordDb = localforage.createInstance({
  name: 'historyRecordDb',
  storeName: 'historyRecordDbStore'
})
Vue.prototype.$historyRecordDb = historyRecordDb
Vue.prototype.$localStorage = storage.local
Vue.prototype.$getCode = getCode
Vue.prototype.$getOpenType = getOpenType
Vue.prototype.$echarts = echarts

Vue.component(VeLine.name, VeLine)
Vue.component(VeHistogram.name, VeHistogram)
Vue.component(Bar.name, Bar)
Vue.component(Pie.name, Pie)

Vue.use(VXETable)

Vue.use(ElementUI)
Vue.prototype.$showXiaLogin = showXiaLogin
Vue.use(XiaPagination)
Vue.component('XiaData', XiaData)
Vue.component('XiaDevelop', XiaDevelop)
Vue.component('XiaProgress', XiaProgress)
Vue.component('XiaLogin', XiaLogin)
Vue.component('XiaIframe', XiaIframe)
/*
  全局注册组件
*/
