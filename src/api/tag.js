import request from '@/utils/request'

/**
 * 标签管理
 */

export function getPostsByTag(paramMap) {
  return request({
    url: `/tag/${paramMap.name}`,
    method: 'get',
    params: {
      pageNo: paramMap.pageNo,
      pageSize: paramMap.pageSize
    }
  })
}
