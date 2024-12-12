import request from '@/utils/request'

// 获取用户主页
export function getInfoByName(username, pageNo, pageSize) {
  return request({
    url: '/user/' + username,
    method: 'get',
    params: {
      pageNo: pageNo,
      pageSize: pageSize
    }
  })
}

// 获取用户主页
export function getUserInfoDetail() {
  return request({
    url: '/user/info',
    method: 'get'
  })
}

// 更新用户
export function update(user) {
  return request({
    url: '/user/update',
    method: 'post',
    data: user
  })
}


