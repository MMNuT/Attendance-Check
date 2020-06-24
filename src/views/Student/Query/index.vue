<template>
  <div class="student-query-container">
    <div class="query-params-box">
      <div class="query-params-box__query">
        <DatePickerTwoInput @handleDatePickerInput="handleDatePickerInput" @changeSelect="changeSelect"/>
        <el-select v-model="querySelect.Attendance" placeholder="出勤狀態" @change="changeSelect" clearable class="status">
          <el-option
            v-for="attendance in attendanceElementUISelect"
            :key="attendance.value"
            :label="attendance.label"
            :value="attendance.value">
          </el-option>
        </el-select>
      </div>
      <SearchButton @query="getQueryData"/>
    </div>
    <div>
      <el-table :data="queryData" style="width: 100%" :max-height="maxTableHeight" empty-text="暫無數據">
        <el-table-column prop="LessonDate" label="時間" width="135" :formatter="timeFormat"></el-table-column>
        <el-table-column prop="LessonOrder" label="課堂" width="80" :formatter="periodFormat"></el-table-column>
        <el-table-column prop="Subject" label="課名" width="80"></el-table-column>
        <el-table-column prop="Teacher" label="點名老師" width="100" v-if="!isLow576"></el-table-column>
        <el-table-column prop="Attendance" label="出勤" width="60"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import defaultSet from '@/mixins/default'
import { attendancesOrderFormatToElementUISelectNeed, timeFormat, periodFormat } from '@/utils/format'
import { getStudentRecords } from '@/api/student'
import DatePickerTwoInput from '@/components/DatePickerTwoInput'
import SearchButton from '@/components/SearchButton'

export default {
  mixins: [defaultSet],
  components: { DatePickerTwoInput, SearchButton },
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
    sortQueryParam () {
      return {
        Attendance: this.querySelect.Attendance,
        ...this.querySelect.time
      }
    },
    isLow576 () {
      return this.$store.getters.isLow576
    },
    maxTableHeight () {
      return this.$store.getters.clientHeight - 60 - 40 - 80
    }
  },
  methods: {
    async getQueryData () {
      console.log(this.sortQueryParam)
      const { data } = await getStudentRecords(this.sortQueryParam)
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
    },
    handleDatePickerInput (time) {
      this.querySelect.time = time
    }
  }
}
</script>

<style>
.query-params-box {
  display: flex;
  justify-content: space-between;
  max-width: 60rem;
  margin: 0 auto 0;
}

.query-params-box__query .status {
  width: 180px;
}

@media screen and (max-width: 576px) {
  .query-params-box {
    justify-content: center;
  }
}
</style>
