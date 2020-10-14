export default {
  namespaced: true,
  state: {
    isEditing: false,
    time_line_list: [],
    loadingTimeline: true,
    modifyObj: {},
    nodeInfo: {
      pat_sex: '',
      statistical_age: '',
      pat_name: ''
    },
    pageParams: {
      isDisabled: true, // 控制disabled,
      cur_dynamic_data_pd_id: '',
      dynamic_dataEditing: false,
      base_dataEditing: false,
      deleteImages: [], // 点击保存之后 要删除的图片控件中的图片
      base_data: {},
      dynamic_data: {},
      tableFieldList: []// 修改过的表格字段英文名
    }, // 页面的共用参数
    // 数据
    analyticalData: { // 解析数据
      base_data: {}, // 基本信息
      dynamic_data: {} // 动态信息
    },
    // 模板
    meta_template_list: []
  },
  mutations: {
    setIsEditing(state, isEditing) {
      state.isEditing = isEditing
    },
    set_time_line_list(state, time_line_list) {
      state.time_line_list = time_line_list
    },
    setModifyObj(state, modifyObj) {
      state.modifyObj = modifyObj
    },
    setNodeInfo(state, nodeInfo) {
      state.nodeInfo = nodeInfo
    },
    loadingTimeline(state, loadingTimeline) {
      state.loadingTimeline = loadingTimeline
    },
    getMetaTemplateList(state, meta_template_list) {
      state.meta_template_list = meta_template_list
    },
    // 解析数据
    getAnalyticalData(state, analyticalData) {
      state.analyticalData = Object.assign({}, state.analyticalData, analyticalData)
    },
    // 页面的共用参数
    getPageParams(state, pageParams) {
      // 重新赋值给一个空对象：可以解决监听不到对象属性变化问题(只是引用地址监听不到)
      state.pageParams = Object.assign({}, state.pageParams, pageParams)
    }
  },
  actions: {
  }
}

