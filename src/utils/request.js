import axios from 'axios'
import store from '@/store'
const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000
})
// 请求拦截器
service.interceptors.request.use(
  (config) => {
    config.headers.icode = '0EB31009F88DABCA'
    if (store.getters.token) {
      // 如果token存在注入token
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    return config //必须返回配置
  },
  (error) => {
    return Promise.reject(error)
  }
)
// 响应拦截器
service.interceptors.response.use((response) => {
  const { success, message, data } = response.data
  if (success) {
    return data
  }
  return Promise.reject(new Error(message))
}),
  (error) => {
    // 处理token超时
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 401
    ) {
      // 退出
      store.dispatch('user/logout')
    }
    return Promise.reject(error)
  }
export default service
