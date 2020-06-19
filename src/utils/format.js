
/**
 * 把數據轉成 urnencoded 需要的樣子( 一堆 && )
 * @data 要丟給後端的資料, Object
 */
export function URLSearchParamsformat (data) {
  const params = new URLSearchParams()
  Object.keys(data).forEach(key => {
    params.append(key, data[key])
  })
  return params
}

/**
 * 把後端丟來的角色字串轉成人話
 */
export function rolesFormat (roles) {
  return roles.split(',').map(roleNum => {
    if (roleNum === '01') return 'lecturer'
    if (roleNum === '02') return 'totur'
    if (roleNum === '03') return 'staff'
    if (roleNum === '04') return 'student'
    return roleNum
  })
}

/**
 * 把後台傳來的堂數數字轉成人話
 */

export function periodFormat (lessonOrder) {
  if (lessonOrder === 0) return '早自修'
  if (lessonOrder === 1) return '第ㄧ堂'
  if (lessonOrder === 2) return '第二堂'
  if (lessonOrder === 3) return '第三堂'
  if (lessonOrder === 4) return '第四堂'
  if (lessonOrder === 4.5) return '午休'
  if (lessonOrder === 5) return '第五堂'
  if (lessonOrder === 6) return '第六堂'
  if (lessonOrder === 7) return '第七堂'
  if (lessonOrder === 8) return '第八堂'
}

export function attendanceFormat (attendance) {
  if (attendance === 1) return '出席'
  if (attendance === 2) return '遲到'
  if (attendance === 3) return '事假'
  if (attendance === 4) return '病假'
  if (attendance === 5) return '喪假'
  if (attendance === 6) return '曠課'
}

export function timeFormat (time, pattern) {
  const dt = new Date(time)
  if (!dt || dt === 'Invalid Date') {
    return ''
  }
  const y = dt.getFullYear()
  const m = zeroPadding((dt.getMonth() + 1))
  const d = zeroPadding(dt.getDate())

  if (pattern === 'yyyy-mm-dd hh:mm:ss') {
    const hh = zeroPadding(dt.getHours())
    const mm = zeroPadding(dt.getMinutes())
    const ss = zeroPadding(dt.getSeconds())
    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
  }
  return `${y}-${m}-${d}`
}

function zeroPadding (num) {
  return num < 10 ? '0' + num : num
}

/* 把範圍時間拆成開始跟結束兩個節點 */
export function splitTimesToStartAndEnd (time) {
  if (time === null) {
    return {
      StartDate: '',
      EndDate: ''
    }
  }
  return {
    StartDate: time[0] || '',
    EndDate: time[1] || ''
  }
}

/* 把沒紀錄的東西補上未紀錄 */
export function beforeNoRecordThisAttr (data) {
  if (!data) return '未記錄'
  return data
}

export function attendancesOrderFormatToElementUISelectNeed (order) {
  return Object.keys(order).map(attendance => {
    return {
      label: attendance,
      value: order[attendance]
    }
  })
}

// 把數據改一下
export function deductionFormat (basicData, status, data) {
  return data.map(student => {
    const sortData = {}
    const deductionDetail = {}
    status.forEach(s => { deductionDetail[s] = {} })
    Object.keys(student).forEach(key => {
      // 先把基本資料拿起來
      if (basicData.includes(key)) {
        sortData[key] = student[key]
      } else {
        // 把數據分類一下
        const start = key.slice(0, 2)
        const end = key.slice(2, 4)
        if (deductionDetail[start]) {
          deductionDetail[start][end] = student[key]
        }
      }
    })
    sortData.deductionDetail = deductionDetail
    return sortData
  })
}

export const performanceScoreDeductRules = {
  事假: {
    time: 20,
    decuctScore: 1
  },
  病假: {
    time: 50,
    decuctScore: 1
  },
  喪假: {
    time: null,
    decuctScore: '不扣分'
  },
  曠課: {
    time: 2,
    decuctScore: 1
  },
  遲到: {
    time: 3,
    decuctScore: 1
  }
}

// 做一些計算
export function deductionDetailFormat (data) {
  Object.keys(data.deductionDetail).map(key => {
    const child = data.deductionDetail[key]['次數']
    const mother = performanceScoreDeductRules[key].time
    const remainder = child % mother

    data.deductionDetail[key].remainder = remainder | 0
    data.deductionDetail[key].rules = mother
    data.deductionDetail[key].ang = Math.round((isNaN((remainder / mother) * 360) ? 0 : (remainder / mother) * 360) * 100) / 100
  })
  return data
}

/* 取字串第一個字 */
export function sliceToOneWord (word) {
  return word.slice(0, 1)
}
