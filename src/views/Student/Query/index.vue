<template>
  <div class="student-query-container">
    <div class="query-params-box">
      <el-date-picker
        v-model="querySelect.time"
        type="daterange"
        range-separator="至"
        start-placeholder="開始日期"
        end-placeholder="結束日期"
        value-format="yyyy-MM-dd"
        @change="changeSelect">
      </el-date-picker>
      <el-select v-model="querySelect.Attendance" placeholder="出勤狀態" @change="changeSelect" clearable>
        <el-option
          v-for="attendance in attendanceElementUISelect"
          :key="attendance.value"
          :label="attendance.label"
          :value="attendance.value">
        </el-option>
      </el-select>
      <el-button @click="getQueryData">查詢</el-button>
    </div>
    <div>
      <el-table :data="queryData" style="width: 100%" height="700">
        <el-table-column prop="LessonDate" label="時間" width="180" :formatter="timeFormat"></el-table-column>
        <el-table-column prop="LessonOrder" label="課堂" width="180" :formatter="periodFormat"></el-table-column>
        <el-table-column prop="Subject" label="課名" width="180"></el-table-column>
        <el-table-column prop="Teacher" label="點名老師" width="180"></el-table-column>
        <el-table-column prop="Attendance" label="出勤狀態" width="180"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import defaultSet from '@/mixins/default'
import { attendancesOrderFormatToElementUISelectNeed, splitTimesToStartAndEnd, timeFormat, periodFormat } from '@/utils/format'
import { getStudentRecords } from '@/api/student'

export default {
  mixins: [defaultSet],
  data () {
    return {
      querySelect: {
        time: '',
        Attendance: ''
      },
      queryData: [],
      firstQuery: true
    }
  },
  computed: {
    attendanceElementUISelect () {
      return attendancesOrderFormatToElementUISelectNeed(this.attendancesOrder)
    },
    splitTime () {
      return splitTimesToStartAndEnd(this.querySelect.time || '')
    }
  },
  methods: {
    async getQueryData () {
      const params = {
        Attendance: this.querySelect.Attendance || '',
        ...this.splitTime
      }
      // console.log(params)
      const { data } = await getStudentRecords(params)
      this.queryData = data
      this.firstQuery = false
    },
    timeFormat (row) {
      return (timeFormat(row.LessonDate))
    },
    periodFormat (row) {
      return periodFormat(row.LessonOrder)
    },
    changeSelect () {
      if (!this.firstQuery) {
        this.getQueryData()
      }
    }
  }
}
</script>

<style>
.student-query-container {
  width: 80%;
  margin: 0 auto 0;
  min-width: 900px;
}

.query-params-box > div {
  vertical-align: top;
}

.query-params-box .el-date-editor,
.query-params-box .el-select {
  margin-right: 1rem;
}
</style>
