import { periodFormat } from '@/utils/format'

export default {
  data () {
    return {
      keys: ['出席', '遲到', '曠課', '事假', '喪假', '病假'],
      lessons: ['早自修', '第一堂', '第二堂', '第三堂', '第四堂', '午休', '第五堂', '第六堂', '第七堂', '第八堂'],
      color: {
        出席: '#badc58',
        遲到: '#fdcb6e',
        曠課: '#d63031',
        事假: '#0f4c81',
        病假: '#0f4c81',
        喪假: '#0f4c81'
      }
    }
  },
  computed: {
    countData () {
      return this.keys.map(key => {
        return {
          key,
          color: this.color[key],
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
