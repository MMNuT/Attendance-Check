import request from '@/utils/request'

// 獲取班級資訊
export function getClasses () {
  return request({
    url: '/api/administration/records/getclasses',
    method: 'get'
  })
}

export function getStudentInfo (params) {
  return request({
    url: '/api/administration/records/getstudents',
    method: 'get',
    params
  })
}

// 獲得某個範圍的缺曠紀錄列表
export function getRecordSearchList (params) {
  return request({
    url: '/api/administration/record/search/list',
    method: 'get',
    params
  })
}

// 獲得某筆數據的詳細資訊
export function getRecordSearchDetails (params) {
  return request({
    url: '/api/administration/record/search/details',
    method: 'get',
    params
  })
}

// 修改出勤狀態
export function updateRecord (params) {
  return request({
    url: '/api/administration/record/search/update',
    method: 'put',
    params
  })
}

export function getNotification (params) {
  return request({
    url: '/api/administration/record/notification',
    method: 'get',
    params
  })
}
