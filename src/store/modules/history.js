export default {
  namespaced: true,
  state: () => ({
    historys: []
  }),
  mutations: {
    //如果有重复，删除重复的元素，添加到最前面
    addHistory(state, newHistory) {
      const findIndex = state.historys.findIndex((item) => item === newHistory)
      if (findIndex !== -1) {
        state.historys.splice(findIndex, 1)
      }
      state.historys.unshift(newHistory)
    },
    // 删除某个
    deleteHistory(state, index) {
      state.historys.splice(index, 1)
    },
    // 删除所有
    deleteAllHistory(state) {
      state.historys = []
    }
  },
  actions: {}
}
