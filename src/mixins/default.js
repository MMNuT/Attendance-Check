export default {
  data () {
    return {
      attendances: ['出席', '遲到', '曠課', '事假', '喪假', '病假'],
      attendancesOrder: {
        出席: 1,
        遲到: 2,
        事假: 3,
        病假: 4,
        喪假: 5,
        曠課: 6
      },
      attendanceColorList: {
        出席: '#badc58',
        遲到: '#fdcb6e',
        曠課: '#d63031',
        事假: '#0f4c81',
        病假: '#0f4c81',
        喪假: '#0f4c81'
      },
      lessons: ['早自修', '第一堂', '第二堂', '第三堂', '第四堂', '午休', '第五堂', '第六堂', '第七堂', '第八堂']
    }
  }
}
