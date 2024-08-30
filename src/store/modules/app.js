import { ALL_CATEGORY } from '@/constants'
export default {
  namespaced: true,
  state: () => ({
    //   默认全部分类
    currentCategory: ALL_CATEGORY,
    // 搜索文本
    searchText: '',
    // 路由跳转类型
    routerType: 'none'
  }),
  mutations: {
    //   切换选中分类
    changeCurrentCategory(state, newCategory) {
      state.currentCategory = newCategory
    },
    changeSearchText(state, newSearchText) {
      state.searchText = newSearchText
    },
    // 修改路由类型
    changeRouterType(state, newType) {
      state.routerType = newType
    }
  },
  actions: {}
}
