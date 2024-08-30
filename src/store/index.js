import { createStore } from 'vuex'
import category from './modules/category'
import theme from './modules/theme'
import getters from './getters'
import createPersistedState from 'vuex-persistedstate'
import history from './modules/history'
import app from './modules/app'
import user from './modules/user'
const store = createStore({
  getters,
  modules: {
    category,
    theme,
    app,
    history,
    user
  },
  plugins: [
    createPersistedState({
      //   保存到localStorage中的key
      key: 'storeData',
      // 需要保存的模块
      paths: ['category', 'theme', 'history', 'user']
    })
  ]
})
export default store
