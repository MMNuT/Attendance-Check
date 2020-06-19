<template>
  <div class="fill-query-container">
    <div class="query-row">
      <div class="select-student">
        <el-select v-model="queryRecordParam.StudentId" placeholder="選擇學生" clearable @change="changeSelect">
          <el-option :label="student.Name" :value="student.Id" v-for="student in studentNames" :key="student.Id"></el-option>
        </el-select>
      </div>
      <div class="query-col">
        <el-date-picker
          v-model="queryRecordParam.time"
          type="daterange"
          range-separator="至"
          start-placeholder="開始日期"
          end-placeholder="結束日期"
          value-format="yyyy-MM-dd"
          @change="changeSelect">
        </el-date-picker>
      </div>
      <div class="query-col">
        <el-button @click="queryRecord">查詢</el-button>
        <el-button @click="copyDetail" :disabled="!queryRecordData.length">列印詳細資訊</el-button>
      </div>
    </div>
    <div class="fill-query-table">
      <el-table :data="queryRecordData" @row-click="visiableDetail" height="700" class="pointer">
        <el-table-column prop="Time" label="時間" width="250" :formatter="timeFormat"></el-table-column>
        <el-table-column prop="StudentName" label="學生" width="180"></el-table-column>
        <el-table-column prop="ContactGuardian" label="學生家長" width="180"></el-table-column>
      </el-table>
    </div>
    <el-dialog :visible.sync="dialogVisible" custom-class="record-detail-dialog">
      <ul v-for="(title, step) in chileseTitle" :key="step" class="fill__confirm-box" :class="step">
        <li v-for="(cn, en) in title" :key="en" class="fill__confirm-content-box">
          <h4 class="fill__confirm-title">{{ cn }}</h4>
          <p class="fill__confirm-content">{{ recordDetail[en] }}</p>
        </li>
      </ul>
      <div class="button-box">
        <el-button @click="downloadCSV">存儲表格</el-button>
        <el-button @click="dialogVisible = false">返回</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import mixins from './mixin'
import { getStudentNames, queryContactRecord, getContactDetailRecord, getPrintData } from '@/api/teacher-tutor'
import { timeFormat, splitTimesToStartAndEnd } from '@/utils/format'
import { redirectToDownloadByBlank } from '@/utils'

export default {
  mixins: [mixins],
  data () {
    return {
      // 查詢參數(丟給後端的)
      queryRecordParam: {
        StudentId: '',
        time: ''
      },
      // 導生名單
      studentNames: [],
      // 查詢的資料
      queryRecordData: [],
      // 顯示細節框
      dialogVisible: false,
      // 紀錄的細節
      recordDetail: {},
      // 第一次請求與否
      queryFirst: false
    }
  },
  computed: {
    csvContent () {
      const csvContent = `data:text/csv;charset=utf-8,${Object.keys(this.recordDetail).join(',')}\r\n${Object.values(this.recordDetail).join(',')}`
      return encodeURI(csvContent)
    },
    downloadName () {
      // 用時間當檔名
      return this.recordDetail.Time
    },
    params () {
      return {
        ...splitTimesToStartAndEnd(this.queryRecordParam.time),
        StudentId: this.queryRecordParam.StudentId
      }
    }
  },
  watch: {
    // 關閉細節顯示框後清空剛拿到的紀錄細節數據
    dialogVisible (newVal) {
      if (!newVal) {
        this.recordDetail = {}
      }
    }
  },
  created () {
    this.getStudentNames()
  },
  methods: {
    // 拿學生名單
    async getStudentNames () {
      const { data } = await getStudentNames()
      this.studentNames = data
    },
    // 查詢紀錄
    async queryRecord () {
      // 整理一下參數
      // const params = this.$_sortParams()
      try {
        const { data } = await queryContactRecord(this.params)
        this.queryRecordData = data
        this.queryFirst = true
      } catch (error) {
        this.$_message({
          type: 'error',
          message: '我就爛'
        })
      }
    },
    // 點擊表格欄後, 顯示紀錄細節
    async visiableDetail (row) {
      // 送細節請求查詢
      this.recordDetail = await this.getContactRecord({ Id: row.Id })
      // 顯示細節顯示框
      this.dialogVisible = true
    },
    // 細節請求
    async getContactRecord (params) {
      try {
        const { result } = await getContactDetailRecord(params)
        result[0].Time = timeFormat(result[0].Time, 'yyyy-mm-dd hh:mm:ss')
        return result[0]
      } catch (error) {
        console.log(error)
      }
    },
    // 下載 CSV
    downloadCSV () {
      const link = document.createElement('a')
      link.href = this.csvContent
      link.download = this.downloadName
      link.click()
      // 主動釋放該 url
      setTimeout(_ => {
        URL.revokeObjectURL(this.csvContent)
      }, 100)
    },
    // 格式化時間格式
    timeFormat (row) {
      // console.log(row, timeFormat)
      return timeFormat(row.Time, 'yyyy-mm-dd hh:mm:ss')
    },
    // 如果是第二次以上的搜尋, 只要修改選擇就送請求
    changeSelect () {
      if (this.queryFirst) {
        this.queryRecord()
      }
    },
    copyDetail () {
      this.getPrintData()
    },
    async getPrintData () {
      const { data } = await getPrintData(this.params)
      this.print(data)
    },
    print (data) {
      console.log(data)
      window.localStorage.setItem('complaintCopy', JSON.stringify(data))
      redirectToDownloadByBlank('#/copy/complaint')
    }
  }
}
</script>

<style scoped>
.fill-query-container {
  width: 90rem;
  margin: 0 auto 0;
}
.fill-query-table {
  margin: 0 auto 0;
}

.query-row {
  display: flex;
  justify-content: space-between;
}

.select-student .el-select {
  width: 18rem;
}
</style>

<style>
.record-detail-dialog .el-dialog__body {
  padding-bottom: 2rem;
}

.record-detail-dialog .fill__confirm-title,
.record-detail-dialog .fill__confirm-content {
  font-size: 3rem;
  font-family: 'JasonHandwriting3'
}
</style>
