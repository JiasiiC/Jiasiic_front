import { getCategory } from '@/api/category'
import { ALL_CATEGORY, CATRGORY_NOMAR_DATA } from '@/constants'
export default {
  namespaced: true,
  state: () => ({
    categorys: CATRGORY_NOMAR_DATA
  }),
  mutations: {
    // 为category赋值
    setCategorys(state, newCategorys) {
      state.categorys = [ALL_CATEGORY, ...newCategorys]
    }
  },
  actions: {
    // 获取category数据，并自动保存在vuex中
    async useCategoryData(context) {
      const { categorys } = await getCategory()
      context.commit('setCategorys', categorys)
    }
  }
}
