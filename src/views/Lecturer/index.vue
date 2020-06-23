<template>
  <div>
    <el-row>
      <el-col :span="24">
        <h2>今日課表</h2>
        <span>{{ time }}</span>
      </el-col>
    </el-row>
    <el-table :data="todaySchedule" highlight-current-row @current-change="handleCurrentChange" class="today-schedule pointer" :max-table="maxTableHeight">
      <!-- 空數據時的插槽 -->
      <template #empty>
        <p>等待, </p>
        <p>我隨時隨地在等待</p>
      </template>
      <el-table-column prop="LessonOrderName" label="Period" width="100"></el-table-column>
      <el-table-column prop="ClassName" label="Class" width="100"></el-table-column>
      <el-table-column prop="Subject" label="Subject" width="130"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getTodaySchedule } from '@/api/teacher-lecturer'
import { getClassData } from '@/api/teacher-public'
import { periodFormat, timeFormat } from '@/utils/format'
import { resize } from '@/mixins'

export default {
  mixins: [resize],
  data () {
    return {
      todaySchedule: [],
      time: '0000-00-00 00:00:00'
    }
  },
  computed: {
    tableSize () {
      return (this.size / 3) - 5
    },
    maxTableHeight () {
      return this.$store.getters.clientHeight - 60 - 40 - 92
    }
  },
  created () {
    this.getTodaySchedule()
    this.dynamicTime()
  },
  methods: {
    async getTodaySchedule () {
      try {
        const { data } = await getTodaySchedule()
        data.forEach(data => {
          data.LessonOrderName = this.periodFormat(data.LessonOrder)
        })
        this.todaySchedule = data
      } catch (error) {
        console.log(error, 123)
      }
    },
    async choosePeriod (data, className) {
      try {
        const { data: StudentInfo, method } = await getClassData(data)
        if (method === 'post') {
          StudentInfo.forEach(student => { student.Attendance = 1 })
        }
        this.$store.dispatch('lecturer/storeClassData', { StudentInfo, className })
        this.$store.dispatch('lecturer/storeTempRollCallParams', { params: data, method })
        this.$router.push({ path: `/lecturer/${data.ClassId}` })
      } catch (error) {
        console.log(error)
      }
    },
    periodFormat,
    async handleCurrentChange ({ ClassId, LessonOrder, ClassName, Subject, LessonOrderName }) {
      console.log({ ClassId, LessonOrder, ClassName, Subject })
      Subject = Subject || LessonOrderName
      try {
        const { data: StudentInfo, method } = await getClassData({ ClassId, LessonOrder })
        if (method === 'post') {
          // 如果是 post, 他數據沒有出席狀態, 給個預設全部出席
          StudentInfo.forEach(student => { student.Attendance = 1 })
        }
        this.$store.dispatch('lecturer/storeClassData', { StudentInfo, ClassName, Subject })
        this.$store.dispatch('lecturer/storeTempRollCallParams', { params: { ClassId, LessonOrder }, method })
        this.$router.push({ path: `/lecturer/${ClassId}` })
      } catch (error) {
        console.log(error)
      }
    },
    dynamicTime () {
      setInterval(_ => {
        this.time = timeFormat(new Date(), 'yyyy-mm-dd hh:mm:ss')
      }, 1000)
    }
  }
}
</script>

<style scoped>
.el-col {
  text-align: center;
}
.today-schedule {
  max-width: 80rem;
  margin: 0 auto 0;
}
</style>
