<template>
  <div>
    <el-row>
      <el-col :span="8">
        <el-select v-model="queryRecordParam.student" placeholder="選擇學生">
          <el-option label="大大大" value="大大大"></el-option>
          <el-option label="大大大2" value="大大大2"></el-option>
        </el-select>
      </el-col>
      <el-col :span="12">
        <el-date-picker
          v-model="queryRecordParam.time"
          type="daterange"
          range-separator="至"
          start-placeholder="開始日期"
          end-placeholder="結束日期">
        </el-date-picker>
      </el-col>
      <el-col :span="4">
        <el-button @click="queryRecord">查詢</el-button>
      </el-col>
    </el-row>
    <el-table :data="queryRecordData" style="width: 100%" @row-click="visiableDetail">
      <el-table-column prop="time" label="時間" width="180"></el-table-column>
      <el-table-column prop="student" label="學生" width="180"></el-table-column>
      <el-table-column prop="parent" label="學生家長" width="180"></el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogVisible">
      <h2>{{ recordDetail.teacher }}</h2>
      <ul>
        <li v-for="(value, title) in processRecordDetail" :key="title">
          <h4>{{ title }}</h4>
          <p>{{ value }}</p>
        </li>
      </ul>
      <div>
        <el-button @click="downloadCSV">存儲表格</el-button>
        <el-button @click="dialogVisible = false">返回</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import mixins from './mixin'

function queryRecord () {
  return [
    { time: '2020-01-01', student: '大大大', parent: '大大大的媽媽', id: 1 },
    { time: '2020-01-02', student: '大大大', parent: '大大大的爸爸', id: 2 }
  ]
}

function recordDetail () {
  return {
    teacher: '我是大老師',
    contentTime: '2020-91-01',
    student: '大大ㄉㄚ',
    parent: '大大大的媽媽',
    contentMethods: '電話',
    contentReason: '大大大去打網咖沒糾',
    contentResult: '大大大的媽媽說下次要揪老師'
  }
}

export default {
  mixins: [mixins],
  data () {
    return {
      queryRecordParam: {
        student: '',
        time: ''
      },
      queryRecordData: [],
      dialogVisible: false,
      recordDetail: {}
    }
  },
  methods: {
    async queryRecord () {
      this.queryRecordData = await queryRecord()
    },
    visiableDetail (arg) {
      this.dialogVisible = true
      this.recordDetail = recordDetail()
    },
    downloadCSV () {
      const csvContent = `data:text/csv;charset=utf-8,${Object.keys(this.recordDetail).join(',')}\r\n${Object.values(this.recordDetail).join(',')}`
      window.location.href = encodeURI(csvContent)
      // window.location.href = encodeURI(csvContent)
    }
  }
}
</script>
