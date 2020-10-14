import config from '@/api/config'
import $axios from '@/utils/request.js'
/*
  新版本api
*/

// 获取 首页统计 和图表
export async function statisticsInfo (data) {
  return $axios({
    url: config.smaidatasearch_service_base_url + '/api/v1/data_search/home_page_statistics',
    method: 'post',
    data: data
  })
}
