import request from '@/utils/request'

// 注册
export function userRegister(registerDTO) {
  return request({
    url: '/user/register',
    method: 'post',
    data: registerDTO
  })
}

// 前台用户登录
export function login(loginDTO) {
  return request({
    url: '/user/login',
    method: 'post',
    data: loginDTO
  })
}
// 登录后获取前台用户信息
export function getUserInfo() {
  return request({
    url: '/user/info',
    method: 'get'
  })
}
// 前台用户注销
export function logout() {
  return request({
    url: '/user/logout'
  })
}