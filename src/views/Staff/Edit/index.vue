<template>
  <div>
    <div class="admin-query-box">
      <div class="admin-query-box__params">
        <div class="student-params-box">
          <el-select v-model="queryParams.ClassId" placeholder="選擇班級" @change="getStudentInfo" clearable class="select-class">
            <el-option
              v-for="classData in classes"
              :key="classData.ClassId"
              :label="classData.ClassName"
              :value="classData.ClassId">
            </el-option>
          </el-select>
          <el-select v-model="queryParams.StudentId" placeholder="選擇學生" clearable @change="changeParams" class="select-student">
            <el-option
              v-for="student in students"
              :key="student.StudentId"
              :label="student.Name"
              :value="student.StudentId">
            </el-option>
          </el-select>
          <el-select v-model="queryParams.Attendance" placeholder="出勤狀態" clearable @change="changeParams" class="select-status">
            <el-option
              v-for="attendance in attendanceElementUISelect"
              :key="attendance.label"
              :label="attendance.label"
              :value="attendance.value">
            </el-option>
          </el-select>
        </div>
        <DatePickerTwoInput @handleDatePickerInput="handleDatePickerInput" @changeSelect="changeParams"/>
      </div>
      <div class="admin-query-box__button">
        <SearchButton @query="getRecordSearchList"/>
      </div>
    </div>
    <el-table :data="queryData" @row-click="getDetail" empty-text="暫無數據" :max-height="maxTableHeight" class="pointer">
      <el-table-column prop="Class" label="班級" width="85"></el-table-column>
      <el-table-column prop="Name" label="姓名" width="80"></el-table-column>
      <el-table-column prop="Date" label="時間" width="135" :formatter="timeFormat"></el-table-column>
      <el-table-column prop="LessonOrder" label="課堂" width="80" :formatter="periodFormat"></el-table-column>
      <el-table-column prop="Attendance" label="狀態" width="70"></el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogVisible" custom-class="admin-dialog" top="40px" :width="isLow576 ? '80%': '50%'">
      <ul class="fill__confirm-box step1">
        <li v-for="message in detailDialogDisplayMessage" :key="message.key" class="fill__confirm-content-box">
          <h4 class="fill__confirm-title">{{ message.chinese }}</h4>
          <p class="fill__confirm-content">{{ detailData[message.key] }}</p>
        </li>
        <li class="fill__confirm-content-box fill__confirm-content-box--status">
          <h4 class="fill__confirm-title">狀態</h4>
          <el-select v-model="detailData.Attendance" class="fill__confirm-content" popper-class="status">
            <el-option
              v-for="attendance in attendanceElementUISelect"
              :key="attendance.label"
              :label="attendance.label"
              :value="attendance.value">
            </el-option>
          </el-select>
        </li>
      </ul>
      <div class="button-box">
        <el-button @click="updateRecord">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getClasses, getStudentInfo, getRecordSearchList, getRecordSearchDetails, updateRecord } from '@/api/staff'
import defaultSet from '@/mixins/default'
import { timeFormat, periodFormat, beforeNoRecordThisAttr } from '@/utils/format'
import DatePickerTwoInput from '@/components/DatePickerTwoInput'
import SearchButton from '@/components/SearchButton'

