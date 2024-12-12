import request from '@/utils/request'

// 关注
export function follow(followeeId) {
  return request(({
    url: `/follow/subscribe/${followeeId}`,
    method: 'get'
  }))
}

// 取消关注
export function unFollow(followeeId) {
  return request(({
    url: `/follow/unsubscribe/${followeeId}`,
    method: 'get'
  }))
}

// 验证是否关注
export function hasFollow(postUserId) {
  return request(({
    url: `/follow/validate/${postUserId}`,
    method: 'get'
  }))
}
