import request from '@/utils/request'

export function getTodayRecordAPI () {
  return request({
    url: '/api/mentor/todayrecords',
    method: 'get'
  })
}

export function getStudentNames () {
  return request({
    url: '/api/mentor/getstudents',
    method: 'get'
  })
}

export function queryStudentAttendanceStatus (data) {
  return request({
    url: '/api/mentor/attendance/search',
    method: 'get',
    params: data
  })
}

export function getSkipData () {
  return request({
    url: '/api/mentor/absenteeism',
    method: 'get'
  })
}

export function getLeaveData () {
  return request({
    url: '/api/mentor/leave',
    method: 'get'
  })
}

export function createContactrecord (data) {
  console.log(data)
  return request({
    url: '/api/mentor/contactrecord/create',
    method: 'post',
    data
  })
}

export function queryContactRecord (data) {
  return request({
    url: '/api/mentor/contactrecord/search/list',
    method: 'get',
    params: data
  })
}

export function getContactDetailRecord (data) {
  return request({
    url: '/api/mentor/contactrecord/search/details',
    method: 'get',
    params: data
  })
}

// 獲得操行分數
export function getPerformanceScore () {
  return request({
    url: '/api/mentor/deduction',
    method: 'get'
  })
}

export function getPrintData (params) {
  return request({
    url: '/api/mentor/contactrecord/print',
    method: 'get',
    params
  })
}
