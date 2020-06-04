import request from '@/utils/request'

export function getClassData (data) {
  return request({
    url: '/api/teach/records',
    method: 'get',
    params: data
  })
}
