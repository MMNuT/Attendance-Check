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
        出席: '#939249',
        遲到: '#E3AE3C',
        曠課: '#C24F1A',
        事假: '#524A47',
        病假: '#524A47',
        喪假: '#524A47',
        請假: '#524A47'
      },
      attendanceColorNameList: {
        出席: 'attend',
        遲到: 'late',
        曠課: 'skip',
        事假: 'leave',
        病假: 'leave',
        喪假: 'leave'
      },
      lessons: ['早自修', '第ㄧ堂', '第二堂', '第三堂', '第四堂', '午休', '第五堂', '第六堂', '第七堂', '第八堂']
    }
  }
}
