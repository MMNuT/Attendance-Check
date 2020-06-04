import request from '@/utils/request'

export function getTodayRecordAPI () {
  return request({
    url: '/api/mentor/todayrecords',
    methods: 'get'
  })
}
