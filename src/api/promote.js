import request from '@/utils/request'

// 获取所有推广
export function getAllPromotions() {
  return request(({
    url: '/promotion/all',
    method: 'get'
  }))
}