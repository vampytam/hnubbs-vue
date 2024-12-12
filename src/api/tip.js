import request from '@/utils/request'

/**
 * 获取今日小贴士
 */

export function getTodayTip() {
  return request({
    url: '/tip/today',
    method: 'get'
  })
}