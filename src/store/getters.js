import { getInfo } from '@/utils/cookie'
const getters = {
  userInfo: state => state.user.userInfo || getInfo(),

  /* 数据列表页 */

  // 字段树是否完成渲染
  isFeildAreadyRender: state => state.datalist.isFeildAreadyRender,
  // 全部字段数据
  fieldData: state => state.datalist.fieldData,
  // 分页器配置
  paginationConfig: state => state.datalist.paginationConfig,
  // 分页器
  isShowPagination: state => state.datalist.isShowPagination,
  // 表格标题数据
  tableTitleData: state => state.datalist.titledata,
  // 基础信息
  baseInfoData: state => state.datalist.baseInfo,
  // 病人列表
  tableListConfig: state => state.datalist.tableListConfig,
  // 请求回来的病人列表
  patientData: state => state.datalist.patientData,
  // 搜索条件配置
  searchConfig: state => state.datalist.searchConfig,
  // 勾选中的状态
  checkList: state => state.datalist.checkList,
  // 选中的病人pd_id列表
  pat_no_list: state => state.datalist.pat_no_list,
  // 项目数量
  projectNum: state => state.datalist.projectNum,
  // 项目模块
  multiDataPermissions: state => state.datalist.multiDataPermissions,
  // 弹框状态
  DialogState: state => state.datalist.DialogState,
  // 目标科室列表
  target_disease_id_list: state => state.datalist.target_disease_id_list,
  // 标签id列表
  tid_list: state => state.datalist.tid_list,

  /* 患者详情页 */
  // pageParams: state => state.patientDetail.pageParams,
  // metaTemplateList: state => state.patientDetail.meta_template_list,
  // detailBaseInfo: state => state.patientDetail.detailBaseInfo,
  // timelineEventList: state => state.patientDetail.time_line_event_list,
  // analyticalData: state => state.patientDetail.analyticalData, // 解析数据
  // oraginTabData: state => state.patientDetail.oraginTabData, // 原始数据

  /* 新详情页 */
  isEditing: state => state.DataDetail.isEditing,
  modifyObj: state => state.DataDetail.modifyObj,
  nodeInfo: state => state.DataDetail.nodeInfo,
  time_line_list: state => state.DataDetail.time_line_list,
  loadingTimeline: state => state.DataDetail.loadingTimeline, // 加载时间轴,
  metaTemplateList: state => state.DataDetail.meta_template_list,
  analyticalData: state => state.DataDetail.analyticalData, // 解析数据
  pageParams: state => state.DataDetail.pageParams,

  // 新版本
  search_condition: state => state.home.search_condition,
  disease_list: state => state.home.disease_list,
  taskData: state => state.home.taskData,
  research_name: state => state.research.research_name// 科研名称

}
export default getters
