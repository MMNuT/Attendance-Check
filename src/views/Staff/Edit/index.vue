<template>
  <div>
    <div class="admin-query-box">
      <div class="admin-query-box__params">
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
        <el-date-picker
          v-model="queryParams.time"
          type="daterange"
          range-separator="至"
          start-placeholder="開始日期"
          end-placeholder="結束日期"
          value-format="yyyy-MM-dd"
          clearable
          @change="changeParams">
        </el-date-picker>
      </div>
      <div class="admin-query-box__button">
        <el-button @click="getRecordSearchList">查詢</el-button>
      </div>
    </div>
    <el-table :data="queryData" @row-click="getDetail" empty-text="暫無數據" height="700" class="pointer">
      <el-table-column prop="Class" label="班級" width="180"></el-table-column>
      <el-table-column prop="Name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="Date" label="時間" width="180" :formatter="timeFormat"></el-table-column>
      <el-table-column prop="LessonOrder" label="課堂" width="180" :formatter="periodFormat"></el-table-column>
      <el-table-column prop="Attendance" label="狀態" width="180"></el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogVisible" width="50%" custom-class="admin-dialog">
      <ul class="fill__confirm-box step1">
        <li v-for="message in detailDialogDisplayMessage" :key="message.key" class="fill__confirm-content-box">
          <h4 class="fill__confirm-title">{{ message.chinese }}</h4>
          <p class="fill__confirm-content">{{ detailData[message.key] }}</p>
        </li>
        <li class="fill__confirm-content-box">
          <h4 class="fill__confirm-title">狀態</h4>
          <el-select v-model="detailData.Attendance" class="fill__confirm-content">
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
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button @click="updateRecord">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getClasses, getStudentInfo, getRecordSearchList, getRecordSearchDetails, updateRecord } from '@/api/staff'
import defaultSet from '@/mixins/default'
import { splitTimesToStartAndEnd, timeFormat, periodFormat, beforeNoRecordThisAttr } from '@/utils/format'

export default {
  mixins: [defaultSet],
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
      // 處理時間節點
      const time = splitTimesToStartAndEnd(this.queryParams.time)
      try {
        // 送請求
        const { data } = await getRecordSearchList({
          ClassId: this.queryParams.ClassId,
          StudentId: this.queryParams.StudentId,
          Attendance: this.queryParams.Attendance,
          ...time
        })
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
    }
  }
}
</script>

<style scoped>
.admin-query-box {
  display: flex;
}

.admin-query-box__params {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.admin-query-box__params > div{
  vertical-align: top;
  margin-right: 2rem;
  margin-bottom: 2rem;
}

.admin-query-box__params .select-class,
.admin-query-box__params .select-student,
.admin-query-box__params .select-status {
  width: 18rem;
}
</style>

<style>
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
</style>
