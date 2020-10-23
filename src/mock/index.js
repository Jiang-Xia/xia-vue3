import Mock from 'mockjs'
import * as mockData from './mock'
import {makeToken} from './mock'

/**
 * @Description: 格式化mock 返回数据
 * @param data {*}  请求数据结果
 * @param code {number} 请求状态值
 * @param msg {Sting} 请求状态消息
*/
function formattingData (data, code = '00000',msg) {
  return {
    data: data,
    code: code,
    msg: msg || (code === '00000' ? '请求成功' : '请求失败')
  }
}

Mock.mock('/api/v2/user_config/global_configs',formattingData(mockData.globalConfigs()))
Mock.mock('/api/v2/token/user/make_token',formattingData(mockData.makeToken()))
Mock.mock('/api/v2/token/user/destroy_token',formattingData(mockData.destoryToken()))
Mock.mock('/api/v2/token/user/token_profile',formattingData(mockData.tokenProfile()))
Mock.mock('/mock/news',formattingData(mockData.produceNewsData()))