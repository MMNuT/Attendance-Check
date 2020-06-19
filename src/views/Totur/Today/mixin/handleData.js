import { periodFormat } from '@/utils/format'

export default {
  computed: {
    countData () {
      return this.attendances.map(key => {
        return {
          key,
          color: this.attendanceColorList[key],
          countData: this.lessons.map(lesson => ({
            lessonName: lesson,
            data: (this.todayRecord[lesson] || {})[key] || []
          }))
        }
      })
    }
  },
  methods: {
    $_sortData (data) {
      const tmp = {}
      data.forEach(d => {
        const data = {}
        Object.keys(d.result).filter(key => key !== 'LessonOrder').forEach(k => {
          data[k] = d.result[k].map(studentName => studentName.Name)
        })
        tmp[periodFormat(d.result.LessonOrder)] = data
      })
      return tmp
    }
  }
}
