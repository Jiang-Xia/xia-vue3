export default {
  namespaced: true,
  state: {
    isFeildAreadyRender: false, //  字段树渲染完成
    isShowPagination: false, // 分页器
    fieldData: [], // 全部字段数据
    titledata: [], // 渲染表格数据
    baseInfo: {}, // 基础信息 主要是高级管理中的项目配置控制
    tableListConfig: {}, // 表格列表配置和数据  用于分页器和病人列表
    patientData: [], // 病人列表
    paginationConfig: { // 分页器配置
      page: 1,
      page_size: 10,
      total_count: 0
    },
    DialogState: {
      addCheckedDialog: false, // 添加弹框
      delCheckedDialog: false // 删除弹框
    },
    projectNum: [], // 项目数量
    multiDataPermissions: [], // 项目模块
    searchConfig: { // 搜索配置
      disease_id: '156220599997824',
      check_all: 0,
      sort_by: '',
      disease: '',
      end_date: '',
      start_date: '',
      is_task: true,
      search_content: '',
      search_type: 'single',
      // origin_condition_in: [],
      base_data_condition_in: [],
      emr_data_condition_in: [],
      lis_data_condition_in: [],
      exam_data_condition_in: [],
      order_data_condition_in: [],
      structured_data_condition_in: [],
      structured_data_condition_out: [],
      export_type: 'export_new_project_data',
      // condition_in: [],
      // condition_out: [],
      is_man_time: false, // 人次
      tag_logic: 'and', // 标签管理之间的逻辑关系,
      page_token: ''
    },
    pat_no_list: [], // 病人pat_no列表
    table_configs: [], // 列表字段配置 没用了
    tid_list: [], // 标签id列表
    checkList: [], // 每一条数据的勾选状态
    target_disease_id_list: []
  },
  mutations: {
    isFeildAreadyRender(state, isFeildAreadyRender) {
      state.isFeildAreadyRender = isFeildAreadyRender
    },
    isShowPagination(state, isShowPagination) {
      state.isShowPagination = isShowPagination
    },
    getFieldData(state, fieldData) {
      state.fieldData = fieldData
    },
    // 分页器配置
    getPaginationConfig(state, paginationConfig) {
      state.paginationConfig = Object.assign(state.paginationConfig, paginationConfig)
    },
    // 表格表头数据
    getTableTitleData(state, titledata) {
      state.titledata = titledata
    },
    // 基础信息
    getBaseInfoData(state, baseInfo) {
      state.baseInfo = baseInfo
    },
    // 表格配置 分页器和病人列表
    getTableListConfig(state, tableListConfig) {
      state.tableListConfig = tableListConfig
    },
    getPatientData(state, patientData) {
      state.patientData = patientData
    },
    // 搜索条件
    getSearchConfig(state, searchConfig) {
      state.searchConfig = Object.assign(state.searchConfig, searchConfig)
      // state.searchConfig.end_date = searchConfig.dateArr[0]
      // state.searchConfig.start_date = searchConfig.dateArr[1]
      // console.log(state.searchConfig)
    },
    getCheckList(state, checkList) {
      state.checkList = checkList
    },
    getPdIdList(state, pat_no_list) {
      state.pat_no_list = pat_no_list
    },
    getProjectNum(state, projectNum) {
      state.projectNum = projectNum
    },
    getMultiDataPermissions(state, multiDataPermissions) {
      state.multiDataPermissions = multiDataPermissions
    },
    getDialogState(state, DialogState) {
      state.DialogState[DialogState.key] = DialogState.value
    },
    getTargetProjectIdList(state, target_disease_id_list) {
      state.target_disease_id_list = target_disease_id_list
    },
    getTidList(state, tid_list) {
      state.tid_list = tid_list
    }
  },
  actions: {
    searchTableList({ commit }, searchConfig) {

    }
  }
}
