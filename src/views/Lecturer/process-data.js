
/**
 * 過濾出 出席有問題的學生
 * params:
 * @studentInfo 該班所有學生的數據 [{Attendance: xx}, ...]
 */
export function filterProblemStudents (studentInfo) {
  return studentInfo.filter(student => student.Attendance !== 1)
}

/**
 * 出席代碼轉換成中文
 */
function _attendanceToChineseFormat (attendance) {
  if (attendance === 2) return '遲到'
  if (attendance === 3) return '事假'
  if (attendance === 4) return '病假'
  if (attendance === 5) return '喪假'
  if (attendance === 6) return '曠課'
}

/**
 * 將缺席學生的數據整理成 { '遲到': ['name1', 'name2'], .... }
 */

export function organizeProblemStudentsData (hasProblemStudents) {
  const attendances = ['遲到', '曠課', '事假', '喪假', '病假']
  const countProblemStudents = {}
  hasProblemStudents.forEach(student => {
    const attendance = _attendanceToChineseFormat(student.Attendance)
    if (!countProblemStudents[attendance]) {
      countProblemStudents[attendance] = [student['姓名']]
    } else {
      countProblemStudents[attendance].push(student['姓名'])
    }
  })
  return attendances.map(attendance => ({ attendance, data: countProblemStudents[attendance] }))
  // countProblemStudents
}
