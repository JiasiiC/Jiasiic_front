/**
 *
 * @param {*} title 标题
 * @param {*} content 内容
 * @param {*} cancelText 取消按钮文本
 * @param {*} confirmText 确定按钮文本
 */
import { render, h } from 'vue'
import confirmComponent from './index.vue'
export const confirm = (
  title,
  content,
  cancelText = '取消',
  confirmText = '确定'
) => {
  return new Promise((resolve, reject) => {
    if (title && !content) {
      content = title
      title = ''
    }
    // 关闭弹窗
    const close = () => {
      return render(null, document.body)
    }
    //   取消回调
    const cancelHandler = () => {
      reject(new Error('取消按钮点击'))
    }
    //   成功回调
    const confirmHandler = () => {
      resolve()
    }
    //生成vnode
    const vnode = h(confirmComponent, {
      title,
      content,
      cancelText,
      confirmText,
      confirmHandler,
      cancelHandler,
      close
    })
    //   render渲染vnode为dom
    render(vnode, document.body)
  })
}
