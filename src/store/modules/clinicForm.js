export default {
  namespaced: true, // 必须加它不然报错
  state: {
    hospital_id: '', // 医院id
    hospital_name: '', // 医院名称
    triage_id: '', // 来源id
    templateId: '', // 表单id
    project_id: '', // 项目id
    isVisible: false, // 是否打开弹窗
    isEdit: '', //  是否编辑状态
    detailList: '' // 详情数据
  },
  mutations: {
    setHosId(state, Id) {
      state.hospital_id = Id
    },
    setHosName(state, Name) {
      state.hospital_name = Name
    },
    settriageId(state, triageId) {
      state.triage_id = triageId
    },
    settemplateId(state, templateId) {
      state.templateId = templateId
    },
    setprojectId(state, projectId) {
      state.project_id = projectId
    },
    setEdit(state, isEdit) {
      state.isEdit = isEdit
    },
    setVisible(state, isVisible) {
      state.isVisible = isVisible
    },
    setdetailList(state, detailList) {
      state.detailList = detailList
    }
  },
  actions: {
    setHosId(context, Id) {
      context.commit('setHosId', Id)
    },
    setHosName(context, Name) {
      context.commit('setHosName', Name)
    },
    settriageId(context, triageId) {
      context.commit('settriageId', triageId)
    },
    settemplateId(context, templateId) {
      context.commit('settemplateId', templateId)
    },
    setprojectId(context, projectId) {
      context.commit('setprojectId', projectId)
    },
    setEdit(context, isEdit) {
      context.commit('setEdit', isEdit)
    },
    setVisible(context, isVisible) {
      context.commit('setVisible', isVisible)
    },
    setdetailList(context, detailList) {
      context.commit('setdetailList', detailList)
    }
  }
}
