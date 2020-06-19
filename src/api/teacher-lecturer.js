import request from '@/utils/request'

export function getTodaySchedule () {
  return request({
    url: '/api/teach/timetables',
    method: 'get'
  })
}

export function insertRollCallData (data) {
  return request({
    url: '/api/teach/records/create',
    method: 'post',
    data
  })
}

export function updateRollCallData (data) {
  return request({
    url: '/api/teach/records/update',
    method: 'put',
    data
  })
}