export default {
  mixins: [defaultSet],
  components: { DatePickerTwoInput, SearchButton },
  data () {
    return {
      classes: [],
      students: [],
      queryParams: {
        ClassId: '',
        StudentId: '',
        time: '',
        Attendance: ''
      },
      queryData: [],
      dialogVisible: false,
      detailData: [],
      detailDialogDisplayMessage: [
        { key: 'LessonDate', chinese: '日期' },
        { key: 'LessonOrder', chinese: '堂數' },
        { key: 'Subject', chinese: '科目' },
        { key: 'RollCallTeacher', chinese: '點名老師' },
        { key: 'Class', chinese: '班級' },
        { key: 'StudentName', chinese: '姓名' }
      ],
      firstQuery: true
    }
  },
  created () {
    this.getClasses()
  },
  computed: {
    attendanceElementUISelect () {
      return Object.keys(this.attendancesOrder).map(attendance => {
        return {
          label: attendance,
          value: this.attendancesOrder[attendance]
        }
      })
    },
    sortQueryParam () {
      return {
        ClassId: this.queryParams.ClassId,
        StudentId: this.queryParams.StudentId,
        Attendance: this.queryParams.Attendance,
        ...this.queryParams.time
      }
    },
    maxTableHeight () {
      return this.$store.getters.clientHeight - 60 - 120 - 48
    },
    isLow576 () {
      return this.$store.getters.isLow576
    }
  },
  methods: {
    async getClasses () {
      const { data } = await getClasses()
      this.classes = data
    },
    async getStudentInfo (ClassId) {
      // 把上次選的班級學生資料清空
      this.students = []
      // 把原本可能有選過的學生清掉
      this.queryParams.StudentId = ''
      this.queryData = []
      // 拿新的
      if (!this.queryParams.ClassId) return false
      const { data } = await getStudentInfo({ ClassId })
      this.students = data
    },
    async getRecordSearchList () {
      console.log(this.sortQueryParam)
      // 處理時間節點
      // const time = splitTimesToStartAndEnd(this.queryParams.time)
      try {
        // 送請求
        const { data } = await getRecordSearchList(this.sortQueryParam)
        // 存數據
        this.queryData = data
        this.firstQuery = false
      } catch (error) {
        console.log(error)
        this.$_message({
          type: 'error',
          message: '發生錯誤'
        })
      }
    },
    // 獲取某筆數據的詳細資訊
    async getDetail (row) {
      try {
        const { data } = await getRecordSearchDetails({ Id: row.Id })
        this.sortDetailData(data[0])
        this.detailData = data[0]
        console.log(data[0])
        this.dialogVisible = true
      } catch (error) {
        console.log(error)
        this.$_message({
          type: 'error',
          message: '抱歉, 發生錯誤, 請聯絡 How 哥'
        })
      }
    },
    sortDetailData (data) {
      data.LessonDate = timeFormat(data.LessonDate)
      data.LessonOrder = periodFormat(data.LessonOrder)
      data.Subject = this.beforeNoRecordThisAttr(data.Subject)
    },
    // 整理時間顯示格式
    timeFormat (row) {
      return timeFormat(row.Date)
    },
    // 整理堂數顯示文字
    periodFormat (row) {
      return periodFormat(row.LessonOrder)
    },
    beforeNoRecordThisAttr (data) {
      return beforeNoRecordThisAttr(data)
    },
    async updateRecord () {
      try {
        const { message } = await updateRecord({ Id: this.detailData.Id, Attendance: this.detailData.Attendance })
        this.$_message({
          type: 'success',
          message
        })
        this.getRecordSearchList()
        this.dialogVisible = false
      } catch (error) {
        console.log(error)
      }
    },
    changeParams () {
      if (this.firstQuery) return false
      this.getRecordSearchList()
    },
    changeSelect () {
      if (this.queryFirst) {
        // this.query()
      }
    },
    handleDatePickerInput (time) {
      // console.log(time)
      this.queryParams.time = time
    }
  }
}
</script>

<style scoped>
.admin-query-box {
  display: flex;
  justify-content: space-between;
  max-width: 60rem;
  margin: 0 auto 0;
}

.admin-query-box__params .select-class,
.admin-query-box__params .select-student,
.admin-query-box__params .select-status {
  width: 18rem;
}
</style>

<style>
.admin-dialog {
  max-width: 375px;
}
.admin-dialog .fill__confirm-title,
.admin-dialog .fill__confirm-content {
  font-size: 3rem;
  font-family: 'JasonHandwriting3'
}

.admin-dialog .el-dialog__body {
  padding-bottom: 2rem;
}
.admin-dialog .fill__confirm-content-box:last-child {
  margin-bottom: 0;
}

.admin-dialog .fill__confirm-content-box--status .el-input {
  width: 120px;
}

.el-select-dropdown.el-popper.status {
  min-width: unset!important;
  width: 120px;
}

.el-select-dropdown.el-popper.status ul > li {
  font-size: 20px;
  text-align: center;
}

@media screen and (max-width: 576px) {
  .admin-dialog .fill__confirm-content-box {
    flex-direction: column;
    margin-bottom: 0;
  }
  .admin-dialog .fill__confirm-content-box--status > h4 {
    margin-bottom: 10px;
  }
}
</style>
