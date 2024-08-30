import request from '../utils/request'
// 获取分类接口
export const getCategory = () => {
  return request({
    url: '/category'
  })
}
