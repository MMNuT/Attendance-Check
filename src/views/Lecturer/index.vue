<template>
  <div>
    <el-row>
      <el-col :span="24"><div class="grid-content bg-purple-dark"><h2>今日課表</h2></div></el-col>
    </el-row>
    <el-table :data="todaySchedule" style="width: 100%" highlight-current-row @current-change="handleCurrentChange">
      <el-table-column prop="LessonOrderName" label="Period" width="180"></el-table-column>
      <el-table-column prop="ClassName" label="Class" width="180"></el-table-column>
      <el-table-column prop="Subject" label="Subject"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getTodaySchedule } from '@/api/teacher-lecturer'
import { getClassData } from '@/api/teacher-public'
import { periodFormat } from '@/utils/format'

export default {
  data () {
    return {
      todaySchedule: []
    }
  },
  created () {
    this.getTodaySchedule()
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
    async handleCurrentChange ({ ClassId, LessonOrder, ClassName }) {
      try {
        const { data: StudentInfo, method } = await getClassData({ ClassId, LessonOrder })
        if (method === 'post') {
          StudentInfo.forEach(student => { student.Attendance = 1 })
        }
        this.$store.dispatch('lecturer/storeClassData', { StudentInfo, ClassName })
        this.$store.dispatch('lecturer/storeTempRollCallParams', { params: { ClassId, LessonOrder }, method })
        this.$router.push({ path: `/lecturer/${ClassId}` })
      } catch (error) {

      }
    }
  }
}
</script>
