import request from '@/utils/request'

/**
 * 
 * 看板管理
 */

export function getBillboard() {
  return request({
    url: '/billboard/show',
    method: 'get'
  })
}