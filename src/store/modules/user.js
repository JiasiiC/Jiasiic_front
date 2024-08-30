import { loginUser, getProfile, registerUser } from '@/api/sys'
import md5 from 'md5'
import { message as $message } from '@/libs'

export default {
  namespaced: 'true',
  state: () => ({
    // 登录后的token
    token: '',
    // 用户信息
    userInfo: {}
  }),
  mutations: {
    // 保存token
    setToken(state, newToken) {
      state.token = newToken
    },
    // 用户信息
    setUserInfo(state, newInfo) {
      state.userInfo = newInfo
    }
  },
  actions: {
    // 注册
    async registerUser(context, payload) {
      const { password } = payload
      return await registerUser({
        ...payload,
        password: password ? md5(password) : ''
      })
    },
    // 登录
    async loginUser(context, payload) {
      const { password } = payload
      const res = await loginUser({
        ...payload,
        // 加密密码
        password: password ? md5(password) : ''
      })
      context.commit('setToken', res.token)
      context.dispatch('profile')
    },
    // 个人信息
    async profile(context) {
      const data = await getProfile()
      context.commit('setUserInfo', data)
      $message(
        'success',
        `欢迎您${
          data.vipLevel
            ? '尊贵的VIP' + data.vipLevel + '用户' + data.nickname
            : data.nickname
        }`,
        6000
      )
    },
    // 退出登录
    logout(context) {
      context.commit('setToken', ''), context.commit('setUserInfo', '')
      location.reload()
    }
  }
}
