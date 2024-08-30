import request from '../utils/request'
// 获取图片接口
export const getPexelsList = (data) => {
  return request({
    url: '/pexels/list',
    params: data
  })
}
// 搜索提示
export const getHint = (q) => {
  return request({
    url: '/pexels/hint',
    params: q
  })
}
// 获取推荐主题
export const getThemes = () => {
  return request({
    url: '/pexels/themes'
  })
}
// 获取指定图片数据
export const getPexelsFromId = (id) => {
  return request({
    url: `/pexels/${id}`
  })
}
