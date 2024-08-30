/**
 *
 * @param {*} value 输入的val
 * @returns true为通过，不通过返回string
 */

// 用户名校验
export const validateUsername = (value) => {
  if (!value) {
    return '用户名为必填的'
  }
  if (value.length < 6 || value.length > 12) {
    return '用户名应在6到12位之间'
  }
  return true
}
// 密码校验
export const validatePassword = (value) => {
  if (!value) {
    return '密码为必填的'
  }
  if (value.length < 6 || value.length > 12) {
    return '密码应在6到12位之间'
  }
  return true
}

// 注册页面确认密码
export const validateConfirmPassword = (value, password) => {
  if (!value) {
    return '密码为必填的'
  }
  if (value !== password[0]) {
    return '两次密码输入必须一致'
  }
  return true
}
