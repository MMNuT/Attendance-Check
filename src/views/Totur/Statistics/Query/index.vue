<template>
  <div class="query-container">
    <div class="query-box">
      <div class="query-box__param-box">
        <div>
          <el-select v-model="selectData.StudentId" placeholder="選擇學生" clearable @change="changeSelect">
            <el-option
              v-for="(student, index) in studentNames"
              :key="index"
              :label="student.Name"
              :value="student.Id"
              clearable>
            </el-option>
          </el-select>
          <el-select v-model="selectData.Attendance" placeholder="出勤狀態" clearable @change="changeSelect">
            <el-option
              v-for="(status, index) in attendances"
              :key="index"
              :label="status"
              :value="attendancesOrder[status]"
              clearable>
            </el-option>
          </el-select>
        </div>
        <div>
          <DatePickerTwoInput @handleDatePickerInput="handleDatePickerInput" @changeSelect="changeSelect"/>
        </div>
      </div>
      <SearchButton @query="query"/>
      <!--
      <div class="query-box__button-box">
        <el-button @click="query">查詢</el-button>
        <SearchButton/>
      </div>
      -->
    </div>
    <el-table :data="queryData" style="width: 100%" empty-text="暫無訊息" :max-height="maxTableHeight">
      <el-table-column prop="Name" label="姓名" width="100"></el-table-column>
      <el-table-column prop="Date" label="時間" width="150" :formatter="timeFormat"></el-table-column>
      <el-table-column prop="LessonOrder" label="課堂" width="100" :formatter="periodFormat"></el-table-column>
      <el-table-column prop="Subject" label="課名" width="100" :formatter="beforeNoRecordThisAttr"></el-table-column>
      <el-table-column prop="RollCallTeacherId" label="點名老師" width="120"></el-table-column>
      <el-table-column prop="Attendance" label="出勤狀態" width="100"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getStudentNames, queryStudentAttendanceStatus } from '@/api/teacher-tutor'
import { defaultSet, resize } from '@/mixins'
import { periodFormat, timeFormat, beforeNoRecordThisAttr } from '@/utils/format'
import DatePickerTwoInput from '@/components/DatePickerTwoInput'
import SearchButton from '@/components/SearchButton'

console.log(queryStudentAttendanceStatus)

export default {
  mixins: [defaultSet, resize],
  components: { DatePickerTwoInput, SearchButton },
  data () {
    return {
      studentNames: [],
      selectData: {
        StudentId: '',
        time: '',
        Attendance: ''
      },
      queryData: [],
      queryFirst: false
    }
  },
  computed: {
    maxTableHeight () {
      return this.$store.getters.clientHeight - 60 - 40 - 80
    }
  },
  created () {
    this.getInitData()
  },
  methods: {
    async getInitData () {
      try {
        const { data } = await getStudentNames()
        this.studentNames = data
        console.log(this.studentNames)
      } catch (error) {

      }
    },
    async query () {
      try {
        const { data } = await queryStudentAttendanceStatus({
          StudentId: this.selectData.StudentId,
          Attendance: this.selectData.Attendance,
          StartDate: this.selectData.time.StartDate,
          EndDate: this.selectData.time.EndDate
        })
        this.queryData = data
        this.queryFirst = true
      } catch (error) {
        console.log(error)
      }
    },
    periodFormat (row, column, cellValue) {
      return periodFormat(cellValue)
    },
    timeFormat (row, column, cellValue) {
      return timeFormat(cellValue)
    },
    // 以前沒有這個欄位要送, 後來加的, 所以以前這欄都沒有數據
    beforeNoRecordThisAttr (row, column, cellValue) {
      return beforeNoRecordThisAttr(cellValue)
      // if (!cellValue) return '未記錄'
      // return cellValue
    },
    changeSelect () {
      // 想法:
      // 第一次使用者通常想要給比較多參數, 所以先不馬上送請求
      // 第二次之後通常只是想修改某個參數, 此時一修改馬上送請求
      if (this.queryFirst) {
        this.query()
      }
    },
    handleDatePickerInput (time) {
      this.selectData.time = time
    }
  }
}
</script>

<style scoped>
.query-box__param-box .el-select {
  width: 18rem;
}

.query-container {
  max-width: 80rem;
  margin: 0 auto 0;
}

.query-container .query-box {
  display: flex;
}

.query-container .query-box  .query-box__param-box  {
  display: flex;
  flex-wrap: wrap;
  flex: 1;
}
/*
.query-container {
  max-width: 120rem;
  margin: 0 auto 0;
  min-width: 102.4rem;
}

.query-box {
  display: flex;
  justify-content: space-between;
}

.query-box .query-box__param-box {
  min-width: 90rem;
  display: flex;
  justify-content: space-between;
}
.query-box__button-box button {
  vertical-align: top;
  line-height: 4rem;
  padding: 0 1.5rem;
  height: 4rem;
}
*/
</style>
