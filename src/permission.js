import router from '@/router'
import store from '@/store'
import { message } from '@/libs'
// 处理需要登录页面的访问权限
router.beforeEach((to, from) => {
  // 无需登录的页面
  if (!to.meta.user) {
    return
  }
  // 已经登录
  if (store.getters.token) {
    return true
  }
  // 没有登录
  message('warn', '登录失效,请重新登录')
  return '/'
})
