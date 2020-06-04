import request from '@/utils/request'

export function login (data) {
  return request({
    url: '/api/login',
    method: 'post',
    data
  })
}

export function getInfo () {
  return request({
    url: '/api/login/permissions',
    method: 'get'
    // withCredentials: true
  })
}

export function getPermission () {
  return request({
    url: '/api/index/button',
    method: 'get'
  })
}
