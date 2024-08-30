import { isMobileTerminal } from '@/utils/flexible'
export default {
  // 所有分类
  categorys: (state) => state.category.categorys,
  // 主题类型
  themeType: (state) => state.theme.themeType,
  // 当前分类
  currentCategory: (state) => state.app.currentCategory,
  // 当前分类Index
  currentCategoryIndex: (state, getters) => {
    return getters.categorys.findIndex((item) => {
      return item.id === getters.currentCategory.id
    })
  },
  // 搜索记录
  historys: (state) => state.history.historys,
  // 搜索文本
  searchText: (state) => state.app.searchText,
  // 用户token
  token: (state) => state.user.token,
  // 用户信息
  userInfo: (state) => state.user.userInfo,
  // 路由跳转类型
  routerType: (state) => {
    if (!isMobileTerminal) {
      return 'none'
    }
    return state.app.routerType
  }
}
