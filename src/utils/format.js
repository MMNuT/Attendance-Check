
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
