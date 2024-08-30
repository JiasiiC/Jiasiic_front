import { isMobileTerminal } from './flexible'
import { getAliPay } from '@/api/pay'
export const aliPay = async (title, desc) => {
  // 解构encodeURI
  const { encodeURI } = await getAliPay(
    title,
    '0.01',
    desc,
    isMobileTerminal.value
  )
  // 链接需要decodeURIComponent才能跳转
  window.location.href = decodeURIComponent(encodeURI)
  console.log(decodeURIComponent(encodeURI))
}
