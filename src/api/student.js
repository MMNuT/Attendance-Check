import request from '@/utils/request'

export function getStudentRecords (params) {
  console.log(params)
  return request({
    url: '/api/students/records',
    method: 'get',
    params
  })
}

/* 拿操行分數 */
export function getDeduction () {
  return request({
    url: '/api/students/records/deduction',
    method: 'get'
  })
}
