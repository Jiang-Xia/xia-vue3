export default {
  namespaced: true,
  state: {
    search_condition: [],
    disease_list: [], // 科室列表,
    taskData: {
      search_condition_list: []
    }
  },
  mutations: {
    search_condition: (state, search_condition) => {
      state.search_condition = search_condition
    },
    disease_list: (state, disease_list) => {
      state.disease_list = disease_list
    },
    taskData: (state, taskData) => {
      state.taskData = Object.assign(state.taskData, taskData)
    },
    clearTaskData: (state) => {
      state.taskData = { search_condition_list: [] }
    }
  },
  actions: {

  }
}
